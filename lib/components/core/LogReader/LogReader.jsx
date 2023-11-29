import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@mui/material';
import { Scroller, InfiniteScroller, Loading } from '../';

import { validators } from 'investira.sdk';

function LogReader(props) {
    const {
        label,
        data,
        uri,
        responseData,
        type = 'string',
        autoScroller = true,
        scrollerProps = {},
        scrollOnMount = false
    } = props;

    const log = useRef();
    const scroller = useRef();
    let timeout = null;
    const [onMountScrolled, setOnMountScrolled] = useState(false);

    const onMountScroll = (pScrolled, pScrollOnMount) => {
        if (!pScrolled && pScrollOnMount) {
            setOnMountScrolled(true);
        }
    };

    const renderFormatedLog = (pElem, pData, pFormater) => {
        if (pFormater) {
            const xDataFormated = pFormater(pData);
            pElem.innerHTML = `<span>${xDataFormated}</span>`;
        } else {
            pElem.innerHTML = pData;
        }

        onMountScroll(onMountScrolled, scrollOnMount);

        timeout = props.autoScroller && window.setTimeout(autoScroller, 300);
    };

    const readTextFile = (pUri, pElem) => {
        const file = `${pUri}.txt`;

        fetch(file)
            .then(rRes => {
                return rRes.text();
            })
            .then(rData => {
                renderFormatedLog(pElem, rData, formatText);
            })
            .catch(() => {
                const xErrorMessage = `<span>Falha ao tentar carregar: ${file}</span>`;
                renderFormatedLog(pElem, xErrorMessage);
            });
    };

    const readJsontFile = (pData, pElem) => {
        renderFormatedLog(pElem, JSON.stringify(pData, null, 2), formatJson);
    };

    const readHtmlFile = pUri => {
        return pUri;
    };

    const readString = (pData, pElem) => {
        renderFormatedLog(pElem, pData, formatText);
    };

    const readData = (pType, pData, pRef) => {
        const pElem = pRef.current;
        const reader = {
            txt: readTextFile,
            json: readJsontFile,
            html: readHtmlFile,
            string: readString
        };

        // let xData = pData;

        reader[pType](pData, pElem);
    };

    const colors = {
        warn: '#f1b40f',
        error: '#ed442c',
        debug: '#ffe650',
        emerg: '#ff7957',
        info: '#0ce4f1',
        note: '#3ce1a3',
        verbose: '#cfd8dc'
    };

    const formatText = pData => {
        const xDataFormated = pData.replace(/\[([a-z]*)\]/gm, (match, p1) => {
            return `<Box component="span" color='${colors[p1]}'>${match}</Box>`;
        });

        return xDataFormated;
    };

    const formatJson = pData => {
        let xDataFormated = pData.replace(/"level":\s"(.*)",/gm, (match, p1) => {
            return `"level": <Box component="span" color='${colors[p1]}'>"${p1}"</Box>`;
        });

        xDataFormated = xDataFormated.replace(/"message":\s"(.*)",/gm, (match, p1) => {
            return `"message": <Box component="span" color={'#0ce4f1'}>"${p1}"</Box>`;
        });

        return xDataFormated;
    };

    const pvAutoScroller = () => {
        if (scroller && scroller.current) {
            const xCurrentScroller = scroller.current;
            const xScroller = xCurrentScroller.scroller
                ? xCurrentScroller.scroller.current.scrollRef.current
                : scroller.current.scrollRef.current;
            xScroller.scrollTo(0, xScroller.scrollHeight);
        } else {
            console.info('Componente Scroller não encontrado');
        }
    };

    useEffect(() => {
        if (onMountScrolled) {
            window.setTimeout(pvAutoScroller, 300);
        }
    }, [onMountScrolled]);

    useEffect(() => {
        readData(type, data || uri || responseData, log);
    }, [type, data, uri, responseData, log]);

    useEffect(() => {
        if (data || uri || responseData) {
            readData(type, data || uri || responseData, log);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    const Component = validators.isEmpty(scrollerProps) ? Scroller : InfiniteScroller;

    return (
        <>
            {label && (
                <Typography variant={'body2'} color={'textSecondary'} gutterBottom>
                    {label}
                </Typography>
            )}
            <Box position={'relative'} height={'calc(100% - 25px)'}>
                <Component ref={scroller} {...scrollerProps}>
                    <Box
                        component="pre"
                        sx={{
                            fontFamily:
                                "Consolas, 'Andale Mono WT', 'Andale Mono', 'Lucida Console', 'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Liberation Mono', 'Nimbus Mono L', Monaco, 'Courier New', Courier, monospace",
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            color: 'white',
                            fontSize: '0.8125rem',
                            tabSize: '2',
                            lineHeight: '1.4'
                        }}>
                        <code id={'log'} ref={log}>
                            <Loading />
                        </code>
                    </Box>
                </Component>
            </Box>
        </>
    );
}

LogReader.propTypes = {
    data: PropTypes.string,
    responseData: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
    uri: PropTypes.string,
    type: PropTypes.oneOf(['txt', 'json', 'html', 'string']),
    label: PropTypes.string,
    autoScroller: PropTypes.bool,
    scrollerProps: PropTypes.object,
    scrollOnMount: PropTypes.bool
};

LogReader.displayName = 'LogReader';

export default LogReader;
