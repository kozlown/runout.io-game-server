import WebSocket from 'ws'
import debug from 'debug'
import config from './config'
import router from './playersInteractions/router'
import MainServerInteractions from './mainServerInteractions/MainServerInteractions'

// console customization with debugging purpose
console.info = debug('info')
console.server = debug('server')
console.player = debug('player')
console.error = debug('error')

// main server interactions
const mainServerInteractions = new MainServerInteractions()

const wss = new WebSocket.Server({
    perMessageDeflate: config.perMessageDeflate,
    port: config.port
})

const players = []

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        router(ws, message, players)
    })
})

console.info(`Server has started on port ${config.port}`)
