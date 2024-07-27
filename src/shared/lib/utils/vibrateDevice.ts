export const vibrateDevice = (duration: number) => {
  if ("vibrate" in navigator) {
    navigator.vibrate(duration);
    alert("Vibrate supported");
  } else {
    alert("Vibrate not supported");
  }
};
