import axios from "axios"

function getValue(value) {
    if (value === undefined) return null
    if (value.constructor === Object) return inputifyObject(value)
    if (value.constructor === Array) return [`${ value.map(val => getValue(val))}`]

    return JSON.stringify(value)
}

function getObjectItems(object) {
    let stringArr = []

    for (let name in object) {
        stringArr.push(`${name}: ${getValue(object[name])}`)
    }

    return stringArr.join(',\n    ')
}

function inputifyObject(object) {
    let string = `{
    ${getObjectItems(object)}
    }`

    return string
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(window.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


export function inputify(data){
        return inputifyObject(data)
    }

export async function qlreq(query, token) {
    let config = {}
    if(token){
        config.headers = {
            token: token
        }
    }

    let request = await axios.post('https://localhost/graph/', {
        query,
        variables: {}
    }, config)

    return request.data
}
