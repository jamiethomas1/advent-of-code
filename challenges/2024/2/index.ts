import getInput from "../../../utils/getInput";

function isReportSafe(report: number[]): boolean {
  if (report[0] === report[report.length - 1]) return false;

  let copy = [...report];

  const ascending =
    JSON.stringify(report) === JSON.stringify(copy.sort((a, b) => a - b));
  const descending =
    JSON.stringify(report) === JSON.stringify(copy.sort((a, b) => b - a));

  if (!ascending && !descending) return false;

  let safe = report.reduce((acc, curr, index) => {
    if (!acc) return false;
    if (index !== report.length - 1) {
      return (
        curr !== report[index + 1] && Math.abs(curr - report[index + 1]) <= 3
      );
    }
    return acc;
  }, true);
  return safe;
}

function problemDampener(report: number[]): boolean {
  let safe = false;
  for (let i = 0; i < report.length; i++) {
    let dampened = [...report];
    dampened.splice(i, 1);
    safe = isReportSafe(dampened);
    if (safe) break;
  }
  return safe;
}

const part1 = () => {
  const input = getInput("2024", "2").trim().split(/\n/);
  return input
    .map((report) => report.split(" ").map((n) => Number(n)))
    .filter((report) => isReportSafe(report)).length;
};

const part2 = () => {
  const input = getInput("2024", "2").trim().split(/\n/);
  return input
    .map((report) => report.split(" ").map((n) => Number(n)))
    .filter((report) => {
      const safe = isReportSafe(report);
      if (!safe) {
        return problemDampener(report);
      }
      return safe;
    }).length;
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
