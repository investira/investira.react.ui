/* eslint-disable no-prototype-builtins */
import { validators } from 'investira.sdk';

export function somaAttr(pData = [], pOptions = {}) {
    if (!pOptions.hasOwnProperty('soma')) {
        console.error('Atributo soma deve ser informado em options');
        return 0;
    }

    let xFilteredData = pData;

    if (pOptions.hasOwnProperty('filter') && pOptions.hasOwnProperty('filter_value')) {
        xFilteredData = pData.filter(xItem => {
            return xItem[pOptions.filter] === pOptions.filter_value;
        });
    }

    const xSoma = xFilteredData.reduce((acc, curr) => {
        return acc + curr[pOptions.soma];
    }, 0);

    return xSoma;
}

export function mediaPonderada(pData = [], pCols = []) {
    if (validators.isEmpty(pData) || validators.isEmpty(pCols)) {
        return 0;
    }

    // Soma coluna
    const xSoma = somaAttr(pData, { soma: pCols[0] });

    // Multiplica colunas e soma linha por linha
    const xMult = pData.reduce((acc, curr) => {
        const xResult = acc + curr[pCols[0]] * curr[pCols[1]];
        return xResult;
    }, 0);

    // Calcula media
    const xResult = xMult / xSoma;

    return xResult;
}

const calc = {
    somaAttr,
    mediaPonderada
};

export default calc;
