import * as fs from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import yaml from 'js-yaml';

import getComparison from '../src/comparator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedResult = fs.readFileSync(getFixturePath('expected.txt'), 'utf-8');

test('json comparison', () => {
  const file1 = fs.readFileSync(getFixturePath('file1.json'), 'utf-8');
  const file2 = fs.readFileSync(getFixturePath('file2.json'), 'utf-8');
  const data1 = JSON.parse(file1);
  const data2 = JSON.parse(file2);
  expect(getComparison(data1, data2)).toEqual(expectedResult);
});

test('yaml comparison', () => {
  const file1 = fs.readFileSync(getFixturePath('file1.yml'), 'utf-8');
  const file2 = fs.readFileSync(getFixturePath('file2.yml'), 'utf-8');
  const data1 = yaml.load(file1);
  const data2 = yaml.load(file2);
  expect(getComparison(data1, data2)).toEqual(expectedResult);
});
