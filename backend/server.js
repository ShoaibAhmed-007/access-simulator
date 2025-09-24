const express = require("express");
const cors = require("cors");
const { simulateAccess } = require("./logic");

const app = express();
app.use(cors());
app.use(express.json());
app.listen(3000, () => {
  console.log("App running at port 3000");
});

app.post("/simulate", (req, res) => {
  const employees = req.body;
  if (!Array.isArray(employees)) {
    return res
      .status(400)
      .json({ error: "Expected an array of employee objects" });
  }
  try {
    const results = simulateAccess(employees);
    return res.json({ results });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
