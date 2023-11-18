import { userModel } from "@/models/user";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

export const Errorhandler = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

export const Successhandler = (res, statusCode, task) => {
  return res.status(statusCode).json({
    success: true,
    task,
  });
};

export const catchAsyncError = (passedfunc) => (req, res) => {
  return Promise.resolve(passedfunc(req, res)).catch((err) => {
    return Errorhandler(res, 500, err.message);
  });
};

export const cookieSetter = (res, token, set) => {
  res.setHeader(
    "set-cookie",
    serialize("token", set ? token : "", {
      path: "/",
      httpOnly: true,
      maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0,
    })
  );
};

export const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET);
};

// check authentication of user
export const checkauth = async (req) => {
  let mycookie = req.headers.cookie;

  if (!mycookie) return null;

  // console.log(mycookie);

  const token = mycookie.split("=")[1];

  const decodeduser = jwt.verify(token, process.env.JWT_SECRET);

  return await userModel.findById(decodeduser._id);
};

// req.headers.cookie  for getting token

export const checker = async (req) => {
  const mycookie = req.headers.cookie;

  if (!mycookie) return null;

  const token = mycookie.split("=")[1];

  const decodeduser = jwt.verify(token, process.env.JWT_SECRET);

  return await userModel.findById(decodeduser._id);
};
