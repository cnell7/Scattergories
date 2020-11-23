import * as axios from "../../node_modules/axios"

export async function requestDeleteAcc() {
    const result = await axios({
        method: 'delete',
        url: 'http://localhost:3030/delAcc',
        body: {
            user: sessionStorage.getItem('user')
        }
    }).catch(err => {
        return false;
    })
    return result;
};