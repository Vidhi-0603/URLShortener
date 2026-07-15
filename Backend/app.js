import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });

import express from 'express';
const app = express();

import connectDb from './src/config/mongodb.config.js';
import shortUrlRoute from './src/routes/shortUrl.route.js';
import authRoutes from './src/routes/auth.route.js';
import userRoutes from './src/routes/user.route.js';
import { redirectFromShortUrl } from './src/controller/shortUrl.controller.js';
import { errorHandler } from './src/utils/errorHandler.js';
import { attachUserIfExists } from './src/utils/attachUser.js';

import cookieparser from 'cookie-parser';
app.use(cookieparser());

import cors from 'cors';
app.use(cors(
    {
        origin: process.env.APP_URL,
        credentials: true,
    }
));

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(attachUserIfExists);

app.use('/api/create', shortUrlRoute);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.get('/api/resolve/:id', redirectFromShortUrl)

app.use(errorHandler);

app.listen(5000, () => {
    connectDb()
    console.log("Server running at http://localhost:5000");
})