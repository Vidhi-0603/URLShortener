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
        origin: 'http://localhost:5173',
        credentials: true,
    }
));

import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(attachUserIfExists);

app.use('/api/create', shortUrlRoute);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/:id', redirectFromShortUrl)


app.use(errorHandler);

app.listen(3000, () => {
    connectDb()
    console.log("Server running at http://localhost:3000");
})