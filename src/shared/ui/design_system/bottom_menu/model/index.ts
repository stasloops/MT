import { createEvent, createStore, sample } from "effector";

const $activeTab = createStore(1);

const changeActiveTab = createEvent<number>();

sample({
  clock: changeActiveTab,
  target: $activeTab,
});


// animationActiveTab


const $animationActiveTab = createStore(1)

const changeAnimationActiveTab = createEvent<number>();


sample({
  clock: changeAnimationActiveTab,
  target: $animationActiveTab,
});

// swipeTransition

const $swipeTransition = createStore<number>(500)

const changeTransition = createEvent<number>()

sample({
  clock: changeTransition,
  target: $swipeTransition,
});



// model 

export const bottom_menu_model = {
  $activeTab,
  changeActiveTab,
  $swipeTransition,
  changeTransition,
  $animationActiveTab,
  changeAnimationActiveTab
};
