import * as axios from "../../node_modules/axios"

export async function requestDeleteAcc() {
    const result = await axios({
        method: 'delete',
        url: 'http://scattergories-app.herokuapp.com/delAcc',
        data: {
            user: sessionStorage.getItem('user')
        },
        withCredentials: true
    }).catch(err => {
        return false;
    })
    return result;
};