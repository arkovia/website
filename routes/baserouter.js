const Slashed = require('slashed')
const Router = Slashed.Router
const cookie = require('koa-cookie').default

var router = new Router()

router.use(async (ctx, next)=>{
    ctx.state.domain = ctx.app.get('domain')
    await next()
})
router.use(cookie())
router.use(require('./web'))
router.use(require('./app'))
router.use('/graph/', require('./api'))

module.exports = router