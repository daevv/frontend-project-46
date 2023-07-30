import yaml from 'js-yaml';

const functionForParsing = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

const getParseFromFile = (data, type) => functionForParsing[type](data);

export default getParseFromFile;
