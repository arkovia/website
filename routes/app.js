const Slashed = require('slashed')
const Router = Slashed.Router
const jsonifyError = require('jsonify-error')
const cookie = require('koa-cookie').default
const graphify = require('../app/graphify')

var router = new Router()

router.use(cookie())

router.use(async (ctx, next) => {
    try {
        await next()
        if(ctx.body === undefined){
            ctx.status = ctx.status || 404
            return await ctx.render('vue/pages/error', {
                code: ctx.status,
            })
        }
    } catch (err) {
        ctx.status = err.status || 500
        
        console.log(err)
        return await ctx.render('vue/pages/error', {
            code: ctx.status,
            error: jsonifyError(new Error(err))
        })
    }
})

router.get('/login', async (ctx) => {
    await ctx.render('vue/pages/login')
})

router.get('/members/', async (ctx) => {
    await ctx.render('vue/pages/members')
})

router.use(async(ctx, next) => {
    //authenticiate
    //redirect to login if not authenticated

    await next()
})

router.get('/members/signatures', async (ctx) => {
    let { errors, data } = await graphify.request(`{
        signatures {
            name
            address
            signature
            registeredVoter
        }
    }`, ctx)

    if(!data) data = {}

    await ctx.render('vue/pages/members/signatures', { ...data, errors})
})

module.exports = router