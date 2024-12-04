import getInput from "../../../utils/getInput";

const part1 = () => {
  const input = getInput("2024", "1").trim().split(/\n/);

  const firstList = input
    .map((e) => Number(e.substring(0, e.indexOf(" "))))
    .sort();
  const secondList = input
    .map((e) => Number(e.substring(e.lastIndexOf(" "))))
    .sort();
  return firstList
    .map((e, index) => Math.abs(e - secondList[index]))
    .reduce((acc, curr) => acc + curr);
};

const part2 = () => {
  const input = getInput("2024", "1").trim().split(/\n/);

  const firstList = input.map((e) => Number(e.substring(0, e.indexOf(" "))));
  const secondList = input.map((e) => Number(e.substring(e.lastIndexOf(" "))));
  return firstList
    .map((e) => e * secondList.filter((n) => e === n).length)
    .reduce((acc, curr) => acc + curr);
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
