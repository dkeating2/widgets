import { z } from "zod";

const sum = {
  name: "Sum",
  signature: z.function().args(z.number().array()).returns(z.number()),
  implementation: (args) => args.reduce((acc, val) => acc + val, 0),
};
const product = z
  .function()
  .args(z.number().array())
  .returns(z.number())
  .implement((args) => args.reduce((acc, val) => acc * val, 1));

const subtract = {
  name: "Subtract",
  signature: z.function().args(z.number(), z.number()).returns(z.number()),
  implementation: (a, b) => a - b,
};

const divide = z
  .function()
  .args(z.number(), z.number())
  .returns(z.number())
  .implement((a, b) => a / b);

const pow = z
  .function()
  .args(z.number(), z.number())
  .returns(z.number())
  .implement((a, b) => a ** b);

const average = z
  .function()
  .args(z.number().array())
  .returns(z.number())
  .implement((args) => sum(args) / args.length);

const median = z
  .function()
  .args(z.number().array())
  .returns(z.number())
  .implement((args) => {
    const sorted = [...args].sort();
    return sorted.length % 2 === 0
      ? (sorted[sorted.length / 2] + sorted[sorted.length / 2 - 1]) / 2
      : sorted[Math.floor(sorted.length / 2)];
  });

const min = z
  .function()
  .args(z.number().array())
  .returns(z.number())
  .implement((args) => Math.min(...args));

const max = z
  .function()
  .args(z.number().array())
  .returns(z.number())
  .implement((args) => Math.max(...args));

export { sum, product, subtract, divide, pow, average, median, min, max };
