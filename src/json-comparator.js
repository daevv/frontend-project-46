import _ from 'lodash';

const getComparison = (data1, data2) => {
  const res = [];
  const allFields = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  for (let i = 0; i < allFields.length; i += 1) {
    const currentFiled = allFields[i];
    const data1Value = data1[currentFiled];
    const data2Value = data2[currentFiled];
    if (!data1Value) {
      res.push(`  + ${currentFiled}: ${data2Value}`);
    } else if (data1Value !== data2Value) {
      res.push(`  - ${currentFiled}: ${data1Value}`);
      res.push(`  + ${currentFiled}: ${data2Value}`);
    } else if (!data2Value) {
      res.push(`  - ${currentFiled}: ${data1Value}`);
    } else {
      res.push(`    ${currentFiled}: ${data1Value}`);
    }
  }
  return `{\n${res.join('\n')}\n}`;
};

export default getComparison;
