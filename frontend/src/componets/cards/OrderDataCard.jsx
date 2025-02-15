import React, { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { Modal, Button } from "react-bootstrap";

import axios from "axios";

function OrderDataCard({
  name,
  qty,
  goodsId,
  fullWithdrawData,
  onFilter,
  customersPhoto,
  description,
  userId,
  max,
}) {
  const [photoData, setPhotoData] = useState(fullWithdrawData.goodsId);
  const [orderCount, setOrderCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState("");
  const [responseRerunError, serResponseError] = useState("");
  const [usersList, setUsersList] = useState([]);
  const { backendUrl, loggedUser, translate, darkmode, defaultBackground } =
    useAppContext();
  useEffect(() => {
    // axios.get(`${backendUrl}${"/goods"}/${goodsId._id}`).then((response) => {
    //   setPhotoData(response.data.data);
    // });
    axios.get(`${backendUrl}${"/user"}`).then((response) => {
      // setUsersList(response?.data?.data);
      setUsersList(
        response?.data?.data.filter(
          (items) => items._id !== fullWithdrawData.customerId._id
        )
      );
      setUser(response?.data?.data[0]?._id);
    });
    setOrderCount(fullWithdrawData.qty);
  }, [fullWithdrawData]);
  const returnName = (id) => {
    const customerName = usersList.find((item) => {
      return item._id === id;
    });

    return customerName.name;
  };
  // console.log(fullWithdrawData, "goods information");
  // console.log(loggedUser);
  const handleApprove = async () => {
    try {
      // Admin approves a pending withdrawal request by updating status to 'approved'
      const response = await axios.put(
        `${backendUrl}/withdraw/approve/${fullWithdrawData._id}`,
        {
          sellerId: loggedUser._id,
          qty: orderCount,
        }
      );
      // console.log("Withdraw approved:", response.data);

      onFilter();
    } catch (error) {
      console.error("Error approving withdraw:", error);
    }
  };
  const handleCount = (operator) => {
    setOrderCount((prevCount) => {
      if (operator === "decrease" && prevCount > 0) {
        return prevCount - 1;
      } else if (operator === "increase" && orderCount < max) {
        return prevCount + 1;
      }
      return prevCount;
    });
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
          returnedBy: fullWithdrawData.customerId._id,
          reason: "returned with damage",
        }
      );
      onFilter();
      // console.log("return successfully ", response.data);
    } catch (error) {
      console.error("Error returning:", error);
    }
  };
  const handleTransfer = () => {
    const customerName = returnName(user);
    const transferedData = {
      customerName: customerName,
      customerId: user,
      goodsId: fullWithdrawData.goodsId._id,
      sellerId: loggedUser._id,
      qty: qty,
      reasonId: fullWithdrawData.reasonId._id,
      sellingPrice: fullWithdrawData.sellingPrice,
      isConfirmed: false,
    };
    const returnOiginal = async () => {
      try {
        const response = await axios.post(
          `${backendUrl}/withdraw/return`,

          {
            withdrawId: fullWithdrawData._id,
            returnedQty: qty,
            returnedBy: fullWithdrawData.customerId._id,
            reason: "returned with out damage",
          }
        );
        // onFilter();
        // console.log("return successfully ", response.data);
      } catch (error) {
        console.error("Error returning:", error);
      }
    };
    returnOiginal();
    const transfer = async () => {
      try {
        const response = await axios.post(
          `${backendUrl}/withdraw/completeWithdraw`,

          transferedData
        );
        alert("Transfered successfully!");
        onFilter();
      } catch (error) {
        console.error("Error returning:", error);
      }
    };
    transfer();
  };
  const handleWithdrawDelete = async () => {
    const permission = window.confirm(
      "are you sure you want to delete your order"
    );
    if (permission) {
      try {
        const response = await axios.delete(
          `${backendUrl}/withdraw/${fullWithdrawData._id}`
        );
        console.log(response?.data?.message);
        onFilter();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleModalClose = () => setShowModal(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };
  return (
    <div className={`d-flex flex-wrap w-100`}>
      <div className=" p-2 w-100 justify-content-center   ">
        <div className="d-flex w-100 justify-content-between gap-1 ">
          <div className="d-flex justify-content-between gap-2  p-2   w-100">
            <div className="d-flex flex-wrap">
              <div>
                {photoData ? (
                  <img
                    className="me-2"
                    style={{ height: "60px", width: "auto" }}
                    src={`${backendUrl}/${photoData.photo[0]}`}
                    alt="orders"
                  ></img>
                ) : (
                  <span className="bi bi-house-fill fw-bold fs-2"></span>
                )}
              </div>
              <div className="d-flex flex-column align-items-center">
                <div className="d-flex flex-wrap">{name}</div>
                <div className="text-success fw-bold fs-4 ">{qty}</div>

                {/* <div className="d-flex flex-wrap">{fullWithdrawData?.roleId?.name}</div> */}
              </div>
            </div>
            {!fullWithdrawData.isApproved && (
              <div
                className={` ${defaultBackground} d-flex flex-column rounded-2  justify-content-center align-items-center`}
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
                    value={orderCount}
                    onChange={(e) =>
                      setOrderCount(e.target.value < max ? e.target.value : max)
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
            )}
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
        </div>
        <div className="my-1 w-100 text-center">
          {description && description}
        </div>
        {loggedUser.isAdmin && (
          <div className="d-flex gap-2 align-items-center my-2">
            <div>
              <img
                className="profile-photo"
                style={{ height: "50px", width: "auto" }}
                alt="customer"
                src={`${backendUrl}/${customersPhoto && customersPhoto}`}
              ></img>
            </div>
            <div className="d-flex flex-wrap my-1">
              {translate(fullWithdrawData.customerName)}
            </div>
          </div>
        )}
        <div className="d-flex gap-1 justify-content-center align-items-center ">
          {!fullWithdrawData.isApproved &&
            (loggedUser.isAdmin ||
              loggedUser.roleName.name.toLowerCase() === "supper admin" ||
              loggedUser.roleName.name.toLowerCase() === "store manager") && (
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
            (loggedUser.isAdmin || loggedUser.roleName === "store keeper") && (
              <div className="gap-1">
                <span
                  className="bg-warning  pointer  p-1 px-3 rounded-2 cursor-pointer"
                  onClick={handleReturn}
                >
                  {translate("return")}
                </span>
              </div>
            )}
          {fullWithdrawData.isConfirmed &&
            !fullWithdrawData.returned &&
            (loggedUser.isAdmin ||
              loggedUser?.roleName?.name?.toLowerCase() ===
                "store manager") && (
              <div className="gap-1">
                <span
                  className="bg-primary  text-white pointer  p-1 px-3 rounded-2 cursor-pointer"
                  onClick={handleModalOpen}
                >
                  {translate("transfer")}
                </span>
              </div>
            )}
          {fullWithdrawData.isPending &&
            !fullWithdrawData.isApproved &&
            !fullWithdrawData.isConfirmed &&
            !fullWithdrawData.returned &&
            (loggedUser.isAdmin ||
              loggedUser._id === fullWithdrawData.customerId._id) && (
              <div className="gap-1 ">
                <span
                  className="bi bi-x bg-danger text-white pointer     fs-4 rounded-2 cursor-pointer"
                  onClick={handleWithdrawDelete}
                ></span>
              </div>
            )}

          {fullWithdrawData.isPending &&
            fullWithdrawData.isApproved &&
            !fullWithdrawData.isConfirmed &&
            !fullWithdrawData.returned &&
            (loggedUser.isAdmin ||
              loggedUser?.roleName?.name?.toLowerCase() ===
                "store manager") && (
              <div className="gap-1 ">
                <span
                  className="bi bi-x bg-danger text-white pointer     fs-4 rounded-2 cursor-pointer"
                  onClick={handleWithdrawDelete}
                ></span>
              </div>
            )}
          {fullWithdrawData.isPending &&
            fullWithdrawData.isApproved &&
            fullWithdrawData.isConfirmed &&
            !fullWithdrawData.returned &&
            (loggedUser.isAdmin ||
              loggedUser?.roleName?.name?.toLowerCase() ===
                "store manager") && (
              <div className="gap-1 ">
                <span
                  className="bi bi-x bg-danger text-white pointer     fs-4 rounded-2 cursor-pointer"
                  onClick={handleWithdrawDelete}
                ></span>
              </div>
            )}
          {fullWithdrawData.returned && loggedUser.isAdmin && (
            <div className="gap-1 ">
              <span
                className="bi bi-x bg-danger text-white pointer     fs-4 rounded-2 cursor-pointer"
                onClick={handleWithdrawDelete}
              ></span>
            </div>
          )}
        </div>
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{translate("Transfer Items")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-1 gap-2">
            <label className="my-2">
              {translate("Select user to transfer")}
            </label>
            <select
              name="user"
              className="form-control mb-3"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              // required
            >
              {usersList?.map((userinfo) => (
                <option key={userinfo._id} value={userinfo._id}>
                  {userinfo.id} {userinfo.name}
                </option>
              ))}
            </select>
            <Button variant="primary" onClick={handleTransfer}>
              {translate("transfer")}
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default OrderDataCard;
