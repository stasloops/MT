import { prisma } from "../lib/prisma";
import { IUser } from "./types";

const get = async (telegram_id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { telegram_id },
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
  telegram_id,
}: Partial<IUser>): Promise<IUser | null> => {
  try {
    if (!telegram_id) {
      return null;
    }

    const newUser: IUser = await prisma.user.create({
      data: {
        telegram_username,
        name,
        avatar,
        telegram_id,
      },
    });

    return newUser;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const update = async (userData: Partial<IUser>) => {
  const { telegram_id, ...data } = userData;

  const newUser = await prisma.user.update({
    where: { telegram_id },
    data: data,
  });

  return newUser;
};

const remove = async (userId: number) => {
  try {
    await prisma.user.delete({
      where: {
        telegram_id: userId,
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
