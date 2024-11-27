import "express-async-errors";
import "dotenv/config";
import express from "express";
import cors from "cors";
import { routes } from "./routes/index.js";
import { AppError } from "./utils/AppError.js";
import { UPLOADS_FOLDER } from "./configs/upload.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/files", express.static(UPLOADS_FOLDER));
app.use(routes);

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

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
