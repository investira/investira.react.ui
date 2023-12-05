import React, { memo } from 'react';
import { Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const FilterArea = styled(Stack)(({ sticky, theme }) => ({
    position: 'relative',
    overflow: 'auto',
    flexShrink: '0',
    flexGrow: '0',
    ...(sticky && {
        position: 'sticky',
        top: '0',
        zIndex: '100',
        background: theme.palette.secondary.darkness
    })
}));

const Area = styled(Stack)(({ sticky }) => ({
    flexGrow: 1,
    overflow: 'auto',
    position: 'relative',
    flexDirection: 'row',
    ...(sticky && {
        overflow: 'unset'
    })
}));

const ContainerList = memo(props => {
    const { search, filter, bottomLabel } = props;

    if (React.Children.count(props.children) > 1) {
        console.error('Container list deve possuir apenas 1 elemento filho.');
        return null;
    }

    return (
        <Stack
            sx={{
                position: 'relative',
                maxHeight: '100%',
                minHeight: '100%',
                width: '100%'
            }}>
            {search && (
                <Stack
                    sx={{
                        position: 'relative',
                        overflow: 'auto',
                        flexShrink: '0',
                        flexGrow: '0'
                    }}>
                    {search}
                </Stack>
            )}
            {filter && <FilterArea>{filter}</FilterArea>}
            {bottomLabel && (
                <Stack
                    sx={{
                        position: 'relative',
                        padding: '0 16px 12px 16px',
                        flexShrink: '0',
                        flexGrow: '0'
                    }}>
                    {
                        <Typography variant={'caption'} color={'textSecondary'}>
                            {bottomLabel}
                        </Typography>
                    }
                </Stack>
            )}
            <Area>{props.children}</Area>
        </Stack>
    );
});

ContainerList.propTypes = {
    search: PropTypes.node,
    filter: PropTypes.node,
    bottomLabel: PropTypes.node,
    children: PropTypes.node.isRequired,
    sticky: PropTypes.bool
};

ContainerList.defaultProps = {
    sticky: false
};

ContainerList.displayName = 'ContainerList';

export default ContainerList;
