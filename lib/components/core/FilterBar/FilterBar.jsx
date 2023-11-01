import { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, Box, Stack } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

const Root = styled(Box)(({ margin, theme }) => ({
    position: 'relative',
    height: '25px',
    backgroundColor: theme.palette.secondary.light,
    borderRadius: 'calc(25px / 2)',
    ...(margin && {
        margin: '8px 0'
    })
}));

const Button = styled('button')(({ active, theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    flexBasis: 0,
    color: theme.palette.primary.main,
    fontSize: '0.75em',
    fontWeight: 600,
    textTransform: 'uppercase',
    height: '25px',
    border: 'none',
    borderRadius: 'calc(25px / 2)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    ...(active && {
        backgroundColor: theme.palette.primary.main,
        color: alpha(theme.palette.common.black, 0.9)
    })
}));

const FilterBar = props => {
    const [active, setActive] = useState(props.initialValue);

    const handleClick = pEvent => {
        const xDataset = pEvent.currentTarget.dataset;
        setActive(Number(xDataset.index));
        props.onClick && props.onClick(xDataset.index, Number(xDataset.value));
    };

    const xData = props.data || [];

    return (
        <Root margin={props.margin}>
            <Stack
                sx={{
                    flexWrap: 'nowrap',
                    justifyContent: 'space-around',
                    alignItems: 'stretch',
                    alignContent: 'stretch',
                    textAlign: 'center',
                    flexDirection: 'row'
                }}
                component="nav">
                {xData.map((xItem, xIndex) => {
                    return (
                        <Button
                            id={`btn-filter-${xItem.value}`}
                            data-value={xItem.value}
                            data-index={xIndex}
                            key={xIndex}
                            active={active === xIndex}
                            onClick={handleClick}>
                            <Icon
                                sx={{ paddingRight: '8px' }}
                                iconName={xItem.iconName}
                                color={active === xIndex ? xItem.default : xItem.color}
                            />
                            {xItem.label}
                        </Button>
                    );
                })}
            </Stack>
        </Root>
    );
};

FilterBar.propTypes = {
    onClick: PropTypes.func,
    data: PropTypes.array,
    initialValue: PropTypes.number,
    margin: PropTypes.bool
};

FilterBar.defaultProps = {
    margin: true
};

export default FilterBar;
