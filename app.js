import WebSocket from 'ws'
import config from './config'
import Interactions from './mainServerInteractions/Interactions'

const interactions = new Interactions()

const wss = new WebSocket.Server({
    perMessageDeflate: config.perMessageDeflate,
    port: config.port
})

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.info('received: %s', message)
    })

    ws.send('something')
})

console.info(`Server has started on port ${config.port}`)
