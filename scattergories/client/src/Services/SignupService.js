import * as axios from "../../node_modules/axios"
export async function requestSignup(u, p) {
    console.log('hi')
    const result = await axios({
        method: 'post',
        url: 'http://localhost:3030/signup',
        body: {
            user: "dw",
            password: "awd"
        }
    })
    return result;
};