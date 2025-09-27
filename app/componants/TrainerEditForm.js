import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import context from '../../context';
import ProfilePicModal from '../componants/ProfilePicModal';
import profileImages from '../utils/imageMapper';
const { regions_with_cities } = require('../regions_pokemon.json');

export default function TrainerEditForm({ onCancel }) {
    const { trainer, setTrainer } = useContext(context);
    const [trainerForm, setTrainerForm] = useState(trainer);
    const [modalVisible, setModalVisible] = useState(false);
    const [types, setTypes] = useState([]);

    const cities = regions_with_cities[trainerForm.region] || [];

    const handleChange = (name, value) => {
        setTrainerForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegionChange = (region) => {
        setTrainerForm((prev) => ({
            ...prev,
            region: region,
            city: ''
        }));
    };

    const handleReset = () => {
        const defaultTrainer = {
            firstName: '',
            age: '',
            region: '',
            genre: '',
            city: '',
            type: '',
            profilePic: '',
            devise: ''
        };

        setTrainer(defaultTrainer);   // Reset le contexte
        setTrainerForm(defaultTrainer); // Reset le state local aussi
        onCancel();
    };

    const handleSave = () => {
        setTrainer(trainerForm);
        onCancel();
    };

    useEffect(() => {
        fetch("https://tyradex.vercel.app/api/v1/types")
            .then(res => res.json())
            .then(data => setTypes(data))
            .catch(console.error);
    }, []);

    return (
        <ScrollView >
            <View style={styles.container}>
                <Text style={styles.title}>Modifier la fiche</Text>
                <Text>Prénom</Text>
                <TextInput
                    selectionColor={'black'}
                    style={styles.input}
                    placeholder="Prénom du dresseur"
                    value={trainerForm.firstName}
                    onChangeText={(value) => handleChange('firstName', value)}
                />

                <Text>Âge</Text>
                <TextInput
                    style={styles.input}
                    selectionColor={'black'}
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
                    selectedValue={
                        types.some((type) => type.name.fr === trainerForm.type)
                            ? trainerForm.type
                            : ''
                    }
                    onValueChange={(value) => handleChange('type', value)}
                >
                    <Picker.Item label={'Sélectionner un type'} value={''} />
                    {types.map((type) => (
                        <Picker.Item label={type.name.fr} value={type.name.fr} key={type.name.fr} />
                    ))}
                </Picker>
                <Text>Devise</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Rédige ta devise ici"
                    multiline={true}
                    selectionColor={'black'}
                    value={trainerForm.devise}
                    onChangeText={(value) => handleChange('devise', value)}
                />

                <Button color={"orange"} title="Choisir une image de profil" onPress={() => setModalVisible(true)} />
                <View style={styles.preview}>
                    <Text>Image de profil sélectionnée :</Text>
                    {trainerForm.profilePic ? (
                        <Image
                            source={profileImages[trainerForm.profilePic]}
                            style={styles.profilePic}
                        />
                    ) : (
                        <Text style={{ fontStyle: 'italic' }}>Aucune image sélectionnée</Text>
                    )}
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.buttonStyle}>
                        <Button color={'green'} title="Enregistrer" onPress={handleSave} />
                    </View>
                    <View style={styles.buttonStyle}>
                        <Button color={"blue"} title="Réinitialiser la fiche Dresseur" onPress={handleReset} />
                    </View>
                    <View style={styles.buttonStyle}>
                        <Button color={"#CC0000"} title="Annuler" onPress={onCancel} />
                    </View>
                </View>

                <ProfilePicModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSelect={(picName) => handleChange('profilePic', picName)}
                    selectedPic={trainerForm.profilePic}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        paddingBottom: 25
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
        marginTop: 10,
    },
    buttonStyle: {
        marginVertical: 8,
    },
    preview: {
        marginVertical: 16,
        alignItems: 'center',
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginTop: 8,
    },
});
