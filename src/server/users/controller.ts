import { NextResponse } from "next/server";
import { usersService } from "./service";

export const GET = async (req: Request, res: Response) => {
  try {
    const users = await usersService.getAll();
    console.log(users);
    
    return NextResponse.json({ users: users }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Не валидный токен!" },
      { status: 401 }
    );
  }
};
