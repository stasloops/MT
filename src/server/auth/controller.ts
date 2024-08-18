import { NextResponse } from "next/server";
import { authService } from "./service";
import { userService } from "../user/service";
import { cookies } from "next/headers";
import { IUser } from "../user/types";

export const POST = async (req: Request, res: Response) => {
  try {
    const telegramUserData = await req.json();
    const { id: telegram_id, first_name, username, photo_url } = telegramUserData;
    const user_data: Partial<IUser> = {
      telegram_id: telegram_id,
      name: first_name,
      telegram_username: username,
      avatar: photo_url,
    };

    const isValid = authService.verifyTelegramAuth(
      telegramUserData,
      process.env.BOT_TOKEN
    );

    if (isValid) {
      let user: IUser | null = await userService.get(telegram_id);
      if (!user) {
        user = await userService.create(user_data);
      } else {
        user = await userService.update(user_data);
      }

      const token = authService.signToken({
        telegram_id: telegram_id,
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
