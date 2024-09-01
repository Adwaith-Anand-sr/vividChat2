import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserItem = ({ item }) => {
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			const user = await AsyncStorage.getItem("userId");
			if (user) setUserId(user);
		};
		fetchUser();
	}, []);

	const handleClick = dets => {
		if (!userId) return;
		if (dets.participants[0]._id === userId)
			router.push(`chat/${dets.participants[1]._id}`);
		else router.push(`chat/${dets.participants[0]._id}`);
	};

	const blurhash =
		"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

	return (
		<TouchableOpacity onPress={() => handleClick(item)}>
			<View className="flex-row items-center py-6 pl-3">
				<View className="w-[10vw] h-[10vw] rounded-xl overflow-hidden mx-3">
					<Image
						className="w-full h-full"
						source={require("../../assets/images/man-is-standing-front-computer-screen-with-man-purple-shirt_1108514-60863.jpg")}
						contentFit="cover"
						placeholder={{ blurhash }}
						transition={250}
					/>
				</View>

				{item?.participants.length > 0 ? (
					<Text className="text-white text-[4.85vw] font-black capitalize tracking-tight">
						{item.participants[0]._id === userId
							? item.participants[1].username
							: item.participants[0].username}
					</Text>
				) : (
					<LottieView
						source={require("../../assets/animations/usernameLoadAnim.json")}
						autoPlay
						style={{ width: 35, height: 35 }}
						loop
					/>
				)}
			</View>
		</TouchableOpacity>
	);
};

export default UserItem;
