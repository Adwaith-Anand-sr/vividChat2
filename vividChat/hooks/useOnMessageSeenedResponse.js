import React, { useEffect } from "react";
import { useSocket } from "../context/socketContext.js";

const useMessageSeenedResponse = ({ setMessages, chatId, userId }) => {
	const socket = useSocket();

	useEffect(() => {
		if (!socket || !setMessages || !chatId) return;
		const handleMessageSeenedResponse = ({ chatIdRes }) => {
			if (chatIdRes === chatId) {
				setMessages(prevMessages =>
					prevMessages.map(message => {
						if (message.sender === userId && message.status !== "read") {
							return { ...message, status: "read" };
						}
						return message;
					})
				);
			}
		};
		socket.on("messageSeenedResponse", handleMessageSeenedResponse);
	}, [socket, setMessages, chatId]);
};

export default useMessageSeenedResponse;
