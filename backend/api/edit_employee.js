const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const e = require("express");
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

    await collection.updateMany(
      { _id: new ObjectId(employee_data._id) },
      {
        $set: {
          name: employee_data.name,
          email: employee_data.email,
          phone: employee_data.phone,
          age: employee_data.age,
          address: employee_data.address,
          department: employee_data.department,
          corrdinate: {
            longitude: employee_data.longitude,
            latitude: employee_data.latitude,
          },
          status: {
            remote_location: employee_data.status.remote_location,
            contract: employee_data.status.contract,
            full_time: employee_data.status.full_time,
          },
        },
      }
    );

    return res
      .status(200)
      .json({ message: "Employee added successfully", isSuccess: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Error connecting to db", isSuccess: false });
  }
});

module.exports = router;
