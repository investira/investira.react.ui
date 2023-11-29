import { memo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { List, ListSubheader } from '@mui/material';
import { objects, arrays, validators } from 'investira.sdk';
import { sortByAttr } from '../../utils/helpers';
import DraggableItem from './DraggableItem';

const DraggableList = memo(props => {
    const { disableDrag = false } = props;
    // STATE
    const [options, setOptions] = useState([]);

    // METHODS

    const updateAttrIndex = useCallback(pOptions => {
        const newOptions = objects.deepCopy(pOptions);
        newOptions.forEach((item, index) => {
            item.index = index;
        });
        return newOptions;
    }, []);

    function sortBy(pData, pAttr) {
        return sortByAttr(pData, pAttr);
    }

    // HANDLERS

    const handleMoveItem = useCallback(
        (pDragIndex, pHoverIndex) => {
            let xOptionsUpdated = {};

            setOptions(prevOptions => {
                let xNewOptions = objects.deepCopy(prevOptions);
                xNewOptions.splice(pDragIndex, 1);
                xNewOptions.splice(pHoverIndex, 0, prevOptions[pDragIndex]);
                xNewOptions = updateAttrIndex(xNewOptions);

                xOptionsUpdated = arrays.arrayToObject(xNewOptions, 'id');

                return xNewOptions;
            });

            props.onChange && props.onChange(xOptionsUpdated);
        },
        [updateAttrIndex]
    );

    // EFFECTS

    useEffect(() => {
        let xOptions = Object.values(props.options);
        if (!validators.isNull(props.orderby)) {
            xOptions = sortBy(xOptions, props.orderby);
        }
        setOptions(xOptions);
    }, [props.options]);

    // RENDER

    const Item = props.item;

    const renderItem = useCallback(
        (pItem, pIndex) => {
            if (disableDrag) {
                return <Item key={pItem.id} {...pItem} option={pItem} {...props.itemProps} />;
            }

            return (
                <DraggableItem
                    id={pItem.id}
                    key={pItem.id}
                    index={pIndex}
                    onMoveItem={handleMoveItem}>
                    <Item {...pItem} option={pItem} {...props.itemProps} />
                </DraggableItem>
            );
        },
        [handleMoveItem, disableDrag, props.itemProps]
    );

    return (
        <List subheader={props.subheader && <ListSubheader>{props.subheader}</ListSubheader>}>
            {options.map(renderItem)}
        </List>
    );
});

DraggableList.displayName = 'DraggableList';

DraggableList.propTypes = {
    options: PropTypes.object,
    orderby: PropTypes.string,
    subheader: PropTypes.string,
    disableDrag: PropTypes.bool,
    item: PropTypes.func,
    itemProps: PropTypes.object,
    onChange: PropTypes.func
};

export default DraggableList;
