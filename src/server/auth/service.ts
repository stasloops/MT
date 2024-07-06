import { IUser } from "../user/types";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const signToken = (userData: Partial<IUser>) => {
  const token = jwt.sign(
    {
      data: userData,
    },
    process.env.SHA || "",
    { expiresIn: 60 * 60 }
  );
  return token;
};

const verifyToken = (token: string) => {
  const is = jwt.verify(token, process.env.SHA || "");
  return is;
};

const verifyTelegramAuth = (data: any, token: any) => {
  const { hash, ...rest } = data;
  const secret = crypto.createHash("sha256").update(token).digest();

  const checkString = Object.keys(rest)
    .sort()
    .map((key) => `${key}=${rest[key]}`)
    .join("\n");

  const hmac = crypto
    .createHmac("sha256", secret)
    .update(checkString)
    .digest("hex");

  return hmac === hash;
};

export const authService = { signToken, verifyToken, verifyTelegramAuth };