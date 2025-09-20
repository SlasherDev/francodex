import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import TypesResult from "../componants/typesResults";

export default function Types() {
    const [types, setTypes] = useState([]);
    const [typeForm, setTypeForm] = useState({ type1: "none", type2: "none" });
    const [typeResult, setTypeResult] = useState(null);
    const [loading, setLoading] = useState(false);

    function strNoAccent(a) {
        return a.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    // Récupération des types au chargement
    useEffect(() => {
        fetch("https://tyradex.vercel.app/api/v1/types")
            .then(res => res.json())
            .then(data => setTypes(data))
            .catch(console.error);
    }, []);

    // Mise à jour du résultat quand on change le formulaire
    useEffect(() => {
        if (typeForm.type1 !== "none") {
            setLoading(true);
            let url = "https://tyradex.app/api/v1/types/" + strNoAccent(typeForm.type1.toLowerCase());
            if (typeForm.type2 !== "none") {
                url += "/" + strNoAccent(typeForm.type2.toLowerCase());
            }

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    setTypeResult(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error(error);
                    setTypeResult(null);
                    setLoading(false);
                });
        } else {
            setTypeResult(null);
            setLoading(false);
        }
    }, [typeForm]);

    const handleChange = (key, value) => {
        setTypeForm(prev => ({ ...prev, [key]: value }));
    };

    const renderTypeCard = (type, index) => (
        <View key={index} style={styles.typeCard}>
            {type.sprites && (
                <Image
                    source={{ uri: type.sprites.regular || type.sprites }}
                    style={styles.typeImage}
                    resizeMode="contain"
                />
            )}
            <Text style={styles.typeName}>
                {type.name?.fr || type.name || 'Nom non disponible'}
            </Text>
        </View>
    );

    const renderResults = () => {
        if (loading) {
            return <Text style={styles.loadingText}>Chargement...</Text>;
        }

        if (!typeResult || (Array.isArray(typeResult) && typeResult.length === 0)) {
            return <Text style={styles.infoText}>Sélectionnez un type pour voir les résultats</Text>;
        }

        // Cas où typeResult est un tableau
        if (Array.isArray(typeResult.name?.fr)) {
    return (
        <View>
            {/* Cartes de types */}
            <View style={styles.resultsContainer}>
                {typeResult.name.fr.map((name, index) => {
                    let sprite = null;
                    if (typeResult.sprites) {
                        sprite = Array.isArray(typeResult.sprites)
                            ? typeResult.sprites[index]
                            : typeResult.sprites;
                    }

                    const typeData = {
                        name: { fr: name },
                        sprites: sprite
                    };
                    return renderTypeCard(typeData, index);
                })}
            </View>

            {/* Résistances combinées */}
            {typeResult.resistances && (
                <TypesResult typeResult={typeResult} types={types} />
            )}
        </View>
    );
}

        // Cas d'un objet unique (type simple ou combinaison)
        return (
            <View>
                <View style={styles.resultsContainer}>
                    {renderTypeCard(typeResult, 0)}
                </View>

                {/* Résistances dans un bloc séparé */}
                {typeResult.resistances && (
                    <TypesResult typeResult={typeResult} types={types} />
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Picker Type 1 */}
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Type 1</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={typeForm.type1}
                    onValueChange={value => handleChange("type1", value)}
                >
                    <Picker.Item label="Sélectionner le type" value="none" />
                    {types.map((type, index) => (
                        <Picker.Item key={index} label={type.name.fr} value={type.name.fr} />
                    ))}
                </Picker>
            </View>

            {/* Picker Type 2 */}
            {typeForm.type1 !== "none" && (
                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>Type 2</Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={typeForm.type2}
                        onValueChange={value => handleChange("type2", value)}
                    >
                        <Picker.Item label="Sélectionner le second type" value="none" />
                        {types.map((type, index) => (
                            <Picker.Item key={index} label={type.name.fr} value={type.name.fr} />
                        ))}
                    </Picker>
                </View>
            )}

            {/* Résultats */}
            <ScrollView>
                {renderResults()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingBottom: 25
    },
    pickerContainer: {
        marginBottom: 16,
    },
    pickerLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
    },
    picker: {},
    resultsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    typeCard: {
        alignItems: 'center',
        minWidth: 120,
        margin: 8,
    },
    typeImage: {
        width: 25,
        height: 25,
        borderRadius: 15,
        marginBottom: 4,
    },
    typeName: {
        fontSize: 14,
        textAlign: 'center',
    },
    loadingText: {
        textAlign: 'center',
        color: '#555',
        marginVertical: 16,
    },
    infoText: {
        textAlign: 'center',
        color: '#555',
        marginVertical: 16,
    },
});
