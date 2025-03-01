import React, { useState, useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";
import axios from "axios";

function GoodsDisplayCard({
  cardData,
  handleAddToCart,
  quantityDatas,
  onFilter,
}) {
  const [count, setCount] = useState(0);
  const [priceData, setPriceData] = useState([]);
  const { translate, backendUrl, loggedUser, defaultBackground } =
    useAppContext();

  const Birr = "Birr";
  const [reason, setReason] = useState([]);
  useEffect(() => {
    const fetchReason = async () => {
      try {
        // Admin approves a pending withdrawal request by updating status to 'approved'
        const response = await axios.get(`${backendUrl}/reason`);

        // Update the status to approved for UI
        setReason(response.data.data);
      } catch (error) {
        console.error("Error getting data", error);
      }
    };
    const fetchPrice = async () => {
      try {
        // Admin approves a pending withdrawal request by updating status to 'approved'
        const response = await axios.get(`${backendUrl}/purchase`);

        // Update the status to approved for UI
        setPriceData(response.data.data);
      } catch (error) {
        console.error("Error getting data", error);
      }
    };
    fetchReason();
    fetchPrice();
  }, [backendUrl]);

  const returnPrice = (id) => {
    const filteredPrice = priceData.find((item) => {
      return item.id._id === id;
    });

    return filteredPrice?.sellingPrice;
  };

  const filterReason = () => {
    const item = reason.find((data) => data.name === "internal use");
    // console.log(item);
    if (item) {
      return item._id;
    }
  };
  // Handle creating the withdraw request (for the user)
  const handleSaveOrder = async () => {
    if (count <= 0) return;

    try {
      const withdrawData = {
        customerName: loggedUser.name,
        customerId: loggedUser._id,
        goodsId: cardData?._id,
        sellerId: loggedUser._id,
        qty: count,
        reasonId: filterReason(),
        status: "pending",
        sellingPrice: returnPrice(cardData?._id),
        date: new Date(),
      };

      const response = await axios.post(
        `${backendUrl}/withdraw/create`,
        withdrawData
      );
      alert(response?.data?.message);
      onFilter();
    } catch (error) {
      console.error("Error creating withdraw:", error.message);
    }
  };
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
            {/* <div>
              <div>{cardData?.qty && cardData.qty} </div>
              {cardData?.qty <= 0 ? (
                <span className="text-danger fw-bold">Out of Stock</span>
              ) : cardData?.qty <= cardData?.shortageLevel ? (
                <span className="text-warning fw-bold">Critical</span>
              ) : cardData?.qty > cardData?.shortageLevel ? (
                <span className="text-success fw-bold">In Stock</span>
              ) : null}
            </div> */}
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

            {/* <div>
              <span className="d-flex">
                {quantityDatas.sellingPrice
                  ? `${quantityDatas.sellingPrice} ${translate("birr")}`
                  : null}
              </span>
            </div> */}
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
          <div
            className={`${defaultBackground} d-flex flex-column  rounded-2   justify-content-center align-items-center`}
          >
            <div>
              <span
                className=" bi  bi-caret-up-fill text-primary px-2 pointer"
                onClick={() => handleCount("increase", cardData?.qty)}
                // onClick={() => handleCount("increase", quantityDatas?.qty)}
              ></span>
            </div>

            <div className="  text-black fw-bolder">
              {" "}
              <input
                type="text"
                // className="borderless small-input"
                className={`${defaultBackground} borderless small-input`}
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
                className="  px-2 bi bi-caret-down-fill text-primary pointer"
                onClick={() => handleCount("decrease", cardData.qty)}
              ></span>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-100 text-center ">{cardData.id?.description}</div> */}
      <div className="w-100 text-center ">{cardData.description}</div>

      <div className="my-2 pointer w-100 d-flex justify-content-center gap-2 align-items-center">
        {/* <span
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
          {/* <span className="bi bi-cart pe-1"></span> */}
        {/* {translate("Add Item")} */}
        {/* Add Item */}
        {/* </span> */}

        <span
          className="bg-primary text-white fw-bolder p-1 px-3 rounded-2 cursor-pointer  "
          onClick={handleSaveOrder}
        >
          {translate("order")}
        </span>
      </div>
    </div>
  );
}

export default GoodsDisplayCard;
