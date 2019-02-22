'use strict'

require('./app/main')

return
/*
if(cluster.isMaster){
    const slashed = require('slashed')
    const cluster = require('cluster')
    const os = require('os')
    var cpuCount = os.cpus().length

    cluster.on('exit', function (worker) {
        console.log(`Worker: ${ worker.id } died, forking a new one`)
        //cluster.fork()
    })

    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork()
    }

}else{
    console.log(`Worker: ${ cluster.worker.id } Running`)
    require('./app/main')
}*/