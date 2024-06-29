import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { AuthDataValidator } from "@telegram-auth/server";
import { urlStrToAuthDataMap } from "@telegram-auth/server/utils";

export const POST = async (req: Request, res: Response) => {
  try {
    const validator = new AuthDataValidator({
      botToken: process.env.BOT_TOKEN,
    });

    const data = urlStrToAuthDataMap(req.url);

    const user = await validator.validate(data);

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
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
