export interface Entity {
  id: string;
  refName: string;
}
export interface Subsidiary {
  id: string;
  refName: string;
}

export interface Product {
  id: string;
  refName: string;
}

export interface Items {
  item: Product;
  amount: number;
  quantity: number;
}

export interface SOItem {
  items: Items[];
}

export interface SalesOrders {
  links: string[];
  id: string;
  tranid: string;
  otherrefnum: string;
  entity: Entity;
  trandate: string;
  subsidiary: Subsidiary;
  item: SOItem;
}
