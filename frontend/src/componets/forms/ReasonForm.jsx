import React, { useState } from "react";
import axios from "axios";
import { useAppContext } from "../../contexts/AppContext";

const ReasonForm = () => {
  const { backendUrl, translate } = useAppContext();
  const reasonRoute = "/reason";

  const [reason, setReason] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReason({ ...reason, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}${reasonRoute}`, reason);
      alert(response.data?.message);
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <div>
        <h2 className="text-center">{translate("Create Reason")}</h2>
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
                value={reason.name}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary my-2 w-100">
              {translate("Create Reason")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReasonForm;
