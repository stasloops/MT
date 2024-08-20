import { SkillCardSkin, User } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { IUser } from "./types";

const get = async (telegram_id: number) => {
  try {
    const user = await prisma.user.findFirst({
      where: { telegram_id },
    });

    return user;
  } catch (err) {
    throw err;
  }
};

const getAll = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (err) {
    console.log("getAll ERROR: ", err);
  }
};

const create = async ({
  name,
  telegram_username = "",
  avatar,
  telegram_id,
}: Partial<User>): Promise<User | any> => {
  try {
    if (!telegram_id) {
      return null;
    }

    const defaultSkillCardSkins: Omit<SkillCardSkin, "id" | "userId">[] = [
      { skinId: 1, quantity: 2, quantityLeft: 2 },
      { skinId: 2, quantity: 2, quantityLeft: 2 },
    ];

    const newUser: User = await prisma.user.create({
      data: {
        telegram_id: telegram_id,
        telegram_username,
        name,
        avatar,
        skillCardSkins: {
          create: defaultSkillCardSkins,
        },
      },
    });

    return newUser;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const update = async (userData: Partial<IUser>) => {
  const { telegram_id, skills, skillCardSkins, ...data } = userData;

  const newUser = await prisma.user.update({
    where: { telegram_id },
    data: { ...data },
  });

  return newUser;
};

const remove = async (telegram_id: number) => {
  try {
    await prisma.user.delete({
      where: {
        id: telegram_id,
      },
    });
  } catch (err) {
    throw err;
  }
};

const getSkillCardSkins = async (telegram_id: number) => {
  try {
    const skillCardSkins = await prisma.skillCardSkin.findMany({
      where: { userId: telegram_id },
    });

    return skillCardSkins;
  } catch (err) {
    throw err;
  }
};

export const userService = {
  get,
  getAll,
  update,
  create,
  delete: remove,
  getSkillCardSkins,
};
