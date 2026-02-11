import { upc_codes } from "@/silca_upc_barcodes";

export const findScannedItem = (scannedCode: number) => {
  const result = upc_codes.find((item) => item.GTIN === scannedCode);
  if (result) {
    console.log(result);
    return `Found: ${result["Product Description"]}`;
  } else {
    return `Not Found`;
  }
};
