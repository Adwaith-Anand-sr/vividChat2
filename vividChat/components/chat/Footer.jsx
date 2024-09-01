import React, { useEffect, useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import useSendMessage from '../../hooks/useSendMessage.js';

const Footer = ({ message, setMessage, userId, chatId, chatPartnerId }) => {
	const TextInputRef = useRef();
   const [chat, setchat] = useState(null)
   
   useSendMessage(chat)
   
	const handleSendMessage = () => {
	   if(!message || !userId || !chatId || !chatPartnerId || message.trim().length <1) return;
	   let msg = {
	      message,
	      chatId,
         sender: userId,
         receiver: chatPartnerId
	   };
	   setMessage(null)
	   setchat(msg)
	};

	return (
		<View className="fixed w-full min-h-[8vh] max-h-[10vh] flex-row justify-between items-center">
			<TextInput
				onChangeText={text => setMessage(text)}
				ref={TextInputRef}
				value={message}
				multiline={true}
				placeholder="message"
				placeholderTextColor="white"
				className="bg-zinc-400 text-[4vw] text-white w-[80%] rounded-lg px-3 ml-1 py-1"
				allowFontScaling={false}
			/>
			<TouchableOpacity
				onPress={handleSendMessage}
				className="w-[10vw] h-[10vw] bg-green-600 rounded-full mr-2 flex justify-center items-center">
				<Ionicons name="send" size={18} color="white" />
			</TouchableOpacity>
		</View>
	);
};

export default Footer;
