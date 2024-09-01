import React, { useEffect, useState } from "react";
import { useSocket } from "../context/socketContext.js";

const useFetchChatPartner = id => {
	const socket = useSocket();
	const [user, setUser] = useState([]);

	useEffect(() => {
		if (!socket || !id) return;
		const handleFetchUserRes = user => {
			if (user) setUser(user);
		};
		socket.emit("getUser", id);
		socket.on("getUserResponse", handleFetchUserRes);
		return () => {
			socket.off("getUserResponse", handleFetchUserRes);
		};
	}, [socket, id]);

	return user;
};

export default useFetchChatPartner;
