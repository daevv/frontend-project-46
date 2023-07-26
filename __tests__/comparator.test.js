import * as fs from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import yaml from 'js-yaml';

import getComparison from '../src/comparator.js';
import styler from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedSylishResult = fs.readFileSync(getFixturePath('expected-stylish.txt'), 'utf-8');
const expectedPlainResult = fs.readFileSync(getFixturePath('expected-plain.txt'), 'utf-8');

test('json comparison', () => {
  const file1 = fs.readFileSync(getFixturePath('file1.json'), 'utf-8');
  const file2 = fs.readFileSync(getFixturePath('file2.json'), 'utf-8');
  const data1 = JSON.parse(file1);
  const data2 = JSON.parse(file2);
  expect(getComparison(data1, data2, styler)).toEqual(expectedSylishResult);
});

test('yaml comparison', () => {
  const file1 = fs.readFileSync(getFixturePath('file1.yml'), 'utf-8');
  const file2 = fs.readFileSync(getFixturePath('file2.yml'), 'utf-8');
  const data1 = yaml.load(file1);
  const data2 = yaml.load(file2);
  expect(getComparison(data1, data2, styler)).toEqual(expectedSylishResult);
});

test('plain format comparison', () => {
  const file1 = fs.readFileSync(getFixturePath('file1.yml'), 'utf-8');
  const file2 = fs.readFileSync(getFixturePath('file2.yml'), 'utf-8');
  const data1 = yaml.load(file1);
  const data2 = yaml.load(file2);
  expect(getComparison(data1, data2, plain)).toEqual(expectedPlainResult);
});
