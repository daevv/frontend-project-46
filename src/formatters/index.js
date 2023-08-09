import styler from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish: styler,
  plain,
  json: JSON.stringify,
};

const formatDiff = (formatName, diffData) => formatters[formatName](diffData);

export default formatDiff;
