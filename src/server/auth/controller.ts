import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { AuthDataValidator } from "@telegram-auth/server";
import { urlStrToAuthDataMap } from "@telegram-auth/server/utils";

export const POST = async (req: Request, res: Response) => {
  const validator = new AuthDataValidator({
    botToken: process.env.BOT_TOKEN,
  });

  const data = urlStrToAuthDataMap(req.url);

  try {
    const user = await validator.validate(data);

    // The data is now valid and you can sign in the user.

    console.log(user);
  } catch (error) {
    console.error(error);
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
