import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, TableContainer } from '@mui/material';
import { TableHeader, TableContent } from '../';
import { data } from '@utils';

const Tabular = memo(props => {
    const [estrutura, setEstrutura] = useState(null);

    useEffect(() => {
        if (props.data.length > 0) {
            setEstrutura(data.layoutBreak(props.data, props.breaks, props.soma));
        }
    }, [props.data, props.breaks, props.soma]);

    if (estrutura) {
        return (
            <>
                <TableContainer sx={{ mb: 4 }}>
                    <Table size="small">
                        <TableHeader cols={props.cols} />
                        <TableContent
                            data={estrutura}
                            breaks={props.breaks}
                            cols={props.cols}
                            totalLabels={props.totalLabels}
                        />
                    </Table>
                </TableContainer>
            </>
        );
    } else {
        return null;
    }
});

Tabular.propTypes = {
    data: PropTypes.array.isRequired,
    breaks: PropTypes.array.isRequired,
    cols: PropTypes.array.isRequired,
    totalLabels: PropTypes.object,
    soma: PropTypes.array
};

Tabular.defaultProps = {
    soma: [],
    totalLabels: {}
};

Tabular.displayName = 'Tabular';

export default Tabular;
