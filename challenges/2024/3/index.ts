import getInput from "../../../utils/getInput";

const part1 = () => {
  const input = getInput("2024", "3");
  return Array.from(
    input.matchAll(/mul\((\d+),(\d+)\)/g),
    (r) => Number(r[1]) * Number(r[2]),
  ).reduce((acc, curr) => acc + curr);
};

const part2 = () => {
  const input = getInput("2024", "3");
  const dos = input.split(/do\(\)/);
  return dos
    .map((d) => {
      return Array.from(
        d.split(/don't\(\)/)[0].matchAll(/mul\((\d+),(\d+)\)/g),
        (r) => Number(r[1]) * Number(r[2]),
      );
    })
    .flat()
    .reduce((acc, curr) => acc + curr);
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
