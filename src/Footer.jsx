import React from "react";
import {Box, Typography} from "@mui/material";

function Footer(){
	return (
		<Box style={{
			width: "100%",
			height: "40px",
			background: "#e91e63",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			color: "#fff"
		}}>
			<Typography variant="body1">
				ProjectManager 2024 © Anuj Chowdhury
			</Typography>
		</Box>
	);
}

export default Footer;