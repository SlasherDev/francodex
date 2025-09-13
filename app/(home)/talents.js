import { Entypo, Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { sanitizeString } from "../../utils";


export default function Talents() {

     const [pokemons, setPokemons] = useState([])
        const [input, setInput] = useState('');
        useEffect(() => {
            fetch('https://tyradex.vercel.app/api/v1/pokemon')
                .then(res => res.json())
                .then(data => {
                    data.shift(); // Remove the first element
                    setPokemons(data);
                })
                .catch(console.error)
        }, [])
        const [talents, setTalents] = useState([]);
       useEffect(() => {
        if (pokemons.length === 0) return;
    
        // Flatten all talents into a single array of names
        const allTalents = pokemons.flatMap(pokemon =>
            pokemon.talents.map(talent => talent.name)
        );
    
        setTalents([...new Set(allTalents)].sort())
    }, [pokemons]);

    const renderItem = useCallback(({ item, index }) => {
        
        return (
            <View style={{ flex: 1}}>
            <Pressable onPress={() => console.log(item)} style={{  flex: 1, padding: 5, marginHorizontal: 5, borderColor: '#CACACA', borderWidth: 2, borderRadius: 10 }}>
                <Text style={{ textAlign: "center", fontSize: 20 }}>{item}</Text>
            </Pressable>
            </View>
        )
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5, marginHorizontal: 5, gap: 5, padding: 3, marginTop: 5, borderColor: '#CACACA', borderWidth: 2, borderRadius: 10 }}>
                <Ionicons name="search" size={18} />
                <TextInput value={input} selectionColor={'black'} style={{ flex: 1 }} onChangeText={e => setInput(e)} />
                {input && (
                    <Entypo name="cross" size={25} onPress={() => { setInput('') }} />
                )}
            </View>
            <FlatList data={talents.filter(item => (sanitizeString(item).includes(sanitizeString(input))))}
                contentContainerStyle={{ gap: 10, paddingBottom: 5}}
                renderItem={renderItem}
                numColumns={1}
            />
        </View>
    );
}


  