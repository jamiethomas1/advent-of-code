import getInput, { getTestInput } from "../../../utils/getInput";

const input: string[][] = getInput("2024", "8")
  .trim()
  .split("\n")
  .map((line: string) => Array.from(line));

const antennae = input.flatMap((line: string[], yIndex: number) =>
  line.reduce((acc: number[][], curr: string, xIndex: number) => {
    if (curr !== "." && curr !== "#") acc.push([yIndex, xIndex]);
    return acc;
  }, []),
);

// Map over input
// For each non-. char, get array of sibling positions
// Map over char positions & convert to relative transformations
// Apply that transformation to the corresponding sibling
// Check resulting position is in bounds
// Filter by unique

const part1 = () => {
  const antinodes = antennae.flatMap((antenna: number[]) =>
    antennae
      .filter(
        (a: number[]) => input[a[0]][a[1]] === input[antenna[0]][antenna[1]],
      )
      .map((a) => [a[0] - antenna[0], a[1] - antenna[1]])
      .filter((a) => !(a[0] === 0 && a[1] === 0))
      .map((d) => [2 * d[0] + antenna[0], 2 * d[1] + antenna[1]])
      .filter(
        (a) =>
          a[0] >= 0 &&
          a[0] < input.length &&
          a[1] >= 0 &&
          a[1] < input[0].length,
      ),
  );
  console.log(antinodes);
  return Array.from(new Set(antinodes.map((a) => JSON.stringify(a)))).map((a) =>
    JSON.parse(a),
  ).length;
};

const part2 = () => {
  const antinodes = antennae.flatMap((antenna: number[]) =>
    antennae
      .filter(
        (a: number[]) => input[a[0]][a[1]] === input[antenna[0]][antenna[1]],
      )
      .map((a) => [a[0] - antenna[0], a[1] - antenna[1]])
      .filter((a) => !(a[0] === 0 && a[1] === 0))
      .map((d) => {
        let currentANs: number[][] = [];
        for (let i = 1; i < input.length; i++) {
          currentANs.push([i * d[0] + antenna[0], i * d[1] + antenna[1]]);
        }
        return currentANs;
      })
      .flat()
      .filter(
        (a) =>
          a[0] >= 0 &&
          a[0] < input.length &&
          a[1] >= 0 &&
          a[1] < input[0].length,
      ),
  );
  console.log(antinodes);
  return Array.from(new Set(antinodes.map((a) => JSON.stringify(a)))).map((a) =>
    JSON.parse(a),
  ).length;
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
