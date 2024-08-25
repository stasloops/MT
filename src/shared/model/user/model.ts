import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector";
import { getUser } from "./api";
import { IUser } from "@/server/user/types";

const fetchUserFx = createEffect(getUser);

const $user = restore<IUser | null>(fetchUserFx, null);

const $isLoading = createStore(true);

const updateUser = createEvent<Partial<IUser>>();

const incrementSkillCardSkinQuantityLeft = createEvent<number>();

const decrementSkillCardSkinsQuantityLeft = createEvent<number>();

sample({
  clock: incrementSkillCardSkinQuantityLeft,
  source: $user,
  fn: (user, id) => {
    if (!user) {
      return null;
    }

    const updatedSkillCardSkins = user?.skillCardSkins.map((skin) => {
      if (skin.skinId === id) {
        return { ...skin, quantityLeft: skin.quantityLeft + 1 };
      }

      return skin;
    });

    return { ...user, skillCardSkins: updatedSkillCardSkins };
  },
  target: $user,
});

sample({
  clock: decrementSkillCardSkinsQuantityLeft,
  source: $user,
  fn: (user, id) => {
    if (!user) {
      return null;
    }

    const updatedSkillCardSkins = user?.skillCardSkins.map((skin) => {
      if (skin.skinId === id && skin.quantityLeft) {
        return { ...skin, quantityLeft: skin.quantityLeft - 1 };
      }

      return skin;
    });

    return { ...user, skillCardSkins: updatedSkillCardSkins };
  },
  target: $user,
});

sample({
  clock: updateUser,
  source: $user,
  fn: (user, newData) => {
    if (!user) {
      return null;
    }
    return { ...user, ...newData };
  },
  target: $user,
});

sample({
  clock: fetchUserFx.doneData,
  target: $user,
});

sample({
  clock: fetchUserFx,
  fn: () => false,
  target: $isLoading,
});

export const user_model = {
  $user,
  $isLoading,
  fetchUserFx,
  updateUser,

  decrementSkillCardSkinsQuantityLeft,
  incrementSkillCardSkinQuantityLeft,
};
