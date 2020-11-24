import * as axios from "../../node_modules/axios"

export async function requestNewPass(o, n) {
    const result = await axios({
        method: 'put',
        url: 'https://scattergories-app.herokuapp/newPass',
        data: {
            user: sessionStorage.getItem('user'),
            oldPass: o,
            newPass: n
        }
    }).catch(err => {
        return false;
    })
    return result;
};