import cookieParser from "cookie-parser";
import express from "express";
//routers imports
import path from "path";
import errorHandler from "./middleware/errorMiddleware.js";
import logger from "./middleware/logger.js";
import notFoundHandler from "./middleware/notFoundMiddleware.js";
import orderRouter from "./routes/order.router.js";
import productRouter from "./routes/product.router.js";
import uploadRouter from "./routes/upload.router.js";
import userRouter from "./routes/user.router.js";
//initialize express app
const app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger);

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
//routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/image", uploadRouter);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/Frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("server is up and running ");
  });
}

// error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
