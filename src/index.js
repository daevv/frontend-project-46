import * as fs from 'node:fs';
import path from 'node:path';
import getComparison from './comparator.js';
import getParseFromFile from './parsers.js';
import getFormatFunc from './formatters/index.js';

const getPathToFile = (filePath) => {
  const cwd = process.cwd();
  const fullPath = path.resolve('..', cwd, filePath);
  return fs.readFileSync(fullPath, 'utf8');
};

const getFileType = (filename) => filename.split('.').at(-1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const diff = getComparison(
    getParseFromFile(getPathToFile(filepath1), getFileType(filepath1)),
    getParseFromFile(getPathToFile(filepath2), getFileType(filepath2)),
    getFormatFunc(formatName),
  );
  return diff;
};

export default genDiff;
