import getInput, { getTestInput } from "../../../utils/getInput";

const input = getInput("2024", "6")
  .split("\n")
  .map((line) => Array.from(line));

const obstacles = input
  .map((line, yIndex) => {
    if (!line.includes("#")) return;
    return line
      .map((c, i) => {
        if (c !== "#") return;
        return [yIndex, i];
      })
      .filter((c) => c);
  })
  .flat();

const guardY: number = input.findIndex((line) => line.includes("^"));
const guardX: number = input[guardY].findIndex((c) => c === "^");
const guardInit: [number, number] = [guardY, guardX];

const guardDirections = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const isInBounds = (coords: number[]): boolean => {
  return (
    coords[0] !== input.length - 1 &&
    coords[1] !== input[0].length &&
    coords[0] >= 0 &&
    coords[1] >= 0
  );
};

const part1 = () => {
  let positions: number[][] = [];
  let guard: number[] = guardInit;
  let direction: number = 0;
  let guardDirection: number[] = guardDirections[direction];
  while (isInBounds(guard)) {
    const nextPos = guard.map((n, i) => n + guardDirection[i]);
    if (arrayIncludes(obstacles, nextPos)) {
      direction++;
      guardDirection = guardDirections[direction % 4];
      continue;
    }
    positions.push(guard);
    guard = nextPos;
  }
  return Array.from(new Set(positions.map((p) => JSON.stringify(p)))).length;
};

const arrayIncludes = <T>(haystack: T[], needle: T): boolean => {
  return haystack
    .map((a) => JSON.stringify(a))
    .includes(JSON.stringify(needle));
};

const part2 = () => {
  let positions: number[][] = [];
  let guard: number[] = guardInit;
  let direction: number = 0;
  let guardDirection: number[] = guardDirections[direction];
  let candidates: number[][] = [];
  while (isInBounds(guard)) {
    const nextPos = guard.map((n, i) => n + guardDirection[i]);
    if (arrayIncludes(obstacles, nextPos)) {
      direction++;
      guardDirection = guardDirections[direction % 4];
      continue;
    }
    positions.push(guard);
    guard = nextPos;
  }

  guard = guardInit;
  direction = 0;
  guardDirection = guardDirections[direction];
  positions.forEach((p, i) => {
    if (i === 0) return;
    console.log(`Checking position ${i} of ${positions.length}`);
    obstacles.push(p);
    let testPositions: number[][] = [];

    while (isInBounds(guard)) {
      const nextPos = guard.map((n, i) => n + guardDirection[i]);
      if (arrayIncludes(obstacles, nextPos)) {
        direction++;
        guardDirection = guardDirections[direction % 4];
        continue;
      }
      if (arrayIncludes(testPositions, guard)) {
        if (
          JSON.stringify(
            testPositions[
              testPositions.findIndex(
                (c) => JSON.stringify(c) === JSON.stringify(guard),
              ) + 1
            ],
          ) === JSON.stringify(nextPos)
        ) {
          candidates.push(p);
          break;
        }
      }
      if (guard !== guardInit) {
        testPositions.push(guard);
      }
      guard = nextPos;
    }
    obstacles.pop();
    guard = guardInit;
    direction = 0;
    guardDirection = guardDirections[direction];
  });
  return Array.from(new Set(candidates.map((p) => JSON.stringify(p)))).length;
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
