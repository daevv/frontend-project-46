#!/usr/bin/env node

import { Command } from 'commander';
import getComparison from '../src/comparator.js';
import getParseFromFile from '../src/parsers.js';
import getFormatFunc from '../src/formatters/index.js';

const program = new Command();
const genDiff = (filepath1, filepath2, formatName) => {
  const diff = getComparison(
    getParseFromFile(filepath1),
    getParseFromFile(filepath2),
    getFormatFunc(formatName),
  );
  console.log(diff);
};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .version('0.1.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => genDiff(filepath1, filepath2, options.format));

program.parse();
