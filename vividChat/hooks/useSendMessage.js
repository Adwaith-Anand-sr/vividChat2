import React, { useEffect } from "react";
import { useSocket } from "../context/socketContext.js";

const useSendMessage = chat => {
	const socket = useSocket();

	useEffect(() => {
		if (!socket) return;
		console.log('sending message...')
		if (chat) socket.emit("sendMessage", chat);

		const handleSendMessageRes = () => {};
		socket.on("sendMessageResponse", handleSendMessageRes);
		return () => {
			socket.off("sendMessageResponse", handleSendMessageRes);
		};
	}, [chat, socket]);
};

export default useSendMessage;
