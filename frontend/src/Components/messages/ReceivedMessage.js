import React from "react";

const ReceivedMessage = ({message}) => {
    return (
        <div className="">
            <p className="w-fit bg-violet-800 text-white p-2 my-1">
               {message.message}
            </p>
            
        </div>
    );
};

export default ReceivedMessage;
