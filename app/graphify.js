const https = require('https')
const axios = require('axios').create({
    httpsAgent: new https.Agent({ rejectUnauthorized: false })
})

module.exports = {
    async request(graph, ctx) {
        let config = {}

        if(ctx.cookie.token){
            config.headers = {
                "authorization": `Bearer ${ctx.cookie.token}`
            }
        }

        return (await axios.post('/graph/', {
            query: graph,
            variables: {}
        }, config)).data
    }
}