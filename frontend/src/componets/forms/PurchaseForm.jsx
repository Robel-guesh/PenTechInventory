import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../../contexts/AppContext";

const PurchaseForm = ({ oldData = null, onSave }) => {
  const { backendUrl, translate, loggedUser } = useAppContext();
  const purchaseRoute = "/purchase";
  const storeRoute = "/store";
  const userRoute = "/user";
  const supplierRoute = "/supplier";
  const statusRoute = "/status";
  const typeRoute = "/type";
  const goodsRoute = "/goods";

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
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data for stores, users, suppliers, statuses, types, and goods
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storeRes, userRes, supplierRes, statusRes, typeRes, goodsRes] =
          await Promise.all([
            axios.get(`${backendUrl}${storeRoute}`),
            axios.get(`${backendUrl}${userRoute}`),
            axios.get(`${backendUrl}${supplierRoute}`),
            axios.get(`${backendUrl}${statusRoute}`),
            axios.get(`${backendUrl}${typeRoute}`),
            axios.get(`${backendUrl}${goodsRoute}`),
          ]);

        setStores(storeRes.data.data);
        setUsers(userRes.data.data);
        setSuppliers(supplierRes.data.data);
        setStatuses(statusRes.data.data);
        setTypes(typeRes.data.data);
        setGoods(goodsRes.data.data);

        // If oldData is not available, pre-select the first item in each list for new entry
        if (!oldData) {
          setPurchase((prevPurchase) => ({
            ...prevPurchase,
            storeLocationId: storeRes.data.data[0]?._id || "",
            // userId: userRes.data.data[0]?._id || "",
            userId: loggedUser._id || "",
            supplierId: supplierRes.data.data[0]?._id || "",
            goodsStatusId: statusRes.data.data[0]?._id || "",
            typeId: typeRes.data.data[0]?._id || "",
            id: goodsRes.data.data[0]?._id || "",
          }));
        }
        // setPurchase((prevPurchase) => ({
        //   ...prevPurchase,
        //   userId: loggedUser._id,
        // }));
      } catch (err) {
        setError("Error loading data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [backendUrl, oldData]);
  console.log(purchase);
  useEffect(() => {
    if (oldData) {
      setPurchase(oldData); // Prefill the form with the old data if updating
    }
  }, [oldData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPurchase({ ...purchase, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (
      purchase.qty <= 0 ||
      purchase.unitPrice <= 0 ||
      purchase.sellingPrice <= 0
    ) {
      alert(translate("Please enter valid values for all fields"));
      return;
    }

    try {
      let response;
      // console.log(purchase);
      if (oldData) {
        response = await axios.put(
          `${backendUrl}${purchaseRoute}/${purchase._id}`,
          purchase
        );
      } else {
        response = await axios.post(`${backendUrl}${purchaseRoute}`, purchase);
      }

      alert(response.data?.message);
      setPurchase({
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
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
    onSave();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <div>
        <h2 className="text-center">
          {translate(oldData ? "Update Purchase" : "Create Purchase")}
        </h2>
        <form
          className="d-flex flex-wrap p-2 gap-3 justify-content-center"
          onSubmit={handleSubmit}
        >
          <div className="form-containers">
            <div className="form-group mb-1">
              <label className="my-2">{translate("Goods ID")}</label>
              <select
                name="id"
                className="form-control"
                value={purchase.id}
                onChange={handleChange}
                required
              >
                {/* <option>{translate("Select Goods")}</option> */}
                <option value={purchase.id._id}>{purchase.id.name}</option>
                {goods.map((good) => (
                  <option key={good._id} value={good._id}>
                    {good.name}
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
                {/* <option>{translate("Select Store Location")}</option> */}
                <option value={purchase.storeLocationId._id}>
                  {purchase.storeLocationId.name}
                </option>
                {stores.map((store) => (
                  <option key={store._id} value={store._id}>
                    {store.name}
                  </option>
                ))}
              </select>
            </div>

            {oldData && (
              <div className="form-group mb-1">
                <label className="my-2">{translate("User")}</label>
                <select
                  name="userId"
                  className="form-control"
                  value={purchase.userId}
                  onChange={handleChange}
                >
                  {/* <option>{translate("Select User")}</option> */}
                  <option value={purchase?.userId?._id}>
                    {purchase?.userId?.name}
                  </option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="form-group mb-1">
              <label className="my-2">{translate("Supplier")}</label>
              <select
                name="supplierId"
                className="form-control"
                value={purchase?.supplierId}
                onChange={handleChange}
              >
                {/* <option>{translate("Select Supplier")}</option> */}
                <option value={purchase?.supplierId?._id}>
                  {purchase?.supplierId?.name}
                </option>
                {suppliers.map((supplier) => (
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
                {/* <option>{translate("Select Goods Status")}</option> */}
                <option value={purchase?.goodsStatusId?._id}>
                  {purchase?.goodsStatusId?.name}
                </option>
                {statuses.map((status) => (
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
                {/* <option>{translate("Select Type")}</option> */}
                <option value={purchase?.typeId?._id}>
                  {purchase?.typeId?.name}
                </option>
                {types.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary my-2 w-100">
              {translate(oldData ? "Update Purchase" : "Create Purchase")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseForm;
