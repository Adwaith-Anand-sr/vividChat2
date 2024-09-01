import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import LottieView from "lottie-react-native";

const UserItem = ({ item }) => {
	const handleClick = userId => {
		router.push(`chat/${userId}`);
	};

	const blurhash =
		"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

	return (
		<TouchableOpacity onPress={() => handleClick(item._id)}>
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

				{item?.username ? (
					<Text className='text-white text-[4.85vw] font-black capitalize tracking-tight'>{item.username}</Text>
				) : (
					<LottieView
						source={require("../../assets/animations/usernameLoadAnim.json")}
						autoPlay
						style={{ width: 80, height: 30 }}
						loop
					/>
				)}
			</View>
		</TouchableOpacity>
	);
};

export default UserItem;
