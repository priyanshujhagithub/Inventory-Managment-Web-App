import {io} from 'socket.io-client';
const socketURL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
const socket = io(socketURL, {

    path: '/socket.io',// default, but explicit helps
    transports: ['websocket','polling'], // try both transports
});

export default socket;