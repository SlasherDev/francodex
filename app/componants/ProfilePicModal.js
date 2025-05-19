// app/componants/ProfilePicModal.js
import React from 'react';
import { Modal, View, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import profileImages from '../utils/imageMapper';
import { profilePic } from '../regions_pokemon.json';

export default function ProfilePicModal({ visible, onClose, onSelect, selectedPic }) {
  return (
    <Modal visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Choisis ton image de profil</Text>
        <FlatList
          data={profilePic}
          numColumns={3}
          keyExtractor={(item) => item.pic}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => { onSelect(item.pic); onClose(); }}>
              <Image
                source={profileImages[item.pic]}
                style={[
                  styles.image,
                  selectedPic === item.pic && styles.selectedImage
                ]}
              />
              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.grid}
        />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>Fermer</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center'
  },
  grid: {
    alignItems: 'center'
  },
  image: {
    width: 80,
    height: 80,
    margin: 8,
    borderRadius: 100
  },
  selectedImage: {
    borderWidth: 3,
    borderColor: '#cc0000'
  },
  name: {
    textAlign: 'center',
    marginBottom: 8
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
  }
});
