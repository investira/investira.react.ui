import { memo, useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { validators } from 'investira.sdk';
import { Chip, Menu, MenuItem, Icon, ListItemIcon, ListItemText, Box } from '@mui/material';
import CrudContext from '../CrudContext';

const ListFilter = memo(props => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelected] = useState([]);
    const [filters, setFilters] = useState([]);
    const [params, setParams] = useState({});

    const valuesSelectedRef = useRef([]);

    const verifyArray = pArray => {
        const xIsEmpty = pArray.filter(xElem => {
            return xElem !== undefined;
        });
        return xIsEmpty.length > 0;
    };

    const { onResetData, onUpdateParams } = props;
    const updateParams = useCallback(
        (pParam, pValues, pAction) => {
            onResetData && onResetData({});

            const xParams = {
                ...params,
                [pParam]: pValues ? pValues.value : undefined
            };

            setParams(xParams);
            pAction(xParams);
            onUpdateParams && onUpdateParams(xParams);
        },
        [params, onResetData, onUpdateParams]
    );

    const removeNullElements = pArray => {
        return pArray.filter(xElem => {
            return xElem != null;
        });
    };

    const isFiltersEmpty = useCallback(pFilters => {
        const xFilters = removeNullElements([...pFilters]);
        return validators.isEmpty(xFilters);
    }, []);

    const isSelected = (
        pFilterIndex,
        pSelectedIndex,
        pOptionIndex,
        pOptionValue,
        pDefaultValue
    ) => {
        const xSelectIndexFiltered = removeNullElements(pSelectedIndex);

        if (
            !validators.isEmpty(pDefaultValue) &&
            pOptionValue === pDefaultValue &&
            validators.isEmpty(xSelectIndexFiltered)
        ) {
            return true;
        }

        if (xSelectIndexFiltered[pFilterIndex]) {
            return xSelectIndexFiltered[pFilterIndex].includes(pOptionIndex);
        }

        return false;
    };

    const handleClickChip = (pValue, pEvent) => {
        setAnchorEl(pEvent.currentTarget);
    };

    const handleSelect = pFilter => {
        const {
            action,
            filterIndex,
            filterLabel,
            filterOptions,
            filterParam,
            optionIndex,
            defaultValue
        } = pFilter;
        const xFilters = [...filters];
        const xSelected = [...selectedIndex];

        xFilters[filterIndex] = {
            ...filterOptions[optionIndex],
            param: filterParam,
            field: filterLabel,
            default: defaultValue === filterOptions[optionIndex].value
        };

        xSelected[filterIndex] = [optionIndex];

        updateFilterValuesSelected(xSelected, xFilters, [
            filterParam,
            xFilters[filterIndex],
            action
        ]);

        setAnchorEl(null);
    };

    const handleMultipleSelect = pFilter => {
        const { action, filterIndex, filterLabel, filterOptions, filterParam, optionIndex } =
            pFilter;

        const xFilters = [...filters];
        const xSelected = [...selectedIndex];
        const xNewValue = filterOptions[optionIndex].value;

        let xLabel = null;

        if (isSelected(filterIndex, selectedIndex, optionIndex)) {
            xSelected[filterIndex].splice(xSelected[filterIndex].indexOf(optionIndex), 1);
            valuesSelectedRef.current.splice(valuesSelectedRef.current.indexOf(xNewValue), 1);

            const xCurrentLastValue =
                valuesSelectedRef.current[valuesSelectedRef.current.length - 1];

            if (xCurrentLastValue) {
                xLabel = filterOptions.filter(xItem => {
                    return xItem.value === xCurrentLastValue;
                })[0].label;
            }
        } else {
            xSelected[filterIndex] = xSelected[filterIndex]
                ? [...xSelected[filterIndex], optionIndex]
                : [optionIndex];

            valuesSelectedRef.current.push(xNewValue);

            xLabel = filterOptions[optionIndex].label;
        }

        const xSize = valuesSelectedRef.current.length;

        const xNewLabel = xSize - 1 ? `${xLabel} +${xSize - 1}` : xLabel;

        if (xSize > 0) {
            xFilters[filterIndex] = {
                label: xNewLabel,
                param: filterParam,
                field: filterLabel,
                value: valuesSelectedRef.current.toString()
            };
        } else {
            xFilters[filterIndex] = undefined;
        }

        updateFilterValuesSelected(xSelected, xFilters, [
            filterParam,
            xFilters[filterIndex],
            action
        ]);
    };

    const select = { multiple: handleMultipleSelect, single: handleSelect };

    const handleMenuItemClick = pFilter => {
        const xMenuSelectType = pFilter.type || 'single'; //Define single como default
        select[xMenuSelectType](pFilter);
    };

    const handleRemove = pFilter => {
        const xFilters = [...filters];
        const xSelected = [...selectedIndex];
        const { action, filterIndex, filterParam } = pFilter;

        delete xSelected[filterIndex];
        delete xFilters[filterIndex];

        valuesSelectedRef.current = [];

        updateFilterValuesSelected(xSelected, xFilters, [filterParam, {}, action]);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const updateFilterValuesSelected = useCallback(
        (pSelected, pFilters, pParams) => {
            setSelected(pSelected);
            setFilters(pFilters);
            pParams && updateParams(...pParams);
        },
        [updateParams]
    );

    const findWithAttr = (pArray, pAttr, pValue) => {
        for (const [index, value] of pArray.entries()) {
            if (value[pAttr] === pValue) {
                return index;
            }
        }

        return -1;
    };

    const initFilterDefaultSelected = useCallback(
        pPropFilters => {
            const defaultSelectedValues = pPropFilters.map(xFilter => {
                if (!validators.isEmpty(xFilter.defaultValue)) {
                    const xIndex = findWithAttr(xFilter.options, 'value', xFilter.defaultValue);
                    return [xIndex];
                }

                return [undefined];
            });

            const defaultSelectedFilters = defaultSelectedValues.map((xSelected, xIndex) => {
                return xSelected.map(xOptionIndex => {
                    if (validators.isNull(xOptionIndex)) {
                        return xOptionIndex;
                    }

                    const xFilter = pPropFilters[xIndex];
                    const xOption = xFilter.options[xOptionIndex];

                    return {
                        field: xFilter.label,
                        label: xOption.label,
                        param: xFilter.param,
                        value: xOption.value,
                        default: xFilter.defaultSelected
                    };
                })[0];
            });

            updateFilterValuesSelected(defaultSelectedValues, defaultSelectedFilters);
        },
        [updateFilterValuesSelected]
    );

    useEffect(() => {
        initFilterDefaultSelected(props.filters);
    }, [props.filters, isFiltersEmpty, initFilterDefaultSelected]);

    return (
        <CrudContext.Consumer>
            {({ onRead }) => {
                return (
                    <Box position={'relative'} mb={2}>
                        <Box height={'40px'} overflow={'hidden'}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    overflowX: 'scroll',
                                    overflowY: 'hidden',
                                    whiteSpace: 'nowrap',
                                    scrollBehavior: 'smooth',
                                    transform: 'translate3d(0, 0, 0)',
                                    MsOverflowStyle: 'none', // IE 10+
                                    scrollbarWidth: 'none', // Firefox
                                    '&::-webkit-scrollbar': {
                                        width: '0px',
                                        background: 'transparent'
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        background: 'transparent'
                                    },
                                    padding: '0 16px'
                                }}>
                                {props.filters &&
                                    props.filters.map((xFilter, xIndex) => {
                                        const xChipProps = {
                                            icon: xFilter.icon,
                                            label: xFilter.label,
                                            className: xFilter.className
                                        };

                                        const xChipId = `chip-${xIndex}`;

                                        return (
                                            <Box
                                                sx={{
                                                    display: 'inline-block',
                                                    margin: '4px',
                                                    '&:first-of-type': {
                                                        marginLeft: 0
                                                    },
                                                    '&:last-of-type': {
                                                        marginRight: 0
                                                    }
                                                }}
                                                key={xIndex}>
                                                <Chip
                                                    key={`chip-${xIndex}`}
                                                    id={xChipId}
                                                    onClick={e => handleClickChip(xFilter, e)}
                                                    {...xChipProps}
                                                    color={'primary'}
                                                    variant={'outlined'}
                                                />
                                                <Menu
                                                    key={`chip-menu-${xIndex}`}
                                                    id={`chip-menu-${xIndex}`}
                                                    anchorEl={anchorEl}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'center'
                                                    }}
                                                    elevation={1}
                                                    keepMounted
                                                    open={
                                                        Boolean(anchorEl) && anchorEl.id === xChipId
                                                    }
                                                    onClose={handleClose}>
                                                    {xFilter.options.map(
                                                        (xOption, xOptionIndex) => {
                                                            return (
                                                                <MenuItem
                                                                    key={`menu-item-${xOptionIndex}`}
                                                                    // disabled={index === 0}
                                                                    selected={isSelected(
                                                                        xIndex,
                                                                        selectedIndex,
                                                                        xOptionIndex,
                                                                        xOption.value,
                                                                        xFilter.defaultValue
                                                                    )}
                                                                    dense
                                                                    onClick={() =>
                                                                        handleMenuItemClick({
                                                                            filterLabel:
                                                                                xFilter.label,
                                                                            type: xFilter.type,
                                                                            filterParam:
                                                                                xFilter.param,
                                                                            filterOptions:
                                                                                xFilter.options,
                                                                            filterIndex: xIndex,
                                                                            optionIndex:
                                                                                xOptionIndex,
                                                                            defaultValue:
                                                                                xFilter.defaultValue,
                                                                            action: onRead
                                                                        })
                                                                    }>
                                                                    {xOption.icon && (
                                                                        <ListItemIcon>
                                                                            <Icon
                                                                                iconName={
                                                                                    xOption.icon
                                                                                }
                                                                                size={18}
                                                                            />
                                                                        </ListItemIcon>
                                                                    )}
                                                                    <ListItemText>
                                                                        {xOption.label}
                                                                    </ListItemText>
                                                                </MenuItem>
                                                            );
                                                        }
                                                    )}
                                                </Menu>
                                            </Box>
                                        );
                                    })}
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                height: '32px',
                                overflow: 'hidden',
                                ...(!verifyArray(filters) && { display: 'none', height: 0 })
                            }}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    overflowX: 'scroll',
                                    overflowY: 'hidden',
                                    whiteSpace: 'nowrap',
                                    scrollBehavior: 'smooth',
                                    transform: 'translate3d(0, 0, 0)',
                                    MsOverflowStyle: 'none', // IE 10+
                                    scrollbarWidth: 'none', // Firefox
                                    '&::-webkit-scrollbar': {
                                        width: '0px',
                                        background: 'transparent'
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        background: 'transparent'
                                    },
                                    padding: '0 16px'
                                }}>
                                {filters &&
                                    filters.map((xFilter, xIndex) => {
                                        if (xFilter) {
                                            return (
                                                <Box
                                                    sx={{
                                                        display: 'inline-block',
                                                        margin: '4px',
                                                        '&:first-of-type': {
                                                            marginLeft: 0
                                                        },
                                                        '&:last-of-type': {
                                                            marginRight: 0
                                                        }
                                                    }}
                                                    key={`filter-${xIndex}`}>
                                                    <Chip
                                                        color={'primary'}
                                                        label={`${xFilter.field}: ${xFilter.label}`}
                                                        size={'small'}
                                                        disabled={xFilter.default}
                                                        {...(!xFilter.default && {
                                                            onDelete: () =>
                                                                handleRemove({
                                                                    filterIndex: xIndex,
                                                                    filterParam: xFilter.param,
                                                                    action: onRead
                                                                })
                                                        })}
                                                    />
                                                </Box>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                            </Box>
                        </Box>
                    </Box>
                );
            }}
        </CrudContext.Consumer>
    );
});

ListFilter.propTypes = {
    filters: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            param: PropTypes.string,
            type: PropTypes.string,
            options: PropTypes.arrayOf(
                PropTypes.shape({
                    label: PropTypes.string,
                    value: PropTypes.any
                })
            ),
            defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })
    ),
    onResetData: PropTypes.func,
    onUpdateParams: PropTypes.func
};

ListFilter.defaultProps = {
    filters: {}
};

ListFilter.displayName = 'ListFilter';

export default ListFilter;
