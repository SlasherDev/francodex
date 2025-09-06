import { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Button, StyleSheet, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import context from "../../context";

export default function Settings() {
    const { params, setParams } = useContext(context);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelectLang = (lang) => {
        setParams(prev => ({ ...prev, lang })); // on garde le reste et on change juste lang
        setModalVisible(false);
    };

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
        <View style={styles.container}>
            <View style={styles.settingItem}>
                <Button color={'#cc0000'} title="Changer la langue" onPress={() => setModalVisible(true)} />
                <Text>Langue : {langApi[params.lang].langName}</Text>
            </View>

            <Modal
                animationType="fade"
                visible={modalVisible}
                transparent
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.overlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Sélectionne une langue :</Text>
                        <View>
                            <TouchableOpacity onPress={() => handleSelectLang("fr")}>
                                <View
                                    style={[
                                        styles.optionRow,
                                        params.lang === "fr" ? styles.selected : styles.unselected,
                                    ]}
                                >
                                    <Text>Français</Text>
                                    <Image
                                        source={require('../images/flags/fr_flag.png')}
                                        style={styles.image}
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleSelectLang("en")}>
                                <View
                                    style={[
                                        styles.optionRow,
                                        params.lang === "en" ? styles.selected : styles.unselected,
                                    ]}
                                >
                                    <Text>English</Text>
                                    <Image
                                        source={require('../images/flags/en_flag.png')}
                                        style={styles.image}
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleSelectLang("jp")}>
                                <View
                                    style={[
                                        styles.optionRow,
                                        params.lang === "jp" ? styles.selected : styles.unselected,
                                    ]}
                                >
                                    <Text>日本語 (Japonais)</Text>
                                    <Image
                                        source={require('../images/flags/jp_flag.png')}
                                        style={styles.image}
                                    />
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
        margin: 20,
        gap: 20
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
        gap: 5,
    },

    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center'
    }
});
