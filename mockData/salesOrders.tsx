import { SalesOrders } from "@/types/SalesOrderTypes";
export const mockSalesOrders: SalesOrders[] = [
  {
    links: [],
    id: "0",
    tranid: "SO000000",
    otherrefnum: "030000",
    entity: { id: "0", refName: "Lena Alt" },
    trandate: "2025-02-10",
    subsidiary: { id: "1", refName: "Silca" },
    item: {
      items: [
        {
          item: {
            id: "0",
            refName: "Chain Waxing System",
            sku: "AM-AC-057-ASY-0100",
          },
          amount: 99.0,
          quantity: 1,
        },
        {
          item: {
            id: "1",
            refName: "Hot Melt Wax Blend",
            sku: "AM-AC-016-ASY-0100",
          },
          amount: 40.0,
          quantity: 1,
        },
        {
          item: {
            id: "2",
            refName: "Super Secret 8oz",
            sku: "AM-AC-015-ASY-0700",
          },
          amount: 45.0,
          quantity: 1,
        },
        {
          item: {
            id: "3",
            refName: "Elettrico Ultimate",
            sku: "AM-PU-016-ASY-0200",
          },
          amount: 159.0,
          quantity: 1,
        },
      ],
    },
  },
  {
    links: [],
    id: "1",
    tranid: "SO000002",
    otherrefnum: "030002",
    entity: { id: "1", refName: "Tess Ervin" },
    trandate: "2025-02-11",
    subsidiary: { id: "1", refName: "Parent Company" },
    item: {
      items: [
        {
          item: {
            id: "8",
            refName: "Mattone Grande",
            sku: "AM-BG-013-ASY-0300",
          },
          amount: 55.0,
          quantity: 1,
        },
      ],
    },
  },
  {
    links: [],
    id: "2",
    tranid: "SO000002",
    otherrefnum: "0300002",
    entity: { id: "2", refName: "Britney Warfel" },
    trandate: "2025-02-10",
    subsidiary: { id: "1", refName: "Silca" },
    item: {
      items: [
        {
          item: { id: "7", refName: "Shimano Dura-Ace 11s", sku: "AC-016-COM-0300" },
          amount: 69.0,
          quantity: 1,
        },
        {
          item: { id: "8", refName: "Mattone Grande", sku: "AM-BG-013-ASY-0300"  },
          amount: 55.0,
          quantity: 1,
        },
        {
          item: { id: "9", refName: "Strip Chip", sku: "AM-AC-058-ASY-0100" },
          amount: 24.0,
          quantity: 1,
        },
      ],
    },
  },
  {
    links: [],
    id: "3",
    tranid: "SO000003",
    otherrefnum: "0300003",
    entity: { id: "3", refName: "Lisa Carr" },
    trandate: "2023-07-10",
    subsidiary: { id: "1", refName: "Silca" },
    item: {
      items: [
        {
          item: { id: "3", refName: "Elettrico Ultimate", sku: "AM-PU-016-ASY-0200" },
          amount: 159.0,
          quantity: 1,
        },
        {
          item: { id: "4", refName: "Synergetic", sku: 'AM-AC-018-ASY-0300' },
          amount: 21.0,
          quantity: 1,
        },
        {
          item: { id: "5", refName: "101 Derailleur Hanger", sku: 'AM-AC-056-ASY-0201' },
          amount: 54.0,
          quantity: 1,
        },
        {
          item: { id: "6", refName: "Chain Coupler", sku: "AC-057-COM-0100" },
          amount: 10.0,
          quantity: 1,
        },
      ],
    },
  },
  {
    links: [],
    id: "4",
    tranid: "SO000004",
    otherrefnum: "0300004",
    entity: { id: "4", refName: "Brendan Sheehan" },
    trandate: "2025-02-10",
    subsidiary: { id: "1", refName: "Silca" },
    item: {
      items: [
        {
          item: { id: "1", refName: "Hot Melt Wax Blend", sku: "AM-AC-016-ASY-0100" },
          amount: 40.0,
          quantity: 1,
        },
        {
          item: { id: "2", refName: "Super Secret 8oz", sku: "AM-AC-015-ASY-0700" },
          amount: 45.0,
          quantity: 1,
        },
        {
          item: { id: "3", refName: "Elettrico Ultimate", sku: "AM-PU-016-ASY-0200" },
          amount: 159.0,
          quantity: 1,
        },
        {
          item: { id: "4", refName: "Synergetic", sku: 'AM-AC-018-ASY-0300' },
          amount: 21.0,
          quantity: 1,
        },
      ],
    },
  },
  {
    links: [],
    id: "5",
    tranid: "SO000005",
    otherrefnum: "0300005",
    entity: { id: "5", refName: "Zach Mattox" },
    trandate: "2025-02-10",
    subsidiary: { id: "1", refName: "Silca" },
    item: {
      items: [
        {
          item: { id: "3", refName: "Elettrico Ultimate", sku: "AM-PU-016-ASY-0200" },
          amount: 159.0,
          quantity: 1,
        },
      ],
    },
  },
  {
    links: [],
    id: "6",
    tranid: "SO000006",
    otherrefnum: "0300006",
    entity: { id: "6", refName: "Scot Allen" },
    trandate: "2025-02-10",
    subsidiary: { id: "1", refName: "Silca" },
    item: {
      items: [
        {
          item: { id: "6", refName: "Chain Coupler", sku: "AC-057-COM-0100" },
          amount: 10.0,
          quantity: 1,
        },
      ],
    },
  },
  {
    links: [],
    id: "7",
    tranid: "SO000007",
    otherrefnum: "0300007",
    entity: { id: "7", refName: "Eric Wheatley" },
    trandate: "2025-02-10",
    subsidiary: { id: "1", refName: "Silca" },
    item: {
      items: [
        {
          item: {
            id: "0",
            refName: "Chain Waxing System",
            sku: "AM-AC-057-ASY-0100",
          },
          amount: 99.0,
          quantity: 1,
        },
        {
          item: { id: "1", refName: "Hot Melt Wax Blend", sku: "AM-AC-016-ASY-0100" },
          amount: 40.0,
          quantity: 1,
        },
        {
          item: { id: "2", refName: "Super Secret 8oz", sku: "AM-AC-015-ASY-0700" },
          amount: 45.0,
          quantity: 1,
        },
        {
          item: { id: "3", refName: "Elettrico Ultimate", sku: "AM-PU-016-ASY-0200" },
          amount: 159.0,
          quantity: 1,
        },
        {
          item: { id: "4", refName: "Synergetic", sku: 'AM-AC-018-ASY-0300' },
          amount: 21.0,
          quantity: 1,
        },
        {
          item: { id: "5", refName: "101 Derailleur Hanger", sku: 'AM-AC-056-ASY-0201' },
          amount: 54.0,
          quantity: 1,
        },
        {
          item: { id: "6", refName: "Chain Coupler", sku: "AC-057-COM-0100" },
          amount: 10.0,
          quantity: 1,
        },
        {
          item: { id: "7", refName: "Shimano Dura-Ace 11s", sku: "AC-016-COM-0300" },
          amount: 69.0,
          quantity: 1,
        },
        {
          item: { id: "8", refName: "Mattone Grande", sku: "AM-BG-013-ASY-0300"  },
          amount: 55.0,
          quantity: 1,
        },
      ],
    },
  },
  {
    links: [],
    id: "8",
    tranid: "SO000008",
    otherrefnum: "0300008",
    entity: { id: "8", refName: "Travis Verhoff" },
    trandate: "2025-02-10",
    subsidiary: { id: "1", refName: "Silca" },
    item: {
      items: [
        {
          item: {
            id: "0",
            refName: "Chain Waxing System",
            sku: "AM-AC-057-ASY-0100",
          },
          amount: 99.0,
          quantity: 1,
        },
        {
          item: { id: "1", refName: "Hot Melt Wax Blend", sku: "AM-AC-016-ASY-0100" },
          amount: 40.0,
          quantity: 1,
        },
        {
          item: { id: "2", refName: "Super Secret 8oz", sku: "AM-AC-015-ASY-0700" },
          amount: 45.0,
          quantity: 1,
        },
        {
          item: { id: "3", refName: "Elettrico Ultimate", sku: "AM-PU-016-ASY-0200" },
          amount: 159.0,
          quantity: 1,
        },
        {
          item: { id: "4", refName: "Synergetic", sku: 'AM-AC-018-ASY-0300' },
          amount: 21.0,
          quantity: 1,
        },
        {
          item: { id: "5", refName: "101 Derailleur Hanger", sku: 'AM-AC-056-ASY-0201' },
          amount: 54.0,
          quantity: 1,
        },
        {
          item: { id: "6", refName: "Chain Coupler", sku: "AC-057-COM-0100" },
          amount: 10.0,
          quantity: 1,
        },
        {
          item: { id: "7", refName: "Shimano Dura-Ace 11s", sku: "AC-016-COM-0300" },
          amount: 69.0,
          quantity: 1,
        },
        {
          item: { id: "8", refName: "Mattone Grande", sku: "AM-BG-013-ASY-0300"  },
          amount: 55.0,
          quantity: 1,
        },
        {
          item: { id: "9", refName: "Strip Chip", sku: "AM-AC-058-ASY-0100" },
          amount: 24.0,
          quantity: 1,
        },
      ],
    },
  },
  {
    links: [],
    id: "9",
    tranid: "SO000009",
    otherrefnum: "0300009",
    entity: { id: "9", refName: "Phil Stephens" },
    trandate: "2025-02-10",
    subsidiary: { id: "1", refName: "Silca" },
    item: {
      items: [
        {
          item: { id: "7", refName: "Shimano Dura-Ace 11s", sku: "AC-016-COM-0300" },
          amount: 69.0,
          quantity: 1,
        },
      ],
    },
  },
];
