import * as axios from "../../node_modules/axios"

export async function requestNewPass(o, n) {
    const result = await axios({
        method: 'put',
        url: 'http://localhost:3030/newPass',
        data: {
            oldPass: o,
            newPass: n
        }
    }).catch(err => {
        return false;
    })
    return result;
};