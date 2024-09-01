import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const AllUsersIcon = () => {
	return (
		<View className="absolute z-50 right-[5vw] top-[85%] w-[12vw] h-[12vw] rounded-lg bg-green-500">
			<TouchableOpacity
				className="w-full h-full flex items-center justify-center"
				onPress={() => {
					router.push("others/AllUsers");
				}}>
				<AntDesign name="adduser" size={24} color="white" />
			</TouchableOpacity>
		</View>
	);
};

export default AllUsersIcon;
