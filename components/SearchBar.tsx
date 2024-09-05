import React from "react";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch, faSliders } from "@fortawesome/free-solid-svg-icons";
import { Pressable, View } from "react-native";

const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <HStack className="gap-4 py-3">
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
          <FontAwesomeIcon icon={faSearch} color="#ccc" testID="search-icon" />
        </View>
      </InputSlot>
      <InputField 
        placeholder="Search clothes..." 
        value={searchQuery} 
        onChangeText={setSearchQuery} 
      />
    </Input>
    <Pressable
      className="rounded-lg w-14 bg-chosen-1 color-chosen-4 justify-center items-center border border-outline-300"
      testID="filter-button"
    >
      <FontAwesomeIcon icon={faSliders} color="#ffffff" testID="filter-icon" />
    </Pressable>
  </HStack>
);

export default SearchBar;
