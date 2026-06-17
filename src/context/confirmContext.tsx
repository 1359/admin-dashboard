import { createContext, useContext, useState, type ReactNode } from "react";
interface ConfirmContextValue {
  confirm: (options: ConfirmOptions) => void;
}
interface ConfirmOptions {
  message: string;
  confirmText?: string;
  onConfirm: () => void;
}

const ConfirmContext = createContext<ConfirmContextValue | null>(null);
export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<null | ConfirmOptions>(null);
  function handleCancel() {
    setOptions(null);
  }
  function handleConfirm() {
    options?.onConfirm();
    setOptions(null);
  }
  function confirm(opt: ConfirmOptions) {
    setOptions(opt);
  }
  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      {options && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={handleCancel}
          />
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-sm mx-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Are you sure?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              {options.message}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                {options.confirmText ?? "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}
export const useConfirm = (): ConfirmContextValue => {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used inside ConfirmProvider");
  return ctx;
};
//فایل confirmContext.tsx یک ماژول مربوط به Confirm است. داخلش هم Context object داریم، هم Provider component، هم helper function، هم custom hook. این مدل کاملاً رایج و درست است.
