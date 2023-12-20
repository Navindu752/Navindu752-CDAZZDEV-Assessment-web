import { createTheme } from '@mui/material/styles';
import { MUI_ERROR, MUI_INFO, MUI_PRIMARY, MUI_SECONDARY, MUI_SUCCESS, MUI_WARNING } from 'utils/constants';

// Create a theme instance.
const theme = createTheme({
    // Adjust the color palette to match Bootstrap
    palette: {
        primary: {
            main: MUI_PRIMARY
        },
        secondary: {
            main: MUI_SECONDARY
        },
        error: {
            main: MUI_ERROR
        },
        warning: {
            main: MUI_WARNING
        },
        info: {
            main: MUI_INFO
        },
        success: {
            main: MUI_SUCCESS
        }
    },
    // Adjust typography to match Bootstrap
    typography: {
        fontFamily: [
            'Inter',
            'sans-serif',
        ].join(','),
        h1: {
            fontSize: '2.25rem'
        },
        h2: {
            fontSize: '1.875rem'
        },
        h3: {
            fontSize: '1.5rem'
        },
        h4: {
            fontSize: '1.125rem'
        },
        h5: {
            fontSize: '0.938rem'
        },
        h6: {
            fontSize: '0.75rem'
        }
    },
});

export default theme;