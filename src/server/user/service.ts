import { prisma } from "../lib/prisma";
import { IUser } from "./types";

const update = async (userData: IUser) => {
  const { id, ...data } = userData;

  const newUser = await prisma.user.update({
    where: { id: id },
    data: data,
  });

  return newUser;
};

const create = async ({ name, avatar }: Partial<IUser>) => {
  const newUser = await prisma.user.create({
    data: {
      name,
      avatar,
    },
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
  update,
  create,
  delete: remove,
};
