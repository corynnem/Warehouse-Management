import { upc_codes } from "@/silca_upc_barcodes";

export const findScannedItem =  (scannedCode: number) => {
  const result = upc_codes.find((item) => {
    return item.GTIN === scannedCode
  });

  if (result) {
    return result["SKU"]
  } else {
    return undefined
  }
};
