import React, { useContext, useState, useEffect } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import context from "../../context";
import { useRouter } from "expo-router";
import { notify } from "../../utils";

import CustomImagePickerModale from "../componants/customs/customImagePicker";
import CustomPickerSymbols from "../componants/customs/CustomPickerSymbols";
import ResetCrossBox from "../componants/resetCross/resetCrossBox";
import { useTheme } from "../../ThemeContext";


export default function Filter() {
    // Options pour les comparateurs de stats
    const signOptions = [
        { label: '\u2265', value: 'egalMax' },
        { label: '>', value: 'max' },
        { label: '=', value: 'egal' },
        { label: '<', value: 'min' },
        { label: '\u2264', value: 'egalMin' },
    ];

    const allGens = [{ name: "Toutes les générations", key: "all", img: null },
    { name: "Génération 1", key: 1, img: require('../images/starters/1.png') },
    { name: "Génération 2", key: 2, img: require('../images/starters/2.png') },
    { name: "Génération 3", key: 3, img: require('../images/starters/3.png') },
    { name: "Génération 4", key: 4, img: require('../images/starters/4.png') },
    { name: "Génération 5", key: 5, img: require('../images/starters/5.png') },
    { name: "Génération 6", key: 6, img: require('../images/starters/6.png') },
    { name: "Génération 7", key: 7, img: require('../images/starters/7.png') },
    { name: "Génération 8", key: 8, img: require('../images/starters/8.png') },
    { name: "Génération 9", key: 9, img: require('../images/starters/9.png') }];

    // Error boundary state
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Error boundary handler
    const handleError = (error) => {
        console.error('Filter component error:', error);
        setHasError(true);
        setErrorMessage(error.message || 'Une erreur inconnue est survenue');
        notify('Erreur: ' + (error.message || 'Une erreur inconnue est survenue'));
    };

    // Reset error state when component mounts
    useEffect(() => {
        setHasError(false);
        setErrorMessage('');

        // Cleanup function
        return () => {
            console.log('Filter component unmounting');
        };
    }, []);

    const [isGenPickerVisible, setIsGenPickerVisible] = useState(false);
    const [isTypePickerVisible, setIsTypePickerVisible] = useState(false);
    const [typePickerKey, setTypePickerKey] = useState(null); // "type1" ou "type2"
    const [SignPickerVisible, setSignPickerVisible] = useState(false);
    const { theme, currentColors } = useTheme();

    const router = useRouter();
    const contextValue = useContext(context);

    //filter
    const [pokeForm, setpokeForm] = useState({
        generation: 'all',
        type1: 'all', type2: 'all',
        hpSign: 'egalMax', hpNbr: '',
        attSign: 'egalMax', attNbr: '',
        defSign: 'egalMax', defNbr: '',
        attSpeSign: 'egalMax', attSpeNbr: '',
        defSpeSign: 'egalMax', defSpeNbr: '',
        speedSign: 'egalMax', speedNbr: ''
    });

    // Log state changes
    useEffect(() => {
    }, [pokeForm]);

    const [pokemons, setPokemons] = useState([]);
    useEffect(() => {
        fetch('https://tyradex.app/api/v1/pokemon')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    data.shift(); // Remove the first element
                    setPokemons(data);
                }
            })
            .catch(error => {
                console.error('Error fetching Pokémon data:', error);
                notify('Erreur lors du chargement des données Pokémon');
            });
    }, []);

    // Store full type objects (with sprites) like types.js does
    const [types, setTypes] = useState([]);
    useEffect(() => {
        fetch("https://tyradex.app/api/v1/types")
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setTypes(data);
                }
            })
            .catch(error => {
                console.error('Error fetching types data:', error);
                notify('Erreur lors du chargement des types');
            });
    }, []);

    const openTypePicker = (key) => {
        setTypePickerKey(key);
        setIsTypePickerVisible(true);
    };

    const [generations, setGenerations] = useState([]);
    useEffect(() => {
        fetch("https://tyradex.app/api/v1/gen")
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    const genNumbers = data.map(generation => generation.generation);
                    setGenerations(genNumbers);
                }
            })
            .catch(error => {
                console.error('Error fetching generations data:', error);
                notify('Erreur lors du chargement des générations');
            });
    }, []);

    // Create updated form with proper type conversions only when needed for filtering
    const updatedPokeForm = { ...pokeForm };

    // If there's an error, show error message
    if (hasError) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Text style={{ color: 'red', fontSize: 18, marginBottom: 10 }}>Erreur dans le filtre</Text>
                <Text style={{ marginBottom: 20 }}>{errorMessage}</Text>
                <Button
                    title="Réessayer"
                    onPress={() => {
                        setHasError(false);
                        setErrorMessage('');
                    }}
                    color="#CC0000"
                />
            </View>
        );
    }

    try {
        // Add safeguard for context values
        if (!contextValue) {
            console.warn('Context not available in Filter component');
            return null;
        }

        const { filtredPokemon, setFiltredPokemon } = contextValue;

        const handleChange = (key, value) => {
            // Add validation to prevent setting undefined values
            if (key === undefined) return;


            // Validate specific keys
            if (key === 'generation') {
                console.log('Setting generation to:', value, 'type:', typeof value);
            } else if (key === 'type1' || key === 'type2') {
                console.log('Setting', key, 'to:', value);
            } else if (key.includes('Sign')) {
                console.log('Setting sign', key, 'to:', value);
            } else if (key.includes('Nbr')) {
                console.log('Setting number', key, 'to:', value, 'type:', typeof value);
            }

            setpokeForm((prevState) => {
                const newState = { ...prevState, [key]: value !== undefined ? value : '' };
                return newState;
            });
        };

        const handleReset = () => {
            // Ensure we have the necessary context values
            if (!contextValue || !contextValue.setFiltredPokemon || !pokemons) {
                console.error('Required values not available for reset');
                return;
            }


            const { setFiltredPokemon } = contextValue;

            const defaultFilter = {
                generation: 'all',
                type1: 'all', type2: 'all',
                hpSign: 'max', hpNbr: '',
                attSign: 'max', attNbr: '',
                defSign: 'max', defNbr: '',
                attSpeSign: 'max', attSpeNbr: '',
                defSpeSign: 'max', defSpeNbr: '',
                speedSign: 'max', speedNbr: ''
            };
            setpokeForm(defaultFilter);
            setFiltredPokemon(pokemons);
            notify('Filtres réinitialisés');
            // Navigate back to home screen after resetting filters with a small delay
            if (router) {
                setTimeout(() => {
                    router.push('/');
                }, 100);
            } else {
                console.log('Router not available for reset');
            }
        }
        const handlesubmit = (e) => {
            // Use the current pokeForm state instead of updatedPokeForm
            const updatedPokeForm = pokeForm;

            // Ensure we have the necessary context values
            if (!contextValue || !contextValue.setFiltredPokemon) {
                console.error('setFiltredPokemon is not available');
                return;
            }

            const { setFiltredPokemon } = contextValue;

            // Ensure we have pokemons data
            if (!pokemons || !Array.isArray(pokemons) || pokemons.length === 0) {
                console.warn('No Pokémon data available for filtering');
                notify('Aucune donnée Pokémon disponible pour le filtrage');
                return;
            }

            let filtered = pokemons;

            // Filter by generation if selected
            try {
                if (updatedPokeForm.generation && updatedPokeForm.generation !== 'all') {
                    // Handle both string and number comparisons
                    const generationValue = isNaN(updatedPokeForm.generation) ?
                        updatedPokeForm.generation :
                        parseInt(updatedPokeForm.generation, 10);
                    filtered = filtered.filter(pokemon => {
                        if (!pokemon || !pokemon.generation) return false;
                        return pokemon.generation === generationValue;
                    });
                }
            } catch (error) {
                console.error('Error in generation filter:', error);
            }

            // Filter by type1 if selected
            // Note: pokemon API stores types as {name: "Plante", image: "..."} (plain string)
            try {
                if (updatedPokeForm.type1 && updatedPokeForm.type1 !== 'all') {
                    filtered = filtered.filter(pokemon => {
                        if (!pokemon) return false;
                        if (!pokemon.types) return false;
                        const hasType = pokemon.types.some(type => type && type.name === updatedPokeForm.type1);
                        return hasType;
                    });
                }
            } catch (error) {
                console.error('Error in type1 filter:', error);
            }

            // Filter by type2 — same plain string comparison as type1
            try {
                if (updatedPokeForm.type2 !== undefined && updatedPokeForm.type1 !== 'all') {
                    if (updatedPokeForm.type2 === 'none') {
                        // Filter for Pokémon with exactly one type
                        filtered = filtered.filter(pokemon => pokemon.types && pokemon.types.length === 1);
                    } else if (updatedPokeForm.type2 !== 'all') {
                        // Filter for Pokémon with a specific second type
                        filtered = filtered.filter(pokemon => {
                            if (!pokemon || !pokemon.types) return false;
                            if (pokemon.types.length > 1) {
                                const hasSecondType = pokemon.types.some(type => type && type.name === updatedPokeForm.type2);
                                return hasSecondType;
                            } else {
                                return false; // Exclude Pokémon with only one type
                            }
                        });
                    }
                }
            } catch (error) {
                console.error('Error in type2 filter:', error);
            }
            const filterByStat = (statKey, sign, value) => {
                // Skip if value is empty or sign is not selected
                if (!value || value === '' || !sign) {
                    return () => true;
                }

                const parsedValue = parseInt(value, 10);
                // Skip if not a valid number
                if (isNaN(parsedValue)) {
                    return () => true;
                }

                switch (sign) {
                    case 'max':
                        return pokemon => {
                            if (!pokemon || !pokemon.stats || pokemon.stats[statKey] === undefined) return false;
                            const result = pokemon.stats[statKey] > parsedValue;
                            return result;
                        };
                    case 'min':
                        return pokemon => {
                            if (!pokemon || !pokemon.stats || pokemon.stats[statKey] === undefined) return false;
                            const result = pokemon.stats[statKey] < parsedValue;
                            return result;
                        };
                    case 'egal':
                        return pokemon => {
                            if (!pokemon || !pokemon.stats || pokemon.stats[statKey] === undefined) return false;
                            const result = pokemon.stats[statKey] === parsedValue;
                            return result;
                        };
                    case 'egalMax':
                        return pokemon => {
                            if (!pokemon || !pokemon.stats || pokemon.stats[statKey] === undefined) return false;
                            const result = pokemon.stats[statKey] >= parsedValue;
                            return result;
                        };
                    case 'egalMin':
                        return pokemon => {
                            if (!pokemon || !pokemon.stats || pokemon.stats[statKey] === undefined) return false;
                            const result = pokemon.stats[statKey] <= parsedValue;
                            return result;
                        };
                    default:
                        return () => true;
                }
            };

            // Apply all filters
            try {
                const initialCount = filtered.length;
                filtered = filtered.filter(pokemon => {
                    if (!pokemon) return false;
                    const result =
                        filterByStat('hp', updatedPokeForm.hpSign, updatedPokeForm.hpNbr)(pokemon) &&
                        filterByStat('atk', updatedPokeForm.attSign, updatedPokeForm.attNbr)(pokemon) &&
                        filterByStat('def', updatedPokeForm.defSign, updatedPokeForm.defNbr)(pokemon) &&
                        filterByStat('spe_atk', updatedPokeForm.attSpeSign, updatedPokeForm.attSpeNbr)(pokemon) &&
                        filterByStat('spe_def', updatedPokeForm.defSpeSign, updatedPokeForm.defSpeNbr)(pokemon) &&
                        filterByStat('vit', updatedPokeForm.speedSign, updatedPokeForm.speedNbr)(pokemon);
                    return result;
                });
            } catch (error) {
                console.error('Error applying filters:', error);
                notify('Erreur lors de l\'application des filtres');
                return;
            }

            // Now filtered contains Pokémon filtered by both type1 and type2 conditions
            setFiltredPokemon(filtered);
            // Show a notification that filter was applied
            notify(`Filtre appliqué: ${filtered.length} Pokémon trouvés`);
            // Navigate back to home screen after applying filters with a small delay
            if (router) {
                setTimeout(() => {
                    router.push('/');
                }, 100);
            } else {
                console.log('Router not available');
            }

        }

        // Add safeguards for rendering
        if (!generations || !types) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                    <Text>Chargement des données...</Text>
                </View>
            );
        }

        return (
            <ScrollView style={{ backgroundColor: currentColors.background }}>
                <View style={{ flex: 1, alignItems: "center", marginVertical: 20, gap: 15, paddingBottom: 20 }}>
                    <View style={styles.filterGroup}>
                        <Text style={styles.filterTitle}>Générations</Text>

                        <TouchableOpacity
                            onPress={() => setIsGenPickerVisible(true)}
                            style={styles.customPicker}
                        >
                            {pokeForm.generation !== 'all' && allGens.find(g => g.key == pokeForm.generation)?.img && (
                                <Image
                                    source={allGens.find(g => g.key == pokeForm.generation).img}
                                    style={styles.generationImage}
                                    resizeMode="contain"
                                />
                            )}
                            <Text style={{ color: theme === 'dark' ? 'white' : 'black', fontSize: 16 }}>
                                {pokeForm.generation === 'all' ? 'Toutes les générations' : `Génération ${pokeForm.generation}`}
                            </Text>
                            {pokeForm.generation !== 'all' && (
                                <ResetCrossBox onReset={() => handleChange('generation', 'all')} element={'generation'} />
                            )}
                        </TouchableOpacity>

                    </View>

                    {/* Type pickers – same visual system as types.js */}
                    <View style={{ flexDirection: 'row', width: '90%', gap: 10 }}>
                        {/* Type 1 */}
                        <View style={styles.typePickerContainer}>
                            <Text style={[styles.filterTitle, { textAlign: 'center', marginBottom: 6 }]}>Type 1</Text>
                            <TouchableOpacity
                                style={styles.customPicker}
                                onPress={() => openTypePicker('type1')}
                            >
                                {pokeForm.type1 !== 'all' && (
                                    <Image
                                        source={{ uri: types.find(t => t.name?.fr === pokeForm.type1)?.sprites }}
                                        style={styles.typeImage}
                                    />
                                )}
                                <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>
                                    {pokeForm.type1 === 'all' ? 'Tous les types' : pokeForm.type1}
                                </Text>
                                {pokeForm.type1 !== 'all' && (
                                    <ResetCrossBox onReset={() => handleChange('type1', 'all')} element={'type1'} />
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Type 2 – affiché seulement si type1 est sélectionné */}
                        {pokeForm.type1 !== 'all' && (
                            <View style={styles.typePickerContainer}>
                                <Text style={[styles.filterTitle, { textAlign: 'center', marginBottom: 6 }]}>Type 2</Text>
                                <TouchableOpacity
                                    style={[styles.customPicker, { flex: 1 }]}
                                    onPress={() => openTypePicker('type2')}
                                >
                                    {pokeForm.type2 !== 'all' && pokeForm.type2 !== 'none' && (
                                        <Image
                                            source={{ uri: types.find(t => t.name?.fr === pokeForm.type2)?.sprites }}
                                            style={styles.typeImage}
                                        />
                                    )}
                                    <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>
                                        {pokeForm.type2 === 'all' ? 'Tous les types'
                                            : pokeForm.type2 === 'none' ? 'Pas de 2e type'
                                                : pokeForm.type2}
                                    </Text>
                                    {pokeForm.type2 !== 'all' && (
                                        <ResetCrossBox onReset={() => handleChange('type2', 'all')} element={'type2'} />
                                    )}
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    <View style={styles.filterGroup}>
                        <Text style={styles.filterTitle}>HP</Text>
                        <View style={styles.filterViewContent}>
                            {/* Bouton qui ouvre le modal de sélection du comparateur */}
                            <CustomPickerSymbols
                                style={[styles.filterPicker, styles.signButton, theme === 'dark' ? { color: 'white' } : { color: 'black' }]}
                                options={signOptions}
                                selectedValue={pokeForm.hpSign}
                                onSelect={(value) => handleChange('hpSign', value)}
                                title="Choix condition HP"
                            >
                                <Text style={[styles.signButtonText, { color: theme === 'dark' ? 'white' : 'black' }]}>
                                    {signOptions.find(o => o.value === pokeForm.hpSign)?.label ?? '>'}
                                </Text>
                            </CustomPickerSymbols>
                            <TextInput selectionColor={theme === 'dark' ? 'white' : 'black'} inputMode="numeric" style={styles.filterTextInput}
                                value={pokeForm.hpNbr?.toString() || ''}
                                onChangeText={(value) => { handleChange('hpNbr', value); }}
                                placeholder="0" placeholderTextColor={theme === 'dark' ? 'white' : 'black'}
                            />
                        </View>
                    </View>
                    <View style={styles.filterGroup}>
                        <Text style={styles.filterTitle}>Attaque</Text>
                        <View style={styles.filterViewContent}>
                            <CustomPickerSymbols
                                style={[styles.filterPicker, styles.signButton]}
                                options={signOptions}
                                selectedValue={pokeForm.attSign}
                                onSelect={(value) => handleChange('attSign', value)}
                                title="Choix condition Attaque"
                            >
                                <Text style={[styles.signButtonText, { color: theme === 'dark' ? 'white' : 'black' }]}>
                                    {signOptions.find(o => o.value === pokeForm.attSign)?.label ?? '>'}
                                </Text>
                            </CustomPickerSymbols>
                            <TextInput selectionColor={theme === 'dark' ? 'white' : 'black'} inputMode="numeric" style={styles.filterTextInput}
                                value={pokeForm.attNbr?.toString() || ''}
                                onChangeText={(value) => {
                                    handleChange('attNbr', value);
                                }}
                                placeholder="0" placeholderTextColor={theme === 'dark' ? 'white' : 'black'}
                            />
                        </View>
                    </View>
                    <View style={styles.filterGroup} >
                        <Text style={styles.filterTitle}>Defense</Text>
                        <View style={styles.filterViewContent}>
                            <CustomPickerSymbols
                                style={[styles.filterPicker, styles.signButton]}
                                options={signOptions}
                                selectedValue={pokeForm.defSign}
                                onSelect={(value) => handleChange('defSign', value)}
                                title="Choix condition Défense"
                            >
                                <Text style={[styles.signButtonText, { color: theme === 'dark' ? 'white' : 'black' }]}>
                                    {signOptions.find(o => o.value === pokeForm.defSign)?.label ?? '>'}
                                </Text>
                            </CustomPickerSymbols>
                            <TextInput selectionColor={theme === 'dark' ? 'white' : 'black'} inputMode="numeric" style={styles.filterTextInput}
                                value={pokeForm.defNbr?.toString() || ''}
                                onChangeText={(value) => {
                                    handleChange('defNbr', value);
                                }}
                                placeholder="0" placeholderTextColor={theme === 'dark' ? 'white' : 'black'}
                            />
                        </View>
                    </View>
                    <View style={styles.filterGroup}>
                        <Text style={styles.filterTitle}>Attaque Speciale</Text>
                        <View style={styles.filterViewContent}>
                            <CustomPickerSymbols
                                style={[styles.filterPicker, styles.signButton]}
                                options={signOptions}
                                selectedValue={pokeForm.attSpeSign}
                                onSelect={(value) => handleChange('attSpeSign', value)}
                                title="Choix condition Attaque Spéciale"
                            >
                                <Text style={[styles.signButtonText, { color: theme === 'dark' ? 'white' : 'black' }]}>
                                    {signOptions.find(o => o.value === pokeForm.attSpeSign)?.label ?? '>'}
                                </Text>
                            </CustomPickerSymbols>
                            <TextInput selectionColor={theme === 'dark' ? 'white' : 'black'} inputMode="numeric" style={styles.filterTextInput}
                                value={pokeForm.attSpeNbr?.toString() || ''}
                                onChangeText={(value) => {
                                    handleChange('attSpeNbr', value);
                                }}
                                placeholder="0" placeholderTextColor={theme === 'dark' ? 'white' : 'black'}
                            />
                        </View>
                    </View>
                    <View style={styles.filterGroup}>
                        <Text style={styles.filterTitle}>Defense Speciale</Text>
                        <View style={styles.filterViewContent}>
                            <CustomPickerSymbols
                                style={[styles.filterPicker, styles.signButton]}
                                options={signOptions}
                                selectedValue={pokeForm.defSpeSign}
                                onSelect={(value) => handleChange('defSpeSign', value)}
                                title="Choix condition Défense Spéciale"
                            >
                                <Text style={[styles.signButtonText, { color: theme === 'dark' ? 'white' : 'black' }]}>
                                    {signOptions.find(o => o.value === pokeForm.defSpeSign)?.label ?? '>'}
                                </Text>
                            </CustomPickerSymbols>
                            <TextInput selectionColor={'black'} inputMode="numeric" style={styles.filterTextInput}
                                value={pokeForm.defSpeNbr?.toString() || ''}
                                onChangeText={(value) => {
                                    handleChange('defSpeNbr', value);
                                }}
                                placeholder="0" placeholderTextColor={theme === 'dark' ? 'white' : 'black'}
                            />
                        </View>
                    </View>
                    <View style={styles.filterGroup}>
                        <Text style={styles.filterTitle}>Vitesse</Text>
                        <View style={styles.filterViewContent}>
                            <CustomPickerSymbols
                                style={[styles.filterPicker, styles.signButton]}
                                options={signOptions}
                                selectedValue={pokeForm.speedSign}
                                onSelect={(value) => handleChange('speedSign', value)}
                                title="Choix condition Vitesse"
                            >
                                <Text style={[styles.signButtonText, { color: theme === 'dark' ? 'white' : 'black' }]}>
                                    {signOptions.find(o => o.value === pokeForm.speedSign)?.label ?? '>'}
                                </Text>
                            </CustomPickerSymbols>
                            <TextInput selectionColor={'black'} inputMode="numeric" style={styles.filterTextInput}
                                value={pokeForm.speedNbr?.toString() || ''}
                                onChangeText={(value) => {
                                    handleChange('speedNbr', value);
                                }}
                                placeholder="0" placeholderTextColor={theme === 'dark' ? 'white' : 'black'}
                            />
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonStyle}>
                            <Button onPress={() => {
                                handlesubmit();
                            }} color="#CC0000" title="Go !" />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonStyle}>
                            <Button color={"blue"} title="Reinitialiser le filtre" onPress={() => {
                                handleReset();
                            }} />
                        </View>
                    </View>
                </View>
                <CustomImagePickerModale
                    visible={isGenPickerVisible}
                    options={[...allGens]}
                    selectedValue={pokeForm.generation}
                    onSelect={(selectedGen) => { handleChange('generation', selectedGen); }}
                    onClose={() => setIsGenPickerVisible(false)}
                    title="Sélectionner une génération" />

                {/* Modal partagé pour type1 et type2 */}
                <CustomImagePickerModale
                    visible={isTypePickerVisible}
                    options={[
                        { name: 'Tous les types', img: null, key: 'all' },
                        ...(typePickerKey === 'type2' ? [{ name: 'Pas de 2e type', img: null, key: 'none' }] : []),
                        ...types.map(type => ({ name: type.name?.fr, img: { uri: type.sprites }, key: type.name?.fr })),
                    ]}
                    selectedValue={typePickerKey ? pokeForm[typePickerKey] : null}
                    onSelect={(selectedType) => {
                        if (typePickerKey) handleChange(typePickerKey, selectedType);
                    }}
                    onClose={() => setIsTypePickerVisible(false)}
                    title="Sélectionner un type" />

            </ScrollView>
        );

    } catch (error) {
        handleError(error);
        return null;
    }

}

const styles = StyleSheet.create({
    buttonContainer: {
        width: "100%",
    },
    buttonStyle: {
        margin: 16,
    },
    filterGroup: {
        width: '90%'
    },
    typePickerContainer: {
        flex: 1,

    },
    generationImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginBottom: 4,
    },
    typeImage: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginBottom: 4,
    },
    filterTitle: {
        fontWeight: 'bold'
    },
    filterViewContent: {
        borderWidth: 2,
        borderColor: '#cacaca',
        borderRadius: 10,

        flexDirection: 'row',

    },
    filterPicker: {
        width: "30%"
    },
    signButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        borderRightColor: "#cacaca",
        borderRightWidth: 2,
    },
    signButtonText: {
        fontSize: 20,
    },
    filterTextInput: {
        flex: 1,
        paddingHorizontal: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    customPicker: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        borderColor: '#cacaca',
        borderWidth: 2,
        borderRadius: 10,
        marginVertical: 5,
    },
}
);