import WebSocket from 'ws'
import config from '../config'

/**
 * @class Interactions
 * @description Interactions between server and main server
 */
class Interactions {
    /**
     * @constructor
     * @description constructor of a Interactions instance
     */
    constructor() {
        this.ws = new WebSocket(`ws://${config.mainServer.host}:${config.mainServer.port}`)

        this.ws.on('open', this.sayHello.bind(this))
        this.ws.on('message', this.handleMessage.bind(this))
    }
    /**
     * @method sayHello
     * @description say hello to the main server
     */
    sayHello() {
        const sayHello = {
            route: 'hello',
            data: {
                port: config.port,
                icon: config.icon,
                name: config.name,
                mod: config.mod,
                map: config.map,
                playersNb: 0
            }
        }
        const sayHelloString = JSON.stringify(sayHello)
        this.ws.send(sayHelloString)
    }
    /**
     * @method handleMessage
     * @description handle any message from main server
     * @param {String} data data received from main server
     */
    handleMessage(data) {
        const dataObject = JSON.parse(data)
        switch (dataObject.route) {
            case 'hello':
                this.handleHello(dataObject)
                break
            default:
                break
        }
    }
    /**
     * @method handleHello
     * @description handle hello route response from main server
     * @param {Object} data data received from the server
     */
    handleHello(data) {
        console.info(data)
    }
}
export default Interactions
