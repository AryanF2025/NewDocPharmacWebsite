/**
 * Technology page content, drawn from what the DocPharma platform actually
 * runs: the DocPharma One portal, the picker and rider apps, the logistics
 * engine, the partner dashboard, live tracking, the admin control room and
 * the scheduled jobs behind them.
 */

/** The products in the platform, each with who uses it and what it does. */
export const PLATFORM = [
  {
    key: "one",
    name: "DocPharma One",
    kind: "Partner portal",
    who: "Pharmacies and brands on the network",
    line: "Stock, purchases and sales for every store, in one place.",
    points: [
      "Live inventory by batch, with full stock history",
      "Purchase entries, returns and RTOs against each distributor",
      "Distributor ledgers, with bulk upload mapped to your format",
      "Offline sales and returns alongside online orders",
      "Inventory adjustments raised, then approved before they post",
    ],
  },
  {
    key: "picker",
    name: "Picker app",
    kind: "In the darkstore",
    who: "Pickers and store teams",
    line: "Guided putaway and picking, verified by scan.",
    points: [
      "Putaway that records exactly where each unit is shelved",
      "Scan-based picking against the order, item by item",
      "Batch, MRP and expiry captured at the shelf",
      "Each device registered to the store it works in",
    ],
  },
  {
    key: "rider",
    name: "Rider app",
    kind: "On the road",
    who: "DocPharma's own riders",
    line: "Every hand-off accounted for, from store to door.",
    points: [
      "Planned routes, grouped by hub and zone",
      "OTP-confirmed pickups and returns",
      "Live location shared while on a delivery",
      "Masked calling: customer numbers are never exposed",
      "Push alerts the moment a new order is assigned",
    ],
  },
  {
    key: "logistics",
    name: "Logistics engine",
    kind: "Orchestration",
    who: "Runs behind every order",
    line: "Picks the right way to deliver each order, and keeps it moving.",
    points: [
      "Assigns our own fleet or a partner courier, by zone and priority",
      "Delivery-mode priorities set per partner and region",
      "Failed hand-offs retried automatically",
      "Open orders re-synced until they reach a final status",
      "Shipping labels generated and stored with the order",
    ],
  },
  {
    key: "dashboard",
    name: "Partner dashboard",
    kind: "For your team",
    who: "Brands and platforms sending us orders",
    line: "Your orders, stock and coverage, as your team sees them.",
    points: [
      "Orders and their status, in real time",
      "Inventory held for you across the network",
      "Serviceable pincodes, before you promise delivery",
      "Users and roles your own team controls",
    ],
  },
  {
    key: "tracking",
    name: "Live tracking",
    kind: "For your customer",
    who: "The person waiting at the door",
    line: "A live view of the rider, and an honest arrival time.",
    points: [
      "The rider's live position on a map",
      "Arrival time that updates as the rider moves",
      "Order status from packed to delivered",
    ],
  },
];

/** What runs on its own, around the clock. */
export const AUTOMATION = [
  { title: "Low-stock alerts", body: "Stores are warned before a fast mover runs out." },
  { title: "Pickup watch", body: "Orders not picked up in time are flagged straight away." },
  { title: "Self-healing hand-offs", body: "A failed courier booking is retried without anyone stepping in." },
  { title: "Status sync", body: "Delivery updates flow back into the partner's own systems." },
  { title: "Catalogue sync", body: "Stock levels, including combo packs, kept in step with online stores." },
  { title: "Bulk orders", body: "Large order files processed in the background, not by hand." },
];

/** Ways a partner's systems connect. */
export const CONNECT = [
  { title: "Store & marketplace platforms", body: "Shopify, Unicommerce and EasyEcom orders and inventory, synced both ways." },
  { title: "Order API & webhooks", body: "Push orders in and receive every status change as it happens." },
  { title: "Prescriptions & invoices", body: "Prescriptions travel with the order; invoices and labels are generated for it." },
  { title: "Customer messages", body: "SMS, email and app notifications at each step of the order." },
];

/** The admin control room: how the network is run day to day. */
export const CONTROL = [
  { title: "Cash on delivery, reconciled", body: "Every COD order traced from collection to rider deposit to verification." },
  { title: "Rosters & payouts", body: "Rider shifts, reports and payslips managed in one place." },
  { title: "Zones & hubs", body: "Service areas, hubs and routes drawn and adjusted as the network grows." },
  { title: "Catalogue mapping", body: "Partner products mapped to the master catalogue, combos included." },
  { title: "Approvals", body: "Stock adjustments go through review before they change the books." },
  { title: "Roles & permissions", body: "Each person sees and does only what their role allows." },
];
