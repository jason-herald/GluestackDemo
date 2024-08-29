import React from "react";
import { SafeAreaView, FlatList, View, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import { useFavorites } from "../../context/FavoritesContext";
import ProductCard from "@/components/ProductCard";

const FavoritesScreen = () => {
  const router = useRouter();
  const { favorites, removeFromFavorites, isFavorite, addToFavorites } = useFavorites(); 

  const toggleFavorite = (item) => {
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="px-8 py-4 flex-1">
        {favorites.length > 0 ? (
          <FlatList
            data={favorites}
            renderItem={({ item }) => (
                <ProductCard 
                  item={item} 
                  toggleFavorite={toggleFavorite} 
                  isFavorite={isFavorite} 
                  onPress={() => router.push(`/${item.id}`)} 
                />
              )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text className="text-center mt-20 text-lg">
            No favorites added yet.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FavoritesScreen;
