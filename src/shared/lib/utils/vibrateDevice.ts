export const vibrateDevice = (duration: number) => {
  const canVibrate: any = window.navigator.vibrate;
  if (canVibrate) window.navigator.vibrate(duration);
};
