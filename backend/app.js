import cookieParser from "cookie-parser";
import express from "express";
//routers imports
import errorHandler from "./middleware/errorMiddleware.js";
import logger from "./middleware/logger.js";
import notFoundHandler from "./middleware/notFoundMiddleware.js";
import orderRouter from "./routes/order.router.js";
import productRouter from "./routes/product.router.js";
import userRouter from "./routes/user.router.js";

//initialize express app
const app = express();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(logger);
//routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);

// error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
