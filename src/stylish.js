import diffResults from './const.js';

const stylerFunc = (comparison) => {
  const spacesPerTab = 4;
  const leftShift = 2;
  const iter = (tree, tabsCounter) => {
    const currentIndent = ' '.repeat(tabsCounter * spacesPerTab - leftShift);
    if (!Array.isArray(tree)) {
      return tree;
    }
    const res = tree.flatMap((leaf) => {
      switch (leaf.diffResult) {
        case diffResults.unchanged:
          return [`${currentIndent}  ${leaf.key}: ${iter(leaf.value, tabsCounter + 1)}`];
        case diffResults.add:
          return [`${currentIndent}+ ${leaf.key}: ${iter(leaf.value, tabsCounter + 1)}`];
        case diffResults.remove:
          return [`${currentIndent}- ${leaf.key}: ${iter(leaf.value, tabsCounter + 1)}`];
        case diffResults.update:
          return [`${currentIndent}- ${leaf.key}: ${iter(leaf.value, tabsCounter + 1)}`, `${currentIndent}+ ${leaf.key}: ${iter(leaf.newValue, tabsCounter + 1)}`];
        default:
          throw new Error('wrong diff type');
      }
    });
    return `{\n${res.join('\n')}\n${currentIndent.slice(2)}}`;
  };
  return iter(comparison, 1);
};

export default stylerFunc;
