import React, { useEffect, useRef, useState } from "react";
import SendMessage from "./SendMessage";
import ReceivedMessage from "./ReceivedMessage";
import { useParams } from "react-router-dom";
import axios from "axios";
import MessageSenderForm from "./MessageSenderForm";



const baseUrl = "http://localhost:5000/api/v1";

const Messages = ({socket}) => {
    const messagesEndRef = useRef(null);
    const [messages, setMessage] = useState([]);
    const [isCreateNewChat, setIsCreateNewChat] = useState(false);
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("accessToken")
    );
    const [chatId, setChatId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setAccessToken(localStorage.getItem("accessToken"));
        setIsLoading(false);
        axios({
            method: "get",
            url: `${baseUrl}/get/contact/${id}`,

            headers: {
                authorization: `bearer ${accessToken}`,
            },
        })
            .then(function (response) {
                const chatId = response.data.data.chatId;
                setChatId(chatId);
                axios({
                    method: "get",
                    url: `${baseUrl}/get/message/${chatId}`,

                    headers: {
                        authorization: `bearer ${accessToken}`,
                    },
                }).then(function (response) {
                    console.log(response.data.data.messages);
                    setMessage(response.data.data.messages);
                    setIsCreateNewChat(false);
                });
            })
            .catch((err) => {
                console.log(err);
                setIsCreateNewChat(true);
            });

        setIsLoading(true);
    }, [id]);

    useEffect(()=>{
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    },[messages])

    console.log(chatId, "ch");
    console.log(messages.messages);

    socket.on(`${chatId}`, function (msg) {
        console.log(msg);
        setMessage([...messages, msg]);
    });

    if (!isLoading) return <h1>loading ...</h1>;

    return (
        <>
          
            <div className="" >
                {isCreateNewChat ? (
                    <h1>Create New Chat Room</h1>
                ) : (
                    <>
                        {messages.length > 0 ? (
                            <div className="mb-10">
                                {messages.map((message) =>
                                    message.senderId == id ? (
                                        <ReceivedMessage message={message} />
                                    ) : (
                                        <SendMessage message={message} />
                                    )
                                )}
                            </div>
                        ) : (
                            <h1>Send Your First Message</h1>
                        )}
                        <div ref={messagesEndRef}></div>
                        <MessageSenderForm
                            chatId={chatId}
                            accessToken={accessToken}
                            socket={socket}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default Messages;
