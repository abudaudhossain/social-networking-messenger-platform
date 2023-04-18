import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Layout from "./Components/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Messages from "./Components/messages/Messages";

import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

function App() {
    return (
        <BrowserRouter>
            {/* <Layout> */}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Layout socket={socket} />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/:id" element={<Messages socket={socket} />} />
                </Route>
            </Routes>
            {/* </Layout> */}
        </BrowserRouter>
    );
}

export default App;
