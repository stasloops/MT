import { IconWrapperProps } from "@/shared/ui/icons";
import { FC } from "react";


export type ToolKey = 'profile' | 'skills' | 'items' | 'tasks' | 'settings';

export interface ITool {
    key: ToolKey;
    label: string;
    icon: FC<IconWrapperProps>;
    width: number;
    height: number;

}
