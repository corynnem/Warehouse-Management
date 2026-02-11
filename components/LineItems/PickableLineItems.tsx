import { Box, Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Items } from "@/types/SalesOrderTypes";

interface PickableLineItemsProps {
  item: Items;
}

const PickableLineItems = ({ item: SOItem }: PickableLineItemsProps) => {
  const { item, quantity } = SOItem;
  const { refName } = item;

  const [isScanned, setIsScanned] = useState(false);
  const [countScanned, setCountScanned] = useState(quantity);

  console.log(item);

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

  return (
    <Box
      sx={{
        background: lineItemColor,
        marginTop: "5px",
        padding: "5px",
        borderRadius: '10px',
      }}
    >
      <Checkbox disabled={!isScanned} />
      {refName}
    </Box>
  );
};

export default PickableLineItems;
