import "express-async-errors"
import express from 'express';
import router from './routes';
import 'dotenv/config';
import { errorHttpMiddeware } from './middleware/error';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(router);
app.use(errorHttpMiddeware);
app.listen(3000, () => console.log(`Servidor rodando🚀 ${port}`));
