import {
  Errorhandler,
  Successhandler,
  catchAsyncError,
  checkauth,
} from "@/middleware/handlers";
import { modelTask } from "@/models/task";
import { Databaseconnect } from "@/utils/databaseconnect";

const mytask = catchAsyncError(async (req, res) => {
  if (req.method !== "GET") {
    return Errorhandler(
      res,
      400,
      "Invalid Method.This api only works on GET  Method"
    );
  }

  await Databaseconnect();

  const user = await checkauth(req);
  // console.log(user);
  if (!user) {
    return Errorhandler(res, 401, "Login first to access this feature");
  }
  const todostasks = await modelTask.find({ user: user._id });
  // console.log(todostasks);
  return Successhandler(res, 200, todostasks);
});
export default mytask;

{
  /* <Itemcontainer
title={"Sample Task"}
description={
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus modi quis blanditiis eos doloremque, vero cum expedita natus autem obcaecati neque vitae tempore eveniet molestiae sint assumenda porro eligendi saepe minus odio rerum officiis perferendis recusandae eum? Tempore cumque dolores non odit asperiores. Aliquid amet ipsum quod suscipit perspiciatis quia minus cum itaque impedit sequi!"
}
id={"sampleId"}
completed={false}
/> */
}
