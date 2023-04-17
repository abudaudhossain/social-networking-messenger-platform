import axios from "axios";

const baseUrl = "http://localhost:5000/api/v1";
const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNiODE5YzZlZmZjMWZjNTQ1YWExMTkiLCJsb2dBdCI6IjIwMjMtMDQtMTZUMTA6MDE6MTQuOTUyWiIsImlhdCI6MTY4MTYzOTI3NCwiZXhwIjoxNjg0MjMxMjc0fQ.pq3tCHn0sPAOYzwNpBJPKRVXD_OMwBvS-mo-PQ41ZPM";

const getMessage = (userProfileId) => {
   
    axios({
        method: "get",
        url: `${baseUrl}/get/contact/${userProfileId}`,

        headers: {
            authorization: `bearer ${accessToken}`,
        },
    }).then(function (response) {
        const chatId = response.data.data.chatId;
        if(!chatId) return false;
        axios({
            method: "get",
            url: `${baseUrl}/get/message/${chatId}`,

            headers: {
                authorization: `bearer ${accessToken}`,
            },
        }).then(function (response) {
            console.log(response.data.data);
        });
    }).catch(err => {
        return {
            isChat: false,
            message: []
        }
    });

    return ["hi", "hello"];
};

export { getMessage };
