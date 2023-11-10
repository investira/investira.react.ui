import { default as MuiAppBar } from '@mui/material/AppBar';

function AppBar(props) {
    'use client';
    return <MuiAppBar {...props} />;
}

AppBar.displayName = 'AppBar';

export default AppBar;
