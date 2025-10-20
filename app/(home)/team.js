import { Dimensions, FlatList, Image, StyleSheet, Text, View, Pressable } from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import context from "../../context";
import AlertReleasePokemonModal from "../componants/alertModals/alertReleasePokemonModal";
import { useTheme } from "../../ThemeContext";

export default function Equipe() {
  const { currentColors } = useTheme();
  const { storage, setStorage, params } = useContext(context);

  const [pokemons, setPokemons] = useState([]);
  const [isAlertReleasePokemonModal, setIsAlertReleasePokemonModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    if (storage?.length > 0) fetchAPI(storage);
    else setPokemons([]);
  }, [storage]);

  const fetchAPI = async (data) => {
    try {
      const responses = await Promise.all(
        data.map((id) =>
          fetch(`https://tyradex.vercel.app/api/v1/pokemon/${id}`).then((res) => res.json())
        )
      );
      setPokemons(responses);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelect = (item) => {
  setSelectedPokemon(item);
  setIsAlertReleasePokemonModal(true);
};

  const deleteItem = (selectedId) => {
    setStorage((prev) => prev.filter((i) => Number(i) !== Number(selectedId)));
    setIsAlertReleasePokemonModal(false);
  };

  const renderItem = useCallback(
    ({ item, index }) => {
      const isLastOddItem = pokemons.length % 2 !== 0 && index === pokemons.length - 1;
      return (
        <View style={[styles.container, isLastOddItem && styles.lastItem]}>
          <Text style={[styles.title, { color: currentColors.text }]}>
            {item.name[params.lang]}
          </Text>
          <Image style={styles.picture} source={{ uri: item.sprites?.regular }} />
          <Pressable onPress={() => handleSelect(item)}>
            <MaterialIcons style={{ marginVertical: 5 }}name="catching-pokemon" size={40} color="#890605" />
          </Pressable>
        </View>
      );
    },
    [pokemons, params, currentColors]
  );

  return (
    <View style={{ flex: 1, backgroundColor: currentColors.background }}>
      <FlatList
        data={pokemons}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.name?.en}
      />

      <AlertReleasePokemonModal
        visible={isAlertReleasePokemonModal}
        onClose={() => setIsAlertReleasePokemonModal(false)}
        onPress={() => {
          deleteItem(selectedPokemon?.pokedex_id);
        }}
        option = {selectedPokemon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    margin: 5,
    borderRadius: 10,
    alignItems: "center",
    borderColor: "#cdcdcd",
    borderWidth: 2,
  },
  lastItem: {
    marginRight: 15,
  },
  title: {
    fontWeight: "bold",
    margin: 10,
  },
  picture: {
    width: 150,
    aspectRatio: 1,
  },
});
