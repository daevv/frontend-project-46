#!/usr/bin/env node

import { program } from 'commander';
import getComparison from './src/json-comparator.js';
import getDataFromJson from './src/parse.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .version('0.1.0')
  .option('-f, -format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const comparison = getComparison(getDataFromJson(filepath1), getDataFromJson(filepath2));
    console.log(comparison);
  });

program.parse();
