import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../../contexts/AppContext";

const PurchaseForm = () => {
  const { backendUrl, translate } = useAppContext();
  const purchaseRoute = "/purchase";
  const storeRoute = "/store";
  const userRoute = "/user";
  const supplierRoute = "/supplier";
  const statusRoute = "/status";
  const typeRoute = "/type";

  const [purchase, setPurchase] = useState({
    id: "",
    qty: 0,
    unitPrice: 0,
    sellingPrice: 0,
    storeLocationId: "",
    userId: "",
    supplierId: "",
    goodsStatusId: "",
    typeId: "",
  });

  const [stores, setStores] = useState([]);
  const [users, setUsers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios.get(`${backendUrl}${storeRoute}`).then((response) => {
      setStores(response.data.data);
    });
    axios.get(`${backendUrl}${userRoute}`).then((response) => {
      setUsers(response.data.data);
    });
    axios.get(`${backendUrl}${supplierRoute}`).then((response) => {
      setSuppliers(response.data.data);
    });
    axios.get(`${backendUrl}${statusRoute}`).then((response) => {
      setStatuses(response.data.data);
    });
    axios.get(`${backendUrl}${typeRoute}`).then((response) => {
      setTypes(response.data.data);
    });
  }, [backendUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPurchase({ ...purchase, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendUrl}${purchaseRoute}`,
        purchase
      );
      alert(response.data?.message);
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <div>
        <h2 className="text-center">{translate("Create Purchase")}</h2>
        <form
          className="d-flex flex-wrap p-2 gap-3 justify-content-center"
          onSubmit={handleSubmit}
        >
          <div className="form-containers">
            <div className="form-group mb-1">
              <label className="my-2">{translate("Purchase ID")}</label>
              <input
                type="text"
                name="id"
                className="form-control"
                value={purchase.id}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Quantity")}</label>
              <input
                type="number"
                name="qty"
                className="form-control"
                value={purchase.qty}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Unit Price")}</label>
              <input
                type="number"
                name="unitPrice"
                className="form-control"
                value={purchase.unitPrice}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Selling Price")}</label>
              <input
                type="number"
                name="sellingPrice"
                className="form-control"
                value={purchase.sellingPrice}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-containers">
            <div className="form-group mb-1">
              <label className="my-2">{translate("Store Location")}</label>
              <select
                name="storeLocationId"
                className="form-control"
                value={purchase.storeLocationId}
                onChange={handleChange}
              >
                <option>{translate("Select Store Location")}</option>
                {stores &&
                  stores.map((store) => (
                    <option key={store._id} value={store._id}>
                      {store.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("User")}</label>
              <select
                name="userId"
                className="form-control"
                value={purchase.userId}
                onChange={handleChange}
              >
                <option>{translate("Select User")}</option>
                {users &&
                  users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Supplier")}</label>
              <select
                name="supplierId"
                className="form-control"
                value={purchase.supplierId}
                onChange={handleChange}
              >
                <option>{translate("Select Supplier")}</option>
                {suppliers &&
                  suppliers.map((supplier) => (
                    <option key={supplier._id} value={supplier._id}>
                      {supplier.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Goods Status")}</label>
              <select
                name="goodsStatusId"
                className="form-control"
                value={purchase.goodsStatusId}
                onChange={handleChange}
              >
                <option>{translate("Select Goods Status")}</option>
                {statuses &&
                  statuses.map((status) => (
                    <option key={status._id} value={status._id}>
                      {status.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Type")}</label>
              <select
                name="typeId"
                className="form-control"
                value={purchase.typeId}
                onChange={handleChange}
              >
                <option>{translate("Select Type")}</option>
                {types &&
                  types.map((type) => (
                    <option key={type._id} value={type._id}>
                      {type.name}
                    </option>
                  ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary my-2 w-100">
              {translate("Create Purchase")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseForm;
