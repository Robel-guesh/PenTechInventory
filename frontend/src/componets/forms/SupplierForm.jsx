import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../../contexts/AppContext";

const SupplierForm = ({ oldData, onSave }) => {
  const { backendUrl, translate } = useAppContext();
  const supplierRoute = "/supplier";

  const [supplier, setSupplier] = useState({
    name: "",
    invoiceNumber: "",
    mobile: "",
  });

  useEffect(() => {
    // If oldData exists (i.e., we are editing an existing supplier), pre-fill the form
    if (oldData) {
      setSupplier({
        name: oldData.name,
        invoiceNumber: oldData.invoiceNumber,
        mobile: oldData.mobile,
      });
    }
  }, [oldData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (oldData) {
        // Update existing supplier (PUT request)
        response = await axios.put(
          `${backendUrl}${supplierRoute}/${oldData._id}`,
          supplier
        );
      } else {
        // Create new supplier (POST request)
        response = await axios.post(`${backendUrl}${supplierRoute}`, supplier);
      }

      alert(response.data?.message);

      if (onSave && typeof onSave === "function") {
        onSave(); // Callback to refresh data or close the form
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message);
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <div>
        <h2 className="text-center">
          {oldData ? translate("Edit Supplier") : translate("Create Supplier")}
        </h2>
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
              {oldData
                ? translate("Update Supplier")
                : translate("Create Supplier")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierForm;
