import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.get('/',(req,res)=>{
    res.json({message: 'Hello from the backend !'});
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../my-vite-app/dist/index.html'));
});
