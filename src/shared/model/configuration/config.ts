import { BookIcon, ChestIcon, MirrorIcon, WheelIcon } from "@/shared/ui/icons";
import { ITool, ToolKey } from "./types";

export const all_tools: ITool[] = [
    { key: 'profile', label: "Профиль", icon: MirrorIcon, width: 36, height: 51 },
    { key: 'skills', label: "Навыки", icon: MirrorIcon, width: 36, height: 51 },
    { key: 'items', label: "Предметы", icon: ChestIcon, width: 47, height: 46 },
    { key: 'tasks', label: "Задания", icon: BookIcon, width: 44, height: 55 },
    { key: 'settings', label: "Настройки", icon: WheelIcon, width: 44, height: 45 },
]


export const initialActiveTool: ToolKey = 'skills'