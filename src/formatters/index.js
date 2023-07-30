import styler from './stylish.js';
import plain from './plain.js';

const funcToFomat = {
  stylish: styler,
  plain,
  json: JSON.stringify,
};

const getFormatFunc = (format) => funcToFomat[format];

export default getFormatFunc;
