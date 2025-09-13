import { Dimensions, FlatList, Image, Modal, StyleSheet, Text, View, Pressable, Alert } from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import context from "../../context";

export default function Equipe() {

    const { storage, setStorage } = useContext(context)
    const { params } = useContext(context);

    const [pokemons, setPokemons] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => { fetchAPI(storage) }, [storage])        

    const fetchAPI = async (data) => {
        const promises = data.map(
            id => fetch('https://tyradex.vercel.app/api/v1/pokemon/' + id)
                .then(res => res.json())
                .catch(console.error)
        )
        setPokemons(await Promise.all(promises))
    }

    const handleSelect = (item) => {
        Alert.alert(
            `Voulez vous relacher ${item.name?.fr} ?`,
            "",
            [
                { text: 'Oui', onPress: () => deleteItem(item.pokedex_id) },
                { text: 'Non', onPress: () => { setOpen(false) } }
            ],
            { cancelable: true }
        )

    }

    const deleteItem = (selected) => {
        
        setStorage(prev => prev.filter(i => i != selected))
        setOpen(false)
    }

    const renderItem = useCallback(({ item, index }) => {
        const isLastOddItem = (pokemons.length % 2 !== 0) && (index === pokemons.length - 1);
        return (
            <View style={[styles.container, isLastOddItem && styles.lastItem]}>
                <Text style={styles.title}>{item.name[params.lang] }</Text>
                <View>
                <Image style={styles.picture} source={{ uri: item.sprites?.regular }} />
                </View>
                <Pressable onPress={() => handleSelect(item)}>
                    <MaterialIcons name="catching-pokemon" size={40} color={'#890605'} />
                </Pressable>
            </View>
        )
    }, [pokemons, params]);

    return (
        <View>
            <FlatList data={pokemons} numColumns={2} renderItem={renderItem} keyExtractor={(item) => item.name?.en} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        margin: 5,
        borderRadius: 10,
        alignItems: 'center',
        borderColor: '#cdcdcd',
        borderWidth: 2
    },
    lastItem: {
        marginRight:15
    },
    title: {
        fontWeight: "bold",
        margin:10,
    },
    picture: {
        width: 150,
        aspectRatio: 1
    },
   
})