import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const Header = () => {
	return (
		<View className="w-full h-[8vh] pt-1 px-3 flex-row items-center justify-between bg-zinc-950">
			<Text className="font-black tracking-tight text-white text-3xl">
				VividChat
			</Text>
			<View className="flex-row items-center justify-end h-full">
				<TouchableOpacity className="w-[10vw] h-[70%] flex justify-center items-center">
					<Ionicons name="settings-outline" size={24} color="white" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Header;
