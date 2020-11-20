import * as axios from "../../node_modules/axios"

export async function requestLogout() {
    const result = await axios({
        method: 'get',
        url: 'http://localhost:3030/logout'
    }).catch(err => {
        return false;
    })
    return result;
};