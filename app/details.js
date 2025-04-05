import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useLocalSearchParams } from "expo-router";
import { Pressable, Image, Text, View, ScrollView, FlatList, StyleSheet, Dimensions, useWindowDimensions, Button } from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";

import context from "../context";
import TargetPokemonPreComponant from "./componants/targetPokemonPreComponant";
import TargetPokemonNextComponant from "./componants/targetPokemonNextComponant";
import TargetPokemonRegionComponant from "./componants/targetPokemonRegionComponant";

export default function Details() {

    const { id } = useLocalSearchParams();
    const { storage, setStorage } = useContext(context);


    /*const [poke, setPoke] = useState()
    const spePoke = (id) => {
        fetch('https://tyradex.vercel.app/api/v1/pokemon/' + id)
        .then(res => res.json())
        .then(data => setPoke(data))
        .catch(console.error)
        }*/

    const [pokemon, setPokemon] = useState()
    const [targetPokemonPre, setTargetPokemonPre] = useState([]);
    const [targetPokemonNext, setTargetPokemonNext] = useState([]);
    const [targetPokemonRegion, setTargetPokemonRegion] = useState([]);

    useEffect(() => {
        fetch('https://tyradex.vercel.app/api/v1/pokemon/' + id)
            .then(res => res.json())
            .then(data => setPokemon(data))
            .catch(console.error)
    }, [id])

    useEffect(() => {
        if (pokemon && pokemon.evolution?.pre && pokemon.evolution.pre.length > 0) {
            const prePokedex = pokemon.evolution.pre.map(pre => pre);
            setTargetPokemonPre(prePokedex);
        }
        if (pokemon && pokemon.evolution?.next && pokemon.evolution.next.length > 0) {
            const nextPokedex = pokemon.evolution.next.map(next => next);
            setTargetPokemonNext(nextPokedex);
        }
        if (pokemon && pokemon?.formes && pokemon.formes.length > 0) {
            const regionPokedex = pokemon.formes.map(forme => forme);
            setTargetPokemonRegion(regionPokedex);
        }
    }, [pokemon]);

    const [types, setTypes] = useState([]);
    useEffect(() => {
        fetch("https://tyradex.vercel.app/api/v1/types")
            .then(res => res.json())
            .then(data => setTypes(data.map(type => type)))
            .catch(console.error)
    }, [])

    useEffect(() => {
        storage.includes(id)
    }, [storage])

    function StatToPercentage(value) {
        return value * 100 / 255
    }
    function setStatColor(value) {
        return value < 26 ? 'red' : value < 76 ? "orange" : value < 151 ? '#ffee00' : '#41ab5d'
    }

    const addItem = async () => {
        setStorage(prev => [...prev, id])
    }

    const deleteItem = async () => {
        setStorage(prev => prev.filter(item => item != id))
    }
    const renderItem = ({ item, key }) => (
        <>
            <ScrollView>
                <View style={[styles.itemContainer, { gap: 20 }]}>
                    <View>
                        <Text style={styles.sectionTitle}>Informations générales</Text>
                        <Text>génération : {item.generation}</Text>
                        <Text>{item.category}</Text>
                        <Text>Taille : {item.height}</Text>
                        <Text>Poids : {item.weight}</Text>
                        <Text>Taux de capture : {item.catch_rate}</Text>
                        <Text>Exp au niveau 100 : {item.level_100}</Text>
                        {item.egg_groups && <Text>groupe d'oeuf : {item.egg_groups.join(', ')}</Text>}
                        {item.sexe && (
                            <View>
                                <Text>
                                    Sexe: <Text style={{ fontWeight: 'bold' }}>{item.sexe.female}%</Text> Femelles ; <Text style={{ fontWeight: 'bold' }}>{item.sexe.male}%</Text> Mâles
                                </Text>
                                <View style={styles.progressContainer}>
                                    <View style={[styles.progressBar, { width: `${item.sexe.female}%`, backgroundColor: 'pink' }]} />
                                    <View style={[styles.progressBar, { width: `${item.sexe.male}%`, backgroundColor: 'lightblue' }]} />
                                </View>
                            </View>
                        )}


                        <View>
                            <Text style={styles.sectionTitle}>Statistiques</Text>
                            <View style={{ gap: 5 }}>
                                <View>
                                    <Text>HP : {item.stats.hp}</Text>
                                    <View style={styles.statBarcontainter}>
                                        <View style={[{
                                            width: `${StatToPercentage(item.stats.hp)}%`,
                                            backgroundColor: `${setStatColor(item.stats.hp)}`,

                                        }, styles.statBar]} />
                                    </View >
                                </View>
                                <View>
                                    <Text>Attaque : {item.stats.atk}</Text>
                                    <View style={styles.statBarcontainter}>
                                        <View style={[{
                                            width: `${StatToPercentage(item.stats.atk)}%`,
                                            backgroundColor: `${setStatColor(item.stats.atk)}`,
                                        }, styles.statBar]} />
                                    </View >
                                </View>
                                <View>
                                    <Text>Défense : {item.stats.def}</Text>
                                    <View style={styles.statBarcontainter}>
                                        <View style={[{
                                            width: `${StatToPercentage(item.stats.def)}%`,
                                            backgroundColor: `${setStatColor(item.stats.def)}`,
                                        }, styles.statBar]} />
                                    </View >
                                </View>
                                <View>
                                    <Text>Attaque spéciale : {item.stats.spe_atk}</Text>
                                    <View style={styles.statBarcontainter}>
                                        <View style={[{
                                            width: `${StatToPercentage(item.stats.spe_atk)}%`,
                                            backgroundColor: `${setStatColor(item.stats.spe_atk)}`,
                                        }, styles.statBar]} />
                                    </View >
                                </View>
                                <View>
                                    <Text>Défense spéciale : {item.stats.spe_def}</Text>
                                    <View style={styles.statBarcontainter}>
                                        <View style={[{
                                            width: `${StatToPercentage(item.stats.spe_def)}%`,
                                            backgroundColor: `${setStatColor(item.stats.spe_def)}`,
                                        }, styles.statBar]} />
                                    </View >
                                </View>
                                <View>
                                    <Text>Vitesse : {item.stats.vit}</Text>
                                    <View style={styles.statBarcontainter}>
                                        <View style={[{
                                            width: `${StatToPercentage(item.stats.vit)}%`,
                                            backgroundColor: `${setStatColor(item.stats.vit)}`,
                                        }, styles.statBar]} />
                                    </View >
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <ScrollView>
                <View style={styles.itemContainer}>
                    <Text style={styles.sectionTitle}>Sensibilités</Text>

                    {/* Double Faiblesse x4 */}
                    {item.resistances.some((resiste) => resiste.multiplier === 4) && (
                        <View>
                            <View style={styles.table}>
                                <Text style={styles.subTitle}>Double Faiblesse x4</Text>
                                {item.resistances
                                    .filter((resiste) => resiste.multiplier === 4)
                                    .reduce((rows, resiste, index) => {
                                        const typeCorrespondant = types.find((type) => type.name.fr === resiste.name);
                                        if (typeCorrespondant) {
                                            // Regrouper les éléments par trois dans une ligne
                                            const rowIndex = Math.floor(index / 3);
                                            if (!rows[rowIndex]) {
                                                rows[rowIndex] = []; // Créer une nouvelle ligne
                                            }
                                            rows[rowIndex].push(typeCorrespondant);
                                        }
                                        return rows;
                                    }, [])
                                    .map((row, rowIndex) => (
                                        <View key={rowIndex} style={styles.tableRow}>
                                            {row.map((typeCorrespondant, typeIndex) => (
                                                <View key={typeIndex} style={styles.tableCellContainer}>
                                                    <Image
                                                        style={styles.image}
                                                        source={{ uri: typeCorrespondant.sprites }}
                                                        alt={typeCorrespondant.name.fr}
                                                    />
                                                    <Text>{typeCorrespondant.name.fr}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    ))}
                            </View>
                        </View>
                    )}
                    {/* Faiblesse x2 */}
                    {item.resistances.some((resiste) => resiste.multiplier === 2) && (
                        <View>
                            <View style={styles.table}>
                                <Text style={styles.subTitle}>Faiblesse x2</Text>
                                {item.resistances
                                    .filter((resiste) => resiste.multiplier === 2)
                                    .reduce((rows, resiste, index) => {
                                        const typeCorrespondant = types.find((type) => type.name.fr === resiste.name);
                                        if (typeCorrespondant) {
                                            // Regrouper les éléments par trois dans une ligne
                                            const rowIndex = Math.floor(index / 3);
                                            if (!rows[rowIndex]) {
                                                rows[rowIndex] = []; // Créer une nouvelle ligne
                                            }
                                            rows[rowIndex].push(typeCorrespondant);
                                        }
                                        return rows;
                                    }, [])
                                    .map((row, rowIndex) => (
                                        <View key={rowIndex} style={styles.tableRow}>
                                            {row.map((typeCorrespondant, typeIndex) => (
                                                <View key={typeIndex} style={styles.tableCellContainer}>
                                                    <Image
                                                        style={styles.image}
                                                        source={{ uri: typeCorrespondant.sprites }}
                                                        alt={typeCorrespondant.name.fr}
                                                    />
                                                    <Text>{typeCorrespondant.name.fr}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    ))}
                            </View>
                        </View>
                    )}



                    {/* Neutre x1 */}
                    {item.resistances.some((resiste) => resiste.multiplier === 1) && (
                        <View>
                            <View style={styles.table}>
                                <Text style={styles.subTitle}>Neutre x1</Text>
                                {item.resistances
                                    .filter((resiste) => resiste.multiplier === 1)
                                    .reduce((rows, resiste, index) => {
                                        const typeCorrespondant = types.find((type) => type.name.fr === resiste.name);
                                        if (typeCorrespondant) {
                                            // Regrouper les éléments par trois dans une ligne
                                            const rowIndex = Math.floor(index / 3);
                                            if (!rows[rowIndex]) {
                                                rows[rowIndex] = []; // Créer une nouvelle ligne
                                            }
                                            rows[rowIndex].push(typeCorrespondant);
                                        }
                                        return rows;
                                    }, [])
                                    .map((row, rowIndex) => (
                                        <View key={rowIndex} style={styles.tableRow}>
                                            {row.map((typeCorrespondant, typeIndex) => (
                                                <View key={typeIndex} style={styles.tableCellContainer}>
                                                    <Image
                                                        style={styles.image}
                                                        source={{ uri: typeCorrespondant.sprites }}
                                                        alt={typeCorrespondant.name.fr}
                                                    />
                                                    <Text>{typeCorrespondant.name.fr}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    ))}
                            </View>
                        </View>
                    )}

                    {/* Résistance x1/2 */}
                    {item.resistances.some((resiste) => resiste.multiplier === 0.5) && (
                        <View>
                            <View style={styles.table}>
                                <Text style={styles.subTitle}>Résistance x1/2</Text>
                                {item.resistances
                                    .filter((resiste) => resiste.multiplier === 0.5)
                                    .reduce((rows, resiste, index) => {
                                        const typeCorrespondant = types.find((type) => type.name.fr === resiste.name);
                                        if (typeCorrespondant) {
                                            // Regrouper les éléments par trois dans une ligne
                                            const rowIndex = Math.floor(index / 3);
                                            if (!rows[rowIndex]) {
                                                rows[rowIndex] = []; // Créer une nouvelle ligne
                                            }
                                            rows[rowIndex].push(typeCorrespondant);
                                        }
                                        return rows;
                                    }, [])
                                    .map((row, rowIndex) => (
                                        <View key={rowIndex} style={styles.tableRow}>
                                            {row.map((typeCorrespondant, typeIndex) => (
                                                <View key={typeIndex} style={styles.tableCellContainer}>
                                                    <Image
                                                        style={styles.image}
                                                        source={{ uri: typeCorrespondant.sprites }}
                                                        alt={typeCorrespondant.name.fr}
                                                    />
                                                    <Text>{typeCorrespondant.name.fr}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    ))}
                            </View>
                        </View>
                    )}

                    {/* Double Résistance x1/4 */}
                    {item.resistances.some((resiste) => resiste.multiplier === 0.25) && (
                        <View>
                            <View style={styles.table}>
                                <Text style={styles.subTitle}>Double Résistance x1/4</Text>
                                {item.resistances
                                    .filter((resiste) => resiste.multiplier === 0.25)
                                    .reduce((rows, resiste, index) => {
                                        const typeCorrespondant = types.find((type) => type.name.fr === resiste.name);
                                        if (typeCorrespondant) {
                                            // Regrouper les éléments par trois dans une ligne
                                            const rowIndex = Math.floor(index / 3);
                                            if (!rows[rowIndex]) {
                                                rows[rowIndex] = []; // Créer une nouvelle ligne
                                            }
                                            rows[rowIndex].push(typeCorrespondant);
                                        }
                                        return rows;
                                    }, [])
                                    .map((row, rowIndex) => (
                                        <View key={rowIndex} style={styles.tableRow}>
                                            {row.map((typeCorrespondant, typeIndex) => (
                                                <View key={typeIndex} style={styles.tableCellContainer}>
                                                    <Image
                                                        style={styles.image}
                                                        source={{ uri: typeCorrespondant.sprites }}
                                                        alt={typeCorrespondant.name.fr}
                                                    />
                                                    <Text>{typeCorrespondant.name.fr}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    ))}
                            </View>
                        </View>
                    )}

                    {/* Immunité x0 */}
                    {item.resistances.some((resiste) => resiste.multiplier === 0) && (
                        <View>
                            <View style={styles.table}>
                                <Text style={styles.subTitle}>Immunité x0</Text>
                                {item.resistances
                                    .filter((resiste) => resiste.multiplier === 0)
                                    .reduce((rows, resiste, index) => {
                                        const typeCorrespondant = types.find((type) => type.name.fr === resiste.name);
                                        if (typeCorrespondant) {
                                            // Regrouper les éléments par trois dans une ligne
                                            const rowIndex = Math.floor(index / 3);
                                            if (!rows[rowIndex]) {
                                                rows[rowIndex] = []; // Créer une nouvelle ligne
                                            }
                                            rows[rowIndex].push(typeCorrespondant);
                                        }
                                        return rows;
                                    }, [])
                                    .map((row, rowIndex) => (
                                        <View key={rowIndex} style={styles.tableRow}>
                                            {row.map((typeCorrespondant, typeIndex) => (
                                                <View key={typeIndex} style={styles.tableCellContainer}>
                                                    <Image
                                                        style={styles.image}
                                                        source={{ uri: typeCorrespondant.sprites }}
                                                        alt={typeCorrespondant.name.fr}
                                                    />
                                                    <Text>{typeCorrespondant.name.fr}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    ))}
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>

            {item.evolution && (
                <ScrollView>
                    <View style={styles.itemContainer}>
                        {item.evolution?.pre && (
                            <View style={styles.table}>
                                <Text style={styles.subTitle}>Pré-évolutions</Text>
                                <TargetPokemonPreComponant style={[styles.tableCellContainer, { gap: 10 }]} targetpokemon={targetPokemonPre} />

                            </View>
                        )}
                        {item.evolution?.next && (
                            <View style={styles.table}>
                                <Text style={styles.subTitle}>Évolutions</Text>
                                <TargetPokemonNextComponant style={[styles.tableCellContainer, { gap: 10 }]} targetpokemon={targetPokemonNext} />
                            </View>
                        )}
                        {item.evolution?.mega && (
                            <View style={styles.table}>
                                <Text style={styles.subTitle}>Méga évolutions</Text>
                                <View>
                                    {item.evolution.mega.map((mega, megaId) => (
                                        <View key={megaId} style={[styles.tableCellContainer, { gap: 10 }]}>
                                            <Text style={{ alignItems: "center", margin: 10 }}>Mega-{pokemon.name.fr}</Text>
                                            <Image
                                                style={{ width: 100, height: 100 }}
                                                source={{ uri: mega.sprites.regular }}
                                            />
                                            <Text>{mega.orbe}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}
                    </View>
                </ScrollView>
            )}

            <View style={styles.itemContainer}>
                <Text style={styles.sectionTitle}>Formes</Text>
                {item.sprites.shiny && (
                    <View style={styles.table}>
                        <Text style={styles.subTitle}>Shiny</Text>
                        <View style={styles.tableRow}>
                            <View style={[styles.tableCellContainer, { gap: 10, paddingBottom: 10 }]}>
                                <Image
                                    style={{ width: 100, height: 100 }}
                                    source={{ uri: item.sprites.shiny }}
                                />
                            </View>
                        </View>
                    </View>

                )}
                {item.sprites.gmax && (
                    <View style={styles.table}>
                        <Text style={styles.subTitle}>Gigamax</Text>
                        <View style={styles.tableRow}>
                            <View style={[styles.tableCellContainer, { gap: 10 }]}>
                                <View style={{ flexDirection: "row", gap: 10, paddingBottom: 10 }}>
                                    {item.sprites.gmax.regular && (
                                        <View style={{ alignItems: "center", margin: 10 }}>
                                            <Text style={{ margin: 5 }} >Normal</Text>
                                            <Image
                                                style={{ width: 100, height: 100 }}
                                                source={{ uri: item.sprites.gmax.regular }}
                                            />
                                        </View>
                                    )}
                                    {item.sprites.gmax.shiny && (
                                        <View style={{ alignItems: "center", margin: 10 }}>
                                            <Text style={{ margin: 5 }}>Shiny</Text>
                                            <Image
                                                style={{ width: 100, height: 100 }}
                                                source={{ uri: item.sprites.gmax.shiny }}
                                            />
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                )}
                {item.formes && (
                    <View style={styles.table}>
                        <Text style={styles.subTitle}>Régionaux</Text>
                        <View style={styles.tableRow}>
                            <View style={[styles.tableCellContainer, { gap: 10 }]}>
                                <TargetPokemonRegionComponant targetpokemon={{ "pokedex_id": item.pokedex_id, "region": targetPokemonRegion }} />
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </>
    );

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen options={{
                title: pokemon?.name.fr, headerRight: () => (
                    <Text style={{ margin: 5, color: 'white', fontWeight: 'bold', fontSize: 18 }}>#{String(pokemon?.pokedex_id).padStart(3, '0')}</Text>
                ),
            }} />
            <View style={{ flexDirection: "row" }}>
                <Image style={{ width: 200, aspectRatio: 1 }} source={{ uri: pokemon?.sprites.regular }} alt={pokemon?.name.fr} />
                <View>

                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", gap: 5 }}>
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
                <View style={{ flex: 1, alignItems: 'flex-end', margin: 5 }}>
                    {storage.includes(id) ?
                        <Pressable onPress={deleteItem}>
                            <MaterialIcons name="catching-pokemon" size={32} color={'#890605'} />
                        </Pressable>
                        :
                        <Pressable onPress={addItem}>
                            <MaterialCommunityIcons name="pokeball" size={32} color={'#050689'} />
                        </Pressable>
                    }
                </View>
            </View>

            {pokemon && (
                <FlatList
                    numColumns={1}
                    data={[pokemon]} // Mettre les données dans un tableau car FlatList attend un tableau
                    renderItem={renderItem}
                    horizontal={true} // Si vous voulez que la liste soit horizontale
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={"normal"}
                    pagingEnabled
                />
            )}

        </View>
    )
}
const styles = StyleSheet.create({
    itemContainer: {
        width: Dimensions.get('window').width - 10, // Assurez-vous que l'élément prend toute la largeur
        //height: Dimensions.get('window').height,// Hauteur ajustée
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 2,
        padding: 10,
        //justifyContent: 'space-around',
    },

    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
    },

    statBarcontainter: {
        borderRadius: 10,
        marginTop: 0,
        backgroundColor: `#e0e0e0`,
        height: 15,
    },

    statBar: {
        height: 15,
        borderRadius: 10,
    },
    progressContainer: {
        height: 15,
        marginTop: 5,
        backgroundColor: '#e0e0e0', // Background color for the empty bar
        borderRadius: 10,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    progressBar: {

        height: 15,
    },
    subTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        borderBottomWidth: 1,
        borderColor: '#cdcdcd'
    },
    image: {
        borderRadius: 12.5,
        width: 25,
        height: 25
    },
    table: {
        borderWidth: 1,
        borderColor: '#cdcdcd',
        borderRadius: 5,
        margin: 5,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    tableCellContainer: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 5,
    },
});