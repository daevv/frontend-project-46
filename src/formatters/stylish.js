import TYPE_OF_DIFF from '../const.js';

const diffMarkers = {
  [TYPE_OF_DIFF.added]: '+',
  [TYPE_OF_DIFF.removed]: '-',
  [TYPE_OF_DIFF.unchanged]: ' ',
};

const styler = (comparison) => {
  const spacesPerTab = 4;
  const leftShift = 2;
  const iter = (tree, tabsCounter) => {
    const currentIndent = ' '.repeat(tabsCounter * spacesPerTab - leftShift);
    if (!Array.isArray(tree)) {
      return tree;
    }
    const res = tree.flatMap((leaf) => {
      if (leaf.diffResult === TYPE_OF_DIFF.updated) {
        return [`${currentIndent}- ${leaf.propertyName}: ${iter(leaf.propertyValue, tabsCounter + 1)}`,
          `${currentIndent}+ ${leaf.propertyName}: ${iter(leaf.newPropertyValue, tabsCounter + 1)}`];
      }
      return `${currentIndent}${diffMarkers[leaf.diffResult]} ${leaf.propertyName}: ${iter(leaf.propertyValue, tabsCounter + 1)}`;
    });
    return `{\n${res.join('\n')}\n${currentIndent.slice(2)}}`;
  };
  return iter(comparison, 1);
};

export default styler;
