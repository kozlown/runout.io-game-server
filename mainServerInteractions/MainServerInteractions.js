import WebSocket from 'ws'
import FileReader from 'filereader'
import File from 'File'
import config from '../config'

/**
 * @class MainServerInteractions
 * @description Interactions between game and main server
 */
class MainServerInteractions {
    /**
     * @constructor
     * @description constructor of a Interactions instance
     */
    constructor() {
        // try to connect to main server
        this.connect(true)
    }
    /**
     * @method sayHello
     * @description say hello to the main server
     */
    sayHello() {
        console.server('Successfully connected to main server !')
        // clear reconnection interval
        clearInterval(this.tryToReconnect)
        // send information about the game server to main server
        const fileReader = new FileReader()
        fileReader.on('data', (data) => {
            const icon = data
            const sayHello = {
                route: 'hello',
                data: {
                    port: config.port,
                    icon,
                    name: config.name,
                    mod: config.mod,
                    map: config.map,
                    playersNb: 0
                }
            }
            const sayHelloString = JSON.stringify(sayHello)
            this.ws.send(sayHelloString)
        })
        fileReader.readAsDataURL(new File('./icon.png'))
    }
    /**
     * @method handleMessage
     * @description handle any message from main server
     * @param {String} data data received from main server
     */
    handleMessage(data) {
        const dataObject = JSON.parse(data)
        switch (dataObject.route) {
            default:
                break
        }
    }
    /**
     * @method connect
     * @description try to connect and handle disconnection
     */
    connect(firstConnection) {
        setTimeout(() => {
            console.server('trying to connect to main server...')
            this.ws = new WebSocket(`ws://${config.mainServer.host}:${config.mainServer.port}`)
            this.ws.on('error', (e) => {
                console.error(e.message)
            })
            this.ws.on('open', this.sayHello.bind(this))
            this.ws.on('message', this.handleMessage.bind(this))
            // try to reconnect on close
            this.ws.on('close', this.connect.bind(this))
        }, firstConnection === true ? 0 : 5000)
    }
}
export default MainServerInteractions
