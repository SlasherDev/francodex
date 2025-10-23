import { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import context from '../../context';
import profileImages from '../utils/imageMapper';
import { useTheme } from '../../ThemeContext';
import CustomPickerModal from './customs/CustomPicker';
import CustomImagePickerModale from './customs/customImagePicker';
import { Entypo, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import ResetCrossBox from './resetCross/resetCrossBox';
import ResetCrossText from './resetCross/resetCrossText';
import SaveButton from './buttons/saveButton';
import ResetButton from './buttons/resetButton';
import CancelButton from './buttons/cancelButton';
const { regions_with_cities, profilePics } = require('../regions_pokemon.json');

export default function TrainerEditForm({ onCancel }) {
    const { trainer, setTrainer } = useContext(context);
    const [trainerForm, setTrainerForm] = useState(trainer);
    const [isProfilePicModalVisible, setIsProfilePicModalVisible] = useState(false);
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
        <ScrollView style={{ backgroundColor: currentColors.background }}>
            <View style={[styles.container]}>
                <Text style={[{ color: currentColors.text }, styles.title]}>Modifier la fiche</Text>
                <View>

                    <Text style={[{ color: currentColors.text }, styles.elementTitle]}>Prénom du dresseur</Text>
                    <View style={styles.input}>
                        <TextInput
                            selectionColor={theme === 'dark' ? 'white' : 'black'}
                            style={{ flex: 1 }}
                            color={theme === 'dark' ? 'white' : 'black'}
                            placeholder="Écrit ton nom de dresseur"
                            placeholderTextColor={'grey'}
                            value={trainerForm.firstName}
                            onChangeText={(value) => handleChange('firstName', value)}
                        />
                        {trainerForm.firstName !== '' && (
                            <ResetCrossText onReset={() => handleChange('firstName', '')} />

                        )}
                    </View>
                </View>

                <View>
                    <Text style={[{ color: currentColors.text }, styles.elementTitle]}>Âge du dresseur</Text>
                    <View style={styles.input}>
                        <TextInput
                            style={{ flex: 1 }}
                            selectionColor={theme === 'dark' ? 'white' : 'black'}
                            color={theme === 'dark' ? 'white' : 'black'}
                            placeholder="Écrit ton âge"
                            placeholderTextColor={'grey'}
                            keyboardType="numeric"
                            value={trainerForm.age}
                            onChangeText={(value) => handleChange('age', value)}
                        />
                        {trainerForm.age !== '' && (
                            <ResetCrossText onReset={() => handleChange('age', '')} />
                        )}
                    </View>
                </View>

                <View>
                    <Text style={[{ color: currentColors.text }, styles.elementTitle]}>Genre du dresseur</Text>
                    <TouchableOpacity
                        style={[styles.preview, styles.selector]}
                        onPress={() => setIsGenderPickerVisible(true)}
                    >
                        {trainerForm.genre !== '' ? (
                            <>
                                <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>{trainerForm.genre}</Text>
                                <ResetCrossText onReset={() => handleChange('genre', '')} />
                            </>
                        ) : (
                            <Text style={styles.textLegend}>Sélectionner ton genre</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={[{ color: currentColors.text }, styles.elementTitle]}>Région Pokémon du dresseur</Text>
                    <TouchableOpacity
                        style={[styles.preview, styles.selector]}
                        onPress={() => setIsRegionPickerVisible(true)}
                    >
                        {trainerForm.region !== '' ? (
                            <>
                                <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>{trainerForm.region}</Text>
                                <ResetCrossText onReset={() => handleChange('region', '')} />
                            </>
                        ) : (
                            <Text style={styles.textLegend}>Région préférée du dresseur</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {trainerForm.region && (
                    <View>
                        <Text style={[{ color: currentColors.text }, styles.elementTitle]}>Ville Pokémon du dresseur</Text>
                        <TouchableOpacity
                            style={[styles.preview, styles.selector]}
                            onPress={() => setIsCityPickerVisible(true)}
                        >
                            {trainerForm.city !== '' ? (
                                <>
                                    <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>{trainerForm.city}</Text>
                                    <ResetCrossText onReset={() => handleChange('city', '')} />
                                </>
                            ) : (
                                <Text style={styles.textLegend}>Ville préférée du dresseur</Text>
                            )}
                        </TouchableOpacity>

                    </View>
                )}

                <View>
                    <Text style={[{ color: currentColors.text }, styles.elementTitle]}>Type de prédilection du dresseur</Text>
                    <TouchableOpacity
                        style={styles.preview}
                        onPress={() => setIsTypePickerVisible(true)}
                    >
                        {trainerForm.type !== '' ? (
                            <>
                                <Image
                                    source={types.find(t => t.name.fr === trainerForm.type)?.sprites ? { uri: types.find(t => t.name.fr === trainerForm.type)?.sprites } : null}
                                    style={styles.image}
                                />
                                <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>{trainerForm.type}</Text>
                                <ResetCrossBox onReset={() => handleChange('type', '')} />
                            </>
                        ) : (
                            <Text style={styles.textLegend}>Choisit ton type de prédilection</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={[{ color: currentColors.text }, styles.elementTitle]}>Devise du dresseur</Text>
                    <View style={styles.input}>
                        <TextInput
                            style={{ flex: 1 }}
                            placeholder="Rédige ta devise ici"
                            placeholderTextColor={'grey'}
                            color={theme === 'dark' ? 'white' : 'black'}
                            multiline={true}
                            selectionColor={theme === 'dark' ? 'white' : 'black'}
                            value={trainerForm.devise}
                            onChangeText={(value) => handleChange('devise', value)}
                        />
                        {trainerForm.devise !== '' && (
                            <ResetCrossText onReset={() => handleChange('devise', '')} />
                        )}
                    </View>
                </View>

                <View>
                    <Text style={[{ color: currentColors.text }, styles.elementTitle]}>Image de profil du dresseur</Text>
                    <TouchableOpacity onPress={() => setIsProfilePicModalVisible(true)} style={styles.preview}>

                        {trainerForm.profilePic ? (
                            <>
                                <Text style={{ color: currentColors.text }}>changer l'image de profil</Text>
                                <Image
                                    source={profileImages[trainerForm.profilePic]}
                                    style={styles.image}
                                />
                                <ResetCrossBox onReset={() => handleChange('profilePic', '')} />
                            </>
                        ) : (
                            <>
                                <Text style={{ color: 'grey' }}>Choisir une image de profil</Text>
                                <Ionicons name="person-circle" size={100} color={'#cacaca'} />
                            </>
                        )}
                    </TouchableOpacity>
                </View>

                {trainerForm.firstName && (
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonStyle}>
                            <SaveButton onPress={handleSave} />
                        </View>
                        {(trainerForm.firstName || trainerForm.age || trainerForm.genre || trainerForm.region || trainerForm.city || trainerForm.type || trainerForm.devise || trainerForm.profilePic) && (
                            <View style={styles.buttonStyle}>
                                <ResetButton onPress={handleReset} />
                            </View>
                        )}
                        {trainer.firstName && (
                            <View style={styles.buttonStyle}>
                                <CancelButton onPress={onCancel} />
                            </View>
                        )}
                    </View>
                )}



                <CustomImagePickerModale
                    visible={isProfilePicModalVisible}
                    options={profilePics.map((profilePic) => ({
                        name: profilePic.name,
                        img: profileImages[profilePic.pic],
                        key: profilePic.pic,
                    }))}
                    onClose={() => setIsProfilePicModalVisible(false)}
                    onSelect={(picName) => handleChange('profilePic', picName)}
                    selectedValue={trainerForm.profilePic}
                    title="Choisis ton image de profil"
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
                <CustomImagePickerModale
                    visible={isTypePickerVisible}
                    options={types.map((type) => ({
                        name: type.name.fr,
                        img: { uri: type.sprites },
                        key: type.name.fr,

                    }))}
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
        paddingBottom: 25,
        gap: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    elementTitle: {
        fontSize: 16,
        fontWeight: '600'
    },
    input: {
        borderColor: '#cacaca',
        borderWidth: 3,
        borderRadius: 10,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textLegend: {
        flex: 1,
        textAlign: 'center',
        color: 'grey'
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
        borderColor: '#cacaca',
        borderWidth: 3,
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
    },
    selector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 100,
        margin: 5
    },
});
