import { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    YAxis,
    XAxis,
    Legend,
    Tooltip,
    CartesianGrid
} from 'recharts';
import { validators } from 'investira.sdk';
import { helpers } from '@utils';

const MultiSeriesChart = memo(props => {
    const [dataVersion, setDataVersion] = useState(0);

    useEffect(() => {
        setDataVersion(value => value + 1);
    }, [props.data]);

    if (validators.isNull(props.data)) {
        return null;
    }

    return (
        <ResponsiveContainer width={props.width} height={props.height}>
            <LineChart
                width={600}
                height={props.height}
                data={props.data}
                margin={{ right: 18, left: 18, top: 16 }}>
                <Tooltip
                    {...props.tooltipProps}
                    labelStyle={{
                        textTransform: 'capitalize',
                        fontSize: '11px',
                        color: helpers.getColor('text.primary'),
                        marginBottom: '8px',
                        fontWeight: 600
                    }}
                    itemStyle={{ fontSize: '11px', padding: '2px 0' }}
                    wrapperStyle={{}}
                    contentStyle={{
                        borderRadius: '8px',
                        border: 0,
                        backgroundColor: helpers.getColor('secondary.main')
                    }}
                />
                <YAxis
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    tick={{ fontSize: 11 }}
                    stroke={helpers.getColor('secondary.light')}
                    {...props.yAxisProps}
                />
                <XAxis
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    tick={{ fontSize: 11 }}
                    stroke={helpers.getColor('secondary.light')}
                    {...props.xAxisProps}
                />
                <CartesianGrid vertical={false} strokeOpacity={0.2} stroke="#7A81AB" />
                {props.dataKeys.map((xDataKey, xIndex) => {
                    return (
                        <Line
                            key={`data-${dataVersion}-line-${xIndex}`}
                            dataKey={xDataKey}
                            {...props.lineProps}
                            stroke={props.lineProps.stroke[xIndex]}
                        />
                    );
                })}
                <Legend {...props.legendProps} wrapperStyle={{ left: 0, width: '100%' }} />
            </LineChart>
        </ResponsiveContainer>
    );
});

MultiSeriesChart.propTypes = {
    data: PropTypes.array,
    dataKeys: PropTypes.array,
    legend: PropTypes.array,
    legendProps: PropTypes.object,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lineProps: PropTypes.shape({
        type: PropTypes.string,
        stroke: PropTypes.array,
        strokeWidth: PropTypes.number,
        strokeDasharray: PropTypes.array,
        dot: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.object,
            PropTypes.func,
            PropTypes.element
        ])
    }),
    margin: PropTypes.object,
    yAxisProps: PropTypes.shape({
        type: PropTypes.string,
        scale: PropTypes.string,
        domain: PropTypes.array,
        hide: PropTypes.bool,
        interval: PropTypes.number,
        reversed: PropTypes.bool
    }),
    xAxisProps: PropTypes.shape({
        type: PropTypes.string,
        scale: PropTypes.string,
        domain: PropTypes.array,
        hide: PropTypes.bool,
        interval: PropTypes.number,
        reversed: PropTypes.bool
    }),
    tooltipProps: PropTypes.shape({
        formatter: PropTypes.func,
        labelFormatter: PropTypes.func
    })
};

MultiSeriesChart.defaultProps = {
    data: [],
    dataKeys: ['y'],
    width: '100%',
    height: 100,
    lineProps: {
        stroke: ['primary.main'],
        strokeWidth: 2
    },
    margin: { top: 5, right: 0, bottom: 5, left: 0 },
    yAxisProps: {
        type: 'number',
        scale: 'time',
        domain: ['dataMin', 'dataMax'],
        hide: false,
        interval: 0,
        reversed: false
    },
    xAxisProps: {
        type: 'number',
        scale: 'time',
        domain: ['dataMin', 'dataMax'],
        hide: false,
        interval: 0
    },
    tooltipProps: {
        formatter: (value, name, props) => [value, name, props],
        labelFormatter: value => value
    }
};

MultiSeriesChart.displayName = 'MultiSeriesChart';

export default MultiSeriesChart;
