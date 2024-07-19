import { prisma } from "../lib/prisma";

const getAll = async () => {
  try {
    const users = await prisma.user.findMany();
    console.log('users: ',users);
    
    return users;
  } catch (err) {
    console.log("getAll ERROR: ", err);
  }
};

export const usersService = {
  getAll,
};
