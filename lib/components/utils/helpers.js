export function capitalize(string) {
  if (process.env.NODE_ENV !== "production" && typeof string !== "string") {
    throw new Error(
      "InvestiraReact: capitalize(string) expects a string argument."
    );
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function classList(classes) {
  return Object.entries(classes)
    .filter((entry) => entry[1])
    .map((entry) => entry[0])
    .join(" ");
}

export function isTouchDevice() {
  if ("ontouchstart" in window) {
    return true;
  }
  return false;
}

/**
 * Retorna um array de objetos ordenado pelo campo definido no parametro pAttr
 * @param {Array | Object} pData array ou objeto de objetos
 * @param {string} pAttr campo a ser ordenado
 */
export function sortByAttr(pData, pAttr) {
  const xDataOrdered = Object.values(pData).sort((a, b) => {
    if (a[pAttr] < b[pAttr]) {
      return -1;
    }
    if (a[pAttr] > b[pAttr]) {
      return 1;
    }
    return 0;
  });

  return xDataOrdered;
}
