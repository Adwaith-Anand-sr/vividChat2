import { Stack } from "expo-router";
import { SocketProvider } from "../context/socketContext.js";
import { UsersProvider } from "../context/allUsersContext.js";

export default function RootLayout() {
	return (
		<SocketProvider>
			<UsersProvider>
				<Stack>
					<Stack.Screen name="index" options={{ headerShown: false }} />
					<Stack.Screen name="Auth" options={{ headerShown: false }} />
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen
						name="others/AllUsers"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="chat/[id]"
						options={{ headerShown: false }}
					/>
				</Stack>
			</UsersProvider>
		</SocketProvider>
	);
}
