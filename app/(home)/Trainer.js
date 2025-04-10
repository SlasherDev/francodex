import { Ionicons } from "@expo/vector-icons";
import { Text, View, Pressable, Image } from "react-native";
import { useContext, useEffect, useState } from "react";
import TrainerEditForm from "../componants/TrainerEditForm";
import { useStorage } from "../../utils";
import context from "../../context";

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
                    <View style={{ flexDirection: 'row', marginBottom: 12, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 }}>
                        <View style={{ flex: 1, }}>
                            <Text style={{ fontSize: 14 }}>Prénom: {trainer.firstName}</Text>
                            <Text style={{ fontSize: 14 }}>Âge: {trainer.age}</Text>
                            <Text style={{ fontSize: 14 }}>Genre: {trainer.genre}</Text>
                            <Text style={{ fontSize: 14 }}>Région: {trainer.region}</Text>
                            <Text style={{ fontSize: 14 }}>Ville: {trainer.city}</Text>
                            
                        </View>
                        {selectedType && (
                            <View style={{
                                alignItems: 'center', // aligne à gauche
                                justifyContent: 'flex-start', // positionne en haut
                                margin:5,
                            }}>
                                <Text style={{ fontSize: 16, margin:5 }}>Type de prédilection</Text>

                                <Image
                                    source={{ uri: selectedType.sprites }}
                                    style={{
                                        borderRadius: 50,
                                        width: 50,
                                        height: 50,
                                        margin:5,
                                    }}
                                />

                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
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