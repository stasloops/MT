export const vibrateDevice = (duration: number) => {
  if ("vibrate" in navigator) {
    navigator.vibrate(duration);
  } else {
    const canVibrate: any = window.navigator.vibrate;
    if (canVibrate) window.navigator.vibrate(duration);
  }
};
