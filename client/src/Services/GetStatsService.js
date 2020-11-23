import * as axios from "../../node_modules/axios"

export async function requestGetStats(u) {
    const result = await axios({
        method: 'post',
        url: 'http://localhost:3030/getStats',
        data: {
            user: sessionStorage.getItem('user')
        }
    }).catch(err => {
        return false;
    })
    return result.data;
};