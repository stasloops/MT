// export interface IUser {
//   id: number;
//   telegram_id: number;
//   name: string;
//   telegram_username: string
//   avatar: string | null;
//   description: string;
//   balance: number;
//   streak: number;
//   tasks: number[];
//   skills?: ISkill[];
//   debuffs: number[];
//   createdAt: Date;
// }

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
  // skillCardSkins: any[];
  createdAt: Date;
}

interface UserSkillCardSkin {
  id: number;
  quantity: number;
  quantityLeft: number;
}
