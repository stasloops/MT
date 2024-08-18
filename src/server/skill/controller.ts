import { NextResponse } from "next/server";
import { prisma } from "../lib/prisma";
import { cookies } from "next/headers";
import { authService, VerifyToken } from "../auth/service";
import { card_skins } from "@/shared/ui/design_system/card_skill/config";

const getUserId = () => {
  let token = cookies().get("Authorization")?.value;
  const validData: VerifyToken = authService.verifyToken(String(token));

  return validData?.data?.id;
};

export const GET = async (req: Request, res: Response) => {
  try {
    const userId = getUserId();

    if (!userId) {
      return NextResponse.json(
        { message: "Не валидный токен!" },
        { status: 401 }
      );
    }

    const skills = await prisma.skill.findMany({
      where: { userId: userId },
    });

    return NextResponse.json(skills.reverse(), { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
};

export const POST = async (req: Request, res: Response) => {
  try {
    const { skin_id } = await req.json();
    const userId = getUserId();

    if (!userId) {
      return NextResponse.json(
        { message: "Не валидный токен!" },
        { status: 401 }
      );
    }

    const skin = card_skins.find((i) => i.id === skin_id);

    if (!skin) {
      return NextResponse.json(
        { message: "Несуществующий скин" },
        { status: 400 }
      );
    }

    const skill = await prisma.skill.create({
      data: { userId: userId, skinId: skin_id },
    });

    return NextResponse.json(skill, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
};

export const PUT = async (req: Request, res: Response) => {
  try {
    const { id, ...rest } = await req.json();
    const userId = getUserId();

    const skill = await prisma.skill.findUnique({
      where: { id: id },
    });

    if (!userId || skill?.userId !== userId) {
      return NextResponse.json(
        { message: "Не валидный токен!" },
        { status: 401 }
      );
    }

    await prisma.skill.update({
      where: { id: id },
      data: { ...rest },
    });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
};

export const DELETE = async (req: Request, res: Response) => {
  try {
    const { id } = await req.json();
    const userId = getUserId();

    const skill = await prisma.skill.findUnique({
      where: { id: id },
    });

    if (!userId || skill?.userId !== userId) {
      return NextResponse.json(
        { message: "Не валидный токен!" },
        { status: 401 }
      );
    }

    await prisma.skill.delete({
      where: { id: id },
    });

    return NextResponse.json(
      { message: "Навык успешно удален" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
};
