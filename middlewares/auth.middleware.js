import { ErrorResponse } from "../helpers/apiResponse.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const authenticateAdmin = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;

    console.log("rqdada",req.cookies)

    if (!accessToken) {
      return ErrorResponse(res, "No access token provided");
      //return res.status(401).json({ message: "No access token provided" });
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return ErrorResponse(res, "User not found");
    }

    if (user.role !== "ADMIN") {
      return ErrorResponse(res, "Access denied - Admins only");
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    // return res
    //   .status(401)
    //   .json({ message: "Unauthorized - Invalid or expired access token" });

    return ErrorResponse(res, error.message);
  }
};

export const authenticateUser = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      return ErrorResponse(res, "No access token provided");
      //return res.status(401).json({ message: "No access token provided" });
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return ErrorResponse(res, "User not found");
    }

    if (user.role !== "USER") {
      return ErrorResponse(res, "Access denied - Admins only");
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    // return res
    //   .status(401)
    //   .json({ message: "Unauthorized - Invalid or expired access token" });

    return ErrorResponse(res, error.message);
  }
};
