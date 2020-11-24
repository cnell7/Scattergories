import * as axios from "../../node_modules/axios"

export async function requestLogout() {
    const result = await axios({
        method: 'get',
        url: 'http://scattergories-app.herokuapp.com/logout',
        withCredentials: true
    }).catch(err => {
        return false;
    })
    return result;
};