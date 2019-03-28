const Slashed = require('slashed')
const Router = Slashed.Router
const jsonifyError = require('jsonify-error')
const User = require('../app/models/user')

var router = new Router()

/**
 * Error handler
 */
router.use('/app', async (ctx, next) => {
    try {
        await next()
        if(ctx.body === undefined){ //no page found
            ctx.status = ctx.status || 404
            return await ctx.render('vue/pages/error', {
                code: 404,
            })
        }
    } catch (err) { //error page
        ctx.status = 500
        return await ctx.render('vue/pages/error', {
            code: ctx.status,
            error: jsonifyError(new Error(err))
        })
    }
}).get('/sign-in', async (ctx) => {
    if(ctx.cookie && ctx.cookie.token){
        if(User.authenticate(ctx.cookie.token, ctx)){
            return ctx.redirect('/app')
        }
    }
    await ctx.render('vue/pages/myark/sign-in')
}).get('/sign-up', async (ctx) => {
    if(ctx.cookie && ctx.cookie.token){
        if(User.authenticate(ctx.cookie.token, ctx)){
            return ctx.redirect('/app')
        }
    }
    await ctx.render('vue/pages/myark/sign-up')
}).use('/app/', async (ctx, next) => {
    if(ctx.cookie.token){
        let user = await User.authenticate(ctx.cookie.token, ctx)
        if(user){
            ctx.state.user = user
            return await next()
        }
    }
    ctx.redirect('/sign-in')
}).get('/app', async (ctx) => {
    await ctx.render('vue/pages/app/index')
})

module.exports = router