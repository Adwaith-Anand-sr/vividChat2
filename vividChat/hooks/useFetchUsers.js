import { useEffect } from "react";
import { useSocket } from "../context/socketContext.js";
import { useUsers } from "../context/allUsersContext.js";

const useFetchUsers = LIMIT => {
	const socket = useSocket();
	const { allUsers, setAllUsers, hasMore, setHasMore, page, setPage } =
		useUsers();

	useEffect(() => {
		if (!socket || page === undefined || LIMIT === undefined || !hasMore) return;

		const handleGetAllUsersResponse = users => {
			setPage(prev => prev + 1);
			const existingUserIds = new Set(allUsers.map(user => user._id));
			const uniqueUsers = users.filter(
				user => !existingUserIds.has(user._id)
			);
			setAllUsers(prev => [...prev, ...uniqueUsers]);
			if (users.length < LIMIT) {
				setHasMore(false);
			}
		};
      if(hasMore)
		   socket.emit("getAllUsers", { page, limit: LIMIT });
		socket.on("getAllUsersResponse", handleGetAllUsersResponse);

		return () => {
			socket.off("getAllUsersResponse", handleGetAllUsersResponse);
		};
	}, [socket, page, LIMIT, setAllUsers, setHasMore]);

	return { allUsers, hasMore, setPage };
};

export default useFetchUsers;
