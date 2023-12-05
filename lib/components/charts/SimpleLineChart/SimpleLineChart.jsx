import { memo } from 'react';
import PropTypes from 'prop-types';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from 'recharts';
import { helpers } from '@utils';

const SimpleLineChart = memo(props => {
    return (
        <ResponsiveContainer width={props.width} height={props.height}>
            <LineChart data={props.data} margin={{ right: 18, left: 18, top: 16 }}>
                <CartesianGrid vertical={false} strokeOpacity={0.2} stroke="#7A81AB" />
                {props.tooltipProps && (
                    <Tooltip
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
                        {...props.tooltipProps}
                    />
                )}
                <XAxis
                    type="number"
                    scale="time"
                    dataKey="data"
                    domain={['dataMin', 'dataMax']}
                    tick={{ fontSize: 11 }}
                    stroke={helpers.getColor('secondary.light')}
                    {...props.xAxisProps}
                />
                <YAxis
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    tick={{ fontSize: 11 }}
                    stroke={helpers.getColor('secondary.light')}
                    {...props.yAxisProps}
                />
                <Line
                    type={props.type}
                    dataKey={props.dataKey}
                    stroke={helpers.getColor(props.strokeColor)}
                    strokeWidth={props.strokeWidth}
                    dot={props.dot}
                    margin={props.margin}
                />
            </LineChart>
        </ResponsiveContainer>
    );
});

SimpleLineChart.propTypes = {
    data: PropTypes.array,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    strokeColor: PropTypes.string,
    strokeWidth: PropTypes.number,
    dot: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.func, PropTypes.element]),
    dataKey: PropTypes.string,
    type: PropTypes.string,
    margin: PropTypes.object,
    tooltipProps: PropTypes.object,
    xAxisProps: PropTypes.object,
    yAxisProps: PropTypes.object
};

SimpleLineChart.defaultProps = {
    data: [],
    width: '100%',
    height: 100,
    strokeWidth: 2,
    strokeColor: 'primary.main',
    dot: false,
    dataKey: 'value',
    type: 'monotone',
    margin: { top: 5, right: 0, bottom: 5, left: 0 }
};

SimpleLineChart.displayName = 'TinyLineChart';

export default SimpleLineChart;
