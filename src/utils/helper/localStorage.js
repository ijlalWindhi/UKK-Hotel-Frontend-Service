function setLocalStorage(key, value) {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
}

function getLocalStorage(key) {
  let value = localStorage.getItem(key);
  try {
    value = JSON.parse(value);
  } catch (e) {
    value = value;
  }
  return value;
}

function clearLocalStorage() {
  localStorage.clear();
}

export { setLocalStorage, getLocalStorage, clearLocalStorage };
