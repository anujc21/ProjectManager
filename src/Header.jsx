import React from "react";
import {AppBar, Toolbar, Typography, Icon, Button} from "@mui/material";

function Header({loggedIn, setLoggedIn, setUser}){
	return (
		<AppBar position="static" style={{
			margin: "0px 0px"
		}}>
			<Toolbar>
				<Icon className="material-symbols-outlined" style={{
					color: "#fff",
					margin: "0px 4px 0px 0px",
					fontVariationSettings: "'FILL' 1"
				}}>
					add_task
				</Icon>

				<Typography variant="h6" style={{
					color: "#fff"
				}}>
					ProjectManager
				</Typography>

				{loggedIn &&
					<Button variant="contained" color="secondary" onClick={() => {setUser({}); setLoggedIn(false)}} style={{
						margin: "0px 0px 0px auto"
					}}>
						Logout
					</Button>
				}
			</Toolbar>
		</AppBar>
	);
}

export default Header;