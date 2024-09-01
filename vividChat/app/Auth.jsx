import React, { useRef, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import handleSignup from "../controller/authentication/handleSignup.js";
import handleLogin from "../controller/authentication/handleLogin.js";
import Login from "../components/authentication/Login.jsx";
import Signup from "../components/authentication/Signup.jsx";

const Auth = () => {
	const [isNewUser, setIsNewUser] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [statusMessage, setStatusMessage] = useState(null);
	const passwordInputRef = useRef(null);
	const userNameInputRef = useRef(null);

	const handleUsernameChange = text => {
		const formattedText = text.toLowerCase().replace(/\s+/g, "");
		setUsername(formattedText);
	};
	const handlePasswordChange = pass => {
		setPassword(pass);
	};
	const handleEmailChange = email => {
		setEmail(email);
	};

	const handleLoginSubmit = async e => {
		setStatusMessage(<Text className="text-yellow-500">please wait..</Text>);
		if (!username.trim() || !password.trim()) {
			setStatusMessage(
				<Text className="text-red-500">All fields are required!</Text>
			);
			return;
		}

		const res = await handleLogin({username, password});
		if (res === true) {
			setStatusMessage(
				<Text className="text-green-500">signin successfull.</Text>
			);
			router.replace("(tabs)");
		} else if (res === "INVALID_CREDENTIAL")
			setStatusMessage(
				<Text className="text-red-500">Invalid username or password!</Text>
			);
		else setStatusMessage(<Text className="text-red-500">{res}</Text>);
	};

	const handleSignupSubmit = async e => {
		setStatusMessage(<Text className="text-yellow-500">please wait..</Text>);
		if (!username.trim() || !email.trim() || !password.trim()) {
			setStatusMessage(
				<Text className="text-red-500">All fields are required!</Text>
			);
			return;
		}

		//email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setStatusMessage(
				<Text className="text-red-500">please enter a valid email.</Text>
			);
			return;
		}
		if(username.trim().length <5 || password.trim().length <5 ){
		   setStatusMessage(
				<Text className="text-red-500">username and password must have atleast 5 characters.</Text>
			);
			return ;
		}
		
		
		const res = await handleSignup(username, email, password);
		if (res === true) {
			setStatusMessage(
				<Text className="text-green-500">User signed up successfully!</Text>
			);
			router.replace("(tabs)");
		} else if (res === "USER_EXISTS")
			setStatusMessage(
				<Text className="text-red-500">Username already exists!</Text>
			);
		else setStatusMessage(<Text className="text-red-500">{res}</Text>);
	};

	return (
		<>
			<SafeAreaView>
				<StatusBar style="light" backgroundColor="black" />
				{!isNewUser ? (
					<Login
						statusMessage={statusMessage}
						password={password}
						handleLoginSubmit={handleLoginSubmit}
						username={username}
						passwordInputRef={passwordInputRef}
						handlePasswordChange={handlePasswordChange}
						handleUsernameChange={handleUsernameChange}
						setIsNewUser={setIsNewUser}
						setStatusMessage={setStatusMessage}
					/>
				) : (
					<Signup
						userNameInputRef={userNameInputRef}
						email={email}
						handleEmailChange={handleEmailChange}
						passwordInputRef={passwordInputRef}
						username={username}
						handleUsernameChange={handleUsernameChange}
						handleSignupSubmit={handleSignupSubmit}
						password={password}
						handlePasswordChange={handlePasswordChange}
						statusMessage={statusMessage}
						setIsNewUser={setIsNewUser}
						setStatusMessage={setStatusMessage}
					/>
				)}
			</SafeAreaView>
		</>
	);
};

export default Auth;
