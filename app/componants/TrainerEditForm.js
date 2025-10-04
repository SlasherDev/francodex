import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import context from '../../context';
import ProfilePicModal from '../componants/ProfilePicModal';
import profileImages from '../utils/imageMapper';
import { useTheme } from '../../ThemeContext';
import CustomPickerModal from '../componants/CustomPicker';
const { regions_with_cities } = require('../regions_pokemon.json');

export default function TrainerEditForm({ onCancel }) {
    const { trainer, setTrainer } = useContext(context);
    const [trainerForm, setTrainerForm] = useState(trainer);
    const [modalVisible, setModalVisible] = useState(false);
    const [types, setTypes] = useState([]);
    const genderOptions = ['N/A', 'Dresseur', 'Dresseuse', 'Dresseur·euse'];
    const [isGenderPickerVisible, setIsGenderPickerVisible] = useState(false);
    const [isRegionPickerVisible, setIsRegionPickerVisible] = useState(false);
    const [isCityPickerVisible, setIsCityPickerVisible] = useState(false);
    const [isTypePickerVisible, setIsTypePickerVisible] = useState(false);


    const { theme, currentColors } = useTheme();

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

                <TouchableOpacity
                    style={[
                        styles.customPicker,
                        { backgroundColor: theme === 'dark' ? 'pink' : 'lightgray' }
                    ]}
                    onPress={() => setIsGenderPickerVisible(true)}
                >
                    <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>
                        {trainerForm.genre || 'Sélectionner le genre'}
                    </Text>
                </TouchableOpacity>




                <Text>Choisir la région</Text>
                <TouchableOpacity
                    style={[
                        styles.customPicker,
                        { backgroundColor: theme === 'dark' ? 'pink' : 'lightgray' }
                    ]}
                    onPress={() => setIsRegionPickerVisible(true)}
                >
                    <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>
                        {trainerForm.region || 'Sélectionner une région'}
                    </Text>
                </TouchableOpacity>

                {trainerForm.region && (
                    <>
                        <Text>Choisir la ville</Text>
                        <TouchableOpacity
                            style={[
                                styles.customPicker,
                                { backgroundColor: theme === 'dark' ? 'pink' : 'lightgray' }
                            ]}
                            onPress={() => setIsCityPickerVisible(true)}
                        >
                            <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>
                                {trainerForm.city || 'Sélectionner une ville'}
                            </Text>
                        </TouchableOpacity>

                    </>
                )}

                <Text>Choisir le type de prédilection</Text>
                <TouchableOpacity
                    style={[
                        styles.customPicker,
                        { backgroundColor: theme === 'dark' ? 'pink' : 'lightgray' }
                    ]}
                    onPress={() => setIsTypePickerVisible(true)}
                >
                    <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>
                        {trainerForm.type || 'Sélectionner un type'}
                    </Text>
                </TouchableOpacity>
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
                <CustomPickerModal
                    visible={isGenderPickerVisible}
                    options={genderOptions}
                    selectedValue={trainerForm.genre}
                    onSelect={(option) => handleChange('genre', option)}
                    onClose={() => setIsGenderPickerVisible(false)}
                    title="Sélectionner le genre"
                />

                <CustomPickerModal
                    visible={isRegionPickerVisible}
                    options={Object.keys(regions_with_cities)}
                    selectedValue={trainerForm.region}
                    onSelect={(region) => handleRegionChange(region)}
                    onClose={() => setIsRegionPickerVisible(false)}
                    title="Sélectionner la région"
                />
                <CustomPickerModal
                    visible={isCityPickerVisible}
                    options={cities}
                    selectedValue={trainerForm.city}
                    onSelect={(city) => handleChange('city', city)}
                    onClose={() => setIsCityPickerVisible(false)}
                    title="Sélectionner la ville"
                />
                <CustomPickerModal
                    visible={isTypePickerVisible}
                    options={types.map((type) => type.name.fr)}
                    selectedValue={trainerForm.type}
                    onSelect={(selectedType) => handleChange('type', selectedType)}
                    onClose={() => setIsTypePickerVisible(false)}
                    title="Sélectionner un type"
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

    itemStyle: {
        // backgroundColor:'blue'
    },
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
    customPicker: {
        paddingVertical: 12,
        paddingHorizontal: 11,
        marginTop: 5
    }

});
