import { SkillCardSkin, User } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { IUser } from "./types";

const get = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

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
  id,
}: Partial<IUser>): Promise<User | any> => {
  try {
    if (!id) {
      return null;
    }

    const defaultSkillCardSkins: Omit<SkillCardSkin, 'id'>[] = [
      { skinId: 1, quantity: 2, quantityLeft: 2, userId: id },
      { skinId: 2, quantity: 2, quantityLeft: 2, userId: id },
    ];

    const newUser: User = await prisma.user.create({
      data: {
        id: id,
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
  const { id, skills, ...data } = userData;

  const newUser = await prisma.user.update({
    where: { id },
    data: { ...data },
  });

  return newUser;
};

const remove = async (userId: number) => {
  try {
    await prisma.user.delete({
      where: {
        id: userId,
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
