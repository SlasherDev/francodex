import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, Button, StyleSheet, Image, Animated, Switch } from "react-native";
import context from "../../context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from "../../ThemeContext";

export default function Settings() {
    const { params, setParams } = useContext(context);
    const { theme, toggleTheme, currentColors } = useTheme();
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


    const togglePosition = theme === "dark" ? 35 : 0;
    const [toggleAnim] = useState(new Animated.Value(togglePosition));

    // Animate the toggle when the theme changes
    useEffect(() => {
        Animated.spring(toggleAnim, {
            toValue: togglePosition,
            useNativeDriver: false,
        }).start();
    }, [theme]);

    return (
        <View style={[styles.container, { backgroundColor: currentColors.background }]}>
            {/* Language Change Section */}
            <View style={styles.settingItem}>

                <TouchableOpacity style={styles.box} onPress={() => setModalVisible(true)} accessibilityLabel="Change Language" accessibilityHint="Opens a modal to change the app language">
                    <Text style={{ color: currentColors.text, fontWeight: 'bold' }}>Langue des noms des pokémons</Text>
                    <Text style={{ color: currentColors.text }}>{langApi[params.lang].langName}</Text>
                </TouchableOpacity>

                <View style={[styles.box, { backgroundColor: currentColors.background }]}>
                    <Text style={{ color: theme === 'dark' ? 'white' : 'black', fontWeight: 'bold' }}>Thème: {theme === 'dark' ? 'Sombre' : 'Clair'}</Text>
                    <Switch
                        value={theme === 'dark'}
                        onValueChange={toggleTheme}
                        trackColor={{ false: '#767577', true: 'gray' }}
                        thumbColor={theme === 'dark' ? 'white' : 'black'}
                        style={styles.switch}
                    />
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
    switch: {
        // marginTop: 20,
    },
});
