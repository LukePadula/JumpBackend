const express = require("express");
const app = express();
const logging = require("./middleware/logging");
const validation = require("./middleware/validation");

app.use(express.json());
app.use(logging);

app.use("/records", validation, require("./routes/records"));

const port = process.env.port || 6001;
app.listen(port, () => {
  console.log("Servers up!!");
});
