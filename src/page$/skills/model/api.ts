import axios from "axios";

export const getSkills = async () => {
  const res = await axios.get("/api/skill");
  return res.data;
};

export const addSkill = async (skin_id: number) => {
  const res = await axios.post("/api/skill", { skin_id });
  return res.data;
};

export const removeSkill = async (id: number) => {
  const { data } = await axios.delete(`/api/skill?id=${id}`);
  return { id, skinId: data.skinId };
};

export const api = { getSkills, addSkill, removeSkill };
