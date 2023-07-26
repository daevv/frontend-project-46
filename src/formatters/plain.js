import _ from 'lodash';
import TYPE_OF_DIFF from '../const.js';

const getpropertyValue = (propertyValue) => {
  if (Array.isArray(propertyValue)) {
    return '[complex value]';
  }
  return ((typeof propertyValue === 'string') ? `'${propertyValue}'` : propertyValue);
};

const plain = (comparison) => {
  const iter = (node, path) => {
    if (Array.isArray(node)) {
      const res = node.flatMap((leaf) => iter(leaf, [...path, leaf.propertyName]));
      return res.join('\n');
    }
    switch (node.diffResult) {
      case TYPE_OF_DIFF.added:
        return `Property '${path.join('.')}' was added with value: ${getpropertyValue(node.propertyValue)}`;
      case TYPE_OF_DIFF.removed:
        return `Property '${path.join('.')}' was removed`;
      case TYPE_OF_DIFF.updated:
        return `Property '${path.join('.')}' was updated. From ${getpropertyValue(node.propertyValue)} to ${getpropertyValue(node.newPropertyValue)}`;
      case TYPE_OF_DIFF.unchanged:
        return (_.isObject(node.propertyValue)) ? iter(node.propertyValue, path) : [];
      default:
        throw new Error('unexpected diff type');
    }
  };
  return iter(comparison, []);
};

export default plain;
