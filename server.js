const express = require("express");
const app = express();
const logging = require("./middleware/logging");
const validation = require("./middleware/validation");
const cors = require("cors");

app.use(cors());
app.use(express.json());
// app.use(logging);

app.use("/records", require("./routes/records"));
app.use("/summary", require("./routes/summary"));

// app.use("/users", require("./routes/users"));

const port = process.env.port || 6002;
app.listen(port, () => {
  console.log("Servers up!!");
});
