import React, {useState} from "react";
import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";
import {createTheme, ThemeProvider, CssBaseline, Box} from "@mui/material";
import Header from "./Header.jsx";
import Login from "./Login";
import Projects from "./Projects";
import Footer from "./Footer.jsx";
import "./App.css";

const app = initializeApp({
    apiKey: "AIzaSyCK6QoQccSSqoEw3ze15MfcTgQSkoG3RSY",
    authDomain: "ultra-project-manager.firebaseapp.com",
    databaseURL: "https://ultra-project-manager-default-rtdb.firebaseio.com",
    projectId: "ultra-project-manager",
    storageBucket: "ultra-project-manager.appspot.com",
    messagingSenderId: "932735869069",
    appId: "1:932735869069:web:2026c8942585730e5402c4"
});

const db = getDatabase(app);

const theme = createTheme({
    palette: {
        primary: {
            main: "#e91e63"
        },
        secondary: {
            main: "#ed4b82"
        },
        text: {
            primary: "#000",
            secondary: "#ed4b82"
        }
    }
});

function App(){
    const [loggedIn, setLoggedIn] = useState(false);

    const [user, setUser] = useState({});

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>

            <Box style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                flexDirection: "column"
            }}>
                <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser}/>

                {!loggedIn && 
                    <Login setUser={setUser} setLoggedIn={setLoggedIn}/>
                }

                {loggedIn && 
                    <Projects db={db} user={user}/>
                }

                <Footer/>
            </Box>
        </ThemeProvider>
    );
}

export default App;