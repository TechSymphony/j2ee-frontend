"use client";
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext<{
  triggerRefetch: () => void;
  setTriggerRefetch: React.Dispatch<React.SetStateAction<() => void>>;
} | null>(null);

export const useRefetch = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useRefetch must be used within a RefetchProvider");
  }
  return context;
};

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [triggerRefetch, setTriggerRefetch] = useState<() => void>(
    () => () => {}
  );

  return (
    <AppContext.Provider value={{ triggerRefetch, setTriggerRefetch }}>
      {children}
    </AppContext.Provider>
  );
};
