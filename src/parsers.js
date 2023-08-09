import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

const parseData = (data, type) => parsers[type](data);

export default parseData;
