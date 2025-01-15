import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

const GoodForm = () => {
  const { backendUrl } = useAppContext();
  const goodsRoute = "/goods";
  const categoryRoute = "/category";
  const measurementRoute = "/measurement";
  const [good, setGood] = useState({
    id: "",
    name: "",
    catagoryId: "",
    unitOfMeasureId: "",
    qty: 0,
    photo: "",
    description: "",
    shortageLevel: 0,
  });
  const [categories, setCategories] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories and measurements
    axios.get(`${backendUrl}${categoryRoute}`).then((response) => {
      setCategories(response.data.data);
    });
    axios.get(`${backendUrl}${measurementRoute}`).then((response) => {
      setMeasurements(response.data.data);
    });
  }, [backendUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}${goodsRoute}`, good);
      console.log("res", response.data);
    } catch (error) {
      console.error(
        "Error creating/updating good",
        error.response?.data?.error || error.message
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGood({ ...good, [name]: value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100  ">
      <div>
        <h2 className="text-center ">{id ? "Edit Good" : "Create Good"}</h2>
        <form
          className="d-flex flex-wrap p-2  gap-3 justify-content-center "
          onSubmit={handleSubmit}
        >
          <div className="form-containers">
            <div className="form-group mb-1">
              <label className="my-2">Good ID</label>
              <input
                type="text"
                name="id"
                className="form-control"
                value={good.id}
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
                value={good.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-1">
              <label className="my-2">Category</label>
              <select
                name="catagoryId"
                className="form-control"
                value={good.catagoryId}
                onChange={handleChange}
                // required
              >
                <option value="">Select Category</option>
                {categories &&
                  categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group mb-1">
              <label className="my-2">Unit of Measure</label>
              <select
                name="unitOfMeasureId"
                className="form-control"
                value={good.unitOfMeasureId}
                onChange={handleChange}
                // required
              >
                <option value="">Select Unit</option>
                {measurements &&
                  measurements.map((measurement) => (
                    <option key={measurement._id} value={measurement._id}>
                      {measurement.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="form-containers">
            <div className="form-group mb-1">
              <label className="my-2">Quantity</label>
              <input
                type="number"
                name="qty"
                className="form-control"
                value={good.qty}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-1">
              <label className="my-2">Photo URL</label>
              <input
                type="text"
                name="photo"
                className="form-control"
                value={good.photo}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-1">
              <label className="my-2">Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={good.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-1">
              <label className="my-2">Shortage Level</label>
              <input
                type="number"
                name="shortageLevel"
                className="form-control"
                value={good.shortageLevel}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary my-2 w-100">
              {id ? "Update Good" : "Create Good"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoodForm;
