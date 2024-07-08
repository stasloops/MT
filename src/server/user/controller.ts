import { NextResponse } from "next/server";
import { userService } from "./service";
import { cookies } from "next/headers";
import { authService, VerifyToken } from "../auth/service";

export const GET = async (req: Request, res: Response) => {
  try {
    let token = cookies().get("Authorization")?.value;

    const validData: VerifyToken = authService.verifyToken(String(token));

    if (!validData) {
      return NextResponse.json(
        { message: "Не валидный токен!" },
        { status: 401 }
      );
    }

    const telegramID = validData?.data?.telegramID;
    const user = await userService.get(telegramID);

    return NextResponse.json({ user: user }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Не валидный токен!" },
      { status: 401 }
    );
  }
};

export const DELETE = async (req: Request, res: Response) => {
  try {
    const { id } = await req.json();
    userService.delete(id);

    return NextResponse.json(
      { message: "Удаление прошло успешно!" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Что-то пошло не так :)" },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request, res: Response) => {
  // const { name }: any = await req.json();

  // const newUser = await prisma.user.create({
  //   data: {
  //     name,
  //   },
  // });

  return NextResponse.json({ message: "" }, { status: 201 });
};

export const PUT = async (req: Request, res: Response) => {};
