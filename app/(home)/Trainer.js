import { FontAwesome, FontAwesome5, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Text, View, Pressable, Image } from "react-native";
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
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Fiche Dresseur</Text>

            {/* Affichage des informations du dresseur */}
            <View style={{ flex: 1 }}>
                {trainer.firstName ? (

                    <View style={{ marginBottom: 12, borderWidth: 2, borderColor: 'gray', padding: 10, borderRadius: 5 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 15, textAlign: 'center' }}>{trainer.firstName}</Text>
                        <View>
                            <Image
                                source={profileImages[trainer.profilePic]}
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 50,
                                    marginBottom: 12,
                                    alignSelf: 'center',
                                }}
                            />
                        </View>
                        <View style={{ margin: 5 }}>
                            {/* Ligne 1 - Icône Âge */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, width: '100%' }}>
                                {/* Icône */}
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <FontAwesome style={{ fontSize: 14, marginRight: 10 }} name="birthday-cake" />
                                </View>

                                {/* Titre */}
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14 }}>Âge</Text>
                                </View>

                                {/* Donnée */}
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14 }}>{trainer.age}</Text>
                                </View>
                            </View>

                            {/* Ligne 2 - Icône Genre */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, width: '100%' }}>
                                {/* Icône */}
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <FontAwesome5 style={{ fontSize: 14, marginRight: 10 }} name="genderless" />
                                </View>

                                {/* Titre */}
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14 }}>Genre</Text>
                                </View>

                                {/* Donnée */}
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14 }}>{trainer.genre}</Text>
                                </View>
                            </View>

                            {/* Ligne 3 - Icône Région */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, width: '100%' }}>
                                {/* Icône */}
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <FontAwesome6 style={{ fontSize: 14, marginRight: 10 }} name="location-dot" />
                                </View>

                                {/* Titre */}
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14 }}>Région</Text>
                                </View>

                                {/* Donnée */}
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14 }}>{trainer.region}</Text>
                                </View>
                            </View>

                            {/* Ligne 4 - Icône Ville */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, width: '100%' }}>
                                {/* Icône */}
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <FontAwesome6 style={{ fontSize: 14, marginRight: 10 }} name="house-chimney" />
                                </View>

                                {/* Titre */}
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14 }}>Ville</Text>
                                </View>

                                {/* Donnée */}
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14 }}>{trainer.city}</Text>
                                </View>
                            </View>
                        </View>




                        {selectedType && (
                            <View style={{
                                alignItems: 'center', // aligne à gauche
                                margin: 5,
                            }}>
                                <Text style={{ fontSize: 14, margin: 5 }}>Type de prédilection</Text>

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




                    </View>
                ) : (
                    <Text>Aucun dresseur enregistré pour le moment.</Text>
                )}
            </View>

            {/* Bouton pour éditer */}
            <Pressable
                onPress={() => setIsEditing(true)}
                style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                }}
            >
                <Ionicons name="person-circle" size={70} color={'#CC0000'} />
            </Pressable>
        </View>
    );
}