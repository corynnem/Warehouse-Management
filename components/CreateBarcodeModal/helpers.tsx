import { upc_codes } from '@/silca_upc_barcodes'

export const findScanned = (scannedCode: number) => {
    const result = upc_codes.find(item => item.GTIN === scannedCode);
    if (result) {
      console.log("Found:", result['Product Description']);
    } else {
      console.log("Item not found");
    }
  }