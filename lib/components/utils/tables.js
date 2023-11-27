import { formats, validators } from 'investira.sdk';

function pvDecimalYearToFriendlyDate(pDecimal) {
    if (isNaN(pDecimal) || pDecimal < 0) {
        return '';
    }

    const xYears = Math.floor(pDecimal); // Parte inteira como anos
    const xRestDecimal = pDecimal - xYears; // Parte decimal

    const xMonthsInYear = 12;
    const xMonths = Math.floor(xRestDecimal * xMonthsInYear);

    const xDaysInMonth = 30;
    const xDays = Math.floor((xRestDecimal * xMonthsInYear - xMonths) * xDaysInMonth);

    return `${xYears} anos, ${xMonths} meses e ${xDays} dias`;
}

function formatCell(pValue, pType) {
    if (validators.isEmpty(pValue)) {
        return '';
    }

    if (
        ![
            'string',
            'number',
            'decimal',
            'date',
            'currency',
            'date-qtd-year',
            'percentual'
        ].includes(pType)
    ) {
        return pValue;
    }

    const xTypesFormat = {
        string: pValue => pValue,
        number: pValue => pValue,
        decimal: pValue => formats.formatNumber(pValue, 2, true, false),
        date: pValue => formats.formatDate(pValue),
        currency: pValue => formats.formatNumber(pValue, 2, true, true),
        'date-qtd-year': pValue => pvDecimalYearToFriendlyDate(pValue),
        percentual: pValue => `${formats.formatNumber(pValue, 2, true, false)}%`
    };

    return xTypesFormat[pType](pValue);
}

function aligntCell(pType) {
    if (['string', 'date-qtd-year'].includes(pType)) {
        return 'left';
    }

    return 'right';
}

const tables = {
    formatCell,
    aligntCell
};

export default tables;
