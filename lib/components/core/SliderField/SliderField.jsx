import { memo, useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { formats } from 'investira.sdk';
// import { useFormikContext } from "formik";
import { numbers } from 'investira.sdk';

const SliderField = memo(props => {
    // State
    const [value, setValue] = useState(props.value);

    // Refs
    // const timeout = useRef(null);
    const scale = useRef({});

    // Formik
    //   const context = useFormikContext();

    // Handlers
    const valueIndex = useCallback(pValue => {
        if (scale.current.values) {
            const xValue = numbers.trunc(pValue, 1);
            let xAproxValue = scale.current.values.reduce((xPrev, xCurr) => {
                return Math.abs(xCurr - xValue) < Math.abs(xPrev - xValue) ? xCurr : xPrev;
            }, 0);

            return scale.current.values.indexOf(xAproxValue);
        }

        return 0;
    }, []);

    function getValue(pIndex) {
        if (scale.current.values) {
            return scale.current.values[pIndex || 0];
        }
        return 1;
    }

    function valueLabelFormat(pValue) {
        return formats.friendlyNumber(pValue, 2, true);
    }

    function handleChange(pEvent, pValue) {
        setValue(getValue(pValue));
        props.onChange && props.onChange(props.name, getValue(pValue));

        // if (timeout.current) {
        //     clearTimeout(timeout.current);
        // }

        // const { setFieldValue } = context;

        // timeout.current = setTimeout(() => {
        //     setFieldValue(props.name, getValue(pValue));
        //     props.onChange && props.onChange(props.name, getValue(pValue));
        // }, 300);
    }

    const generateScaleValues = useCallback(pValue => {
        const xValue = (pValue % 9) + 1;
        const xMilestones = Math.floor(pValue / 9);

        return xValue * 10 ** xMilestones;
    }, []);

    // Effects
    useEffect(() => {
        const xResult = [];
        let xTempValue = 0;
        let xI = 0;

        while (xTempValue < props.max) {
            let xValue = generateScaleValues(xI);
            xResult.push(xValue);
            xTempValue = xValue;
            xI++;
        }

        scale.current = { values: xResult, max: xResult.length - 1 };
    }, [props.max, generateScaleValues]);

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    return (
        <div>
            {props.label && (
                <Typography
                    id="non-linear-slider"
                    variant="caption"
                    color="textSecondary"
                    gutterBottom>
                    {props.label}
                </Typography>
            )}
            <Typography
                id="label-value"
                color={props.disabled ? 'textSecondary' : 'textPrimary'}
                variant="h6"
                gutterBottom>
                {valueLabelFormat(value)}
            </Typography>
            <Slider
                value={valueIndex(value)}
                min={0} // 1
                step={props.step}
                max={scale.current.max}
                getAriaValueText={valueLabelFormat}
                valueLabelFormat={valueLabelFormat}
                onChange={handleChange}
                aria-labelledby="non-linear-slider"
                disabled={props.disabled}
            />
        </div>
    );
});

SliderField.displayName = 'SliderField';

SliderField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    value: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.number,
    max: PropTypes.number,
    maxlength: PropTypes.number,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    valueLabelDisplay: PropTypes.string,
    'aria-labelledby': PropTypes.string
};

SliderField.defaultProps = {
    id: null,
    value: 0,
    min: 0,
    step: 1,
    max: 1000,
    maxlength: 13,
    onChange: null,
    onBlur: null,
    onFocus: null,
    disabled: false,
    readOnly: false,
    required: false,
    valueLabelDisplay: 'auto',
    'aria-labelledby': null
};

export default SliderField;
