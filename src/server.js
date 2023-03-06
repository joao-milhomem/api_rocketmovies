require("express-async-errors");
const AppError = require("../src/utils/AppError");
const express = require("express");
const app = express();
const PORT = 3333;
const appRouter = require("./routes");
const { UPLOADS_FOLDER } = require("./configs/upload");
const cors = require("cors");

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
app.use(cors());
app.use(express.json());
app.use(appRouter);
app.use("/files", express.static(UPLOADS_FOLDER));
app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      Status: "Error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    Status: "Error",
    Error: "Internal Server Error",
  });
});
