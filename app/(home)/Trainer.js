import { Ionicons } from "@expo/vector-icons";
import { Text, View, Pressable } from "react-native";
import { useContext, useEffect, useState } from "react";
import TrainerEditForm from "../componants/TrainerEditForm";
import { useStorage } from "../../utils";
import context from "../../context";

export default function Trainer() {
    const [isEditing, setIsEditing] = useState(false);

    const { trainer } = useContext(context);    

    if (isEditing) {
        return <TrainerEditForm onCancel={() => setIsEditing(false)} />;
    }

    return (
        <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Fiche Dresseur</Text>

        {/* Affichage des informations du dresseur */}
        {trainer.firstName ? (
            <View style={{ marginBottom: 12, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 }}>
                <Text>Prénom: {trainer.firstName}</Text>
                <Text>Âge: {trainer.age}</Text>
                <Text>Genre: {trainer.genre}</Text>
                <Text>Région: {trainer.region}</Text>
                <Text>Ville: {trainer.city}</Text>
            </View>
        ) : (
            <Text>Aucun dresseur enregistré pour le moment.</Text>
        )}

        {/* Bouton pour éditer */}
        <Pressable
            onPress={() => setIsEditing(true)}
            style={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                margin: 10,
            }}
        >
            <Ionicons name="person-circle" size={70} color={'#CC0000'} />
        </Pressable>
    </View>
    );
}