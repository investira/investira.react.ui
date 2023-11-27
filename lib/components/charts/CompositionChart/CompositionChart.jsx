import { memo } from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const CompositionChart = memo(props => {
    const COLORS = ['#fd2811', '#3E1AA4', '#0343EE', '#66B131', '#861DB0', '#FB9902'];

    const renderCustomizedLabel = props => {
        const RADIAN = Math.PI / 180;

        const {
            metadata,
            cx,
            cy,
            midAngle,

            outerRadius,

            fill,

            percent
        } = props;

        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 5) * cos;
        const sy = cy + (outerRadius + 5) * sin;
        const mx = cx + (outerRadius + 5) * cos;
        const my = cy + (outerRadius + 35) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
                    {metadata.value}
                </text>
                <text
                    x={ex + (cos >= 0 ? 1 : -1) * 12}
                    y={ey}
                    dy={18}
                    textAnchor={textAnchor}
                    fill="#999">
                    {`${(percent * 100).toFixed(2)}%`}
                </text>
            </g>
        );
    };

    return (
        <div
            style={{
                width: props.width,
                height: props.height
            }}>
            <div>{props.label}</div>

            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={500} height={500}>
                    <Pie
                        data={props.data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={70}
                        innerRadius={20}
                        fill="#8884d8"
                        dataKey="value"
                        isAnimationActive={false}>
                        {props.data.map((_entry, xIndex) => (
                            <Cell
                                key={`cell-${xIndex}`}
                                fill={COLORS[xIndex % COLORS.length]}
                                strokeWidth={3}
                            />
                        ))}
                    </Pie>
                    <Legend
                        layout={'horizontal'}
                        align="center"
                        verticalAlign="bottom"
                        iconType="circle"
                        iconSize={8}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
});

CompositionChart.propTypes = {
    data: PropTypes.array,
    width: PropTypes.string,
    height: PropTypes.string,
    metadata: PropTypes.object,
    cx: PropTypes.string,
    cy: PropTypes.string,
    midAngle: PropTypes.string,
    outerRadius: PropTypes.string,
    fill: PropTypes.string,
    percent: PropTypes.string,
    label: PropTypes.string
};

CompositionChart.displayName = 'CompositionChart';

export default CompositionChart;
