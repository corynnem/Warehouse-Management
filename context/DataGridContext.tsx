'use client'
import { SalesOrders } from '@/types/SalesOrderTypes';
import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { mockSalesOrders } from '@/mockData';

export interface ErrorModalText {
  title: string;
  subtext: string
}

export interface DataGridContext {
  salesOrders: SalesOrders[];
  currentlyScannedItem: string;
  errorModalText: ErrorModalText;
  errorModalOpen: boolean;
  setErrorModalText: (arg: ErrorModalText) => void;
  setErrorModalOpen: (arg: boolean) => void;
  setCurrentlyScannedItem: (arg: string) => void;
  setSalesOrders: (arg: SalesOrders[]) => void;
}


export const DataGridContext = createContext<DataGridContext>(
  {} as DataGridContext
);

export const DataGridProvider = ({ children }: { children: ReactNode }) => {
  const [errorModalText, setErrorModalText] = useState<ErrorModalText>({
    title: "",
    subtext: "",
  });
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [currentlyScannedItem, setCurrentlyScannedItem] = useState("");
  const [salesOrders, setSalesOrders] = useState(mockSalesOrders);

  // Memoize the value to prevent unnecessary re-renders in consumer components
  const contextValue = useMemo(
    () => ({
      errorModalText,
      setErrorModalText,
      errorModalOpen,
      setErrorModalOpen,
      currentlyScannedItem,
      setCurrentlyScannedItem,
      salesOrders,
      setSalesOrders,
    }),
    [errorModalText, errorModalOpen, currentlyScannedItem, salesOrders]
  );

  return (
    <DataGridContext.Provider value={contextValue}>
      {children}
    </DataGridContext.Provider>
  );
};