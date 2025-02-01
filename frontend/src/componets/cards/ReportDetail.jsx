import React, { useState } from "react";
import { useAppContext } from "../../contexts/AppContext";

function ReportDetail({ items, qty, detail }) {
  const [cardIsOpen, setCardIsOpen] = useState(false);
  const { translate } = useAppContext();
  return (
    <div>
      <div
        className="text-center fs-7"
        onClick={() => {
          setCardIsOpen(!cardIsOpen);
        }}
      >
        {detail &&
          qty > 0 &&
          translate(cardIsOpen ? "hide details" : " see details")}
      </div>

      {cardIsOpen && (
        <div className="p-2 overflow-auto">
          {items?.list?.map((listItems) => (
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
          ))}
        </div>
      )}
    </div>
  );
}

export default ReportDetail;
