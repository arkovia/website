const Slashed = require('slashed')
const Router = Slashed.Router
const graph = require('../app/graph')
const User = require('../app/models/user')
var router = new Router()

router.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        console.log(err)
        ctx.body = JSON.stringify(err)
    }
})

router.use(async (ctx, next) => {
    let authorization = ctx.request.header.authorization
    
    if(authorization){
        let token = authorization.substr(7)
        let user = await User.authenticate(token, ctx)
        if(user){
            ctx.state.user = user
        }
    }
    await next()
})

router.all('', async (ctx) => {
    let query = ctx.request.body.query
    ctx.body = await graph(query, ctx)
})

module.exports = router