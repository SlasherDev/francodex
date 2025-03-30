import { useContext, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import context from "../../context";

export default function TargetPokemonNextComponant({ targetpokemon }) {
 //console.log("data :", targetpokemon);

  function buildPokemonUrl(id) {
    return `https://tyradex.vercel.app/api/v1/pokemon/${id}`;
  }

  const [TargetedPokemons, setTargetedPokemons] = useState([]);

  useEffect(() => {
    if (targetpokemon.length > 0) {
      const urls = targetpokemon.map((target) => buildPokemonUrl(target.pokedex_id));
      //console.log("URLs", urls);

      Promise.all(
        urls.map((url) =>
          fetch(url)
            .then((res) => res.json())
            .catch((err) => console.error("Erreur fetch :", err))
        )
      ).then((results) => {
        //console.log("Données des Pokémon récupérées :", results);
        setTargetedPokemons(results);
      });
    }
  }, [targetpokemon]);

  //console.log("TargetedPokemons state :", TargetedPokemons);

  return (
    <View>
      {TargetedPokemons.map((pokemon, key) => {
        const targetData = targetpokemon.find((t) => t.pokedex_id === pokemon.pokedex_id);
        return (
          <View key={key} style={{ alignItems: "center", margin: 10 }}>
            <Text>{pokemon?.name?.fr}</Text>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: pokemon?.sprites?.regular }}
            />
            {targetData && <Text>{targetData.condition}</Text>}
          </View>
        );
      })}
    </View>
  );
}
