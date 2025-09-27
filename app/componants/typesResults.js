import { Image, StyleSheet, Text, View } from "react-native";



export default function TypesResult({ typeResult, types }) {

    return (
        <View style={{paddingBottom: 200, gap:10}} >
            {/* Double Faiblesse x4 */}
            {typeResult.resistances.some((resiste) => resiste.multiplier === 4) && (
                <View>
                    <View style={styles.table}>
                        <Text style={styles.subTitle}>Double Faiblesse x4</Text>
                        {typeResult.resistances
                            .filter((resiste) => resiste.multiplier === 4)
                            .reduce((rows, resiste, index) => {
                                const typeCorrespondant = types.find((t) => t.name.fr === resiste.name);
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
            {typeResult.resistances.some((resiste) => resiste.multiplier === 2) && (
                <View>
                    <View style={styles.table}>
                        <Text style={styles.subTitle}>Faiblesse x2</Text>
                        {typeResult.resistances
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
            {typeResult.resistances.some((resiste) => resiste.multiplier === 1) && (
                <View>
                    <View style={styles.table}>
                        <Text style={styles.subTitle}>Neutre x1</Text>
                        {typeResult.resistances
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
            {typeResult.resistances.some((resiste) => resiste.multiplier === 0.5) && (
                <View>
                    <View style={styles.table}>
                        <Text style={styles.subTitle}>Résistance x1/2</Text>
                        {typeResult.resistances
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
            {typeResult.resistances.some((resiste) => resiste.multiplier === 0.25) && (
                <View>
                    <View style={styles.table}>
                        <Text style={styles.subTitle}>Double Résistance x1/4</Text>
                        {typeResult.resistances
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
            {typeResult.resistances.some((resiste) => resiste.multiplier === 0) && (
                <View>
                    <View style={styles.table}>
                        <Text style={styles.subTitle}>Immunité x0</Text>
                        {typeResult.resistances
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
    );
}

const styles = StyleSheet.create({

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
        margin : 5
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
