import React from "react";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "react-native";
import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";

const Header = () => (
  <HStack className="flex-row items-center py-3">
    <VStack className="gap-1">
      <Text className="text-base color-chosen-2">Hello, Welcome 👋</Text>
      <Text className="text-lg color-chosen-5 font-bold">Albert Stevano</Text>
    </VStack>
    <Avatar className="ml-auto" size="md">
      <AvatarFallbackText>AS</AvatarFallbackText>
      <AvatarImage source={require("../assets/profile.png")} />
    </Avatar>
  </HStack>
);

export default Header;
