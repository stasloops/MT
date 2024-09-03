import { NextResponse } from "next/server";
import { prisma } from "../lib/prisma";
import { cookies } from "next/headers";
import { authService, VerifyToken } from "../auth/service";
import { card_skins } from "@/entities/skill";

const getUserId = () => {
  let token = cookies().get("Authorization")?.value;
  const validData: VerifyToken = authService.verifyToken(String(token));

  return validData?.data?.telegram_id;
};

export const GET = async (req: Request, res: Response) => {
  try {
    const telegram_id = getUserId();

    if (!telegram_id) {
      return NextResponse.json(
        { message: "Не валидный токен!" },
        { status: 401 }
      );
    }

    const skills = await prisma.skill.findMany({
      where: { userId: telegram_id },
    });

    return NextResponse.json(skills.reverse(), { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
};

export const POST = async (req: Request, res: Response) => {
  try {
    const { skin_id } = await req.json();
    const telegram_id = getUserId();

    if (!telegram_id) {
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

    const quantityLeft = await updateSkinQuantityLeft({
      userId: telegram_id,
      skinId: skin_id,
      type: "decrement",
    });

    if (quantityLeft < 0) {
      return NextResponse.json(
        { message: "Недостаточно карт" },
        { status: 400 }
      );
    }

    const skill = await prisma.skill.create({
      data: { userId: telegram_id, skinId: skin_id, title: "Название" },
    });

    return NextResponse.json(skill, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
};

export const PUT = async (req: Request, res: Response) => {
  try {
    const { id, ...rest } = await req.json();
    const telegram_id = getUserId();

    const skill = await prisma.skill.findUnique({
      where: { id: id },
    });

    if (!telegram_id || skill?.userId !== telegram_id) {
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
  const telegram_id = getUserId();
  const id = Number(req.url.split("?")[1].replace("id=", ""));

  try {
    const deletedSkill = await prisma.skill.delete({
      where: { id: id, userId: telegram_id },
    });

    if (!deletedSkill) {
      return NextResponse.json({ message: "Навык не найден" }, { status: 400 });
    }

    const quantityLeft = await updateSkinQuantityLeft({
      userId: telegram_id,
      skinId: deletedSkill.skinId,
      type: "increment",
    });
    if (quantityLeft < 0) {
      return NextResponse.json(
        { message: "Недостаточно карт" },
        { status: 400 }
      );
    }

    return NextResponse.json({ ...deletedSkill }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e, message: id }, { status: 500 });
  }
};

const updateSkinQuantityLeft = async ({
  userId,
  skinId,
  type,
}: {
  userId: number;
  skinId: number;
  type: "increment" | "decrement";
}) => {
  const skills = await prisma.skill.findMany({ where: { userId } });
  const filteredSkillsBySkinId = skills.filter((i) => i.skinId === skinId);

  const skillCardSkins = await prisma.skillCardSkin.findMany({
    where: { skinId, userId },
  });
  const skillCardSkin = skillCardSkins[0];

  if (!skillCardSkin) {
    return 0; // Обработка случая, когда skillCardSkin не найден
  }

  const newQuantityLeft =
    type === "decrement"
      ? skillCardSkin.quantity - filteredSkillsBySkinId.length - 1
      : skillCardSkin.quantity - filteredSkillsBySkinId.length;

  if (newQuantityLeft < 0) {
    return newQuantityLeft;
  }

  await prisma.skillCardSkin.updateMany({
    where: { skinId, userId },
    data: {
      quantityLeft: newQuantityLeft,
    },
  });

  return newQuantityLeft;
};
