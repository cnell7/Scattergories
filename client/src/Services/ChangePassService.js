import * as axios from "../../node_modules/axios"

export async function requestNewPass(oldPass, newPass) {
    const result = await axios({
        method: 'put',
        url: 'http://localhost:3030/newPass',
        data: {
            oldPass = this.oldPass,
            newPass = this.newPass
        }
    }).catch(err => {
        return false;
    })
    return result;
};