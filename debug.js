const axios = require("axios");

async function name(params) {
    try {
        const res = await axios.post(
            "http://localhost:8080",
            { user: "selam" },
            { headers: { token: "asdasdasdas",type:"SET" } }
        );
        console.log(res.data);
    } catch (error) {
        console.error(error);
    }
}

name();