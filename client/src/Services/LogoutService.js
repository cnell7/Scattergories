import * as axios from "../../node_modules/axios"

export async function requestLogout() {
    const result = await axios({
        method: 'get',
        url: 'https://scattergories-app.herokuapp.com/logout'
    }).catch(err => {
        return false;
    })
    return result;
};