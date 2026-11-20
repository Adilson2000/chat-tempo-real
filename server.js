
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Importar o módulo de conexões WebSocket
const configurarWebSocket = require('./websocket');

const PORT = 3000;

// Servidor HTTP
const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, 'index.html');

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(500);
            res.end('Erro ao carregar a página.');
            return;
        }

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });

        res.end(content);
    });
});

// Servidor WebSocket
const wss = new WebSocket.Server({ server });

// Arquivo de armazenamento
const messagesFile = path.join(__dirname, 'messages.json');

function loadMessages() {
    try {
        return JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
    } catch (error) {
        return [];
    }
}

let messages = loadMessages();

// Configurar as conexões e o recebimento das mensagens
configurarWebSocket(wss, (socket, received) => {

    if (
        typeof received.text !== 'string' ||
        !received.text.trim() ||
        typeof received.username !== 'string' ||
        !received.username.trim()
    ) {
        return;
    }

    const message = {
        userId: socket.userId,
        username: received.username.trim().slice(0, 30),
        text: received.text.trim().slice(0, 1000),
        date: new Date().toISOString()
    };

    messages.push(message);

    fs.writeFileSync(
        messagesFile,
        JSON.stringify(messages, null, 2)
    );

    // Enviar mensagem para todos os usuários conectados
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: 'message',
                message: message
            }));
        }
    });
});

// Identificar cada conexão e enviar o histórico
wss.on('connection', (socket) => {

    socket.userId = crypto.randomUUID();

    socket.send(JSON.stringify({
        type: 'welcome',
        userId: socket.userId
    }));

    socket.send(JSON.stringify({
        type: 'history',
        messages: messages
    }));
});

// Iniciar servidor
server.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});

