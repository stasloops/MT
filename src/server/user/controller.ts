import { NextResponse } from "next/server";

import { userService } from "./service";

export const GET = async (req: Request, res: Response) => {
  const users = await userService.getAll();
  return NextResponse.json({ users }, { status: 200 });
};

export const POST = async (req: Request, res: Response) => {
  // const { name }: any = await req.json();

  // const newUser = await prisma.user.create({
  //   data: {
  //     name,
  //   },
  // });

  // return NextResponse.json({ ...newUser }, { status: 201 });
};

export const PUT = async (req: Request, res: Response) => {};
