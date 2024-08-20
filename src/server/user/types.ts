import { ISkill } from "../skill/types";

export interface IUser {
  id: number;
  telegram_id: number;
  telegram_username: string;
  name: string;
  avatar?: string | null;
  description: string;
  balance: number;
  streak: number;
  tasks: number[];
  skills?: ISkill[];
  skillCardSkins: UserSkillCardSkin[];
  createdAt: Date;
}

interface UserSkillCardSkin {
  id: number;
  skinId: number;
  userId: number;
  quantity: number;
  quantityLeft: number;
}
