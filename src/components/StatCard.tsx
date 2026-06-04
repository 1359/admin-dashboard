import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import type { StatCardData } from "../types/dashboard";

interface StatCardProps {
  data: StatCardData;
  statActivity: String;
}

const colorClasses = {
  blue: {
    bg: "bg-blue-500",
    light: "bg-blue-50",
    text: "text-blue-600",
  },
  green: {
    bg: "bg-green-5000",
    light: "bg-green-50",
    text: "text-green-600",
  },
  purple: {
    bg: "bg-purple-500",
    light: "bg-purple-50",
    text: "text-purple-600",
  },
  orange: {
    bg: "bg-orange-500",
    light: "bg-orange-50",
    text: "text-orange-600",
  },
  red: {
    bg: "bg-red-500",
    light: "bg-red-50",
    text: "text-red-600",
  },
};

const StatCard = ({ data, statActivity }: StatCardProps) => {
  const colors = colorClasses[data.color];
  const isPositive = data.change !== undefined && data.change > 0;
  const isNegative = data.change !== undefined && data.change < 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      {/* Icon and Value Row */}
      <div className="flex items-center justify-between mb-4">
        {/* Icon */}
        <div className={`${colors.light} ${colors.text} p-3 rounded-lg`}>
          <div className="text-2xl">{data.icon}</div>
        </div>

        {/* Change Badge */}
        {data.change !== undefined && (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-semibold ${
              isPositive
                ? "bg-green-100 text-green-700"
                : isNegative
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
            }`}
          >
            {isPositive ? (
              <FiTrendingUp size={14} />
            ) : isNegative ? (
              <FiTrendingDown size={14} />
            ) : null}
            <span>{Math.abs(data.change)}%</span>
          </div>
        )}
      </div>

      {/* Label and Value */}
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{data.label}</p>
        <p className="text-3xl font-bold text-gray-800">{data.value}</p>
        <p className="text-1xl font-bold text-gray-800">{data.description}</p>
      </div>
      <div>{statActivity}</div>
    </div>
  );
};

export default StatCard;
