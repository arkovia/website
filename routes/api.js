const Slashed = require('slashed')
const Router = Slashed.Router
const graph = require('../app/graph')
const jwt = require('jsonwebtoken')
const User = require('../app/models/user')
const { ObjectID } = require('mongodb')
var router = new Router()

router.use(async (ctx, next) => {
    let authorization = ctx.request.header.authorization
    if(authorization){
        let token = authorization.substr(7)
        let secret = ctx.app.get('env:secret')
        let verify = jwt.verify(token, secret)
        if(verify){
            let user = await User.findOne({_id: new ObjectID(verify)})
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