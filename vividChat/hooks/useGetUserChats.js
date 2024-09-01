import React, { useEffect, useState } from "react";
import { useSocket } from "../context/socketContext.js";
import { useUsers } from "../context/allUsersContext.js";

const useGetUserChats = ({ userId }) => {
	const socket = useSocket();

	const { chatList, setChatList } = useUsers();

	useEffect(() => {
		if (!socket) return;
		if (userId) socket.emit("getUserChats", userId);

		const handleUserChatRes = newChats => {
			if (newChats && newChats.length > 0) {
				setChatList(newChats);
			}
		};

		socket.on("getUserChatsResponse", handleUserChatRes);
		return () => {
			socket.off("getUserChatsResponse", handleUserChatRes);
		};
	}, [socket, userId]);

};

export default useGetUserChats;
