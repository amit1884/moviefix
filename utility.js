export const makeArraysUnique = (obj) => {
    const newObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const uniqueIds = new Set();
        newObj[key] = obj[key].filter((item) => {
          if (!uniqueIds.has(item.id)) {
            uniqueIds.add(item.id);
            return true;
          }
          return false;
        });
      }
    }
    return newObj;
  };