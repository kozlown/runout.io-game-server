import join from './routes/join'

const router = (ws, message, players) => {
    try {
        const messageObject = JSON.parse(message)
        const route = messageObject.route
        switch (route) {
            case 'join':
                join(ws, messageObject, players)
                break
            default:
                break
        }
    } catch (e) {
        console.error(e)
    }
}

export default router
