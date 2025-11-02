import express from 'express'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const TCP_PORT = 8080;

export function startServer(callback) {
  const server = app.listen(TCP_PORT, () => {
    console.log(`Server running on http://localhost:${TCP_PORT}`);
    callback(server);
  });
}

export { app };