import React, { useState, useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";
import axios from "axios";

function CategoryForm({ oldData, onSave }) {
  const [name, setName] = useState("");
  const { backendUrl, translate } = useAppContext();
  const categoryRoute = "/category";

  // Set the initial state based on `oldData` if it's passed (for editing)
  useEffect(() => {
    if (oldData) {
      setName(oldData.name); // Assume `name` is the field we need to update
    }
  }, [oldData]);

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (oldData) {
        // Update existing category
        response = await axios.put(
          `${backendUrl}${categoryRoute}/${oldData._id}`,
          { name }
        );
        if (onSave && typeof onSave === "function") {
          onSave(); // Call the onSave function to refresh the data in AdminDashboard
        }
      } else {
        // Create new category
        response = await axios.post(`${backendUrl}${categoryRoute}`, { name });
      }
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={handleCategorySubmit}>
      <div className="form-group mb-1 p-1">
        <label className="floating-label mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        ></input>
        <button className="btn btn-primary my-2 w-100" type="submit">
          {translate("submit")}
          {oldData ? translate("Update") : translate("Submit")}
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;
