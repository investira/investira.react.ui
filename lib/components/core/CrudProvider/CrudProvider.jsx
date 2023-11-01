import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import CrudContext from '../CrudContext';

const CrudProvider = memo(props => {
    const [itemData, setItemData] = useState({});

    const state = { ...props.state, itemData };

    const onCreate = (pValues, pActions) => {
        props.actions.onCreate && props.actions.onCreate(pValues, pActions);
    };

    const onRead = pParams => {
        props.actions.onRead && props.actions.onRead(pParams);
    };

    const onReadOne = (pData, pCallback) => {
        setItemData(pData);
        pCallback && pCallback(pData);
    };

    const onUpdate = (pValues, pActions) => {
        props.actions.onUpdate && props.actions.onUpdate(pValues, pActions);
    };

    const onDelete = (pValues, pActions) => {
        props.actions.onDelete && props.actions.onDelete(pValues, pActions);
    };

    const actions = {
        customActions: props.customActions,
        onCreate,
        onRead,
        onReadOne,
        onUpdate,
        onDelete
    };

    return (
        <>
            <CrudContext.Provider
                value={{
                    ...state,
                    ...actions
                }}>
                {props.children}
            </CrudContext.Provider>
        </>
    );
});

CrudProvider.propTypes = {
    state: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    customActions: PropTypes.object
};

CrudProvider.displayName = 'CrudProvider';

export default CrudProvider;
