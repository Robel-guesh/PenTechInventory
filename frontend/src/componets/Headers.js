export const goodsHeader = [
  { path: "id", label: "ID" },
  { path: "name", label: "Name" },
  { path: "qty", label: "stock" },
  { path: "shortageLevel", label: "Shortage level" },
  { path: "categoryId.name", label: "category" },
];
export const userHeader = [
  { path: "id", label: "ID" },
  { path: "name", label: "Name" },
  { path: "email", label: "E-mail" },
  { path: "sex", label: "Sex" },
  { path: "roleId[name]", label: "Role" },
  { path: "password", label: "password" },
];
export const withdrawHeader = [
  { path: "customerName", label: "Customer Name" },
  // { path: "customerId.name", label: "Customer" },
  // { path: "goodsId.name ", label: "Goods" },
  // { path: "sellerId.name", label: "Seller" },
  // { path: "qty", label: "Quantity" },
  // { path: "reasonId.name", label: "Reason" },
  // { path: "isPending", label: "Pending" },
  // { path: "isApproved", label: "Approved" },
  // { path: "isConfirmed", label: "Confirmed" },
  // { path: "date", label: "Date" },
];
export const purchaseHeader = [
  { path: "id.name", label: "Name" },
  { path: "qty", label: "Quantity" },

  { path: "unitPrice", label: "Bought Price" },
  { path: "sellingPrice", label: "selling Price" },
  { path: "storeLocationId.name", label: "Store" },
];
export const categoryHeader = [{ path: "name", label: "Name" }];
// export const typeHeader = [{ path: "name", label: "Name" }];
export const measurementHeader = [
  { path: "groupName", label: "group" },
  { path: "name", label: "Name" },
  { path: "quantity", label: "Quantity" },
];

export const supplierHeader = [
  { path: "name", label: "Name" },
  { path: "mobile", label: "mobile" },
  { path: "invoiceNumber", label: "invoice number" },
];
export const storeHeader = [
  { path: "name", label: "Name" },
  { path: "location", label: "address" },
];
