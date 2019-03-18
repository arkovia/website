import axios from "axios"

function getValue(value){
    if(value === undefined) return null
    if(value.constructor === Object) return inputifyObject(value)
    if(value.constructor === Array) return `[${value.map(val => getValue(val)).split(', ')}]`
    return JSON.stringify(value)
}

function getObjectItems(object){
    let stringArr = []

    for(let name in object){
        stringArr.push(`${name}: ${getValue(object[name])}`)
    }

    return stringArr.join(',\n    ')
}

function inputifyObject(object){
    let string = `{
    ${getObjectItems(object)}
    }`

    return string
}

export default {
    inputify(data){
        return inputifyObject(data)
    },

    async request(query){
        let request = (await axios.post(
            '/graph/',
            { query: query, variables: {}
        }))

        return request.data
    }
}