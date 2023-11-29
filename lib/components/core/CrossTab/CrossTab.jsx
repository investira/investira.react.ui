import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Stack, Typography, Box } from '@mui/material';

const CrossTab = props => {
    const [anotherTabISOpen, setOpen] = useState(false);

    const APPNAME = useRef(props.appName);

    useEffect(() => {
        const xTime = Date.now();
        localStorage.setItem(`${APPNAME.current}-loaded`, xTime);
    }, []);

    useEffect(() => {
        window.addEventListener('storage', e => {
            if (e.key === `${APPNAME.current}-loaded`) {
                setOpen(true);
            }
        });
    }, []);

    if (anotherTabISOpen) {
        return (
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none'
                }}>
                <Stack flexGrow={1} flexBasis={1} justifyContent="center" alignItems="center">
                    <Typography align={'center'} color={'textPrimary'}>
                        Esta aplicação está sendo executada <br />
                        em outra janela
                    </Typography>
                </Stack>
            </Box>
        );
    } else {
        return props.children;
    }
};

CrossTab.propTypes = {
    storage: PropTypes.object,
    appName: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

CrossTab.displayName = 'CrossTab';

export default CrossTab;
