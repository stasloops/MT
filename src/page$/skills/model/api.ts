import axios from "axios";

export const getSkills = async () => {
  const res = await axios.get("/api/skill");
  return res.data;
};

export const addSkill = async (skin_id: number) => {
  const res = await axios.post("/api/skill", { skin_id });
  return res.data;
};
