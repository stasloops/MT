import { createEvent, createStore, sample } from "effector";

const $activeTab = createStore(1);

const changeActiveTab = createEvent<number>();

sample({
  clock: changeActiveTab,
  target: $activeTab,
});

export const bottom_menu_model = {
  $activeTab,
  changeActiveTab,
};
