module.exports = (app) => ({
    domain: app.get('env:domain'),
    env: app.get('env:env')
})