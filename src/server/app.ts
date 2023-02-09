import server from './server';

server.get('/', (req, res) => {
    res.send('Hello, World!');
});

export default server;
