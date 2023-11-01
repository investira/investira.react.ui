import PropTypes from 'prop-types';
import { memo, useRef } from 'react';
import { AutoSizer, Grid } from 'react-virtualized';

const GridVirtualized = memo(props => {
    const count = useRef(0);

    function cellRenderer({ key, style }) {
        count.current = count.current + 1;

        return (
            <li key={key} style={style}>
                <div className={'cell'}>T</div>
            </li>
        );
    }

    const xRowCount = props.list.length;

    return (
        <AutoSizer>
            {({ width, height }) => {
                return (
                    <Grid
                        cellRenderer={cellRenderer}
                        columnCount={Math.round(width / 25)}
                        columnWidth={25}
                        height={height}
                        rowCount={xRowCount}
                        rowHeight={25}
                        width={width}
                    />
                );
            }}
        </AutoSizer>
    );
});

GridVirtualized.propTypes = {
    list: PropTypes.array
};

GridVirtualized.displayName = GridVirtualized;

export default GridVirtualized;
