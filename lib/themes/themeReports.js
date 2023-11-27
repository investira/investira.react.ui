import { createTheme } from '@mui/material/styles';

export const themeReports = createTheme({
    typography: {
        fontFamily: [
            'Montserrat',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif'
        ].join(','),
        fontSize: 12,
        fontWeightRegular: 500,
        fontWeightBold: 700,
        fontWeightMedium: 600,
        fontWeightLight: 400
    }
});
