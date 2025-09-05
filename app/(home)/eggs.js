import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { sanitizeString } from "../../utils";


export default function Eggs() {

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
        const [eggs, setEggs] = useState([]);
       useEffect(() => {
        if (pokemons.length === 0) return;
    
        // Flatten all eggs into a single array of names
        const allEggs = pokemons.flatMap(pokemon =>
    pokemon?.egg_groups ?? []
);

        setEggs([...new Set(allEggs)].sort())
    }, [pokemons]);
console.log(
  pokemons
    .filter(pokemon => !pokemon.egg_groups || pokemon.egg_groups.length < 1)
    .map(pokemon => pokemon.name.fr
    )
);


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
            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 5, gap: 5 }}>
                <Ionicons name="search" size={18} />
                <TextInput value={input} onChangeText={e => setInput(e)} style={{ flex: 1, padding: 3, marginVertical: 5, borderColor: '#CACACA', borderWidth: 2, borderRadius: 10 }} />
            </View>
            <FlatList data={eggs.filter(item => (sanitizeString(item).includes(sanitizeString(input))))}
                contentContainerStyle={{ gap: 10, }}
                renderItem={renderItem}
                numColumns={1}
            />
        </View>
    );
    
}


  