import { NextResponse } from "next/server";
import { authService } from "./service";

export const POST = async (req: Request, res: Response) => {
  try {
    const data = await req.json();
    console.log(data);

    const isValid = authService.verifyTelegramAuth(data, process.env.BOT_TOKEN);

    if (isValid) {
      const token = authService.signToken(data.id);
      return NextResponse.json({ token: token }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Авторизация не удалась" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 401 });
  }
};
