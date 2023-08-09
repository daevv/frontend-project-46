import _ from 'lodash';

const styler = (comparison) => {
  const spacesPerTab = 4;
  const leftShift = 2;

  const iter = (node, tabsCounter) => {
    const currentIndent = ' '.repeat(tabsCounter * spacesPerTab - leftShift);

    if (!_.isPlainObject(node)) {
      return node;
    }

    if (!_.has(node, 'type')) {
      const res = Object.keys(node)
        .flatMap((key) => `${currentIndent}  ${key}: ${iter(node[key], tabsCounter + 1)}`);
      return `{\n${res.join('\n')}\n${currentIndent.slice(2)}}`;
    }

    switch (node.type) {
      case 'added':
        return `${currentIndent}+ ${node.key}: ${iter(node.value, tabsCounter + 1)}\n`;
      case 'removed':
        return `${currentIndent}- ${node.key}: ${iter(node.value, tabsCounter + 1)}\n`;
      case 'unchanged':
        return `${currentIndent}  ${node.key}: ${iter(node.value, tabsCounter + 1)}\n`;
      case 'updated':
        return `${currentIndent}- ${node.key}: ${iter(node.value, tabsCounter + 1)}\n${currentIndent}+ ${node.key}: ${iter(node.newValue, tabsCounter + 1)}\n`;
      case 'nested':
        return `${currentIndent}  ${node.key}: {\n${node.children.flatMap((child) => iter(child, tabsCounter + 1)).join('')}${currentIndent}  }\n`;
      default:
        throw new Error('incorrect type');
    }
  };
  const compare = comparison.flatMap((diffCell) => iter(diffCell, 1));
  return `{\n${compare.join('')}}`;
};

export default styler;
