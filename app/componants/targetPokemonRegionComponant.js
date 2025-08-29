import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function TargetPokemonRegionComponant({ targetpokemon }) {
    const styles = StyleSheet.create({
        image: {
            borderRadius: 12.5,
            width: 25,
            height: 25
        },
    });

    const [TargetedPokemons, setTargetedPokemons] = useState([]);

    useEffect(() => {
        if (!targetpokemon || !targetpokemon.pokedex_id || !Array.isArray(targetpokemon.region)) return;

        // Générer les URLs en récupérant les régions dans le tableau `region`
        const urls = targetpokemon.region.map(regionData =>
            `https://tyradex.vercel.app/api/v1/pokemon/${targetpokemon.pokedex_id}/${regionData.region}`
        );

        Promise.all(
            urls.map(url =>
                fetch(url)
                    .then(res => res.json())
                    .catch(err => console.error("Erreur fetch :", err))
            )
        ).then(results => setTargetedPokemons(results));
    }, [targetpokemon]);

    return (
        <View>
            {TargetedPokemons.length === 0 ? (
                <Text>Aucun Pokémon trouvé.</Text>
            ) : (
                TargetedPokemons.map((pokemon, index) => (
                    <View key={index} style={{ alignItems: "center" }}>
                        <Text style={{ fontWeight: "bold" }}>{pokemon?.name?.fr}</Text>
                        <View style={{ flexDirection: "row", gap: 10, paddingBottom: 10 }} >
                            {pokemon?.sprites?.regular && (
                                <View style={{ alignItems: "center", margin: 10 }}>
                                    <Text>Normal</Text>
                                    <Image source={{ uri: pokemon.sprites.regular }} style={{ width: 100, height: 100 }} />
                                </View>
                            )}
                            {pokemon?.sprites?.regular && (
                                <View style={{ alignItems: "center", margin: 10 }}>
                                    <Text>Chromatique</Text>
                                    <Image source={{ uri: pokemon.sprites.shiny }} style={{ width: 100, height: 100 }} />
                                </View>
                            )}
                        </View>
                        <View style={{ flexDirection: "row", gap: 20, paddingBottom: 10 }} >
                            {pokemon?.types.map((type, typeId) => {
                                return (
                                    <View key={`${pokemon.pokedex_id}-${typeId}`} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                        <Image
                                            style={styles.image}
                                            source={{ uri: type.image }}
                                            accessibilityLabel={type.name}
                                        />
                                        <Text>{type.name}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                ))
            )}
        </View>
    );
}
