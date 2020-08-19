import { addNewTask, updateTask } from "./server";

async function myFunc() {
  await addNewTask({
    name: "MyTask124",
    id: "125",
  });
  await updateTask({
    name: "MyTask125 == Updated Value",
    id: "125",
  });
}

myFunc();
