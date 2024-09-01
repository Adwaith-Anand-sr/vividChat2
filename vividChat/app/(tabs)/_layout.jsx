import { FontAwesome, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View, Text } from "react-native";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				lazy: false,
				tabBarShowLabel: false,
				tabBarInactiveTintColor: "rgb(210,215,210)",
				tabBarActiveTintColor: "white",
				tabBarStyle: {
					backgroundColor: "black",
					height: 70
				}
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Chats",
					headerShown: false,
					tabBarIcon: ({ focused, color }) => (
						<View className="flex gap-2 items-center">
							{focused ? (
								<FontAwesome name="comment" size={26} color={color} />
							) : (
								<FontAwesome size={26} name="comment-o" color={color} />
							)}
							<Text className="text-white">Chat</Text>
						</View>
					)
				}}
			/>
			<Tabs.Screen
				name="Update"
				options={{
					title: "Updates",
					headerShown: false,
					tabBarIcon: ({ focused, color }) => (
						<View className="flex items-center gap-2">
							{!focused ? (
								<Ionicons
									name="sparkles-outline"
									size={23}
									color={color}
								/>
							) : (
								<Ionicons name="sparkles" size={23} color={color} />
							)}
							<Text className="text-white">Updates</Text>
						</View>
					)
				}}
			/>
			<Tabs.Screen
				name="Global"
				options={{
					title: "Global",
					headerShown: false,
					tabBarIcon: ({ focused, color }) => (
						<View className="flex gap-2 items-center">
							{focused ? (
								<MaterialCommunityIcons
									name="account-group"
									size={28}
									color={color}
								/>
							) : (
								<MaterialCommunityIcons
									name="account-group-outline"
									size={28}
									color={color}
								/>
							)}
							<Text className="text-white">Global</Text>
						</View>
					)
				}}
			/>
		</Tabs>
	);
}
