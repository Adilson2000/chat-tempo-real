
const WebSocket = require('ws');

function configurarWebSocket(wss, onMessage) {

    wss.on('connection', (socket) => {

        console.log('Novo usuário conectado.');

        socket.on('message', (data) => {
            try {
                const mensagem = JSON.parse(data.toString());
                onMessage(socket, mensagem);
            } catch (error) {
                console.log('Erro ao processar mensagem.');
            }
        });

        socket.on('close', () => {
            console.log('Usuário desconectado.');
        });

        socket.on('error', (error) => {
            console.log('Erro WebSocket:', error.message);
        });
    });
}

module.exports = configurarWebSocket;

