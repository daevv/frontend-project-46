import * as fs from 'node:fs';
import path from 'node:path';
import getComparison from './src/comparator.js';
import parseData from './src/parsers.js';
import formatDiff from './src/formatters/index.js';

const getPathToFile = (filePath) => {
  const cwd = process.cwd();
  return path.resolve(cwd, filePath);
};

const readFile = (filepath) => {
  const fullPath = getPathToFile(filepath);
  return fs.readFileSync(fullPath, 'utf8');
};

const getFileType = (filename) => filename.split('.').at(-1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const obj1 = parseData(readFile(filepath1), getFileType(filepath1));
  const obj2 = parseData(readFile(filepath2), getFileType(filepath2));
  const diffData = getComparison(obj1, obj2);
  return formatDiff(formatName, diffData);
};

export default genDiff;
