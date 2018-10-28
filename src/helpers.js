const updateItem = (items, itemId, newValues = {}) => {
  const index = items.findIndex(({ id }) => id === itemId);
  const newItem = { ...items[index], ...newValues };
  const newItems = [
    ...items.slice(0, index),
    newItem,
    ...items.slice(index + 1)
  ];
  return newItems;
};

const uid = (function init() {
  const { storedId } = localStorage;

  let currentId;
  if (!storedId) {
    currentId = 0;
  } else {
    currentId = Number(storedId);
  }

  const next = () => {
    currentId += 1;
    localStorage.storedId = String(currentId);
    return currentId;
  };

  return next;
})();

export { uid, updateItem };
