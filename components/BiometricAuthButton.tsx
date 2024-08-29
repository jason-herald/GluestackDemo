import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const BiometricAuthButton = ({ onAuthenticate }) => (
  <View className="flex-1 justify-center items-center">
    <TouchableOpacity
      style={{
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
      }}
      onPress={onAuthenticate}
    >
      <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Login with Face ID</Text>
    </TouchableOpacity>
  </View>
);

export default BiometricAuthButton;
