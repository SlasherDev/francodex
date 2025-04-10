import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useContext } from 'react';
import context from '../../context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { regions_with_cities } = require('../regions_pokemon.json');

export default function TrainerEditForm({ onCancel }) {
    const { trainer, setTrainer } = useContext(context);
    const [trainerForm, setTrainerForm] = useState(trainer);

    // Récupérer les villes de la région sélectionnée
    const cities = regions_with_cities[trainerForm.region] || [];

    // Fonction pour gérer le changement des champs
    const handleChange = (name, value) => {
        setTrainerForm((prev) => ({ ...prev, [name]: value }));
    };

    // Lorsque la région change, réinitialiser la ville sélectionnée
    const handleRegionChange = (region) => {
        setTrainerForm((prev) => ({
            ...prev,
            region: region,
            city: '' // Réinitialiser la ville lorsqu'une nouvelle région est choisie
        }));
    };

    const handleReset = () => {
        const defaultTrainer = {
            firstName: '',
            age: '',
            region: '',
            genre: '',
            city: '',
            type: ''
                };
        setTrainer(defaultTrainer);
        onCancel()
    }

    const handleSave = () => {
        setTrainer(trainerForm); // Sauvegarder le dresseur dans le contexte
        onCancel(); // Appeler la fonction d'annulation
    };

    const [types, setTypes] = useState([]);
    useEffect(() => {
        fetch("https://tyradex.vercel.app/api/v1/types")
            .then(res => res.json())
            .then(data => setTypes(data))
            .catch(console.error)
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modifier la fiche</Text>

            <Text>Prénom</Text>
            <TextInput
                style={styles.input}
                placeholder="Prénom du dresseur"
                value={trainerForm.firstName}
                onChangeText={(value) => handleChange('firstName', value)}
            />

            <Text>Âge</Text>
            <TextInput
                style={styles.input}
                placeholder="Âge du dresseur"
                keyboardType="numeric"
                value={trainerForm.age}
                onChangeText={(value) => handleChange('age', value)}
            />

            <Text>Genre</Text>
            <Picker
                selectedValue={trainerForm.genre}
                style={styles.picker}
                onValueChange={(value) => handleChange('genre', value)}
            >
                <Picker.Item label={'Sélectionner le genre'} value={''} />
                <Picker.Item label={'N/A'} value={'N/A'} />
                <Picker.Item label={'Dresseur'} value={'Dresseur'} />
                <Picker.Item label={'Dresseuse'} value={'Dresseuse'} />
                <Picker.Item label={'Dresseur·euse'} value={'Dresseur·euse'} />
            </Picker>

            <Text>Choisir la région</Text>
            <Picker
                selectedValue={trainerForm.region}
                style={styles.picker}
                onValueChange={handleRegionChange}
            >
                <Picker.Item label={'Sélectionner une région'} value={''} />
                {Object.keys(regions_with_cities).map((region) => (
                    <Picker.Item label={region} value={region} key={region} />
                ))}
            </Picker>

            {/* Sélectionner la ville en fonction de la région */}
            {trainerForm.region && (
                <>
                    <Text>Choisir la ville</Text>
                    <Picker
                        selectedValue={trainerForm.city}
                        style={styles.picker}
                        onValueChange={(value) => handleChange('city', value)}
                    >
                        <Picker.Item label={'Sélectionner une ville'} value={''} />
                        {cities.map((city, index) => (
                            <Picker.Item label={city} value={city} key={index} />
                        ))}
                    </Picker>
                </>
            )}

            <Text>Choisir le type de prédilection</Text>
            <Picker
                selectedValue={trainerForm.type}
                onValueChange={(value) => handleChange('type', value)}
            >
                <Picker.Item label={'Sélectionner un type'} value={''} />
                {types?.map((type) => (
  <Picker.Item label={type.name.fr} value={type.name.fr} key={type.name.fr} />
))}
            </Picker>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonStyle}>
                    <Button color={'green'} title="Enregistrer" onPress={handleSave} />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonStyle}>
                    <Button color={"blue"} title="Reinitialiser la fiche Dresseur" onPress={handleReset} />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonStyle}>
                    <Button color={"#CC0000"} title="Annuler" onPress={onCancel} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
    },
    picker: {},
    buttonContainer: {
    },
    buttonStyle: {
        margin: 16,

    },
});
