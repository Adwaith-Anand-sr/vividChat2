import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import formatTime from "../../utils/chat/formatTime.js";

const ChatItem = ({ item, userId, onLayout }) => {
	return (
		<View
			onLayout={event => onLayout(event, item.id)}
			style={[
				{
					justifyContent:
						item.sender === userId ? "flex-end" : "flex-start"
				}
			]}
			className="w-full flex-row min-h-[6vh] px-2 my-2 items-center">
			{item.sender !== userId ? (
				<View className="px-3 py-3 rounded-lg min-w-[25vw] max-w-[80vw] bg-zinc-800">
					<Text className="text-white text-[4vw]">{item.message}</Text>
					<Text className="text-white text-right text-[2.35vw]">
						{formatTime(item.createdAt)}
					</Text>
				</View>
			) : (
				<View className="px-3 py-3 mr-2 rounded-lg max-w-[80vw] min-w-[25vw] bg-zinc-800">
					<Text className="text-white text-[4vw]">{item.message}</Text>
					<View className="flex-row justify-end items-center gap-1">
						<Text className="text-white mt-1 text-right text-[2.35vw]">
							{formatTime(item.createdAt)}
						</Text>
						{item.status === "sent" ? (
							<AntDesign name="check" size={13} color="white" />
						) : item.status === "delivered" ? (
							<Ionicons name="checkmark-done" size={13} color="white" />
						) : (
							<Ionicons
								name="checkmark-done"
								size={13}
								color="rgb(37, 99, 235)"
							/>
						)}
					</View>
				</View>
			)}
		</View>
	);
};

export default ChatItem;
