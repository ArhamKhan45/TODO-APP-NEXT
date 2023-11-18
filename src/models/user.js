import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [4, "name too short"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [8, "password too short"],
  },
});

// export const user = mongoose.models.user || mongoose.model("user", schema);

mongoose.models = {};

export const userModel = mongoose.model("user", schema);
