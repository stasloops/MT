import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { AuthDataValidator } from "@telegram-auth/server";
import { urlStrToAuthDataMap } from "@telegram-auth/server/utils";
import crypto from "crypto";

export const POST = async (req: Request, res: Response) => {
  try {
    const { hash, ...data }: any = await req.json();
    console.log(data, hash);

    const token: any = process.env.TELEGRAM_BOT_TOKEN;
    const secret = crypto.createHash("sha256").update(token).digest();
    console.log(secret, token);

    const checkString = Object.keys(data)
      .sort()
      .map((key) => `${key}=${data[key]}`)
      .join("\n");

    const hmac = crypto
      .createHmac("sha256", secret)
      .update(checkString)
      .digest("hex");

    console.log(hmac, hash);

    if (hmac === hash) {
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
