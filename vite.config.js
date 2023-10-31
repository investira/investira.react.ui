import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        copyPublicDir: false,
        lib: {
            entry: {
                core: resolve(__dirname, 'lib/core.js'),
                mui: resolve(__dirname, 'lib/mui.js'),
                themes: resolve(__dirname, 'lib/themes.js'),
                lib: resolve(__dirname, 'lib/lib.js')
                // charts: resolve(__dirname, "lib/charts.js"),
                // reports: resolve(__dirname, "lib/reports.js"),
            },
            formats: ['es', 'cjs']
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react-redux',
                'redux',
                'redux-persist',
                'redux-persist-pouchdb',
                'redux-thunk',
                'react/jsx-runtime',
                '@mui/material',
                '@mui/material/styles',
                '@emotion/react',
                '@emotion/styled',
                '@mui/x-date-picker',
                '@mui/lab',
                'investira.sdk',
                'moment',
                'prop-types',
                'react-transition-group',
                'classnames'
            ],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'jsxRuntime',
                    redux: 'redux',
                    'redux-persist': 'reduxPersist',
                    'redux-persist-pouchdb': 'reduxPersistPouchdb',
                    'redux-thunk': 'reduxThunk',
                    '@mui/material': 'MaterialUI',
                    '@mui/material/styles': 'MaterialUIStyles',
                    '@emotion/react': 'emotionReact',
                    '@emotion/styled': 'emotionStyled',
                    '@mui/x-date-picker': 'xDatePickerMui',
                    '@mui/lab': 'muiLab',
                    'investira.sdk': 'investiraSDK',
                    moment: 'moment',
                    'prop-types': 'PropTypes',
                    'react-transition-group': 'reactTransitionGroup',
                    classnames: 'classnames'
                }
            }
        }
    },
    test: {
        environment: 'jsdom',
        coverage: {
            reporter: ['text', 'json', 'html']
        },
        threads: false,
        deps: {
            inline: ['vite-lib']
        }
    }
});
