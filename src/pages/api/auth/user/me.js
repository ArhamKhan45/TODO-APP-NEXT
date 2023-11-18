import { Databaseconnect } from "@/utils/databaseconnect";

const {
  catchAsyncError,
  Errorhandler,
  checker,
} = require("@/middleware/handlers");

const profilehandler = catchAsyncError(async (req, res) => {
  if (req.method !== "GET") {
    return Errorhandler(
      res,
      400,
      "Invalid Method.This api only works on GET  Method"
    );
  }

  await Databaseconnect();

  const user = await checker(req);
  if (!user) return Errorhandler(res, 401, "login first");
  res.status(200).json({
    success: true,
    user,
  });
});

export default profilehandler;
