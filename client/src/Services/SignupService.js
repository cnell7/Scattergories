import * as axios from "../../node_modules/axios"

export async function requestSignup(u, p) {
    const result = await axios({
        method: 'post',
        url: 'http://localhost:3030/signup',
        data: {
            user: u,
            password: p
        }
    }).catch(err => {
        return false;
    })
    return result;
};