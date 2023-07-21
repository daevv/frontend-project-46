import * as fs from 'node:fs';
import path from 'node:path';

const getPathToFile = (filename) => {
  const cwd = process.cwd();
  const partsOfPath = filename.split('/');
  return path.resolve(cwd, ...partsOfPath);
};

const getDataFromJson = (filename) => {
  const data = fs.readFileSync(getPathToFile(filename), 'utf8');
  return JSON.parse(data);
};

export default getDataFromJson;
