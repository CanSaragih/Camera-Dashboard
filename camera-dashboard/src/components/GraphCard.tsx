import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

interface GraphCardProps {
  title: string;
  labels: string[];
  values: number[];
}

export default function GraphCard({ title, labels, values }: GraphCardProps) {
  const data = labels.map((label, index) => ({
    label,
    value: values[index],
  }));

  return (
    <div
      className="bg-white p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl sm:rounded-2xl shadow-lg w-full h-64 sm:h-72 md:h-80 lg:h-80 hover:shadow-xl transition-all duration-300 ease-in-out"
      onMouseDown={(e) => e.preventDefault()}
    >
      <div className="mb-2 sm:mb-3 md:mb-4">
        <h2 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl text-zinc-800 mb-1">
          {title}
        </h2>
        <div className="w-8 sm:w-10 md:w-12 h-0.5 sm:h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"></div>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient
              id="professionalGreenGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#047857" stopOpacity={0.4} />
              <stop offset="30%" stopColor="#059669" stopOpacity={0.25} />
              <stop offset="70%" stopColor="#047857" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: window.innerWidth < 640 ? 10 : 12,
              fill: "#9CA3AF",
            }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: window.innerWidth < 640 ? 10 : 12,
              fill: "#9CA3AF",
            }}
            domain={["dataMin - 5", "dataMax + 5"]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              fontSize: window.innerWidth < 640 ? "12px" : "14px",
              fontWeight: "500",
            }}
            labelStyle={{ color: "#374151", fontWeight: "600" }}
            itemStyle={{ color: "#059669" }}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#059669"
            fill="url(#professionalGreenGradient)"
            strokeWidth={window.innerWidth < 640 ? 2 : 3}
            dot={{
              fill: "#059669",
              strokeWidth: 2,
              stroke: "#ffffff",
              r: window.innerWidth < 640 ? 3 : 4,
              filter: "url(#glow)",
            }}
            activeDot={{
              r: window.innerWidth < 640 ? 5 : 6,
              fill: "#10b981",
              stroke: "#ffffff",
              strokeWidth: window.innerWidth < 640 ? 2 : 3,
              filter: "url(#glow)",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
