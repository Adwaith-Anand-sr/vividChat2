import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";

import Header from "../../components/home/Header.jsx";
import AllUsersIcon from "../../components/home/AllUsersIcon.jsx";
import UserItem from "../../components/home/UserItem.jsx";

import { useUsers } from "../../context/allUsersContext.js";
import useGetUserChats from "../../hooks/useGetUserChats.js";
const Chat = () => {
	const [userId, setUserId] = useState(null);
	const { chatList, setChatList } = useUsers();

	useGetUserChats({ userId });

	useEffect(() => {
		const fetchUser = async () => {
			const user = await AsyncStorage.getItem("userId");
			if (user) setUserId(user);
		};
		fetchUser();
	}, []);

	return (
		<SafeAreaView>
			<Header />
			<View className="w-full h-full bg-zinc-950">
				<FlashList
					data={chatList}
					renderItem={({ item }) => <UserItem item={item} />}
					estimatedItemSize={200}
				/>
			</View>
			<AllUsersIcon />
		</SafeAreaView>
	);
};

export default Chat;
