import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ToastProvider } from "./context/ToastContext";
import "./index.css";
import App from "./App.tsx";
import { ConfirmProvider } from "./context/confirmContext.tsx";
import { NotificationProvider } from "./context/NotificationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <ConfirmProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </ConfirmProvider>
      </ToastProvider>
    </Provider>
  </StrictMode>,
);
