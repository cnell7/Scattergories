export async function requestSignup(u, p) {
    console.log('hi')
    const result = await axios({
        method: 'post',
        url: 'http://localhost:3030/signup',
        params: {
            user: u, 
            password: p
        }
    })
    return result;
};