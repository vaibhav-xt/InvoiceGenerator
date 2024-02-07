import dotenv from 'dotenv';

// dotenv config
dotenv.config();

// global variables 
export const PORT = process.env.PORT || 8000;
export const URI = process.env.URI || "mongodb://127.0.0.1:27017";
export const SECRET_ACCESS_TOKEN = process.env.SECRET_ACCESS_TOKEN;
export const FRONTEND_URL = process.env.FRONTEND_URL;