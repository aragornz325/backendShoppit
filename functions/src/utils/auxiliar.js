async function chunckarray(array, size) {
  const chunked = [];
  let index = 0;
  while (index < array.length) {
    chunked.push(array.slice(index, size + index));
    index += size;
  }
  return chunked;
}

async function compareObj(productInDb, item) {
  const aKeys = Object.keys(productInDb).sort();
  const bKeys = Object.keys(item).sort();
  const aValues = Object.values(productInDb).sort();
  const bValues = Object.values(item).sort();
  if (aValues.length !== bValues.length) {
    return false;
  }
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  if (aKeys.join('') !== bKeys.join('')) {
    return false;
  }
  if (aValues.join('') !== bValues.join('')) {
    return false;
  }
  for (let i = 0; i < aValues.length; i++) {
    if (aValues[i] !== bValues[i]) {
      return false;
    }
  }
  for (let i = 0; i < aKeys.length; i++) {
    if (productInDb[aKeys[i]] !== item[bKeys[i]]) {
      return false;
    }
  }
  return true;
}

module.exports = {
  chunckarray,
  compareObj,
};
