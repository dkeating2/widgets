import { z } from 'zod';

const join = z
  .function()
  .args(z.string().array(), z.string())
  .returns(z.string())
  .implement((args, sep) => args.join(sep));

const concat = z
  .function()
  .args(z.string().array())
  .returns(z.string())
  .implement((args) => args.join(''));

const split = z
  .function()
  .args(z.string(), z.string())
  .returns(z.string().array())
  .implement((str, sep) => str.split(sep));

const replace = z
  .function()
  .args(z.string(), z.string(), z.string())
  .returns(z.string())
  .implement((str, search, replace) => str.replace(search, replace));

const substring = z
  .function()
  .args(z.string(), z.number(), z.number())
  .returns(z.string())
  .implement((str, start, end) => str.substring(start, end));

const format = z
  .function()
  .args(z.string(), z.any())
  .returns(z.string())
  .implement((str, ...args) => {
    return str.replace(/{(\d+)}/g, (match, number) => {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  });

export { join, concat, split, replace, substring, format };
