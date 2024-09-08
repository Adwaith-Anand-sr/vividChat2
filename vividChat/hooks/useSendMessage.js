import React, { useEffect } from "react";
import { useSocket } from "../context/socketContext.js";

const useSendMessage = ({chat, setMessages}) => {
	const socket = useSocket();

	useEffect(() => {
		if (!socket || !chat || !setMessages) return;
		if (chat){
		   socket.emit("sendMessage", chat);
		   setMessages(prev => [chat, ...prev])
		}
	}, [chat, socket]);
};

export default useSendMessage;
