interface ISkill {
  id: number;
  user_id: number;
  skin_id: number;
  title: string;
  description: string;
  streak: number;
  createdAt: Date;
  endDate: Date;
  activePeriod: Date;
  replay: any;
}
