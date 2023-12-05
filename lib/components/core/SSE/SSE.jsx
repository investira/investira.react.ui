import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { validators } from 'investira.sdk';
import { CenterInView } from '../';
function SSE(props) {
    let eventSource = null;
    const [data, setData] = useState(props.initialValue || {});
    const [error, setError] = useState(false);

    const isMount = useRef(false);

    const updateResponseData = (pReponseData, pPrevData) => {
        const xResponseDataParsed = JSON.parse(pReponseData);

        let xResponseData = null;

        if (validators.isArray(xResponseDataParsed)) {
            xResponseData = [...pPrevData, ...xResponseDataParsed];
        } else {
            xResponseData = { ...pPrevData, ...xResponseDataParsed };
        }

        isMount.current && setData(xResponseData);
    };

    const updateError = pValue => {
        isMount.current && setError(pValue);
    };

    useEffect(() => {
        isMount.current = true;
        eventSource = new EventSource(props.route);
        eventSource.onmessage = e => {
            updateResponseData(e.data, data);
        };

        eventSource.onerror = e => {
            !validators.isNull(e.data) && updateError(true);
        };

        return () => {
            isMount.current = false;
            eventSource && eventSource.close();
        };
    }, []);

    if (error) {
        return (
            <CenterInView>
                <Typography
                    color={'textSecondary'}
                    variant={'caption'}
                    align={'center'}
                    component={'p'}>
                    Falha na conexão SSE
                </Typography>
            </CenterInView>
        );
    }

    return React.cloneElement(React.Children.only(props.children), {
        responseData: data
    });
}

SSE.propTypes = {
    children: PropTypes.element.isRequired,
    route: PropTypes.string.isRequired,
    initialValue: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

SSE.displayName = 'SSE';

export default SSE;
