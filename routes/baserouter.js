const Slashed = require('slashed')
const Router = Slashed.Router

var router = new Router()

router.use('/graph/', require('./api'))
router.use(require('./web'))
router.use(require('./app'))

module.exports = router