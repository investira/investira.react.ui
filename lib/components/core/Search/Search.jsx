import { memo, useState, useEffect, useRef, forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { validators } from 'investira.sdk';
import { SearchBox, CrudContext } from '../';

const Search = memo(
    forwardRef((props, ref) => {
        const [params, setParams] = useState({});
        const mount = useRef(false);
        const { onRead } = useContext(CrudContext);

        const handleSearch = pValues => {
            //props.onResetData && props.onResetData({});

            const xParams = {
                pesquisa: validators.isEmpty(pValues) ? null : pValues
            };

            setParams(xParams);
        };

        const handleClear = () => {
            props.onResetData && props.onResetData({});
            props.onClear && props.onClear();
            setParams({ pesquisa: null });
            props.onUpdateParams && props.onUpdateParams({ ...params, pesquisa: undefined });
        };

        useEffect(() => {
            if (mount.current) {
                props.onResetData && props.onResetData({});
                const xParams = props.onUpdateParams ? props.onUpdateParams(params) : params;
                onRead && onRead(xParams);
            }
        }, [params.pesquisa]);

        useEffect(() => {
            mount.current = true;
        }, []);

        return (
            <SearchBox
                ref={ref}
                value={props.value}
                onChange={handleSearch}
                placeholder={props.placeholder}
                clearCallback={handleClear}
            />
        );
    })
);

Search.propTypes = {
    onClear: PropTypes.func,
    onResetData: PropTypes.func,
    forwardRef: PropTypes.func,
    onUpdateParams: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string
};

Search.displayName = 'Search';

export default Search;
