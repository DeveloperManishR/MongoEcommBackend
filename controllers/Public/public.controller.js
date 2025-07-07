import User from "../../models/user.model.js";
import {
  ErrorResponse,
  notFoundResponse,
  successResponse,
  successResponseWithData,
} from "../../helpers/apiResponse.js";
import jwt from "jsonwebtoken";
import { redis } from "../../config/config.js";
import { compairPassword, hashingPassword } from "../../helpers/authHelper.js";

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.EXPIRE_ACCESS_TOKEN_TIME,
  });

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.EXPIRE_REFRESH_TOKEN_TIME,
  });
  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(`refresh_token:${userId}`, refreshToken, "EX", process.env.EXPIRE_REFRESH_TOKEN_TIME); // 7days
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, // prevent XSS attacks, cross site scripting attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
    maxAge: process.env.EXPIRE_ACCESS_TOKEN_TIME * 1000
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // prevent XSS attacks, cross site scripting attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
    maxAge: process.env.EXPIRE_REFRESH_TOKEN_TIME * 1000
  
  });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("dewfgeb", req.body);

    const user = await User.findOne({ email });
    console.log("user", user);

    if (!user) {
      return notFoundResponse(res, "email not found");
    }

    const checkPassword = await compairPassword(password, user?.password);

    if (!checkPassword) {
      return ErrorResponse(res, "Password Wrong");
    }

    const { accessToken, refreshToken } = generateTokens(user?._id);

    await storeRefreshToken(user?._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    return successResponseWithData(res, "User Login  Sucessfully", user);
  } catch (error) {
return ErrorResponse(res, error.message);
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, fname, lname, phoneno } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return ErrorResponse(res, "Email Already Exists");
    }

    const hashedPassword = await hashingPassword(password);

    const user = await User({
      fname,
      lname,
      phoneno,
      email,
      password: hashedPassword,
    }).save();

    const { accessToken, refreshToken } = generateTokens(user?._id);

    await storeRefreshToken(user?._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    return successResponseWithData(res, "User Created Sucessfully", user);
  } catch (error) {
    console.log("eqfwgrbf", error);
    return ErrorResponse(res, error.message);
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      await redis.del(`refresh_token:${decoded.userId}`);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return successResponse(res, "Logged out successfully");
    //res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    return ErrorResponse(res, error.message);
    // res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return ErrorResponse(res, "No refresh token provided");
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

    if (storedToken !== refreshToken) {
      return ErrorResponse(res, "Invalid refresh token");
    }

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.process.env.EXPIRE_ACCESS_TOKEN_TIME }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: process.env.EXPIRE_ACCESS_TOKEN_TIME * 1000,
    });

    return successResponse(res, "Token refreshed successfully");
  } catch (error) {
    return ErrorResponse(res, error.message);
  }
};
