import { FontAwesome, FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, Pressable, Image, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import TrainerEditForm from "../componants/TrainerEditForm";
import { useStorage } from "../../utils";
import context from "../../context";
import profileImages from '../utils/imageMapper';


export default function Trainer() {
    const [isEditing, setIsEditing] = useState(false);

    const { trainer } = useContext(context);

    const [types, setTypes] = useState([]);
    useEffect(() => {
        fetch("https://tyradex.vercel.app/api/v1/types")
            .then(res => res.json())
            .then(data => setTypes(data))
            .catch(console.error)
    }, [])

    const selectedType = types.find(t => t.name.fr === trainer.type);

    if (isEditing) {
        return <TrainerEditForm onCancel={() => setIsEditing(false)} />;
    }

    return (
        <View style={{ flex: 1, padding: 16 }}>
            
            {/* Affichage des informations du dresseur */}
            <View style={{ flex: 1 }}>
                {trainer.firstName ? (

                    <View style={{ justifyContent: 'space-between', borderWidth: 2, borderColor: 'gray', borderRadius: 5 }}>
                        <ScrollView>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 15, textAlign: 'center' }}>{trainer.firstName}</Text>
                            {trainer.profilePic && profileImages[trainer.profilePic] ? (
                                <Image
                                    source={profileImages[trainer.profilePic]}
                                    style={{
                                        width: 150,
                                        height: 150,
                                        borderRadius: 150,
                                        marginBottom: 12,
                                        alignSelf: 'center',
                                    }}
                                />
                            ) : null}
                            <View style={{ margin: 5 }}>
                                {trainer.age ? (
                                    /// Ligne 1 - Icône Age
                                    <View style={styles.container}>
                                        {/* Icône */}
                                        <View style={styles.element}>
                                            <FontAwesome style={styles.icon} name="birthday-cake" />
                                        </View>

                                        {/* Titre */}
                                        <View style={styles.element}>
                                            <Text style={styles.label}>Âge</Text>
                                        </View>

                                        {/* Donnée */}
                                        <View style={styles.element}>
                                            <Text style={styles.value}>{trainer.age}</Text>
                                        </View>
                                    </View>
                                ) : null}

                                {trainer.genre ? (
                                    /// Ligne 2 - Icône Genre
                                    <View style={styles.container}>
                                        {/* Icône */}
                                        <View style={styles.element}>
                                            <FontAwesome5 style={styles.icon} name="genderless" />
                                        </View>

                                        {/* Titre */}
                                        <View style={styles.element}>
                                            <Text style={styles.label}>Genre</Text>
                                        </View>

                                        {/* Donnée */}
                                        <View style={styles.element}>
                                            <Text style={styles.value}>{trainer.genre}</Text>
                                        </View>
                                    </View>
                                ) : null}

                                {trainer.region ? (
                                    /// Ligne 3 - Icône Ville
                                    <View style={styles.container}>
                                        {/* Icône */}
                                        <View style={styles.element}>
                                            <FontAwesome6 style={styles.icon} name="location-dot" />
                                        </View>

                                        {/* Titre */}
                                        <View style={styles.element}>
                                            <Text style={styles.label}>Région</Text>
                                        </View>

                                        {/* Donnée */}
                                        <View style={styles.element}>
                                            <Text style={styles.value}>{trainer.region}</Text>
                                        </View>
                                    </View>
                                ) : null}
                                {trainer.city ? (
                                    // Ligne 4 - Icône Ville
                                    <View style={styles.container}>
                                        {/* Icône */}
                                        <View style={styles.element}>
                                            <FontAwesome6 style={styles.icon} name="house-chimney" />
                                        </View>

                                        {/* Titre */}
                                        <View style={styles.element}>
                                            <Text style={styles.label}>Ville</Text>
                                        </View>

                                        {/* Donnée */}
                                        <View style={styles.element}>
                                            <Text style={styles.value} >{trainer.city}</Text>
                                        </View>
                                    </View>
                                ) : null}
                            </View>




                            {selectedType && (
                                <View style={{
                                    alignItems: 'center', // aligne à gauche
                                    margin: 5,
                                }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 14, margin: 5 }}>Type de prédilection</Text>

                                    <Image
                                        source={{ uri: selectedType.sprites }}
                                        style={{
                                            borderRadius: 50,
                                            width: 50,
                                            height: 50,
                                            margin: 5,
                                        }}
                                    />

                                    <Text style={{ margin: 5, fontSize: 14, fontWeight: 'bold' }}>
                                        {selectedType.name.fr}
                                    </Text>
                                </View>
                            )}

                            {trainer.devise ? (
                                <View style={{ margin: 5, alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 14, margin: 5 }}>Devise</Text>
                                    <Text style={{ margin: 5, fontSize: 14, textAlign: 'center' }}>"{trainer.devise}"</Text>
                                </View>
                            ) : null}



                        </ScrollView>
                    </View>
                ) : setIsEditing(true)}
            </View>

            {/* Bouton pour éditer */}
            <Pressable
                onPress={() => setIsEditing(true)}
                style={{
                    position: 'absolute',
                    bottom: 60,
                    right: 10,
                    width: 60,
                    height: 60,
                    borderRadius: 35,
                    backgroundColor: '#CC0000',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <MaterialCommunityIcons name="account-edit" size={45} color={'white'}  />
            </Pressable>
        </View>
    );
}


const styles = {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    element: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
    },
}