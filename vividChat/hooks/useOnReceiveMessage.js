import React, { useEffect } from "react";
import { useSocket } from "../context/socketContext.js";

const useOnReceiveMessage = ({setMessages}) => {
	const socket = useSocket();

	useEffect(() => {
		if (!socket || !setMessages) return;
		const handleReceiveMessage = (newChat)=>{
		   setMessages(prev=> [newChat, ...prev]);
		}
		socket.on("receiveMessage", handleReceiveMessage);
	}, [socket]);
};

export default useOnReceiveMessage;
