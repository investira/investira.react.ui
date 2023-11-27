import { memo } from 'react';
import PropTypes from 'prop-types';
import { Typography, TableCell, TableHead, TableRow } from '@mui/material';
import { tables } from '@utils';
const TableHeader = memo(props => {
    return (
        <TableHead>
            <TableRow>
                {props.cols.map((xCol, xIndex) => {
                    return (
                        <TableCell
                            variant="head"
                            key={`col-${xIndex}`}
                            sx={{ verticalAlign: 'bottom' }}
                            align={tables.aligntCell(xCol.type)}>
                            <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                {xCol.label}
                            </Typography>
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
});

TableHeader.displayName = 'TableHeader';

TableHeader.propTypes = {
    cols: PropTypes.array.isRequired
};

export default TableHeader;
