import { IUser } from "../../../server/user/types";
import { createEffect, restore, sample } from "effector";
import { getUser } from "./api";

const fetchUserFx = createEffect(getUser);

const $user = restore<IUser | null>(fetchUserFx, null);

sample({
  clock: fetchUserFx.doneData,
  target: $user,
});

export const userModel = { $user, fetchUserFx };
