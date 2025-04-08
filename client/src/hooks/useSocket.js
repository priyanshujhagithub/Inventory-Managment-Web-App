import { useEffect,useState } from "react";
import socket from '../services/socket.js';

const useSocket = () => {
    const [notification,setNotification] = useState(null);
    const [liveData, setLiveData]     = useState(null);


    useEffect(() => {
        socket.on('low-stock',(data) =>{
            console.log('Received low-stock event:',data);
            setNotification(data);
        });

    return() => {
        socket.off('low-stock');
        socket.off('product-update');
    };
    },[]);
    
    return {notification,liveData};
};
export default useSocket;
