import React from "react";

const SendMessage = ({message}) => {
    // console.log(message)
    return (
        <div className="flex justify-end">
            <p className="w-fit bg-blue-800 text-white p-2 my-1">
               {message.message}
            </p>
        </div>
    );
};

export default SendMessage;
