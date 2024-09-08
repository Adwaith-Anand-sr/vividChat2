import React, { useEffect, useState } from "react";
import { useSocket } from "../context/socketContext.js";

const useOnReceiveMessageResponse = ({ setMessages, chatPartnerId, messages, chatId, userId }) => {
	const socket = useSocket();

	useEffect(() => {
		if (!socket || !setMessages || !chatPartnerId || !userId || !messages || !chatId) return;
		const handleReceiveMessageResponse = ({ chat }) => {
			if (chat && chatId === chat.chatId) {
				setMessages(prevMessages =>
					prevMessages.map(message => {
						if (message.sender === userId && message.status === "sent") {
							return { ...message, status: "delivered" };
						}
						return message;
					})
				);
			}

			const handleSeenMessages = messages => {
				messages?.forEach(message => {
					if (message.status !== "read") {
						socket.emit("messageSeened", {
							chatId,
							userId,
							chatPartnerId
						});
					}
				});
			};
			handleSeenMessages(messages);
		};

		socket.on("receiveMessageResponse", handleReceiveMessageResponse);
	}, [socket, setMessages, chatId]);
};

export default useOnReceiveMessageResponse;
