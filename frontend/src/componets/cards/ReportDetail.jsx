import React, { useState } from "react";
import { useAppContext } from "../../contexts/AppContext";

function ReportDetail({ items, qty, detail }) {
  const [cardIsOpen, setCardIsOpen] = useState(false);
  const { translate, defaultBackground } = useAppContext();
  const groupItemsByGoodsId = (list) => {
    const grouped = {};

    // Group items by goodsId._id and sum their qty
    list.forEach((item) => {
      const goodsId = item?.goodsId?._id;

      if (grouped[goodsId]) {
        grouped[goodsId].qty += item.qty; // Sum the qty if goodsId._id already exists
      } else {
        grouped[goodsId] = { ...item }; // Initialize with the first item
      }
    });

    // Convert grouped object back into an array
    return Object.values(grouped);
  };

  const groupedItems = groupItemsByGoodsId(items?.list);
  return (
    <div className={`${defaultBackground}`}>
      <div
        className="text-center fs-7 pointer"
        onClick={() => {
          setCardIsOpen(!cardIsOpen);
        }}
      >
        {detail &&
          qty > 0 &&
          translate(cardIsOpen ? "see less" : " see details")}
      </div>

      {cardIsOpen && (
        <div className="p-2 overflow-auto">
          {
            // items?.list?
            // groupedItems.length > 0 &&
            // groupedItems
            items?.list?.map((listItems) => (
              <div
                key={listItems?._id}
                className="d-flex justify-content-between p-1 "
              >
                <span>
                  <span className="bi bi-check-circle text-success fw-bold"></span>{" "}
                  <span key={listItems}>
                    {translate(listItems?.name || listItems?.goodsId?.name)}
                  </span>
                </span>
                {listItems?.qty > 0 && (
                  <span className="bg-warning text-center d-flex align-items-center  rounded-3 px-2  ">
                    {listItems?.qty}
                  </span>
                )}
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}

export default ReportDetail;
