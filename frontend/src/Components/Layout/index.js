import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, redirect, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import Menubar from "./Menubar/Menubar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import SendMessage from "../messages/SendMessage";
import ReceivedMessage from "../messages/ReceivedMessage";

const Layout = ({ children, ...props }) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState(null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    // const [messages, setMessages] = useState([]);
    const userId = "643b819c6effc1fc545aa11b";
    // let accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
       setAccessToken(localStorage.getItem("accessToken"))
        if (!accessToken) {
            navigate("/login");
        }

        axios({
            method: "get",
            url: "http://localhost:5000/api/v1/user-list",

            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        }).then(function (response) {
            // console.log(response.data.data);
            setUsers(response.data.data);
        });
    }, []);

    return (
        <>
            <Menubar />

            <Sidebar users={users} />

            <div className="p-4 sm:ml-64">
                <div className="p-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Layout;
