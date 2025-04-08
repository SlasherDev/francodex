import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
const { regions_with_cities } = require('../regions_pokemon.json');

export default function TrainerEditForm({ onCancel }) {
    const [trainerForm, setTrainerForm] = useState({
        firstName: '',
        age: '',
        region: '',
        genre: '',
        city: ''
    });

    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    // Récupérer les villes de la région sélectionnée
    const cities = regions_with_cities[selectedRegion] || [];

    // Fonction pour gérer le changement des champs
    const handleChange = (name, value) => {
        setTrainerForm((prev) => ({ ...prev, [name]: value }));
    };

    // Lorsque la région change, réinitialiser la ville sélectionnée
    const handleRegionChange = (region) => {
        setSelectedRegion(region);
        setTrainerForm((prev) => ({
            ...prev,
            region: region,
            city: '' // Réinitialiser la ville lorsqu'une nouvelle région est choisie
        }));
    };

    const handleSave = () => {
        console.log(trainerForm);
        //onCancel(); // Décommente si tu veux appeler la fonction d'annulation après la sauvegarde
    };

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
                <Picker.Item label={'Dresseur'} value={'Dresseur'} />
                <Picker.Item label={'Dresseuse'} value={'Dresseuse'} />
            </Picker>

            <Text>Choisir la région</Text>
            <Picker
                selectedValue={trainerForm.region}
                style={styles.picker}
                onValueChange={handleRegionChange}
            >
                {Object.keys(regions_with_cities).map((region) => (
                    <Picker.Item label={region} value={region} key={region} />
                ))}
            </Picker>

            {/* Sélectionner la ville en fonction de la région */}
            {selectedRegion && (
                <>
                    <Text>Choisir la ville</Text>
                    <Picker
                        selectedValue={trainerForm.city}
                        style={styles.picker}
                        onValueChange={(value) => handleChange('city', value)}
                    >
                        {cities.map((city, index) => (
                            <Picker.Item label={city} value={city} key={index} />
                        ))}
                    </Picker>
                </>
            )}
            <View style={styles.buttonStyle}>
            <Button color={'green'} title="Enregistrer" onPress={handleSave} />
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
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
    },
    picker: {
        
    },
    buttonContainer: {

    },
    buttonStyle: {
        margin:16, 

    },
});
