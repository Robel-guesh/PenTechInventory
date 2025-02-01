import React, { useState } from "react";
import { useAppContext } from "../../contexts/AppContext";

function GoodsDisplayCard({ cardData, handleAddToCart, quantityDatas }) {
  const [count, setCount] = useState(0);
  const { translate, backendUrl, loggedUser } = useAppContext();

  const Birr = "Birr";

  const handleCount = (operator, maxAmount) => {
    // Instead of directly modifying `newCount`, we properly use `setCount`

    setCount((prevCount) => {
      if (operator === "decrease" && prevCount > 0) {
        return Number(prevCount) - 1;
      } else if (operator === "increase" && prevCount < maxAmount) {
        return Number(prevCount) + 1;
      }
      return prevCount;
    });
  };
  return (
    <div className="w-100 ">
      <div className="goods-container ">
        <div className="goods-img-container">
          <img
            src={
              cardData?.photo && `${backendUrl}/${cardData?.photo[0]}`
              // cardData?.id?.photo && `${backendUrl}/${cardData?.id?.photo[0]}`
            }
            alt="goods"
          ></img>
        </div>
        <div className="d-flex justify-content-between  align-items-center gap-4 text-content">
          <div className="d-flex flex-column ">
            <div className="word-wrap">
              {cardData?.name}
              {/* {cardData?.id && cardData?.id?.name} */}
            </div>
            {/* <div>{cardData.qty && cardData.qty}</div> */}
            {/* {loggedUser.isAdmin && ( */}
            <div>
              <div>{cardData?.qty && cardData.qty} </div>
              {cardData?.qty <= 0 ? (
                <span className="text-danger fw-bold">Out of Stock</span>
              ) : cardData?.qty <= cardData?.shortageLevel ? (
                <span className="text-warning fw-bold">Critical</span>
              ) : cardData?.qty > cardData?.shortageLevel ? (
                <span className="text-success fw-bold">In Stock</span>
              ) : null}
            </div>
            {/* <div>
              <div>{quantityDatas?.qty && quantityDatas.qty} </div>
              {quantityDatas?.qty <= 0 ? (
                <span className="text-danger fw-bold">Out of Stock</span>
              ) : quantityDatas?.qty <= quantityDatas?.shortageLevel ? (
                <span className="text-warning fw-bold">Critical</span>
              ) : quantityDatas?.qty > quantityDatas?.shortageLevel ? (
                <span className="text-success fw-bold">In Stock</span>
              ) : null}
            </div> */}
            {/* // )} */}

            <div>
              <span className="d-flex">
                {quantityDatas.sellingPrice
                  ? `${quantityDatas.sellingPrice} ${translate("birr")}`
                  : null}
              </span>
            </div>
            {/* <div>
              <span className="d-flex">
                {cardData.sellingPrice
                  ? `${cardData.sellingPrice} ${translate("birr")}`
                  : null}
              </span>
            </div> */}
            {/* <div>{cardData.catagoryId && cardData.catagoryId.name}</div> */}
            <div>{cardData?.catagoryId?.name}</div>
          </div>
          <div className="d-flex flex-column  rounded-2  bg-light justify-content-center align-items-center">
            <div>
              <span
                className=" bi  bi-caret-up-fill text-secondary px-2 pointer"
                onClick={() => handleCount("increase", cardData?.qty)}
                // onClick={() => handleCount("increase", quantityDatas?.qty)}
              ></span>
            </div>

            <div className="  text-black fw-bolder">
              {" "}
              <input
                type="text"
                className="borderless small-input"
                value={count}
                onChange={(e) =>
                  setCount(
                    e.target.value < cardData.qty
                      ? e.target.value
                      : cardData.qty
                  )
                }
              />
            </div>
            <div>
              <span
                className="  px-2 bi bi-caret-down-fill text-secondary pointer"
                onClick={() => handleCount("decrease", cardData.qty)}
              ></span>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-100 text-center ">{cardData.id?.description}</div> */}
      <div className="w-100 text-center ">{cardData.description}</div>

      <div className="my-2 pointer w-100 d-flex justify-content-center">
        <span
          className="bg-warning text-dark fw-bolder p-1 px-3 rounded-2 cursor-pointer  "
          onClick={() =>
            count > 0 &&
            handleAddToCart({
              // photo: cardData.id.photo[0],
              photo: cardData?.photo[0],
              // _id: cardData.id._id,
              _id: cardData._id,

              Qty: count,
              // name: cardData.id.name,
              name: cardData?.name,
              maximum: cardData.qty,
              // category: cardData.catagoryId.name,
              // unitPrice: cardData.unitPrice,
              unitPrice: quantityDatas?.sellingPrice,

              // description: cardData.id?.description,
              description: cardData?.description,
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
