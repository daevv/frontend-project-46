import * as fs from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';

import getComparison from '../src/json-comparator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('extractLinks', () => {
  const file1 = fs.readFileSync(getFixturePath('file1.json'), 'utf-8');
  const file2 = fs.readFileSync(getFixturePath('file2.json'), 'utf-8');
  const data1 = JSON.parse(file1);
  const data2 = JSON.parse(file2);
  const expectedResult = fs.readFileSync(getFixturePath('expected.txt'), 'utf-8');
  expect(getComparison(data1, data2)).toEqual(expectedResult);
});
