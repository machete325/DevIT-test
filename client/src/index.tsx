import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './store';
import {
    createTheme,
    StyledEngineProvider,
    ThemeProvider,
} from '@mui/material/styles';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const muiTheme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#cfcfcf',
        },
        background: {
            default: '#f0f0f0',
        },
    },
    typography: {
        h2: {
            fontSize: '20px',
            fontWeight: 400,
        },
        h4: {
            fontSize: '20px',
        },
        h5: {
            fontSize: '20px',
        },
        caption: {
            color: '#aaa',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderRadius: 4,
                    textTransform: 'none',
                },
                outlined: {
                    borderRadius: 4,
                },
                containedSecondary: {
                    '&.Mui-focusVisible': {
                        boxShadow: 'none',
                        color: '#fff',
                        background: '#000000',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                },
            },
        },
        MuiList: {
            styleOverrides: {
                root: ({ theme }) => ({
                    padding: theme.spacing(0.75),
                }),
            },
        },
    },
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!);

root.render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={muiTheme}>
                <Provider store={store}>
                    <App/>
                </Provider>
            </ThemeProvider>
        </StyledEngineProvider>
    </React.StrictMode>,
);
