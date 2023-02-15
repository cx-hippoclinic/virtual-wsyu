export function loremIpsum(len = 1e3) {
  return Array<string>(~~(Math.random() * len + len) >> 1)
    .fill("x")
    .join("");
}
