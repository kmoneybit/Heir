"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

type AlertType = "success" | "error" | "info" | "warning";

interface AlertContextType {
  showAlert: (message: string, type?: AlertType, duration?: number) => void;
  hideAlert: () => void;
  alert: {
    message: string;
    type: AlertType;
    visible: boolean;
  };
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alert, setAlert] = useState<{
    message: string;
    type: AlertType;
    visible: boolean;
  }>({
    message: "",
    type: "info",
    visible: false,
  });

  const hideAlert = useCallback(() => {
    setAlert((prev) => ({ ...prev, visible: false }));
  }, []);

  const showAlert = useCallback((message: string, type: AlertType = "info", duration = 4000) => {
    setAlert({ message, type, visible: true });
    
    if (duration !== Infinity) {
      setTimeout(() => {
        hideAlert();
      }, duration);
    }
  }, [hideAlert]);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert, alert }}>
      {children}
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
