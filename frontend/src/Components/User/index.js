import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const index = ({ user}) => {
    const { name, userProfileId, profilePhoto } = user;

    return (
        <li >
            <Link
                to={`/${userProfileId}`}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="user photo"
                />
                <span className="ml-3">{name}</span>
            </Link>
        </li>
    );
};

export default index;
