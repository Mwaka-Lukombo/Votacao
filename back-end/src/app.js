import express from 'express';
import dotenv from 'dotenv';
import Routes from './routes/Router.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dbConnect from './lib/dbConnect.js';
import dns from 'dns';
import cookieParser from 'cookie-parser';
import fs from 'fs';

dotenv.config();

dns.setServers(['1.1.1.1', '8.8.8.8']);

const PORT = process.env.PORT || 5000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho correto:
const distPath = path.join(__dirname, '..', '..', 'front-end', 'dist');
const indexPath = path.join(distPath, 'index.html');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? true : 'http://localhost:5173',
  credentials: true
}));

app.use('/api', Routes);

// ========== PRODUÇÃO ==========
if (process.env.NODE_ENV === 'production') {

  if (!fs.existsSync(indexPath)) {
    console.error('index.html NÃO encontrado! Rode o build do frontend primeiro.');
  }

  app.use(express.static(distPath));
  app.get('/{*path}', (req, res) => {
    res.sendFile(indexPath);
  });
}

dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App running at http://localhost:${PORT}`);
      console.log(`NODE_ENV = ${process.env.NODE_ENV}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar no banco:', err);
  }); 