import { defineConfig } from 'vite';
import fs from 'fs/promises';
import path from 'path';
import url from 'url';
import { createRequire } from 'module';

import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

import * as packageJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr(), reactVirtualized(), nodeResolve(), commonjs(), terser()],
    // optimizeDeps: {
    //     force: true
    // },
    resolve: {
        alias: {
            '@investira/utilities': path.resolve(__dirname, 'lib', 'utilities.js'),
            '@utils': path.resolve(__dirname, 'lib', 'components', 'utils', 'index.js')
        },
        dedupe: [...Object.keys(packageJson.peerDependencies)]
    },
    build: {
        copyPublicDir: false,
        lib: {
            entry: {
                themes: path.resolve(__dirname, 'lib', 'themes.js'),
                utilities: path.resolve(__dirname, 'lib', 'utilities.js'),
                mui: path.resolve(__dirname, 'lib', 'mui.js'),
                core: path.resolve(__dirname, 'lib', 'core.js'),
                charts: path.resolve(__dirname, 'lib', 'charts.js'),
                reports: path.resolve(__dirname, 'lib', 'reports.js')
            },
            formats: ['es', 'cjs']
        },
        rollupOptions: {
            //context: 'window',
            external: [
                ...Object.keys(packageJson.peerDependencies),
                '@mui/material/styles',
                '@mui/x-date-pickers/AdapterMoment',
                '@mui/x-date-pickers/AdapterDateFns',
                'date-fns/locale/pt-BR',
                'moment/min/locales',
                'react/jsx-runtime',
                'prop-types',
                'react-transition-group',
                'swiper/react',
                'swiper/modules',
                'swiper/css',
                'swiper/css/grid',
                'swiper/css/navigation',
                'swiper/css/pagination',
                'redux-persist/integration/react',
                'redux-persist/lib/storage'
            ],
            output: {
                //externalLiveBindings: true,
                hoistTransitiveImports: false,
                manualChunks: {},
                generatedCode: 'es2015', //es5
                globals: {
                    '@date-io/moment': 'dateIoMoment',
                    '@emotion/react': 'emotionReact',
                    '@emotion/styled': 'emotionStyled',
                    '@mui/lab': 'muiLab',
                    '@mui/material': 'MaterialUI',
                    '@mui/material/styles': 'MaterialUIStyles',
                    '@mui/x-date-pickers/AdapterMoment': 'xDatePickersAdapterMoment',
                    '@mui/x-date-pickers/AdapterDateFns': 'xDatePickersAdapterDateFns',
                    'date-fns/locale/pt-BR': 'dateFnsLocalePtBr',
                    '@mui/x-date-pickers': 'xDatePickersMui',
                    classnames: 'classnames',
                    'd3-scale': 'd3Scale',
                    formik: 'formik',
                    hammerjs: 'hammerjs',
                    idb: 'idb',
                    'investira.sdk': 'investiraSDK',
                    moment: 'moment',
                    'moment/min/locales': 'momentLocales',
                    react: 'React',
                    'react-dnd': 'reactDnd',
                    'react-dnd-html5-backend': 'reactDndHtml5Backend',
                    'react-dnd-touch-backend': 'reactDndTouchBackend',
                    'react-dom': 'ReactDOM',
                    'react-virtualized': 'reactVirtualized',
                    recharts: 'recharts',
                    redux: 'redux',
                    'react-router-dom': 'reactRouterDom',
                    'redux-persist': 'reduxPersist',
                    'redux-persist-pouchdb': 'reduxPersistPouchdb',
                    'redux-thunk': 'reduxThunk',
                    'react/jsx-runtime': 'jsxRuntime',
                    'prop-types': 'PropTypes',
                    'react-transition-group': 'reactTransitionGroup',
                    swiper: 'Swiper',
                    'swiper/react': 'swiperReact',
                    'swiper/modules': 'swiperModules',
                    'swiper/css': 'swiperCss',
                    'swiper/css/grid': 'swiperCssGrid',
                    'swiper/css/navigation': 'swiperCssNavigation',
                    'swiper/css/pagination': 'swiperCssPagination',
                    'typed.js': 'typedJs',
                    'redux-persist/integration/react': 'reduxPersistReact',
                    'redux-persist/lib/storage': 'reduxPersistStorage'
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
