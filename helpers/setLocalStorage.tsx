
interface SetLocalStorageScannedItemsProps {
  item: string;
  sku: string;
}

export interface GetLocalStorageScannedItemsProps {
    item?: string;
    sku: string;
  }

export const setLocalStorageScannedItems = ({ item, sku }: SetLocalStorageScannedItemsProps) => {
    const scannedItems = localStorage.getItem('scannedItems')


    if(scannedItems){
        const parsedScannedItems = scannedItems.length > 0 ? JSON.parse(scannedItems) : []
        const newScannedItem = {
            item,
            sku,
        }
        localStorage.setItem('scannedItems', JSON.stringify([...parsedScannedItems, newScannedItem]));
    } else {

        const newScannedItem = {
            item,
            sku,
        }
        localStorage.setItem('scannedItems', JSON.stringify([newScannedItem]));
    }

    
};

export const getLocalStorageScannedItems = () => {
    const scannedItems = localStorage.getItem('scannedItems') || ""

    const parsedScannedItems = scannedItems.length > 0 ? JSON.parse(scannedItems) : []
    // console.log(scannedItems, parsedScannedItems)
    return { parsedScannedItems }
};