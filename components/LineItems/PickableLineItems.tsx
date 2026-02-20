import { Box, Checkbox } from "@mui/material";
import { Items } from "@/types/SalesOrderTypes";


interface PickableLineItemsProps {
  item: Items;
  scanCount: number;
  SONumber: string;
}

const PickableLineItems = ({
  item: SOItem,
  scanCount
}: PickableLineItemsProps) => {

  const { item, quantity } = SOItem;
  const { refName } = item;

  const leftToPick = quantity - scanCount;
  const quantityMet = scanCount === quantity;

  console.log(quantity, scanCount)
  const lineItemColor = () => {
    if (quantityMet) return "rgba(12, 107, 55, .5)";
    if (scanCount > 0) return "#F8B324";
    return "#F58F29";
  };

  return (
    <Box
      sx={{
        background: lineItemColor(),
        marginTop: "5px",
        padding: "5px",
        borderRadius: '10px',
      }}
    >
      <Checkbox disabled checked={scanCount > 0} />
      {refName}
      <br />
      <p style={{ marginLeft: '5px' }}>
        {leftToPick} left to pick
      </p>
    </Box>
  );
};
 export default PickableLineItems;