import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CATEGORY_COLORS = {
  Quiz: "#6366f1",
  Coding: "#22c55e",
  "Creative Design": "#ec4899",
  Writing: "#f59e0b",
  Photography: "#0ea5e9",
  "Idea Pitch": "#8b5cf6",
  "Logic & Puzzle": "#14b8a6",
  "Gaming (Score-based)": "#ef4444",
};

const WinLostChart = ({ categoryStats }) => {
  if (!categoryStats?.length) {
    return (
      <div className="bg-base-100 shadow rounded-xl p-6 text-center">
        <p>No win data available yet</p>
      </div>
    );
  }

  return (
    <div className="bg-base-100 shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Wins by Category
      </h2>

      {/* ⚠️ Height is mandatory for ResponsiveContainer */}
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            margin={{
              top: 20,
              right: 20,
              left: 10,
              bottom: 60,
            }}
            data={categoryStats}
          >
            <XAxis
              dataKey="category"
              interval={0}
              angle={-15}
              textAnchor="end"
            />
            <YAxis allowDecimals={false} />
            <Tooltip />

            <Bar dataKey="winCount" radius={[6, 6, 0, 0]}>
              {categoryStats.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CATEGORY_COLORS[entry.category] || "#94a3b8"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WinLostChart;
