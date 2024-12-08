import getInput, { getTestInput } from "../../../utils/getInput";

const input = getInput("2024", "7").trim().split("\n");
const results = input.map((line) =>
  Number(line.substring(0, line.indexOf(":"))),
);
const equations = input.map((line) =>
  line
    .substring(line.indexOf(" ") + 1)
    .split(" ")
    .map((n) => Number(n)),
);

const addFirstTwo = (equation: number[]): number[] => {
  return [equation[0] + equation[1]].concat(equation.slice(2));
};

const multiplyFirstTwo = (equation: number[]): number[] => {
  return [equation[0] * equation[1]].concat(equation.slice(2));
};

const concatenateFirstTwo = (equation: number[]): number[] => {
  return [Number(`${equation[0]}${equation[1]}`)].concat(equation.slice(2));
};

const isEquationPossible = (result: number, equation: number[]): boolean => {
  if (equation.length === 1) return result === equation[0];
  return (
    isEquationPossible(result, addFirstTwo(equation)) ||
    isEquationPossible(result, multiplyFirstTwo(equation)) ||
    isEquationPossible(result, concatenateFirstTwo(equation))
  );
};

const part1 = () => {
  return results
    .map((result, index) =>
      isEquationPossible(results[index], equations[index]) ? result : 0,
    )
    .reduce((acc, curr) => acc + curr);
};

const part2 = () => {};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
