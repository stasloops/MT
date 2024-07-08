import { NextResponse } from "next/server";
import { authService } from "./service";
import { userService } from "../user/service";
import { cookies } from "next/headers";

export const POST = async (req: Request, res: Response) => {
  try {
    const telegramUserData = await req.json();
    const { id, name, photo_url } = telegramUserData;

    const isValid = authService.verifyTelegramAuth(
      telegramUserData,
      process.env.BOT_TOKEN
    );

    if (isValid) {
      let user = await userService.get(id);
      if (!user) {
        user = await userService.create({
          telegramID: id,
          name,
          avatar: photo_url,
        });
      }

      const token = authService.signToken({
        telegramID: id,
        name,
        avatar: photo_url,
      });
      cookies().set({
        name: "Authorization",
        value: token,
        httpOnly: true,
      });
      return NextResponse.json(
        { message: "Авторизация прошла успешна!", user: user },
        { status: 200 }
      );
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
