import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { AuthDataValidator } from "@telegram-auth/server";
import { urlStrToAuthDataMap } from "@telegram-auth/server/utils";
import crypto from "crypto";

function verifyTelegramAuth(data: any, token: any) {
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
}

export const POST = async (req: Request, res: Response) => {
  try {
    const data = await req.json();
    console.log(data);

    const isValid = verifyTelegramAuth(data, process.env.BOT_TOKEN);

    if (isValid) {
      // Авторизация успешна
      return NextResponse.json(
        { user: "Авторизация успешна" },
        { status: 200 }
      );
    } else {
      // Авторизация не удалась
      return NextResponse.json(
        { user: "Авторизация не удалась" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({ error }, { status: 502 });
  }
};

export const GET = async (req: Request, res: Response) => {
  try {
    const token = req.headers.get("token");
    const is = jwt.verify(token || "", process.env.SHA || "");
    return NextResponse.json({ is: is });
  } catch (err: any) {
    return NextResponse.json(
      { err: err },
      { status: 401, statusText: err.message }
    );
  }
};
