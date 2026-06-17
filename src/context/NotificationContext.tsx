import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type NotificationContextValue = {
  message: string | null;
  showNotification: (message: string) => void;
  hideNotification: () => void;
};

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setMessage(message);
  };

  const hideNotification = () => {
    setMessage(null);
  };

  return (
    <NotificationContext.Provider
      value={{ message, showNotification, hideNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used inside NotificationProvider");
  }

  return context;
}
