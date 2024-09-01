import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Top from "../../components/chat/Top.jsx";
import Footer from "../../components/chat/Footer.jsx";

import useFetchChatPartner from "../../hooks/useFetchChatPartner.js";
import generateChatId from "../../utils/chat/generateChatId.js";

const Chat = () => {
	const { id } = useLocalSearchParams();
	const chatPartnerId = id;
	const chatPartner = useFetchChatPartner(chatPartnerId);

	const [userId, setUserId] = useState(null);
	const [chatId, setChatId] = useState(null);
	const [message, setMessage] = useState(null);
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const fetchUser = async () => {
			let id = await AsyncStorage.getItem("userId");
			if (id) setUserId(id);
		};
		fetchUser();
	}, []);
	
	useEffect(() => {
	   if(chatPartnerId && userId){
	      const id = [userId, chatPartnerId].sort().join('_')
	      if(id) setChatId(id);
	   }
	}, [chatPartnerId, userId])
	

	return (
		<SafeAreaView>
			<View className="w-full h-full bg-zinc-950">
				<Top chatPartner={chatPartner} />
				<View className="flex-1 bg-green-500"></View>
				<Footer
					setMessage={setMessage}
					userId={userId}
					chatId={chatId}
					chatPartnerId={chatPartnerId}
					message={message}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Chat;
