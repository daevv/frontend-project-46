import * as fs from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getPathToData = (filename) => path.join('__fixtures__', filename);

const expectedSylishResult = fs.readFileSync(getFixturePath('expected-stylish.txt'), 'utf-8');
const expectedPlainResult = fs.readFileSync(getFixturePath('expected-plain.txt'), 'utf-8');
const expectJsonResult = fs.readFileSync(getFixturePath('expected-json.json'), 'utf-8');

const relativePathToJson1 = getPathToData('file1.json');
const relativePathToJson2 = getPathToData('file2.json');
const relativePathToYaml1 = getPathToData('file1.yml');
const relativePathToYaml2 = getPathToData('file2.yml');

test.each([
  {
    filePath1: relativePathToJson1,
    filePath2: relativePathToJson2,
    expected: expectedSylishResult,
  },
  {
    filePath1: relativePathToYaml1,
    filePath2: relativePathToYaml2,
    expected: expectedSylishResult,
  },
  {
    filePath1: relativePathToJson1,
    filePath2: relativePathToYaml2,
    format: 'plain',
    expected: expectedPlainResult,
  },
  {
    filePath1: relativePathToJson1,
    filePath2: relativePathToJson2,
    format: 'json',
    expected: expectJsonResult,
  },
])('gendiff testing', ({
  filePath1,
  filePath2,
  format,
  expected,
}) => {
  expect(genDiff(filePath1, filePath2, format)).toBe(expected);
});
