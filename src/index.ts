import express from 'express';
import router from './routes';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3001

app.use(express.json())
app.use(router)

app.listen(3000, () => console.log(`Servidor rodando🚀 ${port}`));
