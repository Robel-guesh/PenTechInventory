import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../../contexts/AppContext";

const GoodForm = () => {
  const { backendUrl, translate } = useAppContext();
  const goodsRoute = "/goods";
  const categoryRoute = "/category";
  const measurementRoute = "/measurement";

  const [good, setGood] = useState({
    id: "",
    name: "",
    catagoryId: "",
    unitOfMeasureId: "",
    // qty: 0,
    description: "",
    shortageLevel: 0,
  });

  const [categories, setCategories] = useState([]);
  const [measurements, setMeasurements] = useState([]);

  const [images, setImages] = useState([]); // This stores the selected images
  const [imagePreviews, setImagePreviews] = useState([]); // For image previews

  useEffect(() => {
    // Fetch categories and measurements
    axios.get(`${backendUrl}${categoryRoute}`).then((response) => {
      setCategories(response.data.data);
    });
    axios.get(`${backendUrl}${measurementRoute}`).then((response) => {
      setMeasurements(response.data.data);
    });
  }, [backendUrl]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files); // Convert FileList to an array

    // Add new files to the existing ones
    setImages((prevImages) => [...prevImages, ...fileArray]);

    // Create previews of the selected images
    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  // Handle the removal of selected images
  const handleImageDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append form data
    formData.append("id", good.id);
    formData.append("name", good.name);
    formData.append("catagoryId", good.catagoryId);
    formData.append("unitOfMeasureId", good.unitOfMeasureId);
    // formData.append("qty", good.qty);
    formData.append("description", good.description);
    formData.append("shortageLevel", good.shortageLevel);

    // Append images to form data
    images.forEach((image) => {
      formData.append("photo", image);
    });

    const headers = {
      "Content-Type": "application/json", // Default to JSON
    };

    // Dynamically set Content-Type based on image upload
    if (images.length > 0) {
      headers["Content-Type"] = "multipart/form-data";
    }

    try {
      const response = await axios.post(
        `${backendUrl}${goodsRoute}`,
        formData,
        {
          headers,
        }
      );
      alert(response.data?.message);
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGood({ ...good, [name]: value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <div>
        <h2 className="text-center">{translate("Create Good")}</h2>
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
                value={good.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Category")}</label>
              <select
                name="catagoryId"
                className="form-control "
                value={good.catagoryId}
                onChange={handleChange}
              >
                <option>{translate("Select Category")}</option>
                {categories &&
                  categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Good ID")}</label>
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
              <label className="my-2">{translate("Unit of Measure")}</label>
              <select
                name="unitOfMeasureId"
                className="form-control"
                value={good.unitOfMeasureId}
                onChange={handleChange}
              >
                <option>{translate("Select Unit of Measure")}</option>
                {measurements &&
                  measurements.map((measurement) => (
                    <option key={measurement._id} value={measurement._id}>
                      {translate(measurement.name)}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="form-containers">
            {/* <div className="form-group mb-1">
              <label className="my-2">{translate("Quantity")}</label>
              <input
                type="number"
                name="qty"
                className="form-control"
                value={good.qty}
                onChange={handleChange}
                required
              />
            </div> */}

            <div className="form-group mb-1">
              <label className="my-2">{translate("Upload Photos")}</label>
              <input
                type="file"
                name="images"
                className="form-control"
                multiple
                onChange={handleImageChange}
              />
            </div>

            <div className="image-previews d-flex flex-wrap">
              {imagePreviews.map((preview, index) => (
                <div
                  key={index}
                  className="image-preview-container position-relative m-2"
                >
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="image-preview"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />
                  <button
                    className="btn btn-danger position-absolute top-0 end-0"
                    onClick={() => handleImageDelete(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Description")}</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={good.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Shortage Level")}</label>
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
              {translate("Create Good")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoodForm;
