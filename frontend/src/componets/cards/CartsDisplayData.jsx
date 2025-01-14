import React, { useState, useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";

function CartsDisplayData({ cardData }) {
  const [cartCount, setCartCount] = useState(0);
  const { translate } = useAppContext();
  useEffect(() => {
    setCartCount(cardData.Qty);
  }, []);

  const handleCount = (operator) => {
    // Instead of directly modifying `newCount`, we properly use `setCount`
    setCartCount((prevCount) => {
      if (operator === "decrease" && prevCount > 0) {
        return prevCount - 1;
      } else if (operator === "increase") {
        return prevCount + 1;
      }
      return prevCount;
    });
  };
  const handleSaveOrder = (status) => {
    console.log("data ordered successfully", status);
  };
  return (
    <div>
      <div className="card-container">
        <div className="goods-container ">
          <div className="goods-img-container">
            <img src={cardData.photo && cardData.photo} alt="goods"></img>
          </div>
          <div className="d-flex justify-content-between  align-items-center gap-4 text-content">
            <div className="d-flex flex-column ">
              <div className="word-wrap">{cardData.name && cardData.name}</div>
              {/* <div>{cardData.Qty && cardData.Qty}</div> */}
              <div>{cardData.price && cardData.price}</div>
              <div>{cardData.category && cardData.category}</div>
            </div>
            <div className="d-flex flex-column  rounded-2  bg-light justify-content-center align-items-center">
              <div>
                <span
                  className=" bi  bi-caret-up-fill text-secondary px-2 pointer"
                  onClick={() => handleCount("increase")}
                ></span>
              </div>

              <div className="  text-black fw-bolder">{cartCount}</div>
              <div>
                <span
                  className="  px-2 bi bi-caret-down-fill text-secondary pointer"
                  onClick={() => handleCount("decrease")}
                ></span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 text-center ">{cardData.description}</div>
        <div className="mb-2 pointer d-flex gap-1 ">
          <div className="gap-1">
            <span
              className="bg-warning text-black fw-bolder p-1 px-3 rounded-2 cursor-pointer  "
              onClick={() => cartCount > 0 && handleSaveOrder("pending")}
            >
              {translate("order")}
            </span>
          </div>
          <div className="gap-1">
            <span
              className="bg-success fw-bolder text-white p-1 px-3 rounded-2 cursor-pointer  "
              onClick={() => cartCount > 0 && handleSaveOrder("approved")}
            >
              {translate("approve")}
            </span>
          </div>
          <div className="gap-1">
            <span
              className="bg-primary fw-bolder text-white p-1 px-3 rounded-2 cursor-pointer  "
              onClick={() => cartCount > 0 && handleSaveOrder("confirmed")}
            >
              {translate("confirm")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartsDisplayData;
