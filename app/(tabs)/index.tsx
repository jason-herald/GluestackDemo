import React, { useEffect, useState } from "react";
import { SafeAreaView, View, ScrollView, FlatList, TouchableOpacity, Text } from "react-native";
import { Image } from "react-native";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSliders,
  faSearch,
  faBorderAll,
  faPersonDress,
  faShirt,
  faShoePrints,
  faStar,
  faHeart
} from "@fortawesome/free-solid-svg-icons";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { useRouter } from "expo-router";
import * as LocalAuthentication from 'expo-local-authentication';
import BottomNavBar from "@/components/BottomNavBar";
import products from "../../assets/products";
import { useFavorites } from "../../context/FavoritesContext";
import { FontAwesome } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedCategory, setSelectedCategory] = useState("All Items"); 
  const [filteredProducts, setFilteredProducts] = useState(products); 

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);

      if (compatible) {
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        if (enrolled) {
          const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate with Face ID',
            fallbackLabel: 'Use PIN',
          });

          if (result.success) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          alert('No biometric authentication methods are set up on this device.');
        }
      } else {
        alert('Your device does not support biometric authentication.');
      }
    })();
  }, []);

  const authenticate = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with Face ID',
      fallbackLabel: 'Use PIN',
    });

    if (result.success) {
      setIsAuthenticated(true);
    } else {
      alert('Authentication failed. Please try again.');
    }
  };

  const toggleFavorite = (item) => {
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };


  const filterProducts = () => {
    let filtered = products;

  
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }


    if (selectedCategory !== "All Items") {
      filtered = filtered.filter((product) =>
        product.subtitle === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory]);

  const cardRenderer = ({ item }) => (
    <Card className="p-5 rounded-lg shrink relative">
      <Pressable onPress={() => router.push(`/${item.id}`)}>
        <Image
          source={item.image}
          className="mb-6 h-[217px] w-[155px] rounded-lg object-contain"
          alt="card pic"
        />
        <Pressable
          className="absolute top-3 right-0 p-2 bg-white rounded-full"
          onPress={() => toggleFavorite(item)}
        >
          <FontAwesome name={isFavorite(item.id) ? "heart" : "heart-o"} size={14} color="black" />
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

  return (
    <SafeAreaView className="bg-white flex-1">
      {isAuthenticated ? (
        <View className="px-8 flex-1">
          <VStack className="gap-8 flex-1">
            <HStack className="flex-row items-center">
              <VStack className="gap-1">
                <Text className="text-base color-chosen-2">Hello, Welcome 👋</Text>
                <Text className="text-lg color-chosen-5 font-bold">Albert Stevano</Text>
              </VStack>
              <Avatar className="ml-auto" size="md">
                <AvatarFallbackText>AS</AvatarFallbackText>
                <AvatarImage source={require("../../assets/profile.png")} />
              </Avatar>
            </HStack>
            <HStack className="gap-4">
              <Input
                variant="outline"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                className="grow h-14 rounded-lg px-2"
              >
                <InputSlot className="pl-3">
                  <View className="flex">
                    <FontAwesomeIcon icon={faSearch} color="#ccc" />
                  </View>
                </InputSlot>
                <InputField 
                  placeholder="Search clothes..." 
                  value={searchQuery} 
                  onChangeText={setSearchQuery} 
                />
              </Input>
              <Pressable className="rounded-lg w-14 bg-chosen-1 color-chosen-4 justify-center items-center border border-outline-300">
                <FontAwesomeIcon icon={faSliders} color="#ffffff" />
              </Pressable>
            </HStack>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="max-h-10">
  <HStack className="gap-4">
    <Button 
      className="rounded-lg"
      onPress={() => setSelectedCategory("All Items")}
      variant={selectedCategory === "All Items" ? "solid" : "outline"}
    >
      <FontAwesomeIcon 
        icon={faBorderAll} 
        color={selectedCategory === "All Items" ? "#ffffff" : "#111"} 
      />
      <ButtonText className={selectedCategory === "All Items" ? "text-white ml-2" : "ml-2"}>All Items</ButtonText>
    </Button>
    <Button 
      className="rounded-lg" 
      onPress={() => setSelectedCategory("Dress")}
      variant={selectedCategory === "Dress" ? "solid" : "outline"}
    >
      <FontAwesomeIcon 
        icon={faPersonDress} 
        color={selectedCategory === "Dress" ? "#ffffff" : "#111"} 
      />
      <ButtonText className={selectedCategory === "Dress" ? "text-white ml-2" : "ml-2"}>Dress</ButtonText>
    </Button>
    <Button 
      className="rounded-lg" 
      onPress={() => setSelectedCategory("T-Shirt")}
      variant={selectedCategory === "T-Shirt" ? "solid" : "outline"}
    >
      <FontAwesomeIcon 
        icon={faShirt} 
        color={selectedCategory === "T-Shirt" ? "#ffffff" : "#111"} 
      />
      <ButtonText className={selectedCategory === "T-Shirt" ? "text-white ml-2" : "ml-2"}>T-Shirt</ButtonText>
    </Button>
    <Button 
      className="rounded-lg" 
      onPress={() => setSelectedCategory("Pants")}
      variant={selectedCategory === "Pants" ? "solid" : "outline"}
    >
      <FontAwesomeIcon 
        icon={faShoePrints} 
        color={selectedCategory === "Pants" ? "#ffffff" : "#111"} 
      />
      <ButtonText className={selectedCategory === "Pants" ? "text-white ml-2" : "ml-2"}>Pants</ButtonText>
    </Button>
  </HStack>
</ScrollView>
            <FlatList
              horizontal={false}
              className="flex-1"
              numColumns={2}
              data={filteredProducts}
              renderItem={cardRenderer}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingBottom: 100 }}
            />
          </VStack>
          {/* Bottom Navigation Bar */}
          <BottomNavBar />
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <TouchableOpacity
            style={{
              backgroundColor: '#007AFF',
              paddingVertical: 15,
              paddingHorizontal: 40,
              borderRadius: 10,
            }}
            onPress={authenticate}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Login with Face ID</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
