const updateItem = (itemId, newValues = {}, items) => {
  const index = items.findIndex(({ id }) => id === itemId);
  const newItem = { ...items[index], ...newValues };
  const newItems = [
    ...items.slice(0, index),
    newItem,
    ...items.slice(index + 1),
  ];
  return newItems;
};

const uid = (function init() {
  const { storedId } = localStorage;

  let currentId = Number(storedId || 0);

  const next = () => {
    currentId += 1;
    localStorage.storedId = String(currentId);
    return currentId;
  };

  return next;
}());

export { uid, updateItem };
