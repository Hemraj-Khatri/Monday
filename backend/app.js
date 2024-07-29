import express from 'express';
import cookieParser from 'cookie-parser';
//routers imports
import userRouter from './routes/user.router.js';
import productRouter from './routes/product.router.js';

import notFoundHandler from "./middleware/notFoundMiddleware.js";
import errorHandler from "./middleware/errorMiddleware.js";
import logger from "./middleware/logger.js";


//initialize express app
const app = express();
//middlewares
app.use(express.json())
app.use(cookieParser());
app.use(logger);
//routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);


// error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export {app};