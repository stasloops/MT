import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { AuthDataValidator } from "@telegram-auth/server";
import { urlStrToAuthDataMap } from "@telegram-auth/server/utils";

export const POST = async (req: Request, res: Response) => {
  NextResponse.json({ user: 'finally' }, { status: 200 });
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
