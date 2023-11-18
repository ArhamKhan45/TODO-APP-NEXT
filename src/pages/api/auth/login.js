import { userModel } from "@/models/user";
import { Databaseconnect } from "@/utils/databaseconnect";

const {
  catchAsyncError,
  Errorhandler,
  cookieSetter,
  generateToken,
  Successhandler,
} = require("@/middleware/handlers");
import bcrypt from "bcrypt";

const loginhandler = catchAsyncError(async (req, res) => {
  const { email, password } = req.body;

  await Databaseconnect();
  if (req.method !== "POST") {
    Errorhandler(res, 400, "Invalid Method.This api only works on POST Method");
  }
  if (!email || !password) {
    return Errorhandler(res, 400, "plz enter all fields");
  } else {
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return Errorhandler(res, 404, "Invalid Email or Password");
    } else {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return Errorhandler(res, 404, "Invalid Email or Password");
      }

      const token = generateToken(user._id);
      cookieSetter(res, token, true);
      res.status(200).json({
        success: true,
        message: `Welcome back ${user.name}`,
        user,
      });
    }
  }
});

export default loginhandler;
