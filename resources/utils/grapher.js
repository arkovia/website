import axios from "axios"

function getValue(value) {
    if (value === undefined || value === null) return null
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

export async function gqlreq(query, token) {
    let config = {}

    if(token){
        config.headers = {
            token
        }
    }

    let request = await axios.post('//graph/', {
        query,
        variables: {}
    }, config)

    return request.data
}

export async function setCookie(name, value){
    document.cookie = `${name}=${value};path=/;`
}