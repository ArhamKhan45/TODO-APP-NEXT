import {
  Errorhandler,
  Successhandler,
  catchAsyncError,
  checkauth,
} from "@/middleware/handlers";
import { modelTask } from "@/models/task";
import { Databaseconnect } from "@/utils/databaseconnect";

const handler = catchAsyncError(async (req, res) => {
  await Databaseconnect();
  let user = await checkauth(req);

  if (!user) {
    return Errorhandler(res, 401, "Login First");
  }

  const taskid = req.query.id;
  const task = await modelTask.findById(taskid);
  if (!task) {
    return Errorhandler(res, 404, "task not found");
  }
  //

  if (req.method === "PUT") {
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
  } else if (req.method === "DELETE") {
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task Deleted successfully",
    });
  } else {
    Errorhandler(res, 400, "Invalid method,Only for PUT and DELETE requests");
  }
});

export default handler;
