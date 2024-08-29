import React from "react";
import { SafeAreaView, FlatList, View, Text, Image } from "react-native";
import { Card } from "@/components/ui/card";
import { Pressable } from "@/components/ui/pressable";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "expo-router";
import { useFavorites } from "../../context/FavoritesContext";

const FavoritesScreen = () => {
  const router = useRouter();
  const { favorites, removeFromFavorites, isFavorite } = useFavorites(); 

  const renderFavoriteItem = ({ item }) => (
    <Card className="p-5 rounded-lg shrink relative">
      <Pressable onPress={() => router.push(`/${item.id}`)}>
        <Image
          source={item.image}
          className="mb-6 h-[217px] w-[155px] rounded-lg object-contain"
          alt="card pic"
        />
        <Pressable
          className="absolute top-3 right-3 p-2 bg-white rounded-full"
          onPress={() => removeFromFavorites(item.id)}
        >
          <FontAwesomeIcon
            icon={faHeart}
            color={isFavorite(item.id) ? "black" : "grey"}
          />
        </Pressable>
        <Heading size="md" className="mb-4">
          {item.title}
        </Heading>
        <Text className="text-sm font-normal mb-2 text-typography-700">
          {item.subtitle}
        </Text>
        <HStack className="items-center">
          <Text className="text-lg font-bold">{item.price}</Text>
          <HStack className="ml-auto items-center">
            <FontAwesomeIcon icon={faStar} color="gold" />
            <Text className="ml-2">{item.rating}</Text>
          </HStack>
        </HStack>
      </Pressable>
    </Card>
  );

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="px-8 py-4 flex-1">
        {favorites.length > 0 ? (
          <FlatList
            data={favorites}
            renderItem={renderFavoriteItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 20 }}
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
