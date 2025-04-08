import { Ionicons } from "@expo/vector-icons";
import { Text, View, Pressable } from "react-native";
import { useState } from "react";
import TrainerEditForm from "../componants/TrainerEditForm";

export default function Trainer() {
    const [isEditing, setIsEditing] = useState(false);

    if (isEditing) {
        return <TrainerEditForm onCancel={() => setIsEditing(false)} />;
    }

    return (
        <View style={{ flex: 1 }}>
            <Text>Target Trainer Component</Text>

            <Pressable
                onPress={() => setIsEditing(true)}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    margin: 10,
                }}
            >
                <Ionicons name="person-circle" size={70} color={'#CC0000'} />
            </Pressable>
        </View>
    );
}
