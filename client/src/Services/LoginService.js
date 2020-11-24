import * as axios from "../../node_modules/axios"

export async function requestLogin(u, p) {
    const result = await axios({
        method: 'post',
        url: 'https://scattergories-app.herokuapp/login',
        data: {
            user: u,
            password: p
        }
    }).catch(err => {
        return false;
    })
    return result;
};