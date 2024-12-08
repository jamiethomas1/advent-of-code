import getInput from "../../../utils/getInput";

const input = getInput("2024", "5").split("\n\n");
const instructions = input[0]
  .split("\n")
  .map((rule) => rule.split("|").map((num) => Number(num)));
const pages = input[1].split("\n");

const getRelevantRules = (line: number[]): number[][] => {
  return instructions.filter(
    (rule) => line.includes(rule[0]) && line.includes(rule[1]),
  );
};

const isRightOrder = (line: number[]): boolean => {
  const rules = getRelevantRules(line);
  if (rules.length === 0) return false;

  const result = line.reduce((acc, curr, index) => {
    if (!acc) return acc;

    let status = true;

    rules.forEach((rule) => {
      if (status === false) return false;
      if (curr === rule[0]) {
        status = line.slice(index + 1).includes(rule[1]);
      } else if (curr === rule[1]) {
        status = line.slice(0, index).includes(rule[0]);
      }
    });

    return status;
  }, true);

  return result;
};

const part1 = () => {
  return pages
    .map((line) => line.split(",").map((num) => Number(num)))
    .filter((line) => isRightOrder(line))
    .map((line) => line[Math.floor(line.length / 2)])
    .reduce((acc, curr) => acc + curr, 0);
};

const mySort = (line: number[]): number[] => {
  const rules = getRelevantRules(line);
  if (isRightOrder(line)) return line;

  rules.forEach((rule) => {
    if (line.slice(line.indexOf(rule[0]) + 1).includes(rule[1])) {
      return;
    } else {
      [line[line.indexOf(rule[0])], line[line.indexOf(rule[1])]] = [
        line[line.indexOf(rule[1])],
        line[line.indexOf(rule[0])],
      ];
      line = mySort(line);
    }
  });

  return line;
};

const part2 = () => {
  return pages
    .map((line) => line.split(",").map((num) => Number(num)))
    .filter((line) => !isRightOrder(line))
    .map((line) => mySort(line))
    .map((line) => line[Math.floor(line.length / 2)])
    .reduce((acc, curr) => acc + curr, 0);
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
