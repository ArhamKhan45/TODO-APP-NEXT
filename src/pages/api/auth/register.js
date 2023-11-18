import {
  catchAsyncError,
  cookieSetter,
  Errorhandler,
  generateToken,
} from "@/middleware/handlers";
import { userModel } from "@/models/user";
import { Databaseconnect } from "@/utils/databaseconnect";
import bcrypt from "bcrypt";

const registerhandler = catchAsyncError(async (req, res) => {
  if (req.method === "POST") {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return Errorhandler(res, 400, "plz enter all fields");
    }
    await Databaseconnect();
    const mainemail = email.toLowerCase();
    let user = await userModel.findOne({ email: mainemail });

    if (user) {
      return Errorhandler(
        res,
        400,
        "User Already Registered with this email So plz login "
      );
    } else {
      const hashedpassword = await bcrypt.hash(password, 10);

      user = await userModel.create({
        name,
        email: mainemail,
        password: hashedpassword,
      });

      const token = generateToken(user._id);

      cookieSetter(res, token, true);
      res.status(201).json({
        success: true,
        message: "Registered successfully",
        user,
      });
    }
  } else {
    Errorhandler(res, 400, "Invalid Method.This api only works on POST Method");
  }
});

export default registerhandler;
