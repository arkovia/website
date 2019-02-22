const Slashed = require('slashed')
const Router = Slashed.Router
const https = require('https')
const jsonifyError = require('jsonify-error')
const axios = require('axios').create({
    httpsAgent: new https.Agent({ rejectUnauthorized: false })
})

var router = new Router()

router.use(async (ctx, next) => {
    try {
        await next()
        if(ctx.body === undefined){
            return await ctx.render('vue/pages/error', {
                code: 404,
            })
        }
    } catch (err) {
        ctx.status = err.status || 500
        return await ctx.render('vue/pages/error', {
            code: ctx.status,
            error: jsonifyError(err)
        })
    }
})

router.get('/', async (ctx) => {
    let signatureCount = (await axios.post('https://localhost/graph/', {query: `{
        signatureCount
    }`, variables: {}})).data.data.signatureCount
    let signaturesPastWeek = (await axios.post('https://localhost/graph/', {query: `{
        signaturesPastWeek
    }`, variables: {}})).data.data.signaturesPastWeek

    let data = {
        signatureCount,
        signaturesPastWeek
    }

    await ctx.render('vue/pages/home', data)
})

router.get('/supporter-signup', async (ctx) => {
    let signatureCount = (await axios.post('https://localhost/graph/', {query: `{
        signatureCount
    }`, variables: {}})).data.data.signatureCount
    let signaturesPastWeek = (await axios.post('https://localhost/graph/', {query: `{
        signaturesPastWeek
    }`, variables: {}})).data.data.signaturesPastWeek

    let data = {
        signatureCount,
        signaturesPastWeek
    }

    await ctx.render('vue/pages/supporter-signup', data)
})

router.get('/thanks-for-signing-up', async (ctx) => {
    let signatureCount = (await axios.post('https://localhost/graph/', {query: `{
        signatureCount
    }`, variables: {}})).data.data.signatureCount
    let signaturesPastWeek = (await axios.post('https://localhost/graph/', {query: `{
        signaturesPastWeek
    }`, variables: {}})).data.data.signaturesPastWeek

    let data = {
        signatureCount,
        signaturesPastWeek
    }
    
    await ctx.render('vue/pages/thanks-for-signing-up', data)
})

module.exports = router