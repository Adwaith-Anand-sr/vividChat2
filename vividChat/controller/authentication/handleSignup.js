import axios from "axios";
import Constants from "expo-constants";
const api = Constants?.expoConfig?.extra?.serverApi;
import AsyncStorage from "@react-native-async-storage/async-storage";

const handleSignup = async (username, email, password) => {
	const data = {
		username,
		email,
		password
	};
	try {
		const res = await axios.post(`${api}/auth/signup`, data);
		if (res.status === 200 && res.data.success === true) {
		   AsyncStorage.setItem('token', res.data.token)
		   AsyncStorage.setItem('userId', res.data.userId)
		   AsyncStorage.setItem('username', res.data.username)
		   return true;
		} else if (res.data.message === "USER_EXISTS") return res.data.message;
	} catch (err) {
		console.log("signup error : ", err);
		return err.message;
	}
};

export default handleSignup;
