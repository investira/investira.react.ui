import { memo, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { validators } from 'investira.sdk';

const StyledAutoSizer = styled(AutoSizer)({
    position: 'relative',
    background: 'red'
});
const StyledList = styled(List)(({ orientation }) => ({
    ...(orientation === 'reverse' && {
        '& > div': {
            minHeight: '100% !important'
        }
    })
}));

const defaultProps = {
    itemProps: {},
    list: [],
    overscanRowCount: 10,
    orientation: 'normal'
};

const ListVirtualized = memo(props => {
    const propsWithDefaults = { ...defaultProps, ...props };

    const { itemProps, list, overscanRowCount, orientation } = propsWithDefaults;

    const ListRef = useRef();
    const ListRoot = useRef();

    const _cache = useRef(
        new CellMeasurerCache({
            fixedWidth: true,
            minHeight: 50
            //defaultHeight: 100
        })
    );

    function _noRowsRenderer() {
        return <div></div>;
    }

    const _rowRenderer = ({ index, parent, key, style }) => {
        const xScrollAreaHeight = parent._scrollingContainer.scrollHeight;
        const xListAreaHeight = ListRoot.current?.scrollHeight || 0;

        if (ListRoot) {
            const isTaller = xScrollAreaHeight > xListAreaHeight;

            //Inverte os indexes

            const xOrientation = {
                reverse: {
                    list: [...list].reverse(),
                    style: { ...style, top: 'auto', bottom: style.top }
                },
                normal: {
                    list: list,
                    style: style
                }
            };

            let xList = xOrientation['normal'].list;
            let xStyle = xOrientation['normal'].style;

            if (!isTaller) {
                console.log('!isTaller', !isTaller);
                xList = xOrientation[orientation].list;
                xStyle = xOrientation[orientation].style;
            }

            const Component = props.item;

            return (
                <CellMeasurer
                    cache={_cache.current}
                    columnIndex={0}
                    key={key}
                    rowIndex={index}
                    parent={parent}>
                    {({ measure, registerChild }) => (
                        <Component
                            registerChild={registerChild}
                            onLoad={measure}
                            key={key}
                            id={key}
                            index={index}
                            data={xList[index] || []}
                            style={xStyle}
                            {...itemProps}
                        />
                    )}
                </CellMeasurer>
            );
        }
    };

    const removeTabIndex = pListRootElem => {
        if (pListRootElem?.current) {
            const xReactVirtualizedElem =
                pListRootElem.current.querySelector('[aria-readonly="true"]');

            xReactVirtualizedElem.removeAttribute('tabindex');
        }
    };

    const xRowCount = props.totalItens || list.length;

    const scrollToBottom = useCallback(() => {
        _cache.current.clearAll();

        const xLastRow = list.length;
        if (xLastRow) {
            ListRef.current.scrollToRow(xLastRow);
        }
    }, [list]);

    useEffect(() => {
        scrollToBottom();
    }, [list, scrollToBottom]);

    useEffect(() => {
        removeTabIndex(ListRoot);
    }, []);

    return (
        <Box
            ref={ListRoot}
            sx={[
                { position: 'relative', minHeight: '100%' },
                ...(validators.isEmpty(list) && { height: '100%' })
            ]}>
            <StyledAutoSizer onResize={scrollToBottom}>
                {({ width, height }) => {
                    return (
                        <StyledList
                            id={`${props.id}-list`}
                            orientation={orientation}
                            ref={ListRef}
                            deferredMeasurementCache={_cache.current}
                            width={width}
                            height={height}
                            overscanRowCount={overscanRowCount}
                            noRowsRenderer={_noRowsRenderer}
                            rowCount={xRowCount}
                            rowHeight={_cache.current.rowHeight}
                            rowRenderer={_rowRenderer}
                            scrollToIndex={xRowCount}
                            scrollToAlignment={'end'}
                        />
                    );
                }}
            </StyledAutoSizer>
        </Box>
    );
});

ListVirtualized.propTypes = {
    orientation: PropTypes.oneOf(['reverse', 'normal']),
    list: PropTypes.array.isRequired,
    emptyMessage: PropTypes.string,
    item: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node, PropTypes.func]).isRequired,
    className: PropTypes.object,
    itemProps: PropTypes.object,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
    overscanRowCount: PropTypes.number,
    totalItens: PropTypes.number,
    id: PropTypes.string
};

ListVirtualized.displayName = 'ListVirtualized';

export default ListVirtualized;
