import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import Health from "../controller/server/healthCheck.js";

const index = () => {
	const [authToken, setAuthToken] = useState(null);
	const [reconnectAttempts, setReconnectAttempts] = useState(0);
	const [statusMessage, setStatusMessage] = useState(null);

	useEffect(() => {
		const fetchAuthToken = async () => {
			let token = await AsyncStorage.getItem("token");
			setAuthToken(token);
		};
		fetchAuthToken();
	}, []);

	useEffect(() => {
		if (reconnectAttempts < 1) return;
		if (reconnectAttempts > 10) {
			setStatusMessage(
				<Text className="text-red-500 text-center font-black">
					server down!!! {'\n'}
					contact developer for further help. {'\n\n'}
					email: <Text className='text-green-500'>adwaithanand1818@gmail.com</Text>
				</Text>
			);
		}else{
		setStatusMessage(
			<Text className="text-red-500 font-black">
				trying to reconnect({reconnectAttempts})...
			</Text>
		);
		}
	}, [reconnectAttempts]);

	useEffect(() => {
		let healthTimeout;
		const fetchServerHealth = async () => {
			const health = await Health();
			if (health != 200) {
				healthTimeout = setTimeout(() => {
					setReconnectAttempts(prev => prev + 1);
					fetchServerHealth();
				}, 8000);
			}
			else{
			   if(authToken) router.replace('(tabs)')
			   else router.replace('Auth')
			}
		};
		fetchServerHealth();
		

		return () => {
			clearTimeout(healthTimeout);
		};
	}, [authToken]);

	return (
		<SafeAreaView>
			<View className="bg-zinc-950 w-full h-full flex justify-center items-center">
				<Text className="text-white text-7xl font-black">VividChat</Text>
			</View>
			<View className="absolute top-[80vh] w-full h-[10vh] flex items-center justify-center">
				{statusMessage}
			</View>
		</SafeAreaView>
	);
};

export default index;
