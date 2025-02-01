import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../../contexts/AppContext";

const WithdrawForm = ({ oldData = null }) => {
  const { backendUrl, translate, loggedUser } = useAppContext();
  const withdrawRoute = "/withdraw";
  const userRoute = "/user";
  const goodsRoute = "/goods";
  const reasonRoute = "/reason";
  const purchaseRoute = "/purchase";
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [price, setPrice] = useState(0);
  const [withdraw, setWithdraw] = useState({
    customerName: "",
    customerId: "",
    goodsId: "",
    sellerId: "",
    qty: 0,
    reasonId: "",
    sellingPrice: 0,
    // status: "pending",
  });

  const [users, setUsers] = useState([]);
  const [goods, setGoods] = useState([]);
  const [reasons, setReasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maximum, setMaximum] = useState(0);
  const [purchaseData, setPurchaseData] = useState([]);
  const fetchData = async () => {
    try {
      const [usersResponse, goodResponse, reasonsResponse, purchaseResponse] =
        await Promise.all([
          axios.get(`${backendUrl}${userRoute}`),
          axios.get(`${backendUrl}${goodsRoute}`),
          axios.get(`${backendUrl}${reasonRoute}`),
          axios.get(`${backendUrl}${purchaseRoute}`),
        ]);
      const userData = usersResponse.data.data;
      const goodsData = goodResponse.data.data;
      const reasonsData = reasonsResponse.data.data;

      const filteredGoods = goodsData.filter((item) => item.qty > 0);
      setUsers(userData);
      setPurchaseData(purchaseResponse.data.data);
      setGoods(filteredGoods);
      setReasons(reasonsData);
      if (!oldData) {
        setWithdraw({
          ...withdraw,
          customerId: userData[0]._id,
          goodsId: filteredGoods[0]._id,
          reasonId: reasonsData[0]._id,
          sellerId: loggedUser._id,
          sellingPrice: purchaseResponse.data.data[0].sellingPrice,
          customerName: userData[0].name,
        });
        // setUsers([loggedUser]);
      }
      setMaximum(filteredGoods[0].qty);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    // Fetch data for users, goods, and reasons

    fetchData();
    // If oldData exists (update case), pre-fill the form
    if (oldData) {
      setWithdraw(oldData);
    }

    setLoading(false);
  }, [backendUrl, oldData]);
  // console.log(goods);
  useEffect(() => {
    // if (withdraw.goodsId) {
    const selectedGood = goods?.find((item) => item._id === withdraw.goodsId);
    if (selectedGood) {
      setMaximum(selectedGood.qty);
      // }
    }
  }, [withdraw.goodsId, goods]);
  // console.log(maximum);

  useEffect(() => {
    let myreason = reasons.filter((item) => item._id === withdraw.reasonId);

    // console.log(myreason[0]?.name, myreason[0]?.name === "internal use");
    setReason(myreason[0]?.name);
    if (myreason[0]?.name === "internal use") {
      let customersName = users.filter(
        (items) => items._id === withdraw.customerId
      );
      // console.log("name", customersName[0].name);
      setWithdraw({ ...withdraw, customerName: customersName[0]?.name });
    }
    if (myreason[0]?.name === "sale" || myreason[0]?.name === "gift") {
      setWithdraw({ ...withdraw, customerId: loggedUser._id });
      // console.log("loggeduser", loggedUser._id);
    }
  }, [withdraw.customerId, withdraw.reasonId]);
  // console.log(withdraw, name);
  useEffect(() => {
    let newPrice = purchaseData.filter(
      (item) => item.id._id === withdraw.goodsId
    );
    setPrice(newPrice[0]?.sellingPrice);
    setWithdraw({ ...withdraw, sellingPrice: newPrice[0]?.sellingPrice });
    // console.log({ ...withdraw, sellingPrice: newPrice[0]?.sellingPrice });
  }, [withdraw.goodsId]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWithdraw({ ...withdraw, [name]: value });
    // if (e.target.name === "goodsId") {
    //   const maximums = goods.filter((item) => item._id === withdraw.goodsId);
    //   console.log(maximums[0].qty);
    //   setMaximum(maximums[0].qty);
    // }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(withdraw);
    try {
      let response;

      if (oldData) {
        response = await axios.put(
          `${backendUrl}${withdrawRoute}/${withdraw._id}`,
          withdraw
        );
      } else {
        if (withdraw.qty > maximum) {
          alert("goods out of stock");
          return;
        }
        response = await axios.post(
          `${backendUrl}${withdrawRoute}/completeWithdraw`,
          withdraw
        );
      }

      alert(response.data?.message || translate("Operation successful"));
      fetchData();
    } catch (error) {
      alert(error.response?.data?.error || error.message);
      console.log(error);
    }
  };

  if (loading) {
    return <div>{translate("Loading...")}</div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center w-100 mt-2">
      <div>
        <h2 className="text-center">{translate("withdraw")}</h2>
        <form
          className="d-flex  flex-wrap p-2  justify-content-center"
          onSubmit={handleSubmit}
        >
          <div className="form-containers">
            <div className="form-group mb-1">
              <label className="my-2">{translate("Reason")}</label>
              <select
                name="reasonId"
                className="form-control"
                value={withdraw.reasonId || ""}
                onChange={handleChange}
                required
              >
                {/* <option>{translate("Select Reason")}</option> */}
                {oldData && (
                  <option value={withdraw?.reasonId?._Id}>
                    {withdraw?.reasonId?.name}
                  </option>
                )}
                {reasons?.map((reason) => (
                  <option key={reason._id} value={reason._id}>
                    {reason.name}
                  </option>
                ))}
              </select>
            </div>
            {reason === "internal use" && (
              <div className="form-group mb-1">
                <label className="my-2">{translate("Customer Id")}</label>
                <select
                  name="customerId"
                  className="form-control"
                  value={withdraw.customerId || ""}
                  onChange={handleChange}
                  required
                >
                  {/* <option>{translate("Select Customer")}</option> */}
                  {oldData && (
                    <option value={withdraw?.customerId?._Id}>
                      {withdraw?.customerId?.name}
                    </option>
                  )}
                  {users?.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.id} {user.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {reason !== "internal use" && (
              <div className="form-group mb-1">
                <label className="my-2">{translate("Customer Name")}</label>
                <input
                  type="text"
                  name="customerName"
                  className="form-control"
                  value={withdraw.customerName || ""}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="form-group mb-1">
              <label className="my-2">{translate("Goods")}</label>
              <select
                name="goodsId"
                className="form-control"
                value={withdraw.goodsId || ""}
                onChange={handleChange}
                required
              >
                {/* <option>{translate("Select Goods")}</option> */}
                {oldData && (
                  <option value={withdraw?.goodsId?._Id}>
                    {withdraw?.goodsId?.name}
                  </option>
                )}
                {goods?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="my-2 ">{price} birr</label>
              <div className="form-group mb-1">
                <label className="my-2">{translate("Price")}</label>
                <input
                  type="text"
                  name="sellingPrice"
                  className="form-control"
                  value={withdraw.sellingPrice || 0}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* <div className="form-group mb-1">
              <label className="my-2">{translate("Seller")}</label>
              <select
                name="sellerId"
                className="form-control"
                value={withdraw.sellerId}
                onChange={handleChange}
                required
              >
              
                {oldData && (
                  <option value={withdraw?.sellerId?._Id}>
                    {withdraw?.sellerId?.name}
                  </option>
                )}
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div> */}

            <div className="form-group mb-1">
              <label className="my-2">{translate("Quantity")}</label>
              <input
                type="number"
                name="qty"
                className="form-control"
                value={withdraw.qty || 0}
                max={maximum}
                min={1}
                onChange={handleChange}
                required
              />
            </div>

            {/* <div className="form-group mb-1">
              <label className="my-2">{translate("Status")}</label>
              <select
                name="status"
                className="form-control"
                value={withdraw.status}
                onChange={handleChange}
              >
                <option value="pending">{translate("Pending")}</option>
                <option value="approved">{translate("Approved")}</option>
                <option value="rejected">{translate("Rejected")}</option>
              </select>
            </div> */}

            <button type="submit" className="btn btn-primary my-2 w-100">
              {translate("save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithdrawForm;
