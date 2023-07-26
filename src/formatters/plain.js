import _ from 'lodash';
import diffResults from '../const.js';

const getValue = (value) => {
  if (Array.isArray(value)) {
    return '[complex value]';
  }
  return ((typeof value === 'string') ? `'${value}'` : value);
};

const plain = (comparison) => {
  const iter = (node, path) => {
    if (Array.isArray(node)) {
      const res = node.flatMap((leaf) => iter(leaf, [...path, leaf.key]));
      return res.join('\n');
    }
    switch (node.diffResult) {
      case diffResults.add:
        return `Property '${path.join('.')}' was added with value: ${getValue(node.value)}`;
      case diffResults.remove:
        return `Property '${path.join('.')}' was removed`;
      case diffResults.update:
        return `Property '${path.join('.')}' was updated. From ${getValue(node.value)} to ${getValue(node.newValue)}`;
      case diffResults.unchanged:
        return (_.isObject(node.value)) ? iter(node.value, path) : [];
      default:
        throw new Error('unexpected diff type');
    }
  };
  return iter(comparison, []);
};

export default plain;
