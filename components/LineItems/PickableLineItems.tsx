import { Box, Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Items } from "@/types/SalesOrderTypes";
import { setLocalStorageScannedItems, getLocalStorageScannedItems, GetLocalStorageScannedItemsProps } from "@/helpers";

interface PickableLineItemsProps {
  item: Items;
  isScannedItem: boolean;
}

const PickableLineItems = ({ item: SOItem, isScannedItem }: PickableLineItemsProps) => {
  const { item, quantity } = SOItem;
  const { refName, sku } = item;

  const [isScanned, setIsScanned] = useState(isScannedItem);
  const [countScanned, setCountScanned] = useState(0);
  const leftToPick = quantity - countScanned 


  const lineItemColor = () => {
    const quantityMet = countScanned === quantity;
    if (isScanned && quantityMet) {
      return "#90C290";
    }
    if (isScanned && !quantityMet) {
      return "#F58F29";
    }

    return "#F58F29"
  };


  useEffect(() => {
    setIsScanned(isScannedItem);
  }, [isScannedItem]);

  useEffect(() => {
    const scannedCount = countScanned - 1;
    if (scannedCount > 0) {
      setCountScanned(countScanned + 1);
    } else {
      setCountScanned(1);
    }

    const { parsedScannedItems } = getLocalStorageScannedItems();
    const itemAlreadyScanned = !!parsedScannedItems.find((item: GetLocalStorageScannedItemsProps) => item.sku ===  sku)

    if (isScannedItem && !itemAlreadyScanned) {
      setLocalStorageScannedItems({ item: refName, sku });
    }
  }, [isScannedItem]);
  


  
  return (
    <Box
      sx={{
        background: lineItemColor,
        marginTop: "5px",
        padding: "5px",
        borderRadius: '10px',
      }}
    >
      <Checkbox disabled={!isScanned} checked={isScanned} />
      {refName}: {leftToPick} left to pick
    </Box>
  );
};

export default PickableLineItems;
