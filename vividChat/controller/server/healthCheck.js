import axios from "axios";
import Constants from "expo-constants";

const Health = async () => {
	const api = Constants?.expoConfig?.extra?.serverApi;
	if (!api) return 500;
	try {
		const res = await axios.get(`${api}/health`);
		return res.status;
	} catch (err) {
		console.log(err);
		return 500;
	}
};

export default Health;
