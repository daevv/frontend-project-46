import styler from './stylish.js';
import plain from './plain.js';

const getFormatFunc = (format) => {
  switch (format) {
    case 'stylish':
      return styler;
    case 'plain':
      return plain;
    case 'json':
      return 1;
    default:
      throw new Error('Wrong format type');
  }
};

export default getFormatFunc;
