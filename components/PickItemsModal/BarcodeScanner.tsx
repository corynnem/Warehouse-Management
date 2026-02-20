import { useState, useEffect, useRef } from "react";
import { HandleInputChangeProps, handleInputChange } from "./helpers";
import { Typography, Box } from "@mui/material";

const BarcodeScanner = ({
  setErrorModalText,
  setErrorModalOpen,
  orderItems,
  scanCounts,
  setScanCounts,
}: HandleInputChangeProps) => {
  const [barcode, setBarcode] = useState<string>("");
  const accumulatedBarcode = useRef<string>("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.code === "NumpadEnter") {
        const scanned = accumulatedBarcode.current.trim();

        if (scanned.length > 0) {
          setBarcode(scanned);

          const result = handleInputChange(
            Number(scanned),
            orderItems,
            scanCounts
          );

          switch (result.type) {
            case "SUCCESS":
              setScanCounts((prev: Record<string, number>) => ({
                ...prev,
                [result.sku]: (prev[result.sku] ?? 0) + 1,
              }));
              break;

            case "NOT_FOUND":
              setErrorModalText({
                title: "Scanned Item not found",
                subtext: "Please put this item back before continuing",
              });
              setErrorModalOpen(true);
              break;
            case "QUANTITY_MET":
              setErrorModalText({
                title: "Quantity for this item already met",
                subtext: "Please put this item back before continuing",
              });
              setErrorModalOpen(true);
              break;
            case "NOT_IN_ORDER":
              setErrorModalText({
                title: "Scanned item not in order",
                subtext: "Please put this item back before continuing",
              });
              setErrorModalOpen(true);
              break;
          }
        }

        accumulatedBarcode.current = "";
      } else if (event.key.length === 1) {
        accumulatedBarcode.current += event.key;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [orderItems, setErrorModalOpen, setErrorModalText, setScanCounts]);

  return (
    <Box>
      <Typography>Last Scanned Barcode:</Typography>
      <Typography>{barcode}</Typography>
    </Box>
  );
};

export default BarcodeScanner;
