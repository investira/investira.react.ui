import { defineConfig } from 'vite';
import fs from 'fs/promises';
import path from 'path';
import url from 'url';
import { createRequire } from 'module';

import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr(), reactVirtualized()],

    build: {
        copyPublicDir: false,
        lib: {
            entry: {
                core: path.resolve(__dirname, 'lib/core.js'),
                mui: path.resolve(__dirname, 'lib/mui.js'),
                themes: path.resolve(__dirname, 'lib/themes.js'),
                lib: path.resolve(__dirname, 'lib/lib.js')
                // charts: resolve(__dirname, "lib/charts.js"),
                // reports: resolve(__dirname, "lib/reports.js"),
            },
            formats: ['es', 'cjs']
        },
        rollupOptions: {
            external: [
                'react',
                'react-dnd',
                'react-dnd-html5-backend',
                'react-dnd-touch-backend',
                'react-dom',
                'react-redux',
                'redux',
                'react-router-dom',
                'react-virtualized',
                'redux-persist',
                'redux-persist-pouchdb',
                'redux-thunk',
                'react/jsx-runtime',
                '@date-io/moment',
                '@mui/material',
                '@mui/material/styles',
                '@emotion/react',
                '@emotion/styled',
                '@mui/x-date-pickers',
                '@mui/x-date-pickers/AdapterMoment',
                '@mui/lab',
                'investira.sdk',
                'moment',
                'moment/min/locales',
                'prop-types',
                'react-transition-group',
                'classnames'
            ],
            output: {
                globals: {
                    react: 'React',
                    'react-dnd': 'reactDnd',
                    'react-dnd-html5-backend': 'reactDndHtml5Backend',
                    'react-dnd-touch-backend': 'reactDndTouchBackend',
                    'react-dom': 'ReactDOM',
                    'react-virtualized': 'reactVirtualized',
                    'react/jsx-runtime': 'jsxRuntime',
                    redux: 'redux',
                    'react-router-dom': 'reactRouterDom',
                    'redux-persist': 'reduxPersist',
                    'redux-persist-pouchdb': 'reduxPersistPouchdb',
                    'redux-thunk': 'reduxThunk',
                    '@date-io/moment': 'dateIoMoment',
                    '@mui/material': 'MaterialUI',
                    '@mui/material/styles': 'MaterialUIStyles',
                    '@mui/x-date-pickers/AdapterMoment': 'xDatePickersAdapterMoment',
                    '@emotion/react': 'emotionReact',
                    '@emotion/styled': 'emotionStyled',
                    '@mui/x-date-pickers': 'xDatePickersMui',
                    '@mui/lab': 'muiLab',
                    'investira.sdk': 'investiraSDK',
                    moment: 'moment',
                    'moment/min/locales': 'momentLocales',
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

// Necessário para externalizar react-virtualized
// Solução: https://github.com/bvaughn/react-virtualized/issues/1632
const WRONG_CODE = `import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";`;

function reactVirtualized() {
    return {
        name: 'flat:react-virtualized',
        // Observação: não podemos usar o hook `transform` aqui
        // porque as bibliotecas são pré-agrupadas diretamente no Vite,
        // os plugins não conseguem manipular essa etapa no momento.
        // em vez disso, editamos manualmente o arquivo em node_modules.
        // tudo o que precisamos é encontrar o momento antes do pré-agrupamento.

        configResolved: async () => {
            const require = createRequire(import.meta.url);
            const reactVirtualizedPath = require.resolve('react-virtualized');
            const { pathname: reactVirtualizedFilePath } = new url.URL(
                reactVirtualizedPath,
                import.meta.url
            );
            const file = reactVirtualizedFilePath.replace(
                path.join('dist', 'commonjs', 'index.js'),
                path.join('dist', 'es', 'WindowScroller', 'utils', 'onScroll.js')
            );
            const code = await fs.readFile(file, 'utf-8');
            const modified = code.replace(WRONG_CODE, '');
            await fs.writeFile(file, modified);
        }
    };
}
