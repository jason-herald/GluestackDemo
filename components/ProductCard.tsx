import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Card } from "@/components/ui/card";
import { Pressable } from "@/components/ui/pressable";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";

const ProductCard = ({ item, toggleFavorite, isFavorite, onPress }) => (
  <Card className="rounded-lg shrink w-[155px]">
    <Pressable onPress={onPress}>
      <Image
        source={item.image}
        className="mb-6 h-[217px] w-[155px] rounded-lg object-contain"
        alt="card pic"
        testID="product-image"
      />
      <Pressable
        className="absolute top-3 mr-2 right-2 p-2 bg-white rounded-full"
        onPress={() => toggleFavorite(item)}
        testID="favorite-button"
      >
        <FontAwesome
          testID="favorite-icon"
          name={isFavorite(item.id) ? "heart" : "heart-o"}
          size={14}
          color="black"
        />
      </Pressable>
      <Heading size="md" className="mb-4">
        {item.title}
      </Heading>
      <Text className="text-sm font-normal mb-2 text-typography-700">
        {item.subtitle}
      </Text>
      <HStack className="items-center">
        <Text className="text-lg font-bold">${item.price}</Text>
        <HStack className="ml-auto items-center">
          <FontAwesomeIcon icon={faStar} color="gold" />
          <Text className="ml-2">{item.rating}</Text>
        </HStack>
      </HStack>
    </Pressable>
  </Card>
);

export default ProductCard;
