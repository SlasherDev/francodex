import React, { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, Text, TextInput, Pressable, View, useWindowDimensions, Modal } from "react-native";
import { Link } from "expo-router";
import { Entypo, Ionicons } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";
import context from "../../context";
import { sanitizeString } from "../../utils";
import { StatusBar } from 'expo-status-bar';
import { useTheme } from "../../ThemeContext";
import AlertNoInternetModal from "../componants/alertModals/alertNoInternetModal";

export default function Pokedex() {
    const { theme, currentColors } = useTheme();

    const contextValue = useContext(context);

    // Add safeguard for context values
    if (!contextValue) {
        console.warn('Context not available in Pokedex component');
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Erreur de chargement du contexte</Text>
            </View>
        );
    }

    const { filtredPokemon, setFiltredPokemon, params } = contextValue;

    const { width } = useWindowDimensions();

    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(true);
    const [isAlertNoInternetModal, setIsAlertNoInternetModal] = useState(false);

    const checkConnection = useCallback(() => {
        NetInfo.fetch().then(state => {
            if (state.isConnected && state.isInternetReachable) {
                setIsConnected(true);
            } else {
                setIsConnected(false);
                setIsAlertNoInternetModal(true);
            }
        });
    }, []);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.isConnected && state.isInternetReachable) {
                setIsConnected(true);
            } else {
                setIsConnected(false);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (isConnected) {
            setLoading(true);
            fetch('https://tyradex.vercel.app/api/v1/pokemon')
                .then(res => res.json())
                .then(data => {
                    data.shift(),
                        setFiltredPokemon(data);
                })
                .catch(console.error)
                .finally(() => setLoading(false));
        } else {
            checkConnection();
        }
    }, [isConnected, checkConnection]);

    const renderItem = useCallback(({ item }) => {
        // Add safeguards for item data
        if (!item || !item.pokedex_id) {
            return null;
        }

        return (
            <Link asChild
                key={item.pokedex_id}
                href={{ pathname: 'details', params: { id: item.pokedex_id } }}
                style={{ width: width - 10, flexDirection: 'row', justifyContent: "space-between", alignItems: "left", borderColor: '#CACACA', borderWidth: 2, borderRadius: 10 }}
            >
                <Pressable
                    style={{ padding: 10 }}
                    activeOpacity={0.75}
                    underlayColor={'#CACACA'}
                >
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Image style={{ width: 125, aspectRatio: 1 }} source={{ uri: item.sprites?.regular }} alt={item.name?.[params?.lang || 'fr']} />
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: currentColors.text, fontWeight: 'bold', fontSize: 25 }}>{item.name?.[params?.lang || 'fr'] || 'Unknown'}</Text>
                            <View style={{ margin: 10 }}>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", gap: 5 }}>
                                    {(item.types || []).map((type, typeId) => {
                                        return (
                                            <View key={`${item.pokedex_id}-${typeId}`} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                                <Image
                                                    style={{ borderRadius: 12.5, width: 25, height: 25 }}
                                                    source={{ uri: type?.image }}
                                                    accessibilityLabel={type?.name}
                                                />
                                                <Text style={{ color: currentColors.text }}>{type?.name || 'Unknown'}</Text>
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                        </View>
                    </View>


                    <Text style={{ fontSize: 15, color: currentColors.text }}>#{String(item.pokedex_id).padStart(3, '0')}</Text>
                </Pressable>
            </Link>
        );
    }, [width, params, currentColors]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: currentColors.background }}>
                <ActivityIndicator size="large" color={currentColors.text} />
            </View>
        );
    } else if (!filtredPokemon || filtredPokemon.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: currentColors.background }}>
                <Text style={{ color: currentColors.text }}>Aucun Pokémon trouvé.</Text>
                <View>

                </View>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: currentColors.background, }}>
            <StatusBar style="light" />
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5, marginHorizontal: 5, gap: 5, padding: 3, marginTop: 5, borderColor: '#CACACA', borderWidth: 2, borderRadius: 10 }}>
                <Ionicons name="search" color={currentColors.text} size={18} />
                <TextInput value={input} color={currentColors.text} selectionColor={currentColors.text} style={{ flex: 1 }} onChangeText={e => setInput(e)} />
                {input && (
                    <Entypo name="cross" size={25} color={currentColors.text} onPress={() => { setInput('') }} />
                )}
            </View>

            <FlatList
                data={(filtredPokemon || []).filter(item =>
                    item && item.name && item.pokedex_id && (
                        sanitizeString(item.name[params?.lang || 'fr']).includes(sanitizeString(input)) ||
                        item.pokedex_id.toString().includes(input)
                    )
                )}
                contentContainerStyle={{ gap: 5, alignItems: "center", paddingBottom: 50 }}
                renderItem={renderItem}
                numColumns={1}
                keyExtractor={(item) => item?.pokedex_id?.toString() || Math.random().toString()}
            />

            <AlertNoInternetModal
                visible={isAlertNoInternetModal}
                onClose={() => setIsAlertNoInternetModal(false)}
                onPress={() => {
                    setIsAlertNoInternetModal(false);
                    checkConnection();
                }}
            />
        </View>

    );
}
