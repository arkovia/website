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
            ctx.status = 404
            
            return await ctx.render('vue/pages/error', {
                code: ctx.status,
            })
        }
    } catch (err) {
        ctx.status = err.status || err.code || 500
        return await ctx.render('vue/pages/error', {
            code: ctx.status,
            error: jsonifyError(new Error(err))
        })
    }
})

router.get('/login', async (ctx) => {
    await ctx.render('vue/pages/login')
})

router.get('/sign-up', async (ctx) => {
    await ctx.render('vue/pages/login')
})

router.get('/app/', async (ctx) => {
    await ctx.render('vue/pages/app/index')
})

router.use(async(ctx, next) => {
    //authenticiate
    //redirect to login if not authenticated

    await next()
})

module.exports = router