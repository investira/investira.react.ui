import { memo } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer, LineChart, Line, YAxis } from 'recharts';
import { validators } from 'investira.sdk';
import { helpers } from '@utils';

const MultiSeriesTinyLineChart = memo(props => {
    return (
        <ResponsiveContainer width={props.width} height={props.height}>
            <LineChart width={600} height={props.height} data={props.data}>
                <YAxis type="number" domain={props.ydomain} hide={true} />
                {/* <ReferenceLine y={0} stroke="red" strokeDasharray="3 3" /> */}
                {props.dataKeys.map((xDataKey, xIndex) => {
                    return (
                        <Line
                            key={xIndex}
                            type={props.type}
                            dataKey={xDataKey}
                            stroke={
                                validators.isEmpty(props.strokeColors)
                                    ? helpers.getColor('primary.main')
                                    : helpers.getColor(props.strokeColors[xIndex])
                            }
                            strokeWidth={props.strokeWidth}
                            strokeDasharray={props.strokeDasharray[xIndex]}
                            dot={props.dot}
                        />
                    );
                })}
            </LineChart>
        </ResponsiveContainer>
    );
});

MultiSeriesTinyLineChart.propTypes = {
    data: PropTypes.array,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    strokeColors: PropTypes.array,
    strokeWidth: PropTypes.number,
    dot: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.func, PropTypes.element]),
    dataKeys: PropTypes.array,
    type: PropTypes.string,
    margin: PropTypes.object,
    ydomain: PropTypes.array,
    strokeDasharray: PropTypes.array
};

MultiSeriesTinyLineChart.defaultProps = {
    width: '100%',
    height: 100,
    strokeWidth: 2,
    strokeColors: ['primary.main'],
    dot: false,
    dataKeys: ['y'],
    type: 'monotone',
    margin: { top: 5, right: 0, bottom: 5, left: 0 },
    ydomain: [0, 'dataMax'],
    strokeDasharray: PropTypes.array
};

MultiSeriesTinyLineChart.displayName = 'MultiSeriesTinyLineChart';

export default MultiSeriesTinyLineChart;
