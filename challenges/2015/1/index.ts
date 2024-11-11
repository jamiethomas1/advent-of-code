import getInput from "../../../utils/getInput";

const part1 = () => {
  return Array.from(getInput("2015", "1")).reduce(
    (acc: number, curr: string) => {
      return acc + (curr === "(" ? 1 : -1);
    },
    0,
  );
};

const part2 = () => {
  let sum = 0;
  return Array.from(getInput("2015", "1")).findIndex((element) => {
    sum += element === "(" ? 1 : -1;
    return sum < 0;
  });
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
