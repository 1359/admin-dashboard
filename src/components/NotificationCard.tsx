import type { NotificationsCardData } from "../types/dashboard";
interface NotificationCardProps {
  id: number;
  title: string;
  time: string;
  priority: string;
  description?: string;
}
const NotificationCard = ({
  id,
  title,
  time,
  priority,
  description,
}: NotificationCardProps) => {
  return (
    <div>
      <p>{time}</p>
      <p>{title}</p>
      <p>{priority}</p>
      <p>{description}</p>
    </div>
  );
};
export default NotificationCard;
