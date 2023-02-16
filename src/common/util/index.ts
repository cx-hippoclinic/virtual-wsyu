export function fmtTime(s: number) {
  if (!s) {
    return "??:??";
  }
  return `${(~~(s / 60)).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
}
