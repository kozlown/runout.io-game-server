import request from 'request'
import config from '../../config'

const join = (ws, messageObject, players) => {
    const token = messageObject.token
    if (token !== null) {
        const apiUrl = `http://${config.mainServer.host}:${config.mainServer.port}/api`
        const profileUrl = `${apiUrl}/user/profile`
        request({
            url: profileUrl,
            headers: {
                Cookie: `token=${token}`
            }
        }, (error, response, body) => {
            if (error) {
                const hasJoinedErrorMessage = {
                    route: 'has joined',
                    status: 'error',
                    error
                }
                ws.send(JSON.stringify(hasJoinedErrorMessage))
                return
            }
            const bodyObject = JSON.parse(body)
            const pseudo = bodyObject.data.pseudo
            players.push({
                ws,
                pseudo,
                token
            })
            const hasJoinedMessage = {
                route: 'has joined',
                status: 'ok'
            }
            ws.send(JSON.stringify(hasJoinedMessage))
        })
    } else {
        // if it's a guest
        players.push({
            ws,
            pseudo: 'Guest'
        })
        const hasJoinedMessage = {
            route: 'has joined',
            status: 'ok'
        }
        ws.json(JSON.stringify(hasJoinedMessage))
    }
}

export default join
