import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import HorizontalList from '../HorizontalList';
import ChipsItem from './ChipsItem';

function Chips(props) {
    const { id = 'generico', initialFocus = 0, onDelete, onClick } = props;
    const [data, setData] = useState([]);

    const handleClick = (pData, pIndex) => {
        onClick && onClick(pData, pIndex);
    };

    const handleDelete = pItemData => {
        const xData = [...data];
        const deleteChip = xData.indexOf(pItemData);
        xData.splice(deleteChip, 1);
        setData(xData);
        props.onDelete(pItemData);
    };

    useEffect(() => {
        setData(Object.values(props.data || {}));
    }, [props.data]);

    return (
        <HorizontalList
            id={`chips-${id}`}
            data={data}
            child={ChipsItem}
            childProps={{
                onClick: handleClick,
                ...(onDelete && { onDelete: handleDelete }),
                ...props.chipProps
            }}
            initialFocus={Number(initialFocus)}
        />
    );
}

Chips.propTypes = {
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    children: PropTypes.node,
    label: PropTypes.string,
    onClick: PropTypes.func,
    onDelete: PropTypes.func,
    variant: PropTypes.oneOf(['default', 'outlined']),
    deleteIcon: PropTypes.element,
    icon: PropTypes.element,
    chipProps: PropTypes.object,
    initialFocus: PropTypes.number,
    id: PropTypes.string
};

Chips.displayName = 'Chips';

export default Chips;
