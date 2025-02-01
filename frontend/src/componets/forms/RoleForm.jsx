import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../../contexts/AppContext";

const RoleForm = ({ oldData, onSave }) => {
  const { backendUrl, translate } = useAppContext();
  const roleRoute = "/role";

  const [role, setRole] = useState({
    name: "",
  });

  // Set initial values if oldData is passed (for editing)
  useEffect(() => {
    if (oldData) {
      setRole({
        name: oldData.name || "",
      });
    }
  }, [oldData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRole({ ...role, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (oldData) {
        // Update existing role
        response = await axios.put(
          `${backendUrl}${roleRoute}/${oldData._id}`,
          role
        );
      } else {
        // Create new role
        response = await axios.post(`${backendUrl}${roleRoute}`, role);
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
          {oldData ? translate("Edit Role") : translate("Create Role")}
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
                value={role.name}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary my-2 w-100">
              {oldData ? translate("Update Role") : translate("Create Role")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleForm;
