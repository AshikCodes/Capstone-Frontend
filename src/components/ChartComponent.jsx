import { BarChart, Cell, Area, AreaChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie } from 'recharts';

// replace this w/ a useEffect hook that stores the data by fetching from backend
const data = [
    { amount_paid: 50, time_booked: 2, electricity_usage: 120, location: "Toronto", day: 1 },
    { amount_paid: 74, time_booked: 3, electricity_usage: 150, location: "Missisauga", day: 2},
    { amount_paid: 14, time_booked: 0.5, electricity_usage: 60, location: "Missisauga", day: 3 },
    { amount_paid: 94, time_booked: 1.5, electricity_usage: 200, location: "Missisauga", day: 4 },
    { amount_paid: 34, time_booked: 2.5, electricity_usage: 110, location: "Toronto", day: 5 },
    { amount_paid: 34, time_booked: 0.8, electricity_usage: 190, location: "New York", day: 6  },
    { amount_paid: 67, time_booked: 0.9, electricity_usage: 45, location: "New York", day: 7  },
    { amount_paid: 21, time_booked: 3, electricity_usage: 250, location: "Vancouver", day: 8},
    { amount_paid: 23, time_booked: 2, electricity_usage: 130, location: "Vancouver", day: 9},
];

const locationFrequencies = data.reduce((acc, curr) => {
    acc[curr.location] = (acc[curr.location] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(locationFrequencies).map(location => ({
    name: location,
    value: locationFrequencies[location],
  }));
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#CF9FFF'];

const ChartsComponent = () => {
  return (
    <div className="dashboard-main-container">
    <div className='dashboard-container'>
    <div className='left-side-dashboard'>
        <h2 className='dashboard-item-title'>Recent Payments</h2>
            <BarChart width={500} height={300} data={data}>
                <XAxis dataKey="day" tick={true} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount_paid" fill="#8884d8" />
            </BarChart>

        <h2 className='dashboard-item-title'>Time Spent Charging</h2>
            <LineChart width={500} height={300} data={data}>
                <XAxis dataKey="day" tick={true} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="electricity_usage" stroke="#82ca9d" />
            </LineChart>
    </div>
    <div className='right-side-container'>
    <h2 className='dashboard-item-title'>Electricity Use Over Time</h2>
      <AreaChart
          width={550}
          height={350}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 50,
            bottom: 0,
          }}
        >
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="electricity_usage" stroke="#8884d8" fill="#FFA500" />
        </AreaChart>
    <h2 className='dashboard-item-title'>Locations Charged</h2>
        <PieChart width={550} height={400}>
            <Pie
            data={chartData}
            labelLine={false}
            outerRadius={100}
            cx={300}
            cy={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}(${(percent * 100).toFixed(0)}%)`}
            >
            {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke='none'/>
            ))}
            </Pie>
            <Tooltip />
        </PieChart>
    </div>
    </div>
    </div>
  );
};

export default ChartsComponent;
