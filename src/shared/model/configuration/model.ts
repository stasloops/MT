import { createEvent, createStore, sample } from "effector";
import { all_tools, initialActiveTool } from "./config";
import { ToolKey } from "./types";


const $currentTools = createStore(all_tools)

const $activeTool = createStore<ToolKey>(initialActiveTool)

const changeActiveTool = createEvent<ToolKey>()

sample({
    clock: changeActiveTool,
    target: $activeTool
})

export const configuration_model = {
    $currentTools,
    $activeTool,
    changeActiveTool
}