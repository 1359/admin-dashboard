import type { MessageCardData } from "../types/dashboard";
interface MessageCardProps {
  data: MessageCardData;
}

const MessageCard = ({ data }: MessageCardProps) => {
  return (
    <div
      className={`
        p-5
        rounded-2xl
        mb-4
        border-l-8
        shadow-md
        transition-all

        ${
          data.status === "read"
            ? "bg-green-100 border-green-500 text-green-900"
            : data.status === "failed"
              ? "bg-red-100 border-red-500 text-red-900"
              : "bg-blue-100 border-blue-500 text-blue-900"
        }
      `}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-lg">{data.sender}</h2>

        <span className="text-sm font-semibold uppercase">{data.status}</span>
      </div>

      <p className="text-base">{data.text}</p>
    </div>
  );
};
export default MessageCard;
