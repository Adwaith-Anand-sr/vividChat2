import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";

import Header from "../../components/home/Header.jsx";
import UserItem from "../../components/others/UserItem.jsx";

import useFetchUsers from "../../hooks/useFetchUsers.js";

const AllUsers = () => {
	const LIMIT = 2;
	const { allUsers, hasMore, setPage } = useFetchUsers(LIMIT);

	const loadMoreUsers = () => {
		if (hasMore) {
			setPage(prev => prev + 1);
		}
	};
	

	return (
		<SafeAreaView>
			<Header />
			<View className="w-full h-full bg-zinc-950">
				<FlashList
					data={allUsers}
					renderItem={({ item }) => <UserItem item={item} />}
					estimatedItemSize={200}
					onEndReachedThreshold={0.86}
					onEndReached={loadMoreUsers}
				/>
			</View>
		</SafeAreaView>
	);
};

export default AllUsers;
