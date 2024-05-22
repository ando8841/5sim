import {createTheme} from '@mui/material/styles';


const theme = createTheme({
    breakpoints: {
        keys: ['xs', 'sm', 'md', 'lg', 'xl'],
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1280,
            xl: 1536,
        },
    },
    text: {primary: '#353A41'},
    typography: {
        htmlFontSize: 16,
        fontFamily: '"Rubik", sans-serif',
        allVariants: {
            fontWeight: 400,
        }
    },
    palette: {
        primary: {
            main: '#93FDF3',
        },
        secondary: {
            main: '#89f69d',
        }
    },
});

export default theme;
