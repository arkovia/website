const koastatic = require('koa-static')
const slashed = require('slashed')
const servue = require('./extends/servue')
const path = require('path')
const https = require('https')
const http = require('http')
const fs = require('fs')

var basedir = path.resolve(__dirname, '..')
var app = new slashed(basedir)
var router = require(app.get('path:routes/baserouter.js'))

app.extend(servue)

app.use(koastatic(app.get('path:resources/public')))
app.use(require('koa-bodyparser')())
app.use(router)
http.createServer(app.handle()).listen(80)
try {
    let options = {
        key: fs.readFileSync(app.get("path:config/ssl/privkey.pem")),
        cert: fs.readFileSync(app.get("path:config/ssl/cert.pem"))
    }
    https.createServer(options, app.handle()).listen(443)
} catch (error) {
    console.log('server could not start on https')
}