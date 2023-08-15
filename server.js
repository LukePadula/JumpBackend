const express = require("express");
const app = express();
const cors = require("cors");
const tokenAuth = require("./middleware/auth");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    credentials: true,
    exposedHeaders: ["token"],
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001",
    ],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/records", tokenAuth, require("./routes/records"));
// app.use("/summary", tokenAuth, require("./routes/summary"));
app.use("/users", require("./routes/users"));

const port = process.env.port || 6002;
app.listen(port, () => {
  console.log("Servers up!!");
});
