import getInput from "../../../utils/getInput";

const part1 = () => {
  return getInput("2015", "2")
    .trim()
    .split("\n")
    .reduce((acc: number, curr: string) => {
      return (
        acc +
        curr
          .trim()
          .split("x")
          .map(Number)
          .sort((a: number, b: number) => a - b)
          .reduce(
            (acc: number, curr: number, index: number, array: number[]) => {
              return (
                array[0] * array[1] +
                array[0] * array[1] * 2 +
                array[0] * array[2] * 2 +
                array[1] * array[2] * 2
              );
            },
            0,
          )
      );
    }, 0);
};

const part2 = () => {
  return getInput("2015", "2")
    .trim()
    .split("\n")
    .reduce((acc: number, curr: string) => {
      return (
        acc +
        curr
          .trim()
          .split("x")
          .map((c: string) => parseInt(c))
          .sort((a: number, b: number) => a - b)
          .reduce(
            (acc: number, curr: number, index: number, array: number[]) => {
              return (
                array[0] * 2 + array[1] * 2 + array[0] * array[1] * array[2]
              );
            },
            0,
          )
      );
    }, 0);
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
