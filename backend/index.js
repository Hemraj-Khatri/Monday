import { app } from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 8000;
connectDB().then(() =>
  app.listen(PORT, () =>
    console.log(`server is up and running at PORT: ${PORT}`)
  )
);
