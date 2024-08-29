import React from "react";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable"; 
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faBagShopping,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { View } from "react-native";
import { useRouter } from "expo-router"; 

const BottomNavBar = () => {
  const router = useRouter(); 

  return (
    <HStack
      className="w-full h-[60px] bg-black items-center justify-between px-8 rounded-xl"
      style={{ position: "relative", bottom: 0, left: 0, right: 0 }}
    >
      <Pressable
        className="flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faHome} color="#fff" size={24} />
      </Pressable>
      <Pressable
        className="flex items-center justify-center relative"
        onPress={() => router.push("/checkout")} 
      >
        <FontAwesomeIcon icon={faBagShopping} color="#fff" size={24} />
        <View
          className="absolute top-0 right-0 bg-red-500 h-3 w-3 rounded-full"
        />
      </Pressable>
      <Pressable
        className="flex items-center justify-center"
        onPress={() => router.push("/favorites")}
      >
        <FontAwesomeIcon icon={faHeart} color="#fff" size={24} />
      </Pressable>
      <Pressable
        className="flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faUser} color="#fff" size={24} />
      </Pressable>
    </HStack>
  );
};

export default BottomNavBar;
