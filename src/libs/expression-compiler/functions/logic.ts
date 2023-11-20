import { z } from 'zod';

const and = z
  .function()
  .args(z.boolean().array())
  .returns(z.boolean())
  .implement((args) => args.every((arg) => arg));

const or = z
  .function()
  .args(z.boolean().array())
  .returns(z.boolean())
  .implement((args) => args.some((arg) => arg));

const any = and;
const some = or;

const not = z
  .function()
  .args(z.boolean())
  .returns(z.boolean())
  .implement((arg) => !arg);

export { and, or, some, any, not };
