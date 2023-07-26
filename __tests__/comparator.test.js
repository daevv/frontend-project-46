import * as fs from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import yaml from 'js-yaml';

import getComparison from '../src/comparator.js';
import styler from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import json from '../src/formatters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedSylishResult = fs.readFileSync(getFixturePath('expected-stylish.txt'), 'utf-8');
const expectedPlainResult = fs.readFileSync(getFixturePath('expected-plain.txt'), 'utf-8');
const expectJsonResult = fs.readFileSync(getFixturePath('expected-json.json'), 'utf-8');
const data1Json = JSON.parse(fs.readFileSync(getFixturePath('file1.json'), 'utf-8'));
const data2Json = JSON.parse(fs.readFileSync(getFixturePath('file2.json'), 'utf-8'));
const data1Yaml = yaml.load(fs.readFileSync(getFixturePath('file1.yml'), 'utf-8'));
const data2Yaml = yaml.load(fs.readFileSync(getFixturePath('file2.yml'), 'utf-8'));

test('json comparison', () => {
  expect(getComparison(data1Json, data2Json, styler)).toEqual(expectedSylishResult);
});

test('yaml comparison', () => {
  expect(getComparison(data1Yaml, data2Yaml, styler)).toEqual(expectedSylishResult);
});

test('plain format comparison', () => {
  expect(getComparison(data1Json, data2Yaml, plain)).toEqual(expectedPlainResult);
});

test('json format comparison', () => {
  expect(getComparison(data1Json, data2Json, json)).toEqual(expectJsonResult);
});
