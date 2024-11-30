import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import "express-async-errors";
import { UPLOADS_FOLDER } from "./configs/upload.js";
import { routes } from "./routes/index.js";
import { AppError } from "./utils/AppError.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.APP_URL],
    credentials: true,
  })
);
app.use("/files", express.static(UPLOADS_FOLDER));
app.use(routes);

app.get("/", (_, res) => {
  res.send({ status: "OK" });
});

app.use((error, _request, response, _next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  }
  console.error(error);
  return response.status(500).json({
    status: 500,
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
