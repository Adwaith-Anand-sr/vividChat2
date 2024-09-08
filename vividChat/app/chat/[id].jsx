import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";

import Top from "../../components/chat/Top.jsx";
import Footer from "../../components/chat/Footer.jsx";
import ChatItem from "../../components/chat/ChatItem.jsx";

import { useSocket } from "../../context/socketContext.js";
import useFetchChatPartner from "../../hooks/useFetchChatPartner.js";
import useGetChatMessages from "../../hooks/useGetChatMessages.js";
import useOnReceiveMessage from "../../hooks/useOnReceiveMessage.js";
import useMessageSeenedResponse from "../../hooks/useOnMessageSeenedResponse.js";
import useOnReceiveMessageResponse from "../../hooks/useOnReceiveMessageResponse.js";

const Chat = () => {
	const socket = useSocket();
	const LIMIT = 10;
	const { id } = useLocalSearchParams();
	const chatPartnerId = id;
	const chatPartner = useFetchChatPartner(chatPartnerId);

	const [userId, setUserId] = useState(null);
	const [chatId, setChatId] = useState(null);
	const [message, setMessage] = useState(null);
	const [messages, setMessages] = useState([]);
	const [page, setPage] = useState(1);
	const [itemHeights, setItemHeights] = useState({});
	const [initialLoad, setInitialLoad] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			let id = await AsyncStorage.getItem("userId");
			if (id) setUserId(id);
		};
		fetchUser();
	}, []);

	useEffect(() => {
		if (chatPartnerId && userId) {
			const id = [userId, chatPartnerId].sort().join("_");
			if (id) setChatId(id);
		}
	}, [chatPartnerId, userId]);

	useEffect(() => {
		setTimeout(() => {
			if (initialLoad) setInitialLoad(false);
		}, 2500);
	});

	const { chats, loading, hasMore } = useGetChatMessages({
		chatId,
		page,
		LIMIT
	});

	useOnReceiveMessage({ setMessages });
	useMessageSeenedResponse({ setMessages, chatId, userId });
	useOnReceiveMessageResponse({ setMessages, chatPartnerId, messages, chatId, userId });

	useEffect(() => {
		if (chats && chats.length > 0) {
			setMessages(prevMessages => {
				const existingDataIds = new Set(prevMessages?.map(item => item._id));
				const filteredNewData = chats
					.filter(item => !existingDataIds.has(item._id)) // Filter out existing data
					.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort by timestamp in descending order
				return [...prevMessages, ...filteredNewData];
			});
		}
	}, [chats]); //setMessages

	useEffect(() => {
		if (!chats || !chatId || !userId || !socket) return;
		const handleSeenMessages = messages => {
			messages?.forEach(message => {
				if (message.status !== "read") {
					socket.emit("messageSeened", { chatId, userId, chatPartnerId });
				}
			});
		};
		handleSeenMessages(messages)
	}, [chats]);

	const loadMoreMessages = () => {
		if (hasMore) {
			setPage(prev => prev + 1);
		}
	};
	const onLayout = (event, id) => {
		const { height } = event.nativeEvent.layout;
		setItemHeights(prev => ({ ...prev, [id]: height }));
	};
	const getEstimatedItemSize = () => {
		const sizes = Object.values(itemHeights);
		if (sizes.length === 0) {
			return 60;
		}
		const averageSize = sizes.reduce((a, b) => a + b, 0) / sizes.length;
		const margin = 10;
		return averageSize + margin;
	};

	return (
		<SafeAreaView>
			<View className="w-full h-full bg-zinc-950">
				<Top chatPartner={chatPartner} />
				<View
					className="flex-1"
					style={[
						{
							opacity: initialLoad ? 0 : 1
						}
					]}>
					<FlashList
						data={messages}
						renderItem={({ item }) => (
							<ChatItem
								item={item}
								userId={userId}
								onLayout={onLayout}
							/>
						)}
						estimatedItemSize={getEstimatedItemSize()}
						onEndReachedThreshold={0.86}
						onEndReached={loadMoreMessages}
						inverted
					/>
				</View>
				<Footer
					setMessage={setMessage}
					userId={userId}
					chatId={chatId}
					chatPartnerId={chatPartnerId}
					message={message}
					setMessages={setMessages}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Chat;
