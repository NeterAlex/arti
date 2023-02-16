import axios from "axios";

export async function storeToken(username: string, password: string): Promise<boolean> {
    const qs = require('qs');
    axios.post('http://localhost:8080/api/auth/login', qs.stringify({
            username: username,
            password: password
        })
    ).then(function (res) {
        localStorage.setItem('userToken', res.data.data.token)
    }).catch(function (error) {
        console.log(error)
        return false
    })
    return true
}

export async function getToken(username: string, password: string): Promise<string> {
    let result = ""
    axios.get('http://localhost:8080/auth', {
        params: {
            username: username,
            password: password
        }
    }).then(function (res) {
        result = res.data.data.token
        return result
    }).catch(function (error) {
        console.log(error)
        return ""
    })
    return result
}

export async function checkToken(username: string, password: string): Promise<boolean> {
    if (localStorage.getItem("userToken")) {
        return localStorage.getItem("userToken") == await getToken(username, password)
    }
    return false
}

export async function checkAndUpdateToken(username: string, password: string): Promise<void> {
    if (await checkToken(username, password)) {
    } else {
        storeToken(username, password)
    }
}
