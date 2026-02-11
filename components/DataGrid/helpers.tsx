import { GridColDef } from "@mui/x-data-grid";
import { SalesOrders } from "@/mockData/salesOrders";
import CreateBarcodeModal from "../CreateBarcodeModal/CreateBarcodeModal";

export interface WarehouseGridRow {
  id: string;
  shopifyOrderNumber: string;
  salesOrderNumber: string;
  totalItems: number;
}

export const columns: GridColDef<WarehouseGridRow[][number]>[] = [
  {
    field: "id",
    headerName: "Id",
    width: 80,
  },
  {
    field: "shopifyOrderNumber",
    headerName: "Shopify Order Number",
    width: 170,
    editable: false,
  },
  {
    field: "salesOrderNumber",
    headerName: "Sales Order Number",
    width: 180,
    editable: false,
  },
  {
    field: "totalItems",
    headerName: "Total Items",
    width: 180,
  },
];

export const getDataGridRows = (salesOrders: SalesOrders[]) => {
  return salesOrders.map((salesOrder) => {
    const {
      id,
      otherrefnum: shopifyOrderNumber,
      tranid: salesOrderNumber,
      item,
    } = salesOrder;
    const totalItems = item.items.length;
    return {
      id,
      shopifyOrderNumber,
      salesOrderNumber,
      totalItems,
    };
  });
};