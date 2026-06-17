import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  FiCheckCircle,
  FiXCircle,
  FiInfo,
  FiAlertTriangle,
  FiX,
} from "react-icons/fi";
type ToastType = "success" | "error" | "info" | "warning";

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const toastStyles: Record<ToastType, { container: string; icon: ReactNode }> = {
  success: {
    container: "bg-green-50 border-green-400 text-green-800",
    icon: <FiCheckCircle className="text-green-500" size={20} />,
  },
  error: {
    container: "bg-red-50 border-red-400 text-red-800",
    icon: <FiXCircle className="text-red-500" size={20} />,
  },
  info: {
    container: "bg-blue-50 border-blue-400 text-blue-800",
    icon: <FiInfo className="text-blue-500" size={20} />,
  },
  warning: {
    container: "bg-yellow-50 border-yellow-400 text-yellow-800",
    icon: <FiAlertTriangle className="text-yellow-500" size={20} />,
  },
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismiss = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  const value: ToastContextValue = {
    success: (msg) => addToast(msg, "success"),
    error: (msg) => addToast(msg, "error"),
    info: (msg) => addToast(msg, "info"),
    warning: (msg) => addToast(msg, "warning"),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 w-80">
          {toasts.map((toast) => {
            const style = toastStyles[toast.type];
            return (
              <div
                key={toast.id}
                className={`flex items-start gap-3 px-4 py-3 rounded-lg border shadow-lg animate-in slide-in-from-right-4 ${style.container}`}
              >
                <span className="mt-0.5 shrink-0">{style.icon}</span>
                <p className="flex-1 text-sm font-medium">{toast.message}</p>
                <button
                  onClick={() => dismiss(toast.id)}
                  className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                >
                  <FiX size={16} />
                </button>
              </div>
            );
          })}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
};
