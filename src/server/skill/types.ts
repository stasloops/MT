// export interface ISkill {
//   id: number;
//   userId: number;
//   skinId: number;
//   title: string;
//   description: string;
//   streak: number;
//   createdAt: Date;
//   endDate: Date;
//   activePeriod: Date;
//   replay: any;
// }

import { User } from "@prisma/client";

export interface ISkill {
  id: number;
  user?: User | null;
  userId?: number | null;
  skinId: number;
  title: string;
  description: string;
  streak: number;
  createdAt: Date;
  endDate?: Date | null;
  activePeriod?: Date | null;
  replay?: Replay | null | any;
}

enum Replay {
  ALL = "ALL",
  WEEKDAYS = "WEEKDAYS",
  WEEKENDS = "WEEKENDS",
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
  EVERY_2_DAYS = "EVERY_2_DAYS",
  EVERY_WEEK = "EVERY_WEEK",
  EVERY_MONTH = "EVERY_MONTH",
  EVERY_YEAR = "EVERY_YEAR",
}