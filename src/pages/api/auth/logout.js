import {
  Errorhandler,
  Successhandler,
  catchAsyncError,
  cookieSetter,
} from "@/middleware/handlers";

const logouthandler = catchAsyncError(async (req, res) => {
  if (req.method !== "GET") {
    return Errorhandler(
      res,
      400,
      "Invalid Method.This api only works on GET Method"
    );
  }
  cookieSetter(res, null, false);
  Successhandler(res, 200, "logged out successfully");
});

export default logouthandler;
