const express = require("express");
const app = express();
const logging = require("./middleware/logging");
const validation = require("./middleware/validation");
const cors = require("cors");
const tokenAuth = require("./middleware/auth");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// app.use(logging);

app.use("/records", tokenAuth, require("./routes/records"));
app.use("/summary", tokenAuth, require("./routes/summary"));
app.use("/users", require("./routes/users"));

const port = process.env.port || 6002;
app.listen(port, () => {
  console.log("Servers up!!");
});
