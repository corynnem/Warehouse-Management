import { GridColDef } from "@mui/x-data-grid";
import { SalesOrders } from "@/types/SalesOrderTypes";
import CreateBarcodeModal from "../PickItemsModal/PickItemsModal";
import { mockSalesOrders } from "@/mockData/salesOrders";
import PickItemsModal from "../PickItemsModal/PickItemsModal";

export interface WarehouseGridRow {
  id: string;
  shopifyOrderNumber: string;
  salesOrderNumber: string;
  totalItems: number;
}

export const getSalesOrders = () => {
  // fetch("https://demo123.suitetalk.api.netsuite.com/services/rest/record/v1/salesorder/1504")
  // .then((res) => res.json())
  // .then(res => console.log(res))
  return { mockSalesOrders };
};



export const getIndividualSalesOrder = (salesOrderNumber: string) => {
  // fetch("https://demo123.suitetalk.api.netsuite.com/services/rest/record/v1/salesorder/1504")
  // .then((res) => res.json())
  // .then(res => console.log(res))
  const mockSalesOrder = mockSalesOrders.find(order =>{
    return order.tranid === salesOrderNumber
  })

  return { mockSalesOrder };
};

export const findScannedOrder = (scannedCode: number, openSalesOrders: WarehouseGridRow[]) => {
  const result = openSalesOrders.find(item => {
    const salesOrderNumber = Number(item.salesOrderNumber);
    return salesOrderNumber === scannedCode
  });
  if (result) {
    console.log("Found:", scannedCode);
  } else {
    console.log("Item not found");
  }
}



export const columns: GridColDef<WarehouseGridRow[][number]>[] = [
  {
    field: "id",
    headerName: "Id",
    width: 80,
    renderCell: (params) => {

      return <PickItemsModal salesOrderNumber={params.row.salesOrderNumber}/>;
    },
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

{/* <PickItemsModal /> */}