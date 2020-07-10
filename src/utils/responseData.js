export const getAllIds = arr => arr.map(doc => doc.id);

export const getById = arr =>
  arr.reduce((acc, curr) => {
    acc[curr.id] = {
      id: curr.id,
      ...curr
    };
    return acc;
  }, {});
