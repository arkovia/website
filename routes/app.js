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
        if(ctx.body === undefined){ //no page found or no response given
            ctx.status = 404
            return await ctx.render('vue/pages/error', { data: {
                code: ctx.status
            }})
        }
    } catch (err) { //error page
        ctx.status = 500
        if(!(err instanceof Error)) err = new Error(err)
        return await ctx.render('vue/pages/error', { data: {
            code: ctx.status,
            error: jsonifyError(err)
        }})
    }
}).get('/sign-in', async (ctx) => {
    if(ctx.cookie && ctx.cookie.token){
        if(User.authenticate(ctx.cookie.token, ctx)){
            return ctx.redirect('/app')
        }
    }
    await ctx.render('vue/pages/app/sign-in')
}).get('/sign-up', async (ctx) => {
    if(ctx.cookie && ctx.cookie.token){
        if(User.authenticate(ctx.cookie.token, ctx)){
            return ctx.redirect('/app')
        }
    }
    await ctx.render('vue/pages/app/sign-up')
}).use('/app', async (ctx, next) => {
    if(ctx.cookie.token){
        let user = await User.authenticate(ctx.cookie.token, ctx)
        if(user){
            ctx.state.user = user
            ctx.state.token = ctx.cookie.token
            return await next()
        }
        ctx.cookies.set('token', null)
    }
    ctx.redirect('/sign-in')
}).get('/sign-out', async(ctx) => {
    ctx.state.user.signOut(ctx.state.token)
    ctx.redirect('/')
}).get('/app', async (ctx) => {
    await ctx.render('vue/pages/app/index')
})

module.exports = router