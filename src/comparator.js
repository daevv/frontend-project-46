import _ from 'lodash';
import diffResults from './const.js';

const getChild = (data) => {
  if (_.isObject(data)) {
    const fields = Object.keys(data);
    return fields.map((field) => ({
      key: field,
      value: getChild(data[field]),
      diffResult: diffResults.unchanged,
    }));
  }
  return data;
};

const getComparison = (obj1, obj2, styler) => {
  const iter = (data1, data2) => {
    const allFields = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

    const res = allFields.map((currentField) => {
      const data1Value = data1[currentField];
      const data2Value = data2[currentField];

      if (_.isObject(data1Value) && _.isObject(data2Value)) {
        return {
          key: currentField,
          value: iter(data1Value, data2Value),
          diffResult: diffResults.unchanged,
        };
      }
      if (!_.has(data1, currentField)) {
        return {
          key: currentField,
          value: getChild(data2Value),
          diffResult: diffResults.add,
        };
      }
      if (!_.has(data2, currentField)) {
        return {
          key: currentField,
          value: getChild(data1Value),
          diffResult: diffResults.remove,
        };
      }
      if (data1Value !== data2Value) {
        return {
          key: currentField,
          value: getChild(data1Value),
          newValue: getChild(data2Value),
          diffResult: diffResults.update,
        };
      }
      return {
        key: currentField,
        value: getChild(data1Value),
        diffResult: diffResults.unchanged,
      };
    });
    return res;
  };

  return styler(iter(obj1, obj2));
};

export default getComparison;
