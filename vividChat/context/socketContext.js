import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SocketContext = createContext();

export const useSocket = () => {
	return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [user, setUser] = useState(null);
	
	useEffect(()=>{
	   const fetchUser = async()=>{
	      let usr = await AsyncStorage.getItem('userId');
	      if(usr) setUser(usr);
	   }
	   fetchUser()
	})
	
	const api = Constants?.expoConfig?.extra?.serverApi;
   
	useEffect(() => {
		const newSocket = io(`${api}`, {
			transports: ["websocket"]
		});

		newSocket.on("connect", () => {
			newSocket.emit("join", { userId: user }); 
		});
		setSocket(newSocket);
		return () => newSocket.close();
	}, [user]);

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};
