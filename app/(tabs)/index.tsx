import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { useRouter } from "expo-router";
import * as LocalAuthentication from 'expo-local-authentication';
import ProductList from "@/components/ProductList";
import BiometricAuthButton from "@/components/BiometricAuthButton";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilters";
import BottomNavBar from "@/components/BottomNavBar";
import products from "../../assets/products";
import { useFavorites } from "../../context/FavoritesContext";
import ProductCard from "@/components/ProductCard";


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

          setIsAuthenticated(result.success);
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

  const toggleFavorite = (item) => {
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      {isAuthenticated ? (
        <View className="px-8 flex-1">
          <Header />
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <FlatList
            horizontal={false}
            className="flex-1"
            numColumns={2}
            data={filteredProducts}
            renderItem={({ item }) => (
              <ProductCard 
                item={item} 
                toggleFavorite={toggleFavorite} 
                isFavorite={isFavorite} 
                onPress={() => router.push(`/${item.id}`)} 
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />
          <BottomNavBar />
        </View>
      ) : (
        <BiometricAuthButton onAuthenticate={authenticate} />
      )}
    </SafeAreaView>
  );
}


// export {default} from '../../.storybook'; 