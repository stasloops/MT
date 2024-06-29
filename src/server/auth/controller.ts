import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  NextResponse.json({ user: "finally" }, { status: 200 });
};
