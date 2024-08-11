import { NextResponse } from "next/server";
import { prisma } from "../lib/prisma";
import { cookies } from "next/headers";
import { authService, VerifyToken } from "../auth/service";
import { card_skins } from "@/shared/ui/design_system/card_skill/config";

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

    const telegram_id = validData?.data?.telegram_id;
    const skills = await prisma.skill.findMany({
      where: { user_id: telegram_id },
    });

    return NextResponse.json({ skills }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
};

export const POST = async (req: Request, res: Response) => {
  try {
    let token = cookies().get("Authorization")?.value;
    const validData: VerifyToken = authService.verifyToken(String(token));

    if (!validData) {
      return NextResponse.json(
        { message: "Не валидный токен!" },
        { status: 401 }
      );
    }

    const telegram_id = validData?.data?.telegram_id;
    const { skin_id } = await req.json();
    const skin = card_skins.find((i) => i.id === skin_id);

    if (!skin) {
      return NextResponse.json(
        { message: "Несуществующий скин" },
        { status: 400 }
      );
    }

    const skill = await prisma.skill.create({
      data: { user_id: telegram_id, skin_id: skin_id },
    });

    return NextResponse.json({ skill }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
};

export const PUT = async (req: Request, res: Response) => {
  try {
    const { id, ...rest } = await req.json();

    await prisma.skill.update({
      where: { id },
      data: { ...rest },
    });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
};

export const DELETE = async () => {};
