import { createEffect, restore, sample } from "effector";
import { addSkill, getSkills } from "./api";

const fetchSkillsFx = createEffect(getSkills);

const addSkillFx = createEffect(addSkill);

const updateSkillFx = createEffect();

const $skills = restore<ISkill[]>(fetchSkillsFx, []);

sample({
  clock: addSkillFx.doneData,
  source: $skills,
  fn: (skills: ISkill[], newSkill: ISkill) => {
    return [newSkill, ...skills];
  },
  target: $skills,
});

export const skills_model = {
  $skills,
  fetchSkillsFx,
  addSkillFx,
  updateSkillFx,
};
