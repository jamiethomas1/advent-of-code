const { readFileSync } = require("fs");

export default function readInputFile(year: string, day: string): string {
  return readFileSync(`challenges/${year}/${day}/input.txt`, "utf-8");
}

export function getTestInput(year: string, day: string): string {
  return readFileSync(`challenges/${year}/${day}/test.txt`, "utf-8");
}
