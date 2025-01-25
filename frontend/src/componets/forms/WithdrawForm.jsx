import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../../contexts/AppContext";

const WithdrawForm = () => {
  const { backendUrl, translate } = useAppContext();
  const withdrawRoute = "/withdraw";
  const userRoute = "/user";
  const goodsRoute = "/goods";
  const reasonRoute = "/reason";

  const [withdraw, setWithdraw] = useState({
    customerName: "",
    customerId: "",
    goodsId: "",
    sellerId: "",
    qty: 0,
    reasonId: "",
    status: "pending",
  });

  const [users, setUsers] = useState([]);
  const [goods, setGoods] = useState([]);
  const [reasons, setReasons] = useState([]);

  useEffect(() => {
    // Fetch data for users, goods, and reasons
    axios.get(`${backendUrl}${userRoute}`).then((response) => {
      setUsers(response.data.data);
    });
    axios.get(`${backendUrl}${goodsRoute}`).then((response) => {
      setGoods(response.data.data);
    });
    axios.get(`${backendUrl}${reasonRoute}`).then((response) => {
      setReasons(response.data.data);
    });
  }, [backendUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWithdraw({ ...withdraw, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendUrl}${withdrawRoute}`,
        withdraw
      );
      alert(response.data?.message);
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <div>
        <h2 className="text-center">{translate("Create Withdrawal")}</h2>
        <form
          className="d-flex flex-wrap p-2 gap-3 justify-content-center"
          onSubmit={handleSubmit}
        >
          <div className="form-containers">
            <div className="form-group mb-1">
              <label className="my-2">{translate("Customer Name")}</label>
              <input
                type="text"
                name="customerName"
                className="form-control"
                value={withdraw.customerName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Customer")}</label>
              <select
                name="customerId"
                className="form-control"
                value={withdraw.customerId}
                onChange={handleChange}
                required
              >
                <option>{translate("Select Customer")}</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Goods")}</label>
              <select
                name="goodsId"
                className="form-control"
                value={withdraw.goodsId}
                onChange={handleChange}
                required
              >
                <option>{translate("Select Goods")}</option>
                {goods.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Seller")}</label>
              <select
                name="sellerId"
                className="form-control"
                value={withdraw.sellerId}
                onChange={handleChange}
                required
              >
                <option>{translate("Select Seller")}</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Quantity")}</label>
              <input
                type="number"
                name="qty"
                className="form-control"
                value={withdraw.qty}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Reason")}</label>
              <select
                name="reasonId"
                className="form-control"
                value={withdraw.reasonId}
                onChange={handleChange}
                required
              >
                <option>{translate("Select Reason")}</option>
                {reasons.map((reason) => (
                  <option key={reason._id} value={reason._id}>
                    {reason.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group mb-1">
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
            </div>

            <button type="submit" className="btn btn-primary my-2 w-100">
              {translate("Create Withdrawal")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithdrawForm;
