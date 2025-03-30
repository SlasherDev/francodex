import React, { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, Text, TextInput, Pressable, View, useWindowDimensions } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";
import context from "../../context";
import { sanitizeString } from "../../utils";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

export default function Pokedex() {
    const { filtredPokemon, setFiltredPokemon } = useContext(context);

    const { width } = useWindowDimensions();

    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(true);

    const checkConnection = useCallback(() => {
        NetInfo.fetch().then(state => {
            if (state.isConnected && state.isInternetReachable) {
                setIsConnected(true);
            } else {
                setIsConnected(false);
                Alert.alert(
                    `Pas de connexion Internet`,
                    "Merci de vérifier votre connexion internet (j'en ai besoin pour fonctionner)",
                    [
                        { text: 'OK', onPress: () => checkConnection() },
                    ],
                    { cancelable: false }
                );
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
                            <Image style={{ width: 125, aspectRatio: 1 }} source={{ uri: item.sprites.regular }} alt={item.name.fr} />
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>{item.name.fr}</Text>
                            <View style={{ margin:10}}>
                            <View style={{flex: 1,justifyContent: "center", alignItems: "flex-start",gap:5 }}>
                                {item.types.map((type, typeId) => {
                                    return (
                                        <View key={`${item.pokedex_id}-${typeId}`} style={{ flexDirection: 'row', alignItems: 'center', gap :5 }}>
                                            <Image
                                                style={{ borderRadius: 12.5, width: 25, height: 25}}
                                                source={{ uri: type.image }}
                                                accessibilityLabel={type.name}
                                            />
                                            <Text>{type.name}</Text>
                                        </View>
                                    );
                                })}
                            </View>
                            </View>
                        </View>
                    </View>


                    <Text style={{ fontSize: 15 }}>#{String(item.pokedex_id).padStart(3, '0')}</Text>
                </Pressable>
            </Link>
        );
    }, [width]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color='gray' />
            </View>
        );
    } else if (filtredPokemon.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Aucun Pokémon à afficher selon les filtres actuels.</Text>
                <View>

                </View>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <ExpoStatusBar backgroundColor="#931010" style="light" />
            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 5, gap: 5 }}>
                <Ionicons name="search" size={18} />
                <TextInput value={input} onChangeText={e => setInput(e)} style={{ flex: 1, padding: 3, marginTop: 5, borderColor: '#CACACA', borderWidth: 2, borderRadius: 10 }} />
            </View>
            <FlatList data={filtredPokemon.filter(item => (sanitizeString(item.name.fr).includes(sanitizeString(input)) || item.pokedex_id.toString().includes(input)))}
                contentContainerStyle={{ gap: 5, alignItems: "center", marginVertical: 5 }}
                renderItem={renderItem}
                numColumns={1}
            />
        </View>
    );
}
