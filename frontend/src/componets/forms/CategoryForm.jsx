import React, { useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import axios from "axios";

function CategoryForm() {
  const [name, setName] = useState("");
  const { backendUrl, translate } = useAppContext();
  const categoryRoute = "/category";
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}${categoryRoute}`, {
        name,
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };
  return (
    <div className="w-100 d-flex h-100vh justify-content-center align-items-center gap-1 my-3">
      <div className="form-containers ">
        <form>
          <div className="form-group mb-1 p-1">
            <label className="floating-label mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            ></input>
            <button
              className="btn btn-primary my-2 w-100"
              onClick={handleCategorySubmit}
            >
              {translate("submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryForm;
