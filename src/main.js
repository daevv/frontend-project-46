import getComparison from './comparator.js';
import getParseFromFile from './parsers.js';
import getFormatFunc from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const diff = getComparison(
    getParseFromFile(filepath1),
    getParseFromFile(filepath2),
    getFormatFunc(formatName),
  );
  return diff;
};

export default genDiff;
