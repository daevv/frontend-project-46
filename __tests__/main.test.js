import * as fs from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import genDiff from '../src/main.js';

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

test('json comparison', () => {
  expect(
    genDiff(
      relativePathToJson1,
      relativePathToJson2,
    ),
  ).toEqual(expectedSylishResult);
});

test('yaml comparison', () => {
  expect(
    genDiff(
      relativePathToYaml1,
      relativePathToYaml2,
    ),
  ).toEqual(expectedSylishResult);
});

test('plain format comparison', () => {
  expect(
    genDiff(
      relativePathToJson1,
      relativePathToYaml2,
      'plain',
    ),
  ).toEqual(expectedPlainResult);
});

test('json format comparison', () => {
  expect(
    genDiff(
      relativePathToJson1,
      relativePathToJson2,
      'json',
    ),
  ).toEqual(expectJsonResult);
});
