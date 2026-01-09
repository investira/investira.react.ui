import { useMemo } from 'react';
import * as locales from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const withThemeLocale = (Component, pTheme, pLocale) => {
    function WrapComponent(props) {
        const themeWithLocale = useMemo(() => createTheme(pTheme, locales[pLocale]), []);
        return (
            <ThemeProvider theme={themeWithLocale}>
                <Component {...props} />
            </ThemeProvider>
        );
    }

    return WrapComponent;
};

export default withThemeLocale;
