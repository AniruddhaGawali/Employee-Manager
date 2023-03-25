const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const router = express.Router();

const client = new MongoClient(
  "mongodb+srv://aniruddhagawali:RjBBQ5A8KyhMMnRp@shopmanager.qegag9v.mongodb.net/?retryWrites=true&w=majority"
);
router.post("/", async (req, res) => {
  const employee_data = req.body;

  try {
    await client.connect();
    const database = client.db("employee_manager");
    const collection = database.collection("employee_data");

    collection.deleteOne({ _id: new ObjectId(employee_data.id) });
    return res
      .status(200)
      .json({ message: "Employee deleted successfully", isSuccess: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Error connecting to db", isSuccess: false });
  }
});

module.exports = router;
