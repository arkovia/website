const slashed = require('slashed')
const servue = require('./extends/servue')
const sslify = require('koa-sslify').default
const serve = require('koa-static')
const https = require('https')
const path = require('path')
const http = require('http')
const fs = require('fs')

var basedir = path.resolve(__dirname, '..')
var app = new slashed(basedir)
var router = require(app.get('path:routes/baserouter.js'))

app.extend(servue)

/**
 * Middleware
 */
app.use(sslify())
app.use(serve(app.get('path:resources/public')))
app.use(require('koa-bodyparser')())

/**
 * Use Router
 */
app.use(router)

http.createServer(app.handle()).listen(80)
try {
    if(app.get('env:env') === "development"){
        https.globalAgent.options.rejectUnauthorized = false
    }
    let options = {
        key: fs.readFileSync(app.get("path:config/ssl/privkey.pem")),
        cert: fs.readFileSync(app.get("path:config/ssl/cert.pem"))
    }
    https.createServer(options, app.handle()).listen(443)
} catch (error) {
    console.log('server could not start on https')
}