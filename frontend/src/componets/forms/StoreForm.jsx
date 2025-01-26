import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../../contexts/AppContext";

const StoreForm = ({ oldData, onSave }) => {
  const { backendUrl, translate } = useAppContext();
  const storeRoute = "/store";

  const [store, setStore] = useState({
    name: "",
    location: "",
  });

  // Set initial values if oldData is passed (for editing)
  useEffect(() => {
    if (oldData) {
      setStore({
        name: oldData.name || "",
        location: oldData.location || "",
      });
    }
  }, [oldData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStore({ ...store, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (oldData) {
        // Update existing store
        response = await axios.put(
          `${backendUrl}${storeRoute}/${oldData._id}`,
          store
        );
      } else {
        // Create new store
        response = await axios.post(`${backendUrl}${storeRoute}`, store);
      }

      alert(response.data?.message);

      // Call onSave function if provided (to refresh or update data)
      if (onSave && typeof onSave === "function") {
        onSave();
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <div>
        <h2 className="text-center">
          {oldData ? translate("Edit Store") : translate("Create Store")}
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
                value={store.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Location")}</label>
              <input
                type="text"
                name="location"
                className="form-control"
                value={store.location}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary my-2 w-100">
              {oldData ? translate("Update Store") : translate("Create Store")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreForm;
