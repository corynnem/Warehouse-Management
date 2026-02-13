
'use client'
import { isEmpty, isNil } from 'lodash'
import { SalesOrders } from '@/types/SalesOrderTypes';


export interface ScannedItems {
    sku: string;
    refName: string;
    quantity: number;
}

interface LocalStorageItem {
    SONumber: string;
    scannedItems: ScannedItems[]
}


interface SetLocalStorageScannedItemsProps {
  SONumber: string;
  refName: string;
  quantity: number,
  sku: string;
}

export interface GetLocalStorageScannedItemsProps {
  SONumber?: string;
}

export const setLocalStorageScannedItems = ({
  refName,
  sku,
  quantity,
  SONumber,
}: SetLocalStorageScannedItemsProps) => {
  const orders = localStorage.getItem('orders') as string;

  if (!isEmpty(orders)) {
    const parsedOrders = JSON.parse(orders) || [];
    (parsedOrders)

    const parsedOrder = parsedOrders.find((order: LocalStorageItem) => order.SONumber === SONumber)
    const scannedItems = parsedOrder?.scannedItems ?? []

    const hasScannedItems = scannedItems?.length > 0 ? scannedItems : undefined

    if (hasScannedItems) {

      const newParsedOrder = {
        ...parsedOrder,
        scannedItems: [...parsedOrder.scannedItems, {
            refName,
            sku,
            quantity,
        }],
      };
      localStorage.setItem( 
        "orders",
        JSON.stringify([ newParsedOrder])
      );
    } else {
      const newScannedItem = {
        refName,
        sku,
        quantity
      };

      const newParsedOrder = {
        SONumber,
        scannedItems: [newScannedItem]
      }
      localStorage.setItem("orders", JSON.stringify([...parsedOrders, newParsedOrder]));
    }
  } else  {
    const newScannedItem = {
        refName,
        sku,
        quantity
      };

      const newParsedOrder = {
        SONumber,
        scannedItems: [newScannedItem]
      }
      localStorage.setItem("orders", JSON.stringify([newParsedOrder]));
  }
};



export const getLocalStorageScannedItems = ({ SONumber }: GetLocalStorageScannedItemsProps) => {

    let parsedScannedItems = [];
    if(SONumber) {
        const orders = localStorage.getItem('orders') as string;
    
        if (!isEmpty(orders)) {
          const parsedOrders = JSON.parse(orders) || [];
          const parsedOrder = parsedOrders.find(
            (order: LocalStorageItem) => order.SONumber === SONumber
          );
          const scannedItems = parsedOrder?.scannedItems ?? [];
    
          const hasScannedItems =
            scannedItems?.length > 0 ? scannedItems : undefined;
            if(hasScannedItems) {
                parsedScannedItems = scannedItems
            } 
            
          parsedScannedItems =
            scannedItems.length > 0 ? scannedItems : [];
        } 
      }


return { parsedScannedItems,};
  
};


export const postSalesOrdersLocalStorage = (
  mockSalesOrders: SalesOrders[]
) => {
    localStorage.setItem('salesOrders', JSON.stringify(mockSalesOrders))
};

export const getSalesOrdersLocalStorage = (
  ) => {
      const salesOrders = localStorage.getItem("salesOrders") || "";

      return {
        mockSalesOrders: JSON.parse(salesOrders)
      }
  };
  
  

export const removeSalesOrder = (
    SONumber: string,
    setSalesOrders: (arg: SalesOrders) => void,
  ) => {
     const mockSalesOrders = localStorage.getItem('salesOrders') || ""
     const parsedOrders = JSON.parse(mockSalesOrders)
     const index = parsedOrders.findIndex((salesOrder: SalesOrders) => salesOrder.tranid === SONumber); 
     if (index > -1) {
        // Only splice if the item is found
        parsedOrders.splice(index, 1); // 2nd parameter means remove one item only
      }
     
    setSalesOrders(parsedOrders)
     localStorage.setItem('salesOrders', JSON.stringify(parsedOrders))

  };