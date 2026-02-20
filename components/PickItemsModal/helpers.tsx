import { upc_codes } from "@/silca_upc_barcodes";
import { ErrorModalText } from "@/context/DataGridContext";
import { Items } from "@/types/SalesOrderTypes";

export const findScannedItem = (scannedCode: number) => {
  const result = upc_codes.find((item) => {
    return item.GTIN === scannedCode;
  });

  if (result) {
    return result["SKU"];
  } else {
    return undefined;
  }
};

export interface HandleInputChangeProps {
  newBarcode?: number;
  setErrorModalText: (args: ErrorModalText) => void;
  setErrorModalOpen: (args: boolean) => void;
  orderItems: Items[];
  scanCounts: Record<string, number>;
  setScanCounts: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}



export type ScanResult =
  | { type: "NOT_FOUND" }
  | { type: "NOT_IN_ORDER" }
  | { type: "QUANTITY_MET" }
  | { type: "SUCCESS"; sku: string };

export const handleInputChange = (
  newBarcode: number,
  orderItems: Items[],
  scanCounts: Record<string, number>
): ScanResult => {
  const foundSku = findScannedItem(newBarcode);

  if (!foundSku) return { type: "NOT_FOUND" };

  const orderItem = orderItems.find(
    (item) => item.item.sku === foundSku
  );

  if (!orderItem) return { type: "NOT_IN_ORDER" };

  const currentCount = scanCounts[foundSku] ?? 0;

  if (currentCount >= orderItem.quantity)
    return { type: "QUANTITY_MET" };

  return { type: "SUCCESS", sku: foundSku };
};


export const mockScan = (value: string) => {
  for (const char of value) {
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: char })
    );
  }

  document.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'Enter' })
  );
};
