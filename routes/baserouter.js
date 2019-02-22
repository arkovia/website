const Slashed = require('slashed')
const Router = Slashed.Router

var router = new Router()

router.use('/graph/', require('./graph'))
router.use(require('./web'))

module.exports = router