import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Layout from "./Components/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Messages from "./Components/messages/Messages";

function App() {
    return (
        <BrowserRouter>
            {/* <Layout> */}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />}/>
                    <Route path="/:id" element={<Messages />}/>
                </Route>
            </Routes>
            {/* </Layout> */}
        </BrowserRouter>
    );
}

export default App;
