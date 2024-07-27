export const vibrateDevice = (duration: number) => {
  if ("vibrate" in navigator) {
    navigator.vibrate(duration);
  }
};
