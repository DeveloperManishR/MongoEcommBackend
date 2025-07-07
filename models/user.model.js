import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
     // required: true,
    },

    lname: {
      type: String,
      //required: true,
    },

    email: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },

    password: {
      type: String,
      required: true,
    },

    phoneno: {
      type: Number,
    },
    profilePic: {
      type: String,
    },
    customerId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
