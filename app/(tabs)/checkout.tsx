import React from 'react';
import { SafeAreaView, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faBars, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'expo-router';
import { useCart } from '../../context/CartContext';  
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Image } from '@/components/ui/image';
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from '@/components/ui/pressable';
import { Button, ButtonText } from '@/components/ui/button';
import { FlatList } from 'react-native';

const CheckoutScreen = () => {
  const { products, totalItems, subtotal, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const router = useRouter();

  
  const handlePay = () => {
    Alert.alert('Order Placed', 'Your order has been placed successfully.');
    clearCart(); 
  };

  const renderItem = ({ item }) => (
    <HStack className="justify-between items-center p-4 border-b border-gray-200">
      {/* Product Image */}
      <Image source={item.image} className="w-[80px] h-[80px] rounded-lg" alt={item.title}/>
  
      {/* Product Info */}
      <VStack className="flex-1 ml-4 mr-8">
        <Text className="text-base font-semibold" numberOfLines={1}>
          {item.title}
        </Text>
        <Text className="text-sm text-gray-500 pb-2">{item.subtitle}</Text>
        <Text className="text-lg font-bold mt-1">${item.price.toFixed(2)}</Text>
      </VStack>
  
      {/* Quantity Controls */}
      <HStack className="items-center">
        <Pressable
          className="border border-gray-300 rounded-full w-8 h-8 justify-center items-center mx-2"
          onPress={() => decreaseQuantity(item.id)}
        >
          <FontAwesomeIcon icon={faMinus} size={14} color="black" />
        </Pressable>
        <Text className="text-base mx-2">{item.quantity}</Text>
        <Pressable
          className="border border-gray-300 rounded-full w-8 h-8 justify-center items-center mx-2"
          onPress={() => increaseQuantity(item.id)}
        >
          <FontAwesomeIcon icon={faPlus} size={14} color="black" />
        </Pressable>
      </HStack>
    </HStack>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <HStack className="justify-between items-center px-4 py-2 mb-6">
        {/* Left Icon Button */}
        <Pressable className="border rounded-full p-2" onPress={() => router.back()}>
          <FontAwesomeIcon icon={faChevronLeft} size={20} color="black" />
        </Pressable>

        {/* Center Title */}
        <Text className="text-lg font-semibold">Checkout</Text>

        {/* Right Icon Button */}
        <Pressable className="border rounded-full p-2">
          <FontAwesomeIcon icon={faBars} size={20} color="black" />
        </Pressable>
      </HStack>

      {/* Product List */}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        className="flex-1"
      />

      {/* Shipping Information and Cost Summary */}
      <VStack className="p-4">
        {/* Shipping Information */}
        <Text className="text-lg font-semibold mb-4">Shipping Information</Text>
        <HStack className="justify-between items-center bg-gray-100 p-4 rounded-lg mb-4">
          <HStack className="items-center">
            <Image source={require("../../assets/visa.png")} className="w-10 h-6 mr-2" alt='visa' />
            <Text className="text-base font-semibold">**** **** **** 2143</Text>
          </HStack>
          <FontAwesomeIcon icon={faChevronLeft} size={20} color="black" />
        </HStack>

        {/* Cost Summary */}
        <HStack className="justify-between items-center mb-2">
          <Text className="text-base">Total ({totalItems} items)</Text>
          <Text className="text-base">${subtotal}</Text>
        </HStack>
        <HStack className="justify-between items-center mb-2">
          <Text className="text-base">Shipping Fee</Text>
          <Text className="text-base">$0.00</Text>
        </HStack>
        <HStack className="justify-between items-center mb-2">
          <Text className="text-base">Discount</Text>
          <Text className="text-base">$0.00</Text>
        </HStack>
        <HStack className="justify-between items-center border-t border-gray-200 pt-2">
          <Text className="text-lg font-bold">Sub Total</Text>
          <Text className="text-lg font-bold">${subtotal}</Text>
        </HStack>
      </VStack>

      {/* Pay Button */}
      <Box className="p-4">
        <Button size='xl' className="bg-black rounded-full" onPress={handlePay}>
          <ButtonText className="text-center text-white text-lg font-semibold">Pay</ButtonText>
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default CheckoutScreen;
