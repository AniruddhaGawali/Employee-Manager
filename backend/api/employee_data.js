const { MongoClient } = require("mongodb");
const express = require("express");
const router = express.Router();

const client = new MongoClient(
  "mongodb+srv://aniruddhagawali:RjBBQ5A8KyhMMnRp@shopmanager.qegag9v.mongodb.net/?retryWrites=true&w=majority"
);
router.get("/", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("employee_manager");
    const collection = database.collection("employee_data");
    const employees = await collection.find({}).toArray();

    return res.status(200).json(employees);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error connecting to db" });
  }
});

module.exports = router;
