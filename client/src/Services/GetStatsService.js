import * as axios from "../../node_modules/axios"

export async function requestGetStats(u) {
    const result = await axios({
        method: 'get',
        url: 'http://localhost:3030/getStats',
        data: {
            user: u
        }
    }).catch(err => {
        return false;
    })
    return result;
};