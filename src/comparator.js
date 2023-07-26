import _ from 'lodash';
import TYPE_OF_DIFF from './const.js';

const getChild = (data) => {
  if (_.isObject(data)) {
    const fields = Object.keys(data);
    return fields.map((field) => ({
      propertyName: field,
      propertyValue: getChild(data[field]),
      diffResult: TYPE_OF_DIFF.unchanged,
    }));
  }
  return data;
};

const getComparison = (obj1, obj2, formatter) => {
  const iter = (data1, data2) => {
    const allFields = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

    const res = allFields.map((currentField) => {
      const data1propertyValue = data1[currentField];
      const data2propertyValue = data2[currentField];

      if (_.isObject(data1propertyValue) && _.isObject(data2propertyValue)) {
        return {
          propertyName: currentField,
          propertyValue: iter(data1propertyValue, data2propertyValue),
          diffResult: TYPE_OF_DIFF.unchanged,
        };
      }
      if (!_.has(data1, currentField)) {
        return {
          propertyName: currentField,
          propertyValue: getChild(data2propertyValue),
          diffResult: TYPE_OF_DIFF.added,
        };
      }
      if (!_.has(data2, currentField)) {
        return {
          propertyName: currentField,
          propertyValue: getChild(data1propertyValue),
          diffResult: TYPE_OF_DIFF.removed,
        };
      }
      if (data1propertyValue !== data2propertyValue) {
        return {
          propertyName: currentField,
          propertyValue: getChild(data1propertyValue),
          newPropertyValue: getChild(data2propertyValue),
          diffResult: TYPE_OF_DIFF.updated,
        };
      }
      return {
        propertyName: currentField,
        propertyValue: getChild(data1propertyValue),
        diffResult: TYPE_OF_DIFF.unchanged,
      };
    });
    return res;
  };

  return formatter(iter(obj1, obj2));
};

export default getComparison;
