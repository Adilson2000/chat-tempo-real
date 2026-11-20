
# Chat em Tempo Real

## Descrição
Aplicação web de chat em tempo real desenvolvida com Node.js e WebSockets. Permite que múltiplos usuários se conectem e troquem mensagens instantaneamente.

## Tecnologias utilizadas
- Node.js
- JavaScript
- HTML5
- CSS3
- WebSocket (biblioteca ws)
- JSON

## Estrutura do projeto

- server.js: servidor HTTP e armazenamento das mensagens.
- websocket.js: gerenciamento das conexões WebSocket.
- index.html: interface do chat.
- messages.json: armazenamento do histórico de mensagens.
- package.json: configuração e dependências do projeto.

## Instalação

1. Instale o Node.js.
2. Abra o terminal na pasta do projeto.
3. Instale as dependências:

   npm install

## Como executar

1. Abra o CMD.
2. Entre na pasta do projeto:

   cd C:\chat_websocket

3. Inicie o servidor:

   node server.js

4. Aguarde a mensagem:

   Servidor iniciado na porta 3000

## Como acessar

Abra o navegador e acesse:

http://localhost:3000

Para testar vários usuários, abra o endereço em diferentes abas ou navegadores.

## Funcionalidades

- Conexão de múltiplos usuários.
- Troca instantânea de mensagens.
- Identificação individual das conexões.
- Exibição do nome do usuário.
- Data e hora das mensagens.
- Histórico de mensagens salvo em arquivo JSON.
- Interface responsiva.
