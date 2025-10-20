import { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import context from "../../../context";
import { useTheme } from "../../../ThemeContext";

export default function TargetPokemonPreComponant({ targetpokemon }) {
 const { params } = useContext(context);
   const { theme, currentColors } = useTheme();

 const styles = StyleSheet.create({
         image: {
             borderRadius: 12.5,
             width: 25,
             height: 25
         },
     });

  function buildPokemonUrl(id) {
    return `https://tyradex.vercel.app/api/v1/pokemon/${id}`;
  }

  const [TargetedPokemons, setTargetedPokemons] = useState([]);

  useEffect(() => {
    if (targetpokemon.length > 0) {
      const urls = targetpokemon.map((target) => buildPokemonUrl(target.pokedex_id));

      Promise.all(
        urls.map((url) =>
          fetch(url)
            .then((res) => res.json())
            .catch((err) => console.error("Erreur fetch :", err))
        )
      ).then((results) => {
        setTargetedPokemons(results);
      });
    }
  }, [targetpokemon]);


  return (
    <View>
      {TargetedPokemons.map((pokemon, key) => {
        const targetData = targetpokemon.find((t) => t.pokedex_id === pokemon.pokedex_id);
        return (
          <View key={key} style={{ alignItems: "center", margin: 10 }}>
             <Text style={{color : currentColors.text}}>{pokemon?.name?.[params.lang]}</Text>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: pokemon?.sprites?.regular }}
            />
           {targetData && <Text style={{color : currentColors.text}}>{targetData.condition}</Text>}
            <View style={{ flexDirection: "row", gap: 20, paddingBottom: 10, marginTop: 10 }} >
                            {pokemon?.types.map((type, typeId) => {
                                return (
                                    <View key={`${pokemon.pokedex_id}-${typeId}`} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                        <Image
                                            style={styles.image}
                                            source={{ uri: type.image }}
                                            accessibilityLabel={type.name}
                                        />
                                        <Text style={{color : currentColors.text}}>{type.name}</Text>
                                    </View>
                                );
                            })}
                        </View>
          </View>
        );
      })}
    </View>
  );
}
