import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import { router } from "expo-router";
import LottieView from "lottie-react-native";

const Top = ({ chatPartner }) => {
	const blurhash =
		"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

	return (
		<View className="w-full h-[9vh] flex-row items-center pt-2 px-1">
			<TouchableOpacity onPress={() => router.back()}>
				<View className="w-[10vw] h-[10vw] flex rounded-full justify-center items-center ">
					<Entypo name="chevron-left" size={24} color="white" />
				</View>
			</TouchableOpacity>
			<View className="w-[10vw] h-[10vw] rounded-full overflow-hidden mx-2">
				<Image
					className="w-full h-full"
					source={require("../../assets/images/man-is-standing-front-computer-screen-with-man-purple-shirt_1108514-60863.jpg")}
					contentFit="cover"
					placeholder={{ blurhash }}
					transition={900}
				/>
			</View>
			{chatPartner?.username ? (
				<Text className="text-white text-2xl font-black tracking-tighter">
					{chatPartner.username}
				</Text>
			) : (
				<LottieView
					source={require("../../assets/animations/usernameLoadAnim.json")}
					autoPlay
					style={{ width: 80, height: 80 }}
					loop
				/>
			)}
		</View>
	);
};

export default Top;
