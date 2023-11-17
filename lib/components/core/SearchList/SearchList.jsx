import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { validators } from 'investira.sdk';
import { Box, Stack } from '@mui/material';
import { CrudProvider, ContainerList, Search, ListState, ListVirtual, FilterBar } from '../';

const SearchList = props => {
    const PAGE_SIZE = props.pageSize || 40;

    const [data, setData] = useState({});
    const [message, setMessage] = useState('');
    const [isFetchingState, setIsFetching] = useState(false);
    const [pages, setPages] = useState({});

    const isMount = useRef(false);
    const paramsRef = useRef({ pesquisa: null });
    const searchRef = useRef();

    function updateFetching(pValue) {
        props.onFetching && props.onFetching(pValue);
        setIsFetching(pValue);
    }

    function success(pData) {
        return props.success ? props.success(pData) : pData;
    }

    function requestList(pParams) {
        const { service } = props;

        const xParams = { ...pParams };

        setMessage('');
        updateFetching(true);

        service(
            xParams,
            rRes => {
                updateFetching(false);

                setPages(rRes?.pages || {});

                if (validators.isEmpty(rRes.data)) {
                    setData({});
                    setMessage('Nenhum resultado encontrado');
                } else {
                    setData(prevData => {
                        return success({ ...prevData, ...rRes.data });
                    });
                }
            },
            rErr => {
                updateFetching(false);

                const errorHandler = () => {
                    setIsFetching(false);
                    setMessage(rErr.message);
                };

                const xCallbacks = {
                    err500: errorHandler,
                    err404: errorHandler,
                    err400: errorHandler
                };

                props.error && props.error(rErr);

                if (props.responseErrorHandling) {
                    props.responseErrorHandling(rErr, xCallbacks);
                }
            }
        );
    }

    function onResetData(pValue) {
        setData(pValue);
        console.log('ONRESTEDATA', pValue);
    }

    function onUpdateParams(pParams) {
        paramsRef.current = { ...paramsRef.current, ...pParams };
        return paramsRef.current;
    }

    useEffect(() => {
        if (props.refreshList && isMount.current) {
            onUpdateParams(props.params);
            requestList(props.params);
        }
    }, [props.refreshList]);

    useEffect(() => {
        isMount.current = true;
        onUpdateParams(props.params);
        requestList(props.params);

        return () => {
            isMount.current = false;
        };
    }, []);

    const xData = Object.values(data);
    const xDefaultData = validators.isNull(props.defaultData)
        ? []
        : Object.values(props.defaultData);

    const { pesquisa } = paramsRef.current;

    return (
        <Stack flexGrow={1}>
            <Box sx={{ height: '100%' }}>
                <CrudProvider
                    actions={{
                        onRead: requestList
                    }}>
                    <ContainerList
                        search={
                            <Search
                                {...props}
                                ref={searchRef}
                                value={paramsRef.current.pesquisa}
                                placeholder={props.placeholder}
                                inputProps={{ autofocus: true }}
                                onUpdateParams={onUpdateParams}
                                onResetData={onResetData}
                                onClear={props.onClear}
                            />
                        }
                        filter={props.filterProps && <FilterBar {...props.filterProps} />}>
                        <ListState
                            padding={false}
                            listSize={xData.length}
                            isFetching={isFetchingState}
                            message={message}>
                            {validators.isNull(pesquisa) &&
                            !validators.isEmpty(props.defaultData) ? (
                                <ListVirtual
                                    key={'default'}
                                    totalItens={xDefaultData.length}
                                    list={xDefaultData}
                                    item={props.item}
                                    itemProps={{
                                        ...props.itemProps
                                    }}
                                />
                            ) : (
                                <ListVirtual
                                    key={'searchlist'}
                                    nextPage={pages?.next}
                                    onNextPage={requestList}
                                    totalItens={pages?.total_items}
                                    list={xData}
                                    minimumBatchSize={PAGE_SIZE}
                                    threshold={PAGE_SIZE / 2}
                                    overscanRowCount={PAGE_SIZE}
                                    item={props.item}
                                    itemProps={{
                                        ...props.itemProps,
                                        pesquisa: paramsRef.current.pesquisa
                                    }}
                                />
                            )}
                        </ListState>
                    </ContainerList>
                </CrudProvider>
            </Box>
        </Stack>
    );
};

SearchList.propTypes = {
    service: PropTypes.func.isRequired,
    success: PropTypes.func,
    error: PropTypes.func,
    params: PropTypes.object,
    onFetching: PropTypes.func,
    refreshList: PropTypes.bool,
    virtual: PropTypes.bool,
    item: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    itemProps: PropTypes.object,
    filterProps: PropTypes.object,
    placeholder: PropTypes.string,
    pageSize: PropTypes.number,
    responseErrorHandling: PropTypes.func,
    onClear: PropTypes.func,
    defaultData: PropTypes.object
};

export default SearchList;
