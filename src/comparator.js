import _ from 'lodash';

const getChild = (data) => {
  if (_.isObject(data)) {
    const fields = Object.keys(data);
    return fields.map((key) => ({
      key,
      value: getChild(data[key]),
      type: 'unchanged',
    }));
  }
  return data;
};

const getComparison = (obj1, obj2, formatter) => {
  const iter = (data1, data2) => {
    const allFields = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

    const res = allFields.map((key) => {
      if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
        return {
          key,
          children: iter(data1[key], data2[key]),
          type: 'nested',
        };
      }
      if (!_.has(data1, key)) {
        return {
          key,
          value: getChild(data2[key]),
          type: 'added',
        };
      }
      if (!_.has(data2, key)) {
        return {
          key,
          value: getChild(data1[key]),
          type: 'removed',
        };
      }
      if (!_.isEqual(data1[key], data2[key])) {
        return {
          key,
          value: getChild(data1[key]),
          newValue: getChild(data2[key]),
          type: 'updated',
        };
      }
      return {
        key,
        value: getChild(data1[key]),
        type: 'unchanged',
      };
    });
    return res;
  };

  return formatter(iter(obj1, obj2));
};

export default getComparison;
