import {io} from 'socket.io-client';
const socket = io('http://localhost:5000', {

    path: '/socket.io',// default, but explicit helps
    transports: ['websocket','polling'], // try both transports
});

export default socket;