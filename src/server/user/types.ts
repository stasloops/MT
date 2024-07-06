export interface IUser {
  id: number;
  name: string;
  avatar: string;
  description: string;
  balance: number;
  streak: number;
  tasks: number[];
  skills: number[];
  debuffs: number[];
  createdAt: Date;
}
