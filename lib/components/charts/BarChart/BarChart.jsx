import PropTypes from 'prop-types';
import { formats } from 'investira.sdk';
import {
    BarChart as ReBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    LabelList,
    Cell,
    ResponsiveContainer
} from 'recharts';

const COLORS = ['#fd2811', '#3E1AA4', '#0343EE', '#66B131', '#861DB0', '#FB9902'];

const CustomBar = props => {
    const { x, y, width, height } = props;

    // Define o raio das bordas arredondadas das barras
    const borderRadius = 4;

    return (
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            rx={borderRadius}
            ry={borderRadius}
            fill={props.fill}
        />
    );
};

// const renderColorfulLegendText = (value, entry) => {
//   return <span>{value}</span>;
// };

const renderCustomizedLabel = props => {
    const { x, y, width, fill, value } = props;
    const radius = 10;

    return (
        <g>
            <text
                x={x + width / 2}
                y={y - radius}
                fill={fill}
                textAnchor="middle"
                dominantBaseline="middle">
                {formats.formatNumber(value, 2)}%
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

const BarChart = props => {
    return (
        <div
            style={{
                width: props.width,
                height: props.height
            }}>
            <div style={{ marginBottom: '16px' }}>{props.label}</div>
            <ResponsiveContainer width="100%" height="100%">
                <ReBarChart
                    width={500}
                    height={500}
                    data={props.data}
                    margin={{
                        top: 20,
                        right: 0,
                        left: -16,
                        bottom: 30
                    }}
                    barSize={30}>
                    <XAxis
                        dataKey="name"
                        includeHidden={true}
                        padding={{ left: 20, right: 20 }}
                        hide={true}
                        type="category"
                    />
                    <YAxis axisLine={false} tickLine={false} unit="%" />

                    <CartesianGrid strokeDasharray="1 3" vertical={false} />
                    <Bar
                        dataKey="percentual"
                        fill="#3E1AA4"
                        background={{ fill: '#eee', opacity: 0.5 }}
                        shape={<CustomBar />}
                        isAnimationActive={false}>
                        <LabelList dataKey="percentual" content={renderCustomizedLabel} />
                        {props.data.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                    <Legend payload={props.data} content={renderLegend} />
                </ReBarChart>
            </ResponsiveContainer>
        </div>
    );
};

BarChart.propTypes = {
    data: PropTypes.array,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    label: PropTypes.string,
    x: PropTypes.string,
    y: PropTypes.string,
    fill: PropTypes.string
};

BarChart.displayName = 'BarChart';

export default BarChart;
