import React, { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import axios from "axios";

function OrderDataCard({
  name,
  qty,
  goodsId,
  fullWithdrawData,
  onFilter,
  customersPhoto,
  userId,
}) {
  const [photoData, setPhotoData] = useState("");
  const { backendUrl, loggedUser, translate } = useAppContext();
  useEffect(() => {
    axios.get(`${backendUrl}${"/goods"}/${goodsId}`).then((response) => {
      setPhotoData(response.data.data);
    });
  }, [backendUrl]);

  const handleApprove = async () => {
    try {
      // Admin approves a pending withdrawal request by updating status to 'approved'
      const response = await axios.put(
        `${backendUrl}/withdraw/approve/${fullWithdrawData._id}`,
        {
          sellerId: loggedUser._id,
        }
      );
      // console.log("Withdraw approved:", response.data);

      onFilter();
    } catch (error) {
      console.error("Error approving withdraw:", error);
    }
  };

  const handleConfirm = async () => {
    // console.log("id", fullWithdrawData._id);
    if (!fullWithdrawData.isApproved) return;

    try {
      const response = await axios.put(
        `${backendUrl}/withdraw/confirm/${fullWithdrawData._id}`,
        {
          customerId: loggedUser._id,
        }
      );
      // setWithdrawData((prevWithdrawData) =>
      //   prevWithdrawData.map((data) =>
      //     data._id === withdrawId ? { ...data, isConfirmed: true } : data
      //   )
      // );
      onFilter();
      // console.log("Withdraw confirmed:", response.data.message);
    } catch (error) {
      console.error(
        "Error confirming withdraw:",
        error?.response?.data?.message
      );
    }
  };
  //   console.log(photoData);
  const handleReturn = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/withdraw/return`,

        {
          withdrawId: fullWithdrawData._id,
          returnedQty: qty,
          returnedBy: fullWithdrawData.customerId,
          reason: "over Stock",
        }
      );
      onFilter();
      // console.log("return successfully ", response.data);
    } catch (error) {
      console.error("Error returning:", error);
    }
  };
  return (
    <div className="d-flex flex-wrap ">
      <div className=" p-2  w-100 justify-content-center align-items-center">
        <div className="d-flex w-100 justify-content-between m-1 gap-1">
          <div className="d-flex gap-2">
            <div>
              {photoData ? (
                <img
                  className="me-2"
                  style={{ height: "50px", width: "auto" }}
                  src={`${backendUrl}/${photoData.photo[0]}`}
                  alt="orders"
                ></img>
              ) : (
                <span className="bi bi-house-fill fw-bols fs-2"></span>
              )}
            </div>
            <div>
              <div className="d-flex flex-wrap">{name}</div>
              <div className="text-success fw-bold">{qty}</div>
              {loggedUser.isAdmin && (
                <div className="d-flex flex-wrap">
                  {translate("ordered by")} : {fullWithdrawData.customerName}
                </div>
              )}
              {/* <div className="d-flex flex-wrap">{fullWithdrawData?.roleId?.name}</div> */}
            </div>
          </div>
          {/* <div>
            <img
              className="profile-photo"
              alt="customer"
              src={`${backendUrl}/${
                fullWithdrawData?.photo && fullWithdrawData?.photo[0]
              }`}
            ></img>
          </div> */}
          <div>
            <img
              className="profile-photo"
              alt="customer"
              src={`${backendUrl}/${customersPhoto && customersPhoto}`}
            ></img>
          </div>
        </div>
        <div className="d-flex gap-1">
          {!fullWithdrawData.isApproved && loggedUser.isAdmin && (
            <div className="gap-1">
              <span
                className="bg-success pointer text-white p-1 px-2 rounded-2 cursor-pointer"
                onClick={handleApprove}
              >
                {translate("approve")}
              </span>
            </div>
          )}

          {fullWithdrawData.customerId._id === loggedUser._id &&
            fullWithdrawData.isApproved &&
            !fullWithdrawData.isConfirmed && (
              <div className="gap-1">
                <span
                  className="bg-primary  pointer text-white p-1 px-3 rounded-2 cursor-pointer"
                  onClick={handleConfirm}
                >
                  {translate("confirm")}
                </span>
              </div>
            )}
          {fullWithdrawData.isConfirmed &&
            !fullWithdrawData.returned &&
            loggedUser.isAdmin && (
              <div className="gap-1">
                <span
                  className="bg-warning  pointer  p-1 px-3 rounded-2 cursor-pointer"
                  onClick={handleReturn}
                >
                  {translate("return")}
                </span>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default OrderDataCard;
