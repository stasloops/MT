import { prisma } from "../lib/prisma";
import { IUser } from "./types";

const get = async (telegramID: number) => {
  const user = await prisma.user.findUnique({
    where: { telegramID },
  });
  return user;
};

const getAll = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (err) {
    console.log("getAll ERROR: ", err);
  }
};

const create = async ({ name, avatar, telegramID }: Partial<IUser>) => {
  if (!telegramID) {
    return null;
  }

  const newUser: IUser = await prisma.user.create({
    data: {
      name,
      avatar,
      telegramID,
    },
  });

  return newUser;
};

const update = async (userData: IUser) => {
  const { id, ...data } = userData;

  const newUser = await prisma.user.update({
    where: { id: id },
    data: data,
  });

  return newUser;
};

const remove = async (userId: number) => {
  try {
    await prisma.user.delete({
      where: {
        telegramID: userId,
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
