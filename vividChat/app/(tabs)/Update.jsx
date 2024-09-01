import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import Header from '../../components/home/Header.jsx'

const Update = () => {
	return (
		<SafeAreaView>
		   <Header />
			<View className="w-full flex justify-center items-center  h-full bg-zinc-950">
				<Text className="text-white">Updates</Text>
			</View>
		</SafeAreaView>
	);
};

export default Update;
