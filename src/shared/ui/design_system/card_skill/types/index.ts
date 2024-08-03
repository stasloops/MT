import { StaticImageData } from "next/image";

export interface ISkillCardSkin {
  id: number;
  front: StaticImageData;
  back: StaticImageData;
}

export interface ICardSkill {
  id: number;
  title: string;
  description: string;
  streak: number;
  createdAt: Date;
  skin_id: number;
}
