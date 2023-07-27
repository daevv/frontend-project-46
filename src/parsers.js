import * as fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const getPathToFile = (filePath) => {
  const cwd = process.cwd();
  return path.resolve(cwd, filePath);
};

const getParseFromFile = (filePath) => {
  const data = fs.readFileSync(getPathToFile(filePath), 'utf8');
  const extension = filePath.split('.').at(-1);
  switch (extension) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error('unexpected file extension');
  }
};

export default getParseFromFile;
