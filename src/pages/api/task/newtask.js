import {
  Errorhandler,
  Successhandler,
  catchAsyncError,
  checkauth,
} from "@/middleware/handlers";
import { modelTask } from "@/models/task";
import { Databaseconnect } from "@/utils/databaseconnect";

const newtask = catchAsyncError(async (req, res) => {
  await Databaseconnect();

  if (req.method === "POST") {
    const user = await checkauth(req);
    if (!user) {
      return Errorhandler(res, 401, "Login First");
    }
    const { title, description } = req.body;
    if (!title || !description) {
      return Errorhandler(res, 400, "plz enter all fields");
    }

    const newtask = await modelTask.create({
      title,
      description,
      user: user._id,
    });

    return Successhandler(res, 201, newtask);
  } else {
    return Errorhandler(
      res,
      400,
      "Invalid Method.This api only works on POST Method"
    );
  }
});

export default newtask;
