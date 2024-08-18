import { SkillCardSkin, User } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { IUser } from "./types";

const get = async (telegram_id: number) => {
  try {
    console.log('telegram_id: ', telegram_id);
    
    const user = await prisma.user.findMany({
      where: { telegram_id },
    });
    console.log('user: ', user);
    

    return user;
  } catch (err) {
    console.log(err);
    return null;
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
    return err;
  }
};

const update = async (userData: Partial<IUser>) => {
  const { telegram_id, skills, ...data } = userData;

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

export const userService = {
  get,
  getAll,
  update,
  create,
  delete: remove,
};
