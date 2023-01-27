export const setLocalStorageObjectItem = (itemName, itemValue) => {
  typeof itemValue === 'object' && Object.keys(itemValue).length > 0
    ? localStorage.setItem(itemName, JSON.stringify(itemValue))
    : localStorage.removeItem(itemName);
};
