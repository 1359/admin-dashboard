// src/components/NotificationBar.tsx

import { useNotification } from "../context/NotificationContext";

export function NotificationBar() {
  const { message, hideNotification } = useNotification();

  if (!message) return null;

  return (
    <div className="bg-yellow-100 border-b border-yellow-300 px-4 py-3 flex justify-between items-center">
      <span>{message}</span>

      <button onClick={hideNotification}>✕</button>
    </div>
  );
}
