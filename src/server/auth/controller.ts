import { NextResponse } from "next/server";
import { authService } from "./service";
import { userService } from "../user/service";
import { cookies } from "next/headers";

export const POST = async (req: Request, res: Response) => {
  try {
    const telegramUserData = await req.json();
    const { id, name, avatar } = telegramUserData;

    const isValid = authService.verifyTelegramAuth(
      telegramUserData,
      process.env.BOT_TOKEN
    );

    if (isValid) {
      const user = userService.get({ telegramID: id });
      if (!user) {
        userService.create({ telegramID: id, name, avatar });
      }

      const token = authService.signToken({ telegramID: id, name, avatar });
      cookies().set({
        name: "token",
        value: token,
        httpOnly: true,
      });
      return NextResponse.json({message: 'Авторизация прошла успешна!'}, { status: 200 });
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
