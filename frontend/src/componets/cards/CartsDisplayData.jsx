import React, { useState, useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";
import axios from "axios";

function CartsDisplayData({ cardData, onClose, onFilter }) {
  const [cartCount, setCartCount] = useState(0);
  const [withdrawStatus, setWithdrawStatus] = useState("pending");
  const { translate, backendUrl, loggedUser, defaultBackground, setTotalCart } =
    useAppContext();
  const [reason, setReason] = useState([]);
  useEffect(() => {
    setCartCount(cardData.Qty || 0);
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
    fetchReason();
  }, [cardData.Qty, backendUrl]);
  // console.log("cartdata", cardData);
  const handleCount = (operator) => {
    setCartCount((prevCount) => {
      if (operator === "decrease" && prevCount > 0) {
        return prevCount - 1;
      } else if (operator === "increase" && prevCount < cardData.maximum) {
        return prevCount + 1;
      }
      return prevCount;
    });
  };
  const filterReason = () => {
    const item = reason.find((data) => data.name === "internal use");
    // console.log(item);
    if (item) {
      return item._id;
    }
  };
  // Handle creating the withdraw request (for the user)
  const handleSaveOrder = async (status) => {
    if (cartCount <= 0) return;

    try {
      const withdrawData = {
        customerName: loggedUser.name, //user.name, // Using logged-in user info
        customerId: loggedUser._id, //user._id,
        goodsId: cardData?._id,
        sellerId: loggedUser._id, //user._id, // Assuming the seller is the current user
        qty: cartCount,
        reasonId: filterReason(), // cardData.reasonId
        status: status,
        sellingPrice: cardData.unitPrice,
        date: new Date(),
      };
      // setTotalCart(cardData.length);

      // Make a request to create the withdraw request with isPending: true
      const response = await axios.post(
        `${backendUrl}/withdraw/create`,
        withdrawData
      );
      // console.log("Withdraw created:", response.data);
      // console.log("withdrawfunciton", onFilter);
      onFilter();
      // After creating the order, set status to pending
      setWithdrawStatus("pending");
      // window.location.reload();
    } catch (error) {
      console.error("Error creating withdraw:", error.message);
    }
  };

  // Handle Admin Approve action (Approve pending withdrawals)
  const handleApprove = async (withdrawId) => {
    try {
      // Admin approves a pending withdrawal request by updating status to 'approved'
      const response = await axios.patch(`${backendUrl}/withdraw/approve`, {
        withdrawId,
      });
      console.log("Withdraw approved:", response.data);

      // Update the status to approved for UI
      setWithdrawStatus("approved");
    } catch (error) {
      console.error("Error approving withdraw:", error);
    }
  };

  // Handle Confirm action (For the user confirming their own withdrawal request)
  const handleConfirm = async () => {
    if (withdrawStatus !== "approved") return; // User can only confirm if the status is approved

    try {
      const response = await axios.patch(`${backendUrl}/withdraw/confirm`, {
        // status: "confirmed",
        withdrawId: cardData._id,
      });
      console.log("Withdraw confirmed:", response.data);

      // After confirming, set status to confirmed
      setWithdrawStatus("confirmed");

      // Optionally: Update the quantity of goods in the inventory after confirmation
      // await axios.patch(`${backendUrl}/goods/update-qty`, {
      //   goodsId: cardData._id,
      //   qty: cartCount,
      // });
    } catch (error) {
      console.error("Error confirming withdraw:", error);
    }
  };

  // Check if the confirm button should be enabled (based on the withdrawStatus)
  const isConfirmEnabled = withdrawStatus === "approved";

  return (
    <div>
      <div className="card-container">
        <button
          className="btn-close bg-danger "
          onClick={onClose} // Trigger the onClose function passed as a prop
        ></button>
        <div className="goods-container">
          <div className="goods-img-container">
            <img
              src={cardData.photo && `${backendUrl}/${cardData.photo}`}
              alt="goods"
            />
          </div>
          <div className="d-flex justify-content-between align-items-center gap-4 text-content">
            <div className="d-flex flex-column">
              <div className="word-wrap">{cardData.name && cardData.name}</div>
              <div>
                <span className="d-flex">
                  {cardData.unitPrice
                    ? `${cardData.unitPrice} ${translate("birr")}`
                    : null}
                </span>
              </div>
              <div>{cardData.category && cardData.category}</div>
            </div>
            <div
              className={`${defaultBackground} d-flex flex-column rounded-2  justify-content-center align-items-center`}
            >
              <div>
                <span
                  className="bi bi-caret-up-fill text-primary px-2 pointer"
                  onClick={() => handleCount("increase")}
                ></span>
              </div>

              <div className="text-black fw-bolder">
                <input
                  type="text"
                  className={`${defaultBackground} borderless small-input`}
                  value={cartCount}
                  onChange={(e) =>
                    setCartCount(
                      e.target.value < cardData.Qty
                        ? e.target.value
                        : cardData.Qty
                    )
                  }
                />
              </div>
              <div>
                <span
                  className="px-2 bi bi-caret-down-fill text-primary pointer"
                  onClick={() => handleCount("decrease")}
                ></span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 text-center">{cardData.description}</div>
        <div className="mb-2 pointer d-flex gap-1">
          <div className="gap-1">
            <span
              className="bg-warning text-black fw-bolder p-1 px-3 rounded-2 cursor-pointer"
              onClick={() => {
                handleSaveOrder("pending"), onClose();
              }}
              disabled={cartCount <= 0}
            >
              {translate("order")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartsDisplayData;
