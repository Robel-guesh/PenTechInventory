import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../../contexts/AppContext";

const MeasurementForm = () => {
  const { backendUrl } = useAppContext();
  const measurementRoute = "/measurement";
  const [measurement, setMeasurement] = useState({
    groupName: "",
    name: "",
    quantity: 0,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backendUrl}${measurementRoute}`,
        measurement
      );
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeasurement({ ...measurement, [name]: value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 ">
      <div>
        <h2 className="text-center">{"Create Measurement"}</h2>
        <form
          className="d-flex flex-wrap p-2 gap-3 justify-content-center "
          onSubmit={handleSubmit}
        >
          <div className="form-containers">
            <div className="form-group mb-1">
              <label className="my-2">Group Name</label>
              <input
                type="text"
                name="groupName"
                className="form-control"
                value={measurement.groupName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-1">
              <label className="my-2">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={measurement.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-1">
              <label className="my-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                value={measurement.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary my-2 w-100">
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MeasurementForm;