import getInput from "../../../utils/getInput";

const input = getInput("2024", "4");
const cells = input.split("\n").map((l) => Array.from(l.trim()));

function findWords(word: string, y: number, x: number): number {
  const chars = Array.from(word);

  if (cells[y][x] !== chars[0]) return 0;

  const topEdge = y < chars.length - 1;
  const bottomEdge = y > cells.length - chars.length;
  const leftEdge = x < chars.length - 1;
  const rightEdge = x > cells[x].length - chars.length;

  let count = 0;

  // L2R
  const l2r = chars.reduce((acc, curr, index) => {
    if (acc === false || rightEdge) return false;
    return curr === cells[y][x + index];
  }, true);

  if (l2r) count++;

  // R2L
  const r2l = chars.reduce((acc, curr, index) => {
    if (acc === false || leftEdge) return false;
    return curr === cells[y][x - index];
  }, true);

  if (r2l) count++;

  // T2B
  const t2b = chars.reduce((acc, curr, index) => {
    if (acc === false || bottomEdge) return false;
    return curr === cells[y + index][x];
  }, true);

  if (t2b) count++;

  // B2T
  const b2t = chars.reduce((acc, curr, index) => {
    if (acc === false || topEdge) return false;
    return curr === cells[y - index][x];
  }, true);

  if (b2t) count++;

  // DTR2BL
  const dtr2bl = chars.reduce((acc, curr, index) => {
    if (acc === false || bottomEdge || leftEdge) return false;
    return curr === cells[y + index][x - index];
  }, true);

  if (dtr2bl) count++;

  // DTL2BR
  const dtl2br = chars.reduce((acc, curr, index) => {
    if (acc === false || bottomEdge || rightEdge) return false;
    return curr === cells[y + index][x + index];
  }, true);

  if (dtl2br) count++;

  // DBR2TL
  const dbr2tl = chars.reduce((acc, curr, index) => {
    if (acc === false || topEdge || leftEdge) return false;
    return curr === cells[y - index][x - index];
  }, true);

  if (dbr2tl) count++;

  // DBL2TR
  const dbl2tr = chars.reduce((acc, curr, index) => {
    if (acc === false || topEdge || rightEdge) return false;
    return curr === cells[y - index][x + index];
  }, true);

  if (dbl2tr) count++;

  return count;
}

const part1 = () => {
  return cells
    .map((l, li) =>
      l.map((c, ci) => {
        if (c !== "X") return 0;
        return findWords("XMAS", li, ci);
      }),
    )
    .flat()
    .reduce((acc, curr) => acc + curr);
};

const findXMas = (y: number, x: number): boolean => {
  if (y === 0 || y === cells[0].length || x === 0 || x === cells.length)
    return false;

  let masLines = 0;

  if (cells[y - 1][x - 1] === "S" && cells[y + 1][x + 1] === "M") masLines++;
  else if (cells[y - 1][x - 1] === "M" && cells[y + 1][x + 1] === "S")
    masLines++;

  if (cells[y + 1][x - 1] === "S" && cells[y - 1][x + 1] === "M") masLines++;
  else if (cells[y + 1][x - 1] === "M" && cells[y - 1][x + 1] === "S")
    masLines++;

  if (masLines === 2) return true;

  return false;
};

const part2 = () => {
  return cells
    .map((l, li) =>
      l.map((c, ci) => {
        if (c !== "A") return 0;
        return findXMas(li, ci);
      }),
    )
    .flat()
    .filter((b) => b === true).length;
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
