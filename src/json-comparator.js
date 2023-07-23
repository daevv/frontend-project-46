import _ from 'lodash';

const getComparison = (data1, data2) => {
  const res = [];
  const allFields = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  for (let i = 0; i < allFields.length; i += 1) {
    const currentField = allFields[i];
    const data1Value = data1[currentField];
    const data2Value = data2[currentField];
    if (!_.has(data1, currentField)) {
      res.push(`  + ${currentField}: ${data2Value}`);
    } else if (!_.has(data2, currentField)) {
      res.push(`  - ${currentField}: ${data1Value}`);
    } else if (data1Value !== data2Value) {
      res.push(`  - ${currentField}: ${data1Value}`);
      res.push(`  + ${currentField}: ${data2Value}`);
    } else {
      res.push(`    ${currentField}: ${data1Value}`);
    }
  }
  return `{\n${res.join('\n')}\n}`;
};

export default getComparison;
