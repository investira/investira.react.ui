function soma(pAttrs, pData) {
  const xSomas = [];
  pData.forEach((xElement, xIndex) => {
    xSomas[xIndex] = {};
    pAttrs.forEach((xAttr) => {
      xSomas[xIndex][xAttr] = xElement.reduce((acc, curr) => {
        return acc + curr[xAttr];
      }, 0);
    });
  });

  return xSomas;
}

function spreadData(pDataValues, pData, pKey) {
  const xResult = [];
  pDataValues.forEach((xElement, xIndex) => {
    xResult[xIndex] = pData.filter((xData) => xData[pKey] === xElement);
  });

  return xResult;
}

function createHierarchicalBreaks(pBreaks, pData, pDataBreaks, pSomas) {
  if (pBreaks.length === 0) {
    return {};
  }

  const xFirstElement = pBreaks[0];
  const xRestArray = pBreaks.slice(1);

  const xDataBreakValues = [...pDataBreaks[xFirstElement]];
  const xData = spreadData(xDataBreakValues, pData, xFirstElement);
  return {
    [xFirstElement]: {
      _dataBreaks: xDataBreakValues,
      _data: xData,
      _total: pSomas ? soma(pSomas, xData) : [],
      ...createHierarchicalBreaks(xRestArray, pData, pDataBreaks, pSomas),
    },
  };
}

function dataBreaks(pQuebras, pData) {
  const xQuebras = {};
  pQuebras.forEach((xQuebra) => {
    pData.forEach((xElement) => {
      if (!xQuebras[xQuebra]) {
        xQuebras[xQuebra] = new Set();
      }
      xQuebras[xQuebra].add(xElement[xQuebra]);
    });
  });

  return xQuebras;
}

function layoutBreak(pData, pQuebras, pSomas) {
  const xDataQuebras = dataBreaks(pQuebras, pData);
  const xEstrutura = createHierarchicalBreaks(
    pQuebras,
    pData,
    xDataQuebras,
    pSomas
  );

  return xEstrutura;
}

const data = {
  layoutBreak,
};

export default data;
