import { memo } from 'react';
import PropTypes from 'prop-types';
import { Breaks, Ativos } from '../';

function renderBreaks(pEstrutura, pQuebras, pCols, pTotalLabels, pIndex = 0, pIndent = 1) {
    if (pQuebras.length === 0) {
        return <Ativos data={pEstrutura._data[pIndex]} cols={pCols} indent={pIndent - 1} />;
    }

    const xFirstElement = pQuebras[0];
    const xQuebras = pQuebras.slice(1);
    const xIndent = pIndent + 1;

    return pEstrutura[xFirstElement]._dataBreaks.map((xBreak, xIndex) => {
        const breakProps = {
            title: xBreak,
            key: `${xFirstElement}-${xIndex}`,
            ...(pTotalLabels && { totalLabel: pTotalLabels[xFirstElement] }),
            cols: pCols,
            totalData: pEstrutura[xFirstElement]._total[xIndex],
            indent: pIndent
        };

        return (
            <Breaks key={breakProps.key} {...breakProps}>
                {renderBreaks(
                    pEstrutura[xFirstElement],
                    xQuebras,
                    pCols,
                    pTotalLabels,
                    xIndex,
                    xIndent
                )}
            </Breaks>
        );
    });
}

const TableContent = memo(props => {
    return renderBreaks(props.data, props.breaks, props.cols, props.totalLabels);
});

TableContent.propTypes = {
    data: PropTypes.object,
    breaks: PropTypes.array,
    cols: PropTypes.array,
    totalLabels: PropTypes.object
};

TableContent.displayName = 'TableContent';

export default TableContent;
