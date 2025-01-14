import React, { useState } from "react";
import { useAppContext } from "../../contexts/AppContext";

function GoodsDisplayCard({ cardData, handleAddToCart }) {
  const [count, setCount] = useState(0);
  const { translate } = useAppContext();
  const Birr = "Birr";
  const handleCount = (operator) => {
    // Instead of directly modifying `newCount`, we properly use `setCount`
    setCount((prevCount) => {
      if (operator === "decrease" && prevCount > 0) {
        return prevCount - 1;
      } else if (operator === "increase") {
        return prevCount + 1;
      }
      return prevCount;
    });
  };
  return (
    <div className="card-container">
      <div className="goods-container ">
        <div className="goods-img-container">
          <img src={cardData.photo && cardData.photo} alt="goods"></img>
        </div>
        <div className="d-flex justify-content-between  align-items-center gap-4 text-content">
          <div className="d-flex flex-column ">
            <div className="word-wrap">{cardData.name && cardData.name}</div>
            <div>{cardData.Qty && cardData.Qty}</div>
            <div>
              <span className="d-flex">
                {cardData.price && `${cardData.price}`}
              </span>
            </div>
            <div>{cardData.category && cardData.category}</div>
          </div>
          <div className="d-flex flex-column  rounded-2  bg-light justify-content-center align-items-center">
            <div>
              <span
                className=" bi  bi-caret-up-fill text-secondary px-2 pointer"
                onClick={() => handleCount("increase")}
              ></span>
            </div>

            <div className="  text-black fw-bolder">{count}</div>
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
      <div className="mb-2 pointer ">
        <span
          className="bg-warning text-dark fw-bolder p-1 px-3 rounded-2 cursor-pointer  "
          onClick={() =>
            count > 0 &&
            handleAddToCart({
              photo: cardData.photo,
              Qty: count,
              name: cardData.name,
            })
          }
        >
          {translate("add to cart")}
        </span>
      </div>
    </div>
  );
}

export default GoodsDisplayCard;
