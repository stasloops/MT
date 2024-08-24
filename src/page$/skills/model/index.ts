import { createEffect, restore, sample } from "effector";
import { addSkill, getSkills, removeSkill } from "./api";
import { ISkill } from "@/server/skill/types";

const fetchSkillsFx = createEffect(getSkills);

const addSkillFx = createEffect(addSkill);

const removeSkillFx = createEffect(removeSkill);

const updateSkillFx = createEffect();

const $skills = restore<ISkill[]>(fetchSkillsFx, []);

sample({
  clock: removeSkillFx.doneData,
  source: $skills,
  fn: (skills, id) => {
    return skills.filter((skill) => skill.id !== id);
  },
  target: $skills,
});

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
  removeSkillFx,
  addSkillFx,
  updateSkillFx,
};
