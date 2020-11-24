import * as axios from "../../node_modules/axios"

export async function requestGetStats(u) {
    const result = await axios({
        method: 'post',
        url: 'http://scattergories-app.herokuapp.com/getStats',
        data: {
            user: sessionStorage.getItem('user')
        },
        withCredentials: true
    }).catch(err => {
        return false;
    })
    return result.data.toString();
};