import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import axios from "axios";
const baseUrl = "http://localhost:5000/api/v1";

const MessageSenderForm = ({chatId, accessToken}) => {
    const [error, setError] = useState(false)
    const [sendMessage, setSendMessage] = useState({})
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios({
            method: "post",
            url: `${baseUrl}/send/message/${chatId}`,
            data,
            headers: {
                authorization: `bearer ${accessToken}`,
            },
        }).then(function (response) {
            console.log(response.data.data.newMessage);
            setSendMessage(response.data.data.newMessage)
            setError(false)
         
        }).catch(err =>{
            console.log(err.response.data.errorLog.details)
            setError(err.response.data.errorLog.details)
        });
        console.log(data)
    };

    return (
        <form className="w-4/5  fixed bottom-10 mt-18"  onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center border-b border-teal-500 py-2">
                <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Enter Your Message"
                    aria-label="Full name"
                    {...register("text", { required: true })} 
                />
                <button
                    className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    type="submit"
                >
                    Send Message
                </button>
            </div>
        </form>
    );
};

export default MessageSenderForm;
