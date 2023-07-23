import * as fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const getPathToFile = (filename) => {
  const cwd = process.cwd();
  const partsOfPath = filename.split('/');
  return path.resolve(cwd, ...partsOfPath);
};

const getParseFromFile = (filename) => {
  const data = fs.readFileSync(getPathToFile(filename), 'utf8');
  const extension = filename.split('.').at(-1);
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
