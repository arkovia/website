const Slashed = require('slashed')
const Router = Slashed.Router
const jsonifyError = require('jsonify-error')

var router = new Router()

router.use(async (ctx, next) => {
    try {
        await next()
        if(ctx.body === undefined){
            ctx.status = ctx.status || 404
            return await ctx.render('vue/pages/error', {
                code: 404,
            })
        }
    } catch (err) {
        ctx.status = 500
        return await ctx.render('vue/pages/error', {
            code: ctx.status,
            error: jsonifyError(new Error(err))
        })
    }
})

router.get('/', async (ctx) => {
    await ctx.render('vue/pages/home')
})

router.get('/learn', async (ctx) => {
    await ctx.render('vue/pages/learn/index')
})

module.exports = router