import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./connect-db";
import "./initialize-db";
import { authenticationRoute } from "./authenticate";

let port = 7777;
//any port not used, you can choose.

// new express instance:
let app = express();

app.listen(port, console.log("Server Listening on port", port));

app.get("/", (req, res) => {
  //req refers to the request paramenter
  //res refers to the response
  res.send("Hello PAlll");
});

//app.use is considered as the plugin of the application.

app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());
// the last 2 will allows us to use post requests.

authenticationRoute(app);

//this fn actually communicates with the db, coz post requests are hard to test
export const addNewTask = async (task) => {
  let db = await connectDB();
  let collection = db.collection("tasks");
  await collection.insertOne(task);
};

export const updateTask = async (task) => {
  let { id, group, isComplete, name } = task;
  let db = await connectDB();
  let collection = db.collection("tasks");

  //find with id & set/ update the value.
  if (group) await collection.updateOne({ id }, { $set: { group: group } });

  if (name) await collection.updateOne({ id }, { $set: { name } });

  if (isComplete !== undefined)
    await collection.updateOne({ id }, { $set: { isComplete } });
};

//This route is to add a new task
app.post("/task/new", async (req, res) => {
  //the task details are going to come to us from req.body

  let task = req.body.task;
  //body being whatever data the requester passes in with an http request.

  await addNewTask(task);
  res.status(200).send();
});

app.post("/task/update", async (req, res) => {
  //the task details are going to come to us from req.body

  let task = req.body.task;
  //body being whatever data the requester passes in with an http request.

  await updateTask(task);
  res.status(200).send();
});
