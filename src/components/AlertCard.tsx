import type { AlertCardData } from "../types/dashboard";
interface AlertCardProps {
  id: string;
  message: string;
  serverity: string;
  timestamp: boolean;
  title: string;
}
const AlertCard = ({
  id,
  message,
  serverity,
  timestamp,
  title,
}: AlertCardProps) => {
  return (
    <div
      className={`
    p-4 
    rounded-lg 
    border 
    shadow-sm

    ${
      serverity === "info"
        ? "bg-blue-50 border-blue-200 text-blue-800"
        : serverity === "warning"
          ? "bg-yellow-50 border-yellow-200 text-yellow-800"
          : serverity === "danger"
            ? "bg-red-50 border-red-200 text-red-800"
            : "bg-green-50 border-green-200 text-green-800"
    }
  `}
    >
      <p>{title}</p>
      <p>{message}</p>
      <p>{serverity}</p>
    </div>
  );
};
export default AlertCard;
