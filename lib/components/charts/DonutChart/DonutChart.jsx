import { memo } from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { formats } from 'investira.sdk';

const DonutChart = memo(props => {
    const COLORS = ['#fd2811', '#3E1AA4', '#0343EE', '#66B131', '#861DB0', '#FB9902'];

    const renderCustomizedLabel = props => {
        const RADIAN = Math.PI / 180;

        const { cx, cy, midAngle, outerRadius, fill, percentual } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 5) * cos;
        const sy = cy + (outerRadius + 5) * sin;
        const mx = cx + (outerRadius + 5) * cos;
        const my = cy + (outerRadius + 20) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
                    {formats.formatNumber(percentual, 2)}%
                </text>
            </g>
        );
    };

    const renderLegend = props => {
        const { payload } = props;

        return (
            <div className="recharts-legend-wrapper" style={{ paddingTop: '16px' }}>
                <ul
                    className="recharts-default-legend"
                    style={{ padding: 0, margin: 0, textAlign: 'center' }}>
                    {payload.map((entry, index) => (
                        <li
                            className={`recharts-legend-item legend-item-${index}`}
                            key={`item-${index}`}
                            style={{
                                display: 'inline-block',
                                marginLeft: '8px',
                                marginRight: '8px'
                            }}>
                            <svg
                                className="recharts-surface"
                                width="8"
                                height="8"
                                viewBox="0 0 32 32"
                                version="1.1"
                                style={{
                                    display: 'inline-block',
                                    verticalAlign: 'middle',
                                    marginRight: '4px'
                                }}>
                                <path
                                    fill={COLORS[index % COLORS.length]}
                                    cx="16"
                                    cy="16"
                                    type="circle"
                                    className="recharts-symbols"
                                    transform="translate(16, 16)"
                                    d="M16,0A16,16,0,1,1,-16,0A16,16,0,1,1,16,0"></path>
                            </svg>
                            <span
                                className="recharts-legend-item-text"
                                style={{ color: COLORS[index % COLORS.length] }}>
                                {entry.descricao}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
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
                <PieChart
                    width={500}
                    height={500}
                    margin={{
                        top: 20,
                        right: 0,
                        left: -16,
                        bottom: 30
                    }}>
                    <Pie
                        data={props.data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={70}
                        innerRadius={20}
                        fill="#8884d8"
                        dataKey={props.dataKey || 'value'}
                        isAnimationActive={false}>
                        {props.data.map((_entry, xIndex) => (
                            <Cell
                                key={`cell-${xIndex}`}
                                fill={COLORS[xIndex % COLORS.length]}
                                strokeWidth={3}
                            />
                        ))}
                    </Pie>
                    {/* <Legend
            layout={"horizontal"}
            align="center"
            verticalAlign="bottom"
            iconType="circle"
            iconSize={8}
          /> */}
                    <Legend payload={props.data} content={renderLegend} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
});

DonutChart.propTypes = {
    data: PropTypes.array,
    cx: PropTypes.string,
    cy: PropTypes.string,
    midAngle: PropTypes.string,
    outerRadius: PropTypes.string,
    fill: PropTypes.string,
    percentual: PropTypes.string,
    dataKey: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    label: PropTypes.string,
    payload: PropTypes.array
};

DonutChart.displayName = 'DonutChart';

export default DonutChart;
