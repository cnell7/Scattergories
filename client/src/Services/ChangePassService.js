import * as axios from "../../node_modules/axios"

export async function requestNewPass(o, n) {
    const result = await axios({
        method: 'put',
        url: 'http://scattergories-app.herokuapp.com/newPass',
        data: {
            user: sessionStorage.getItem('user'),
            oldPass: o,
            newPass: n
        },
        withCredentials: true
    }).catch(err => {
        return false;
    })
    return result;
};