const Slashed = require('slashed')
const Router = Slashed.Router
const graph = require('../app/graph')
const User = require('../app/models/user')
var router = new Router()


let ensuredIndexes = false

router.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        console.log(err)
        ctx.body = {data: null, errors: JSON.stringify(err)}
    }
})

router.use(async (ctx, next) => {
    if(ensuredIndexes === false){
        let arr = [require('../app/models/user')]

        for(let i in arr){
            let model = arr[i]
            await model.createIndexes()
        }
        
        ensuredIndexes === true
    }
    await next()
})

router.use(async (ctx, next) => {
    let token = ctx.request.header.token
    
    if(token){
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