const diffMarkers = {
  added: '+',
  removed: '-',
  unchanged: ' ',
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
      if (leaf.type === 'updated') {
        return [`${currentIndent}- ${leaf.key}: ${iter(leaf.value, tabsCounter + 1)}`,
          `${currentIndent}+ ${leaf.key}: ${iter(leaf.newValue, tabsCounter + 1)}`];
      }
      return `${currentIndent}${diffMarkers[leaf.type]} ${leaf.key}: ${iter(leaf.value, tabsCounter + 1)}`;
    });
    return `{\n${res.join('\n')}\n${currentIndent.slice(2)}}`;
  };
  return iter(comparison, 1);
};

export default styler;
