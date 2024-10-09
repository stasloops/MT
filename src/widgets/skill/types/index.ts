export interface ITerm {
    id: number;
    caption: string;
    isDone: boolean;
}

export type Mode = 'usual' | 'delete' | 'update' | 'create'