import axios from "axios";
import Constants from "expo-constants";
const api = Constants?.expoConfig?.extra?.serverApi;
import AsyncStorage from "@react-native-async-storage/async-storage";

const handleLogin = async ({ username, password }) => {
	const data = {
		username: username.trim(),
		password: password.trim()
	};
	try {
		const res = await axios.post(`${api}/auth/login`, data);
		if(res.data.message === 'INVALID_CREDENTIAL') return res.data.message;
		else if(res.status === 200 && res.data.success === true){
		   AsyncStorage.setItem('token', res.data.token)
		   AsyncStorage.setItem('userId', res.data.userId)
		   AsyncStorage.setItem('username', res.data.username) 
		   return true
		}
	} catch (err) {
		console.log("login error :", err);
		return err.message;
	}
};

export default handleLogin;
