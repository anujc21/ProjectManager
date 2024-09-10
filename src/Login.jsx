import React from "react";
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import {Box, Card, Typography, Button} from "@mui/material";

function Login({setUser, setLoggedIn}){
	function handleLogin(){
		const provider = new GoogleAuthProvider();

		const auth = getAuth();

		signInWithPopup(auth, provider).then((result) => {
			const credential = GoogleAuthProvider.credentialFromResult(result);

    		const token = credential.accessToken;

			const user = result.user;

			setUser(user);

			setLoggedIn(true);
		}).catch((error) => {
			console.log(error);
		});
	}

	return (
		<Box style={{
			margin: "5px 0px 5px 0px",
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexGrow: "1",
			flexDirection: "row",
			flexWrap: "wrap",
			overflowY: "auto",
			padding: "20px 10px"
		}}>
			<Card style={{
				width: "300px",
				maxWidth: "90%",
				height: "200px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column"
			}}>
				<Typography variant="h6" style={{
					margin: "-25px 0px 0px 0px"
				}}>
					Login
				</Typography>

				<Button variant="contained" onClick={handleLogin} style={{
					margin: "10px 0px 0px 0px"
				}}>
					Login with Google
				</Button>
			</Card>
		</Box>
	);
}

export default Login;