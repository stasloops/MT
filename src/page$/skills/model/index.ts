import { createEffect, createEvent, restore, sample } from "effector";
import { api } from "./api";
import { ISkill } from "@/server/skill/types";
import { user_model } from "@/shared/model/user";

const fetchSkillsFx = createEffect(api.getSkills);

const addSkillFx = createEffect(api.addSkill);

const removeSkillFx = createEffect(api.removeSkill);

const removeSkill = createEvent<number>();

const updateSkillFx = createEffect();

const $skills = restore<ISkill[]>(fetchSkillsFx, []);

sample({
  clock: removeSkill,
  source: $skills,
  fn: (skills, id) => {
    return skills.filter((skill) => skill.id !== id);
  },
  target: $skills,
});

sample({
  clock: removeSkill,
  target: removeSkillFx,
});

sample({
  clock: removeSkillFx.doneData,
  fn: ({ skinId }) => skinId,
  target: user_model.incrementSkillCardSkinQuantityLeft,
});

sample({
  clock: addSkillFx.doneData,
  source: $skills,
  fn: (skills: ISkill[], newSkill: ISkill) => {
    return [newSkill, ...skills];
  },
  target: $skills,
});

sample({
  clock: addSkillFx.doneData,
  fn: (skill) => {
    return skill.skinId;
  },
  target: user_model.decrementSkillCardSkinsQuantityLeft,
});

export const skills_model = {
  $skills,
  fetchSkillsFx,
  removeSkill,
  addSkillFx,
  updateSkillFx,
};
