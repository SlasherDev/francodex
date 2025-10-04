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
    const { params } = useContext(context);

    /*const [poke, setPoke] = useState()
    const spePoke = (id) => {
        fetch('https://tyradex.vercel.app/api/v1/pokemon/' + id)
        .then(res => res.json())
        .then(data => setPoke(data))r
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

    const width = useWindowDimensions().width;

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
            <View style={styles.itemContainer}>
                <ScrollView style={styles.scrollView}>
                    <View style={{ marginBottom: 25 }}>
                        {item.talents && (
                            <>
                                <View style={{ gap: 10 }}>
                                    {item.talents
                                        .reduce((rows, talent, index) => {
                                            const rowIndex = Math.floor(index / 2); // 2 talents par ligne
                                            if (!rows[rowIndex]) {
                                                rows[rowIndex] = [];
                                            }
                                            rows[rowIndex].push(talent);
                                            return rows;
                                        }, [])
                                        .map((row, rowIndex) => (
                                            <View
                                                key={rowIndex}
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: row.length === 1 ? 'center' : 'space-around', // Centrer si 1 seul
                                                    gap: 10,
                                                }}
                                            >
                                                {row.map((talent, index) => (
                                                    <View
                                                        key={index}
                                                        style={{
                                                            flex: row.length === 1 ? 0 : 1, // pas de flex si 1 seul
                                                            minWidth: width / 2 - 40,
                                                            justifyContent: 'center',
                                                            flexDirection: 'column',

                                                        }}
                                                    >
                                                        {talent.tc ? (
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Text style={{ borderTopWidth: 1, borderLeftWidth: 1, borderBottomWidth: 1, borderColor: '#cc0000', backgroundColor: '#CC0000', color: 'white', padding: 10, fontWeight: 'bold', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>Caché</Text>
                                                                <Text style={{ paddingVertical: 10, borderTopWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, flex: 1, borderColor: '#cc0000', borderTopRightRadius: 5, borderBottomRightRadius: 5, textAlign: 'center' }}>{talent.name}</Text>
                                                            </View>
                                                        ) : <Text style={{
                                                            borderWidth: 1, borderRadius: 5,
                                                            borderColor: '#cdcdcd', textAlign: 'center', padding: 10
                                                        }}>{talent.name}</Text>}

                                                    </View>
                                                ))}
                                            </View>
                                        ))}
                                </View>
                            </>
                        )}

                        <Text style={styles.sectionTitle}>Informations générales</Text>
                        <View style={{ marginBottom: 10 }}>
                            <View style={styles.infoContainer}>
                                <View style={[styles.table, styles.infoElement]}>
                                    <Text style={styles.subTitle}>Génération</Text>
                                    <Text style={styles.infoText}>{item.generation}</Text>
                                </View>
                                <View style={[styles.table, styles.infoElement]}>
                                    <Text style={styles.subTitle}>Catégorie</Text>
                                    <Text style={styles.infoText}>{item.category}</Text>
                                </View>
                            </View>
                            <View style={styles.infoContainer}>
                                <View style={[styles.table, styles.infoElement]}>
                                    <Text style={styles.subTitle}>Taille</Text>
                                    <Text style={styles.infoText}>{item.height}</Text>
                                </View>
                                <View style={[styles.table, styles.infoElement]}>
                                    <Text style={styles.subTitle}>Poids</Text>
                                    <Text style={styles.infoText}>{item.weight}</Text>
                                </View>
                                <View style={[styles.table, styles.infoElement]}>
                                    <Text style={styles.subTitle}>Taux de capture</Text>
                                    <Text style={styles.infoText}>{item.catch_rate}</Text>
                                </View>
                            </View>
                           <View style={styles.infoContainer}>
                                <View style={[styles.table, styles.infoElement]}>
                                    <Text style={styles.subTitle}>Niveau 100</Text>
                                    <Text style={styles.infoText}>{item.level_100} pts d'expériences</Text>
                                </View>
                                {item.egg_groups && (
                                    <View style={[styles.table, styles.infoElement]}>
                                        <Text style={styles.subTitle}>Groupe d'oeuf</Text>
                                        <View>
                                            {item.egg_groups.map((egg, index) => (
                                                <Text style={styles.infoText} key={index}>{egg}</Text>
                                            ))}
                                        </View>
                                    </View>
                                )}
                            </View>
                        </View>
                        {item.sexe ? (
                            <View>
                                <Text>
                                    Sexe: <Text style={{ fontWeight: 'bold' }}>{item.sexe.female}%</Text> Femelle ; <Text style={{ fontWeight: 'bold' }}>{item.sexe.male}%</Text> Mâle
                                </Text>
                                <View style={styles.progressContainer}>
                                    <View style={[styles.progressBar, { width: `${item.sexe.female}%`, backgroundColor: 'pink' }]} />
                                    <View style={[styles.progressBar, { width: `${item.sexe.male}%`, backgroundColor: 'lightblue' }]} />
                                </View>
                            </View>
                        ) : (
                            <View>
                                <Text>Sexe: Asexué</Text>
                                <View style={styles.progressContainer}>
                                    <View style={styles.progressBar} />
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
                </ScrollView>
            </View>
            <View style={styles.itemContainer}>
                <ScrollView style={styles.scrollView}>
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
                </ScrollView>
            </View>

            {item.evolution && (
                <View style={styles.itemContainer}>
                    <ScrollView style={styles.scrollView}>
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
                                            <Text style={{ alignItems: "center", margin: 10 }}>Mega-{pokemon.name[params.lang]}</Text>
                                            <View style={{ flexDirection: "row", gap: 10, paddingBottom: 10 }}>
                                                {mega.sprites.regular && (
                                                    <View style={{ alignItems: "center", margin: 10 }}>
                                                        <Text style={{ margin: 5 }} >Normal</Text>
                                                        <Image
                                                            style={{ width: 100, height: 100 }}
                                                            source={{ uri: mega.sprites.regular }}
                                                        />
                                                    </View>
                                                )}
                                                {mega.sprites.shiny && (
                                                    <View style={{ alignItems: "center", margin: 10 }}>
                                                        <Text style={{ margin: 5 }}>Chromatique</Text>
                                                        <Image
                                                            style={{ width: 100, height: 100 }}
                                                            source={{ uri: mega.sprites.shiny }}
                                                        />
                                                    </View>
                                                )}
                                            </View>
                                            <Text>{mega.orbe}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}
                    </ScrollView>
                </View>
            )}

            {(item.sprites.shiny || item.sprites.gmax || item.formes) && (
                <View style={styles.itemContainer}>
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.sectionTitle}>Formes</Text>
                        {item.sprites.shiny && (
                            <View style={styles.table}>
                                <Text style={styles.subTitle}>Chromatique</Text>
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
                                                    <Text style={{ margin: 5 }}>Chromatique</Text>
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
                    </ScrollView>
                </View>
            )}
        </>
    );

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen options={{
                title: pokemon?.name[params.lang], headerRight: () => (
                    <Text style={{ margin: 5, color: 'white', fontWeight: 'bold', fontSize: 18 }}>#{String(pokemon?.pokedex_id).padStart(4, '0')}</Text>
                ),
            }} />
            <View style={{ flexDirection: "row" }}>
                <Image style={{ width: 200, aspectRatio: 1 }} source={{ uri: pokemon?.sprites.regular }} alt={pokemon?.name[params.lang]} />
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
                    keyExtractor={(item) => item.pokedex_id.toString()}
                />                
            )}

        </View>
    )
}
const styles = StyleSheet.create({
    itemContainer: {
        width: Dimensions.get('window').width - 10, // Assurez-vous que l'élément prend toute la largeur
        //height: Dimensions.get('window').height,// Hauteur ajustée
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 2,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 50,
        
        //justifyContent: 'space-around',
    },
    scrollView: {
        padding: 10,
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
        marginRight: 5,
        marginLeft: 5,
        marginBottom: 25,
        marginTop: 5,

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
    infoContainer:{
         flexDirection: 'row'
    },
    infoElement : {
        flex: 1,
        marginBottom: 10
    },
    infoText: {
        textAlign: 'center'
    }
});