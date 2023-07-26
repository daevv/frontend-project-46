import styler from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatFunc = (format) => {
  switch (format) {
    case 'stylish':
      return styler;
    case 'plain':
      return plain;
    case 'json':
      return json;
    default:
      throw new Error('Wrong format type');
  }
};

export default getFormatFunc;
