import { NextResponse } from "next/server";
import { prisma } from "../lib/prisma";

export const GET = async (req: Request, res: Response) => {
  return NextResponse.json({ message: "Еврика блядь!!!" }, { status: 210 });
};

export const POST = async (req: Request, res: Response) => {
  const { name }: any = await req.json();

  const newUser = await prisma.user.create({
    data: {
      name,
    },
  });

  return NextResponse.json({ ...newUser }, { status: 201 });
};


export const PUT  = async  (req: Request, res: Response)  =>  {
    
}