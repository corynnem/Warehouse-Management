import { Box, Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Items } from "@/types/SalesOrderTypes";
import { setLocalStorageScannedItems, getLocalStorageScannedItems, ScannedItems } from "@/helpers";

interface PickableLineItemsProps {
  item: Items;
  isScannedItem: boolean;
  SONumber: string;
}

const PickableLineItems = ({ item: SOItem, isScannedItem, SONumber }: PickableLineItemsProps) => {
  const { item, quantity } = SOItem;
  const { refName, sku } = item;

  const [isScanned, setIsScanned] = useState(isScannedItem);
  const [countScanned, setCountScanned] = useState(0);
  const leftToPick = quantity - countScanned 


  const lineItemColor = () => {
    const quantityMet = countScanned === quantity;
    if (isScanned && quantityMet) {
      return "rgba(12, 107, 55, .5)";
    }
    if (isScanned && !quantityMet) {
      return "##F8B324";
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

    const { parsedScannedItems } = getLocalStorageScannedItems({ SONumber });
    const itemAlreadyScanned = !!parsedScannedItems.find(
      (item: ScannedItems) => item?.sku === sku
    );

    if (isScannedItem && !itemAlreadyScanned) {
      setLocalStorageScannedItems({ SONumber, refName, sku, quantity: countScanned });
    }
  }, [isScannedItem]);
  

  // 810093162987 Elettrico
  // 810093162642 CWS 
  // 810093160938 8oz
  // 850005186328 Hot wax

  
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
      {refName}: 
      <br/>
      <p style={{marginLeft: '5px'}}>{leftToPick} left to pick</p>
    </Box>
  );
};

export default PickableLineItems;
