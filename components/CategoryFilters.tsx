import React from "react";
import { ScrollView } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBorderAll, faPersonDress, faShirt, faShoePrints } from "@fortawesome/free-solid-svg-icons";

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => (
  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="max-h-10 mb-3">
    <HStack className="gap-4">
      {[
        { name: "All Items", icon: faBorderAll },
        { name: "Dress", icon: faPersonDress },
        { name: "T-Shirt", icon: faShirt },
        { name: "Pants", icon: faShoePrints },
      ].map((category) => (
        <Button 
          key={category.name}
          className="rounded-lg"
          onPress={() => setSelectedCategory(category.name)}
          variant={selectedCategory === category.name ? "solid" : "outline"}
        >
          <FontAwesomeIcon 
            icon={category.icon} 
            color={selectedCategory === category.name ? "#ffffff" : "#111"} 
          />
          <ButtonText className={selectedCategory === category.name ? "text-white ml-2" : "ml-2"}>
            {category.name}
          </ButtonText>
        </Button>
      ))}
    </HStack>
  </ScrollView>
);

export default CategoryFilter;
