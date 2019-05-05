const Slashed = require('slashed')
const Router = Slashed.Router
const jsonifyError = require('jsonify-error')
const User = require('../app/models/user')

var router = new Router()

/**
 * Error handler
 */
router.use(async (ctx, next) => {
    try {
        await next()
        if(ctx.body === undefined){ //no page found
            ctx.status = 404
            return await ctx.render('vue/pages/error', { data: {
                code: ctx.status,
            }})
        }
    } catch (err) { //error page
        ctx.status = 500
        return await ctx.render('vue/pages/error', { data: {
            code: ctx.status,
            error: jsonifyError(new Error(err))
        }})
    }
}).get('/', async (ctx) => {
    await ctx.render('vue/pages/home')
}).get('/learn', async (ctx) => {
    await ctx.render('vue/pages/learn/index')
}).get('/start', async (ctx) => {
    await ctx.render('vue/pages/start')
}).get('/services',async (ctx) => {
    await ctx.render('vue/pages/services/index')
}).get('/services/business',async (ctx) => {
    await ctx.render('vue/pages/services/business')
}).get('/services/myark',async (ctx) => {
    await ctx.render('vue/pages/services/myark')
}).get('/shop',async (ctx) => {
    await ctx.render('vue/pages/shop')
})

module.exports = router