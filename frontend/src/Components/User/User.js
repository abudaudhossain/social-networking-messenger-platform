import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const User = ({ userApp, socket }) => {
    const { name, userProfileId, profilePhoto } = userApp;
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const { id } = useParams();
    const [unreadMessage, setUnreadMessage] = useState([]);

    socket.on(
        `unreadMessage_sender${userProfileId}_res${user.userProfileId}`,
        function (msg) {
            console.log(msg);
            if (userProfileId == id) { 
                setUnreadMessage([]);
            }else{
                setUnreadMessage([...unreadMessage, msg]);

            }
        }
    );
    useEffect(() => {
        if (userProfileId == id) {
            setUnreadMessage([]);
        }
    }, [id]);


    return (
        <li>
            <Link
                to={`/${userProfileId}`}
                className={`${
                    userProfileId == id && "bg-teal-500"
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white  dark:hover:bg-gray-700  justify-between`}
            >
                <div className="flex items-center">
                    <img
                        className="w-8 h-8 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        alt="user photo"
                    />
                    <span className="ml-3">{name}</span>
                </div>
                <span className="ml-3 flex justify-end">
                    {unreadMessage &&
                        (userProfileId == id ? 0 : unreadMessage.length)}
                </span>
            </Link>
        </li>
    );
};

export default User;
