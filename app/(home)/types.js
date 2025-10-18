import { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import TypesResult from "../componants/typesResults";
import CustomImagePickerModale from "../componants/customImagePicker";
import { useTheme } from "../../ThemeContext";

export default function Types() {
    const { theme } = useTheme();
    const [types, setTypes] = useState([]);
    const [typeForm, setTypeForm] = useState({ type1: "none", type2: "none" });
    const [typeResult, setTypeResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [pickerKey, setPickerKey] = useState(null); // "type1" ou "type2"

    function strNoAccent(a) {
        return a.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    useEffect(() => {
        fetch("https://tyradex.vercel.app/api/v1/types")
            .then(res => res.json())
            .then(data => setTypes(data))
            .catch(console.error);
    }, []);

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

    const renderResults = () => {
        if (loading) return <Text style={styles.loadingText}>Chargement...</Text>;
        if (!typeResult || (Array.isArray(typeResult) && typeResult.length === 0))
            return <Text style={styles.infoText}>Sélectionnez au moins un type pour voir ses faiblesses</Text>;

        if (Array.isArray(typeResult.name?.fr)) {
            return (
                <View>
                    <View style={styles.resultsContainer}>
                        {typeResult.name.fr.map((name, index) => {
                            let sprite = null;
                            if (typeResult.sprites) {
                                sprite = Array.isArray(typeResult.sprites)
                                    ? typeResult.sprites[index]
                                    : typeResult.sprites;
                            }

                            const typeData = { name: { fr: name }, sprites: sprite };
                        })}
                    </View>
                    {typeResult.resistances && <ScrollView><TypesResult typeResult={typeResult} types={types} /></ScrollView>}
                </View>
            );
        }

        return (
            <View>
                <View style={styles.resultsContainer}></View>
                {typeResult.resistances && <ScrollView><TypesResult typeResult={typeResult} types={types} /></ScrollView>}
            </View>
        );
    };

    const openPicker = (key) => {
        setPickerKey(key);
        setIsPickerVisible(true);
    };

    return (
        <View style={styles.container}>

            {/* Picker Type 1 */}
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>Type 1</Text>
                    <TouchableOpacity
                        style={[styles.customPicker, { backgroundColor: theme === 'dark' ? 'pink' : 'lightgray'}]}
                        onPress={() => openPicker("type1")}
                    >
                        {typeForm.type1 !== "none" &&(
                                <Image
                                    source={types.find(t => t.name.fr === typeForm.type1)?.sprites ? { uri: types.find(t => t.name.fr === typeForm.type1).sprites } : null}
                                    style={styles.typeImage}
                                />
                            )}
                        <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>
                            {typeForm.type1 === "none" ? 'Choisir le premier type' : typeForm.type1}
                        </Text>
                        
                    </TouchableOpacity>
                </View>

                {/* Picker Type 2 */}
                {typeForm.type1 !== "none" && (
                    <View style={styles.pickerContainer}>
                        <Text style={styles.pickerLabel}>Type 2</Text>
                        <TouchableOpacity
                            style={[styles.customPicker, { backgroundColor: theme === 'dark' ? 'pink' : 'lightgray' }]}
                            onPress={() => openPicker("type2")}
                        >
                            {typeForm.type2 !== "none" &&(
                                <Image
                                    source={types.find(t => t.name.fr === typeForm.type2)?.sprites ? { uri: types.find(t => t.name.fr === typeForm.type2).sprites } : null}
                                    style={styles.typeImage}
                                />
                            )}
                            <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>
                                {typeForm.type2 === "none" ? 'Choisir le second type' : typeForm.type2}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* Résultats */}
            {renderResults()}

            {/* Modal Picker commun */}
            <CustomImagePickerModale
                visible={isPickerVisible}
                options={[
                    { name: "Aucun (none)", img: null, key: "none" },
                    ...types.map(type => ({ name: type.name.fr, img: { uri: type.sprites }, key: type.name.fr })),
                ]}
                selectedValue={pickerKey ? typeForm[pickerKey] : null}
                onSelect={(selectedType) => {
                    if (pickerKey) handleChange(pickerKey, selectedType);
                }}
                onClose={() => setIsPickerVisible(false)}
                title="Sélectionner un type"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
    pickerContainer: { flex: 1, margin: 5 },
    pickerLabel: { fontWeight: 'bold', fontSize: 16, marginBottom: 8, textAlign: 'center' },
    customPicker: { alignItems: 'center', justifyContent: 'center', borderRadius: 10, paddingVertical:20 },
    resultsContainer: { flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' },
    typeImage: { width: 40, height: 40, borderRadius: 25 },
    loadingText: { textAlign: 'center', color: '#555', marginVertical: 16 },
    infoText: { textAlign: 'center', color: '#555', marginVertical: 16 },
});
