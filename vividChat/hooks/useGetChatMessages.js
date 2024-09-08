import React, { useEffect, useState, useCallback } from "react";
import { useSocket } from "../context/socketContext.js";

const useGetChatMessages = ({ chatId, page, LIMIT }) => {
	const [chats, setChats] = useState([]);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const socket = useSocket();

	const fetchData = useCallback(() => {
		if (!socket || !chatId) return;
		setLoading(true);
		socket.emit("getChatMessages", { chatId, page, LIMIT });
	}, [socket, chatId, page, LIMIT]);

	useEffect(() => {
		if (!socket) return;

		const handleDataResponse = newData => {
			setLoading(false);
			if (newData && newData.length > 0) {
				setChats(prevData => {
					const existingDataIds = new Set(prevData.map(item => {if(item) return item._id}));
					const filteredNewData = newData.filter(
						item => !existingDataIds.has(item?._id)
					).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
					return [...prevData, ...filteredNewData];
				});
				setHasMore(newData.length === LIMIT);
			} else {
				setHasMore(false);
			}
		};

		socket.on("getChatMessagesResponse", handleDataResponse);

		return () => {
			socket.off("getChatMessagesResponse", handleDataResponse);
		};
	}, [socket, LIMIT]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { chats, loading, hasMore };
};

export default useGetChatMessages;
