import React, { createContext, useState, useContext } from "react";

const allUsersContext = createContext();

export const UsersProvider = ({ children }) => {
	const [allUsers, setAllUsers] = useState([]);
	const [chatList, setChatList] = useState([]);
	const [hasMore, setHasMore] = useState(true);
   const [page, setPage] = useState(1);
   
	return (
		<allUsersContext.Provider value={{ allUsers, setAllUsers, hasMore, setHasMore, page, setPage, chatList, setChatList }}>
			{children}
		</allUsersContext.Provider>
	);
};

export const useUsers = () => useContext(allUsersContext);
