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
                    
                    <View style={{marginBottom: 12, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 }}>
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
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 5 }}>
  {/* Icônes */}
  <View style={{ alignItems: 'center', margin: 5 }}>
    <FontAwesome style={{ fontSize: 14, margin: 5 }} name="birthday-cake" />
    <FontAwesome5 style={{ fontSize: 14, margin: 5 }} name="genderless" />
    <FontAwesome6 style={{ fontSize: 14, margin: 5 }} name="location-dot" />
    <FontAwesome6 style={{ fontSize: 14, margin: 5 }} name="house-chimney" />
  </View>

  {/* Titres */}
  <View style={{ alignItems: 'center', justifyContent: 'center', margin: 5 }}>
    <Text style={{ fontSize: 14, margin: 5 }}>Âge</Text>
    <Text style={{ fontSize: 14, margin: 5 }}>Genre</Text>
    <Text style={{ fontSize: 14, margin: 5 }}>Région</Text>
    <Text style={{ fontSize: 14, margin: 5 }}>Ville</Text>
  </View>

  {/* Valeurs */}
  <View style={{ alignItems: 'center', justifyContent: 'center', margin: 5 }}>
    <Text style={{ fontSize: 14, margin: 5 }}>{trainer.age}</Text>
    <Text style={{ fontSize: 14, margin: 5 }}>{trainer.genre}</Text>
    <Text style={{ fontSize: 14, margin: 5 }}>{trainer.region}</Text>
    <Text style={{ fontSize: 14, margin: 5 }}>{trainer.city}</Text>
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