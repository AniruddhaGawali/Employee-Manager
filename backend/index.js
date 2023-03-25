const cors = require("cors");
const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/employee_data", require("./api/employee_data"));
app.use("/api/add_employee", require("./api/add_employee"));
app.use("/api/edit_employee", require("./api/edit_employee"));
app.use("/api/delete_employee", require("./api/delete_employee"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
