import express from 'express';
import cors from 'cors';
import './config/db.config.js';
import { PORT } from './config/variables.config.js';
import userRouter from './routers/user.routes.js';
import productRouter from './routers/invoice.routes.js';

const app = express();

// Handling preflight requests
app.options('*', cors());

// Enable CORS for all origins
app.use(cors({ origin: '*' }));

app.use(express.json());

// routes 
app.use('/api/user/', userRouter);
app.use('/api/invoice', productRouter);

// app listening
app.listen(PORT, () => {
    console.log("Server is connected at " + PORT);
});
