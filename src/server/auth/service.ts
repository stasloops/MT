import { IUser } from "../user/types";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const signToken = (userData: Partial<IUser>) => {
  const token = jwt.sign(
    {
      data: userData,
    },
    process.env.SHA || "",
    { expiresIn: 60 * 60 * 60 }
  );
  return token;
};

export type VerifyToken =
  | {
      data: { telegram_id: number };
    }
  | any;

const verifyToken = (token: string): VerifyToken => {
  try {
    const is: VerifyToken = jwt.verify(token, process.env.SHA || "123");
    return is;
  } catch (err) {
    console.log("ERR: ", err);
  }
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
