import React, { useContext, useState, useEffect } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import context from "../../context";
import { useRouter } from "expo-router";
import { notify } from "../../utils";
import { Picker } from "@react-native-picker/picker";

export default function Filter() {
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
            filterTitle: {
                fontWeight: 'bold'
            },
            filterViewContent: {
                alignItems: "center",
                flexDirection: 'row',
                gap: 5
            },
            filterPicker: {
                width: "30%"
            },
            filterTextInput: {
                width: '70%',
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: 'white',
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5
            }
        }
        );
        const router = useRouter();
        const contextValue = useContext(context);

        // Add safeguard for context values
        if (!contextValue) {
            console.warn('Context not available in Filter component');
            return null;
        }

        const { filtredPokemon, setFiltredPokemon } = contextValue;

        //filter
        const [pokeForm, setpokeForm] = useState({
            generation: 'all',
            type1: 'all', type2: 'all',
            hpSign: 'max', hpNbr: '',
            attSign: 'max', attNbr: '',
            defSign: 'max', defNbr: '',
            attSpeSign: 'max', attSpeNbr: '',
            defSpeSign: 'max', defSpeNbr: '',
            speedSign: 'max', speedNbr: ''
        })

        // Log state changes
        useEffect(() => {
        }, [pokeForm]);

        // Create updated form with proper type conversions only when needed for filtering
        const updatedPokeForm = { ...pokeForm };




        const [pokemons, setPokemons] = useState([])
        useEffect(() => {
            fetch('https://tyradex.vercel.app/api/v1/pokemon')
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
                })
        }, [])

        const [types, setTypes] = useState([]);
        useEffect(() => {
            fetch("https://tyradex.vercel.app/api/v1/types")
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    if (Array.isArray(data)) {
                        const typeNames = data.map(type => type.name?.fr || type.name);
                        setTypes(typeNames);
                    }
                })
                .catch(error => {
                    console.error('Error fetching types data:', error);
                    notify('Erreur lors du chargement des types');
                })
        }, [])

        const [generations, setGenerations] = useState([])
        useEffect(() => {
            fetch("https://tyradex.vercel.app/api/v1/gen")
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
                })
        }, [])

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

            // Filter by type2 if selected
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
            <ScrollView>
                <View style={{ flex: 1, alignItems: "center", marginVertical: 20, gap: 15, paddingBottom: 20 }}>
                    <View style={styles.filterGroup}>
                        <Text style={styles.filterTitle}>Générations</Text>



                        <Picker
                            selectedValue={pokeForm.generation}
                            onValueChange={(value) => {
                                handleChange('generation', value);
                            }}>
                            <Picker.Item label="Toutes les générations" value="all" />
                            {generations.map((genNbr, index) => (
                                <Picker.Item
                                    key={index}
                                    label={`Génération ${genNbr}`}
                                    value={genNbr}
                                />
                            ))}
                        </Picker>
                    </View>

                    <View style={styles.filterGroup}>
                        <Text style={styles.filterTitle}>Type 1</Text>
                        <Picker
                            selectedValue={pokeForm.type1}
                            onValueChange={(value) => {
                                handleChange('type1', value);
                            }}
                        >
                            <Picker.Item label="Tout les types" value="all" />
                            {types.map((typeName, index) => (
                                <Picker.Item
                                    key={index}
                                    label={typeName}
                                    value={typeName}
                                />
                            ))}
                        </Picker>
                    </View>
                    {pokeForm.type1 !== 'all' && (
                        <View style={styles.filterGroup}>
                            <>
                                <Text style={styles.filterTitle}>Type 2</Text>
                                <Picker
                                    selectedValue={pokeForm.type2}
                                    onValueChange={(value) => {
                                        handleChange('type2', value);
                                    }}>
                                    <Picker.Item label="Tout les types" value="all" />
                                    <Picker.Item label="pas de second type" value="none" />
                                    {types.map((typeName, index) => (
                                        <Picker.Item
                                            key={index}
                                            label={typeName}
                                            value={typeName}
                                        />
                                    ))}
                                </Picker>
                            </>
                        </View>
                    )}

                    <View style={styles.filterGroup}>
                        <Text style={styles.filterTitle}>HP</Text>
                        <View style={styles.filterViewContent}>
                            <Picker
                                style={styles.filterPicker}
                                selectedValue={pokeForm.hpSign}
                                onValueChange={(value) => {
                                    handleChange('hpSign', value);
                                }}
                            >
                                <Picker.Item label=">" value="max" />
                                <Picker.Item label="<" value="min" />
                                <Picker.Item label="=" value="egal" />
                                <Picker.Item label=">=" value="egalMax" />
                                <Picker.Item label="<=" value="egalMin" />
                            </Picker>
                            <TextInput selectionColor={'black'} inputMode="numeric" style={styles.filterTextInput}
                                value={pokeForm.hpNbr?.toString() || ''}
                                onChangeText={(value) => {
                                    handleChange('hpNbr', value);
                                }}
                                placeholder="0"
                            />
                        </View>
                    </View>
                    <View style={styles.filterGroup}>
                        <Text style={styles.filterTitle}>Attaque</Text>
                        <View style={styles.filterViewContent}>
                            <Picker
                                style={styles.filterPicker}
                                selectedValue={pokeForm.attSign}
                                onValueChange={(value) => {
                                    handleChange('attSign', value);
                                }}
                            >
                                <Picker.Item label=">" value="max" />
                                <Picker.Item label="<" value="min" />
                                <Picker.Item label="=" value="egal" />
                                <Picker.Item label=">=" value="egalMax" />
                                <Picker.Item label="<=" value="egalMin" />
                            </Picker>
                            <TextInput selectionColor={'black'} inputMode="numeric" style={styles.filterTextInput}
                                value={pokeForm.attNbr?.toString() || ''}
                                onChangeText={(value) => {
                                    handleChange('attNbr', value);
                                }}
                                placeholder="0"
                            />
                        </View>
                    </View>
                    <View style={styles.filterGroup} >
                        <Text style={styles.filterTitle}>Defense</Text>
                        <View style={styles.filterViewContent}>
                            <Picker
                                style={styles.filterPicker}
                                selectedValue={pokeForm.defSign}
                                onValueChange={(value) => {
                                    handleChange('defSign', value);
                                }}
                            >
                                <Picker.Item label=">" value="max" />
                                <Picker.Item label="<" value="min" />
                                <Picker.Item label="=" value="egal" />
                                <Picker.Item label=">=" value="egalMax" />
                                <Picker.Item label="<=" value="egalMin" />
                            </Picker>
                            <TextInput selectionColor={'black'} inputMode="numeric" style={styles.filterTextInput}
                                value={pokeForm.defNbr?.toString() || ''}
                                onChangeText={(value) => {
                                    handleChange('defNbr', value);
                                }}
                                placeholder="0"
                            />
                        </View>
                    </View>
                    <View style={styles.filterGroup}>
                        <Text style={styles.filterTitle}>Attaque Speciale</Text>
                        <View style={styles.filterViewContent}>
                            <Picker
                                style={styles.filterPicker}
                                selectedValue={pokeForm.attSpeSign}
                                onValueChange={(value) => {
                                    handleChange('attSpeSign', value);
                                }}
                            >
                                <Picker.Item label=">" value="max" />
                                <Picker.Item label="<" value="min" />
                                <Picker.Item label="=" value="egal" />
                                <Picker.Item label=">=" value="egalMax" />
                                <Picker.Item label="<=" value="egalMin" />
                            </Picker>
                            <TextInput selectionColor={'black'} inputMode="numeric" style={styles.filterTextInput}
                                value={pokeForm.attSpeNbr?.toString() || ''}
                                onChangeText={(value) => {
                                    handleChange('attSpeNbr', value);
                                }}
                                placeholder="0"
                            />
                        </View>
                    </View>
                    <View style={styles.filterGroup}>
                        <Text style={styles.filterTitle}>Defense Speciale</Text>
                        <View style={styles.filterViewContent}>
                            <Picker
                                style={styles.filterPicker}
                                selectedValue={pokeForm.defSpeSign}
                                onValueChange={(value) => {
                                    handleChange('defSpeSign', value);
                                }}
                            >
                                <Picker.Item label=">" value="max" />
                                <Picker.Item label="<" value="min" />
                                <Picker.Item label="=" value="egal" />
                                <Picker.Item label=">=" value="egalMax" />
                                <Picker.Item label="<=" value="egalMin" />
                            </Picker>
                            <TextInput selectionColor={'black'} inputMode="numeric" style={styles.filterTextInput}
                                value={pokeForm.defSpeNbr?.toString() || ''}
                                onChangeText={(value) => {
                                    handleChange('defSpeNbr', value);
                                }}
                                placeholder="0"
                            />
                        </View>
                    </View>
                    <View style={styles.filterGroup}>
                        <Text style={styles.filterTitle}>Vitesse</Text>
                        <View style={styles.filterViewContent}>
                            <Picker
                                style={styles.filterPicker}
                                selectedValue={pokeForm.speedSign}
                                onValueChange={(value) => {
                                    handleChange('speedSign', value);
                                }}
                            >
                                <Picker.Item label=">" value="max" />
                                <Picker.Item label="<" value="min" />
                                <Picker.Item label="=" value="egal" />
                                <Picker.Item label=">=" value="egalMax" />
                                <Picker.Item label="<=" value="egalMin" />
                            </Picker>
                            <TextInput selectionColor={'black'} inputMode="numeric" style={styles.filterTextInput}
                                value={pokeForm.speedNbr?.toString() || ''}
                                onChangeText={(value) => {
                                    handleChange('speedNbr', value);
                                }}
                                placeholder="0" />
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
            </ScrollView>
        );
    } catch (error) {
        handleError(error);
        return null;
    }
}
