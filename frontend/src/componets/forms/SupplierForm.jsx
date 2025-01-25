import React, { useState } from "react";
import axios from "axios";
import { useAppContext } from "../../contexts/AppContext";

const SupplierForm = () => {
  const { backendUrl, translate } = useAppContext();
  const supplierRoute = "/supplier";

  const [supplier, setSupplier] = useState({
    name: "",
    invoiceNumber: "",
    mobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendUrl}${supplierRoute}`,
        supplier
      );
      alert(response.data?.message);
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <div>
        <h2 className="text-center">{translate("Create Supplier")}</h2>
        <form
          className="d-flex flex-wrap p-2 gap-3 justify-content-center"
          onSubmit={handleSubmit}
        >
          <div className="form-containers">
            <div className="form-group mb-1">
              <label className="my-2">{translate("Name")}</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={supplier.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Invoice Number")}</label>
              <input
                type="text"
                name="invoiceNumber"
                className="form-control"
                value={supplier.invoiceNumber}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Mobile")}</label>
              <input
                type="text"
                name="mobile"
                className="form-control"
                value={supplier.mobile}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary my-2 w-100">
              {translate("Create Supplier")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierForm;
