import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from "react-native";
import context from "../../context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from "../../ThemeContext";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Settings() {
    const { params, setParams } = useContext(context);
    const { theme, themeMode, setThemeMode, currentColors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelectLang = async (lang) => {
        setParams(prev => ({ ...prev, lang }));
        try {
            await AsyncStorage.setItem('lang', lang);
        } catch (e) {
            console.error('Error saving language preference:', e);
        }
        setModalVisible(false);
    };

    useEffect(() => {
        const loadLang = async () => {
            try {
                const savedLang = await AsyncStorage.getItem('lang');
                if (savedLang) {
                    setParams(prev => ({ ...prev, lang: savedLang }));
                }
            } catch (e) {
                console.error('Error loading language preference:', e);
            }
        };
        loadLang();
    }, []);

    const langApi = {
        fr: {
            langName: "Français",
            langCode: "fr"
        },
        en: {
            langName: "English",
            langCode: "en"
        },
        jp: {
            langName: "日本語 (Japonais)",
            langCode: "jp"
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: currentColors.background }]}>
            {/* Language Change Section */}
            <View style={styles.settingItem}>

                <TouchableOpacity style={styles.box} onPress={() => setModalVisible(true)} accessibilityLabel="Change Language" accessibilityHint="Opens a modal to change the app language">
                    <Text style={{ color: currentColors.text, fontWeight: 'bold' }}>Langue des noms des pokémons</Text>
                    <Text style={{ color: currentColors.text }}>{langApi[params.lang].langName}</Text>
                </TouchableOpacity>

                <View style={[styles.themeContainer, { borderColor: '#CACACA' }]}>
                    <Text style={{ color: currentColors.text, fontWeight: 'bold', marginBottom: 12 }}>
                        Thème de l'application
                    </Text>
                    <View style={styles.themeOptionsRow}>
                        <TouchableOpacity
                            style={[
                                styles.themeOption,
                                { borderColor: currentColors.text === 'white' ? '#555' : '#CACACA' },
                                themeMode === 'light' && styles.themeOptionSelected
                            ]}
                            onPress={() => setThemeMode('light')}
                            accessibilityLabel="Thème clair"
                        >
                            <Ionicons name="sunny-outline" size={24} color={currentColors.text} />
                            <Text style={[
                                styles.themeOptionText,
                                { color: currentColors.text },
                                themeMode === 'light' && styles.themeOptionTextSelected
                            ]}>
                                Clair
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.themeOption,
                                { borderColor: currentColors.text === 'white' ? '#555' : '#CACACA' },
                                themeMode === 'dark' && styles.themeOptionSelected
                            ]}
                            onPress={() => setThemeMode('dark')}
                            accessibilityLabel="Thème sombre"
                        >
                            <Ionicons name="moon" size={24} color={currentColors.text} />
                            <Text style={[
                                styles.themeOptionText,
                                { color: currentColors.text },
                                themeMode === 'dark' && styles.themeOptionTextSelected
                            ]}>
                                Sombre
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.themeOption,
                                { borderColor: currentColors.text === 'white' ? '#555' : '#CACACA' },
                                themeMode === 'auto' && styles.themeOptionSelected
                            ]}
                            onPress={() => setThemeMode('auto')}
                            accessibilityLabel="Thème Auto"
                        >
                            <FontAwesome6 name="circle-half-stroke" size={24} color={currentColors.text} />
                            <Text style={[
                                styles.themeOptionText,
                                { color: currentColors.text },
                                themeMode === 'auto' && styles.themeOptionTextSelected
                            ]}>
                                Auto
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Modal for Language Selection */}
            <Modal
                animationType="fade"
                visible={modalVisible}
                transparent
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.overlay}>
                    <View style={[styles.modalContent, { backgroundColor: currentColors.background }]}>
                        <Text style={[styles.modalTitle, { color: currentColors.text }]}>Sélectionne une langue :</Text>
                        <View>
                            <TouchableOpacity
                                onPress={() => handleSelectLang("fr")}
                                accessibilityLabel="Select French language"
                                accessibilityHint="Switches the app language to French"
                            >
                                <View
                                    style={[styles.optionRow, params.lang === "fr" ? styles.selected : styles.unselected]}
                                >
                                    <Text style={{ color: currentColors.text }}>Français</Text>
                                    <Image source={require('../images/flags/fr_flag.png')} style={styles.image} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => handleSelectLang("en")}
                                accessibilityLabel="Select English language"
                                accessibilityHint="Switches the app language to English"
                            >
                                <View
                                    style={[styles.optionRow, params.lang === "en" ? styles.selected : styles.unselected]}
                                >
                                    <Text style={{ color: currentColors.text }}>English</Text>
                                    <Image source={require('../images/flags/en_flag.png')} style={styles.image} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => handleSelectLang("jp")}
                                accessibilityLabel="Select Japanese language"
                                accessibilityHint="Switches the app language to Japanese"
                            >
                                <View
                                    style={[styles.optionRow, params.lang === "jp" ? styles.selected : styles.unselected]}
                                >
                                    <Text style={{ color: currentColors.text }}>日本語 (Japonais)</Text>
                                    <Image source={require('../images/flags/jp_flag.png')} style={styles.image} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeText}>Fermer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 20,

    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000aa",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: 300,
    },
    optionRow: {
        gap: 10,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        marginVertical: 10,
    },
    selected: {
        borderWidth: 2,
        borderColor: '#cc0000',
        borderRadius: 5,
        padding: 5,
    },
    unselected: {
        borderWidth: 2,
        borderColor: '#cacaca',
        borderRadius: 5,
        padding: 5,
    },
    closeButton: {
        marginTop: 16,
        alignSelf: 'center',
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 8
    },
    closeText: {
        fontSize: 16
    },
    image: {
        width: 50,
        height: 30
    },
    settingItem: {
        gap: 15,
    },

    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center'
    },
    box: {
        padding: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#CACACA',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    themeContainer: {
        padding: 16,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#CACACA',
    },
    themeOptionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    themeOption: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: '#CACACA',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    themeOptionSelected: {
        borderColor: '#cc0000',
        borderWidth: 2,
        backgroundColor: '#cc000015',
    },
    themeOptionText: {
        fontSize: 14,
        fontWeight: '500',
    },
    themeOptionTextSelected: {
        fontWeight: 'bold',
        color: '#cc0000',
    },
});
