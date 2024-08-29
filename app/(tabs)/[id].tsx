import React, { useState } from 'react';
import { SafeAreaView, Alert } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCart } from '../../context/CartContext'; 
import { useFavorites } from '../../context/FavoritesContext'; 
import products from "../../assets/products"; 
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Image } from '@/components/ui/image';
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from '@/components/ui/pressable';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';

export default function TabTwoScreen() {
  const { id } = useLocalSearchParams();  
  const product = products.find((p) => p.id === parseInt(id));  

  const router = useRouter();
  const { addToCart } = useCart();  
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites(); 

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState('#000000');

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleSizeSelect = (size: React.SetStateAction<string>) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (color: React.SetStateAction<string>) => {
    setSelectedColor(color);
  };

  const handleFavoriteToggle = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToCart = () => {
    const newProduct = {
      ...product,
      quantity,  
    };

    addToCart(newProduct);  
    Alert.alert('Add to Cart', `Added ${quantity} item(s) to cart`);
    router.push('/checkout');  
  };

  if (!product) {
    
    return (
      <SafeAreaView className="bg-white flex-1 justify-center items-center">
        <Text className="text-xl font-bold">Product not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-white">
      <VStack className="h-full items-center">
        <Box className="relative mx-[20px]">
          {/* Main Image */}
          <Image source={product.image} alt={product.title} className="h-[392px] w-[327px] rounded-lg" resizeMode="cover" />

          {/* Back Icon */}
          <Pressable 
            className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-lg"
            onPress={() => router.back()}
          >
            <FontAwesome name="arrow-left" size={24} color="black" />
          </Pressable>

          {/* Favorite Icon */}
          <Pressable 
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg"
            onPress={handleFavoriteToggle}
          >
            <FontAwesome name={isFavorite(product.id) ? "heart" : "heart-o"} size={24} color="black" />
          </Pressable>
        </Box>

        {/* Product Details */}
        <VStack className="px-6 py-4 w-full">
          <HStack className="items-center justify-between">
            <Heading size="lg">{product.title}</Heading>

            {/* Quantity Controls */}
            <HStack className="items-center ml-4">
              <Pressable
                className="border border-outline-300 rounded-full w-8 h-8 justify-center items-center"
                onPress={handleDecreaseQuantity}
              >
                <Text>-</Text>
              </Pressable>

              <Text className="mx-2 text-xl">{quantity}</Text>

              <Pressable
                className="border border-outline-300 rounded-full w-8 h-8 justify-center items-center"
                onPress={handleIncreaseQuantity}
              >
                <Text>+</Text>
              </Pressable>
            </HStack>
          </HStack>

          <HStack className="items-center mt-2">
            <FontAwesome name="star" size={16} color="gold" />
            <Text className="ml-1 text-sm">{product.rating}</Text>
            <Pressable onPress={() => console.log('Reviews clicked')}>
              <Text className="ml-1 text-sm text-blue-500">(7,932 reviews)</Text>
            </Pressable>
          </HStack>

          <VStack className="mt-4">
            {/* Description */}
            <Text className="text-sm text-gray-600">
              Its simple and elegant shape makes it perfect for those of you who like minimalist clothes{' '}
              <Text className="font-bold">Read More...</Text>
            </Text>
          </VStack>

          {/* Size and Color Selection */}
          <HStack className="mt-6 justify-between items-start gap-3">
            {/* Size Selection */}
            <VStack>
              <Text className="text-sm font-bold mb-2">Choose Size</Text>
              <HStack className="space-x-2 gap-2">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <Pressable
                    key={size}
                    className={`border ${size === selectedSize ? 'border-black bg-black' : 'border-outline-300 bg-white'} rounded-full w-10 h-10 justify-center items-center`}
                    onPress={() => handleSizeSelect(size)}
                  >
                    <Text className={size === selectedSize ? 'text-white' : 'text-black'}>{size}</Text>
                  </Pressable>
                ))}
              </HStack>
            </VStack>

            {/* Color Selection */}
            <VStack>
              <Text className="text-sm font-bold mb-2">Color</Text>
              <HStack className="space-x-2 gap-2">
                {['#A9A9A9', '#4B4B4B', '#000000'].map((color) => (
                  <Pressable
                    key={color}
                    className={`rounded-full w-10 h-10 justify-center items-center border ${color === selectedColor ? 'border-black' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                    onPress={() => handleColorSelect(color)}
                  />
                ))}
              </HStack>
            </VStack>
          </HStack>
        </VStack>

        {/* Add to Cart Button */}
        <Box className="absolute bottom-0 w-full px-6 py-4">
          <Button size='xl' className="bg-black rounded-full justify-center items-center" onPress={handleAddToCart}>
            <FontAwesome name="shopping-cart" size={20} color="white" />
            <ButtonText className="text-white font-bold ml-2">Add to Cart | ${product.price}</ButtonText>
          </Button>
        </Box>
      </VStack>
    </SafeAreaView>
  );
}
