export interface IUser {
  id: number;
  telegramID: number;
  name: string;
  avatar: string | null;
  description: string;
  balance: number;
  streak: number;
  tasks: number[];
  skills: number[];
  debuffs: number[];
  createdAt: Date;
}
