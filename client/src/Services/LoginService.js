import * as axios from "../../node_modules/axios"

export async function requestLogin(u, p) {
    const result = await axios({
        method: 'post',
        url: 'http://scattergories-app.herokuapp.com/login',
        data: {
            user: u,
            password: p
        },
        withCredentials: true
    }).catch(err => {
        return false;
    })
    return result;
};