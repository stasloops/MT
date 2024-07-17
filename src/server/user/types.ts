export interface IUser {
  id: number;
  telegram_id: number;
  name: string;
  telegram_username: string
  avatar: string | null;
  description: string;
  balance: number;
  streak: number;
  tasks: number[];
  skills: number[];
  debuffs: number[];
  createdAt: Date;
}
