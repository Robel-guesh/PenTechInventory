import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../../contexts/AppContext";

const GoodForm = ({ oldData, onSave }) => {
  const { backendUrl, translate } = useAppContext();
  const goodsRoute = "/goods";
  const categoryRoute = "/category";
  const measurementRoute = "/measurement";

  const [good, setGood] = useState({
    id: "",
    name: "",
    catagoryId: "",
    unitOfMeasureId: "",
    qty: 0,
    description: "",
    shortageLevel: 0,
  });

  const [categories, setCategories] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [images, setImages] = useState([]); // For storing the selected images
  const [imagePreviews, setImagePreviews] = useState([]); // For image previews

  useEffect(() => {
    // Fetch categories and measurements in parallel
    const fetchData = async () => {
      try {
        const [categoriesResponse, measurementsResponse] = await Promise.all([
          axios.get(`${backendUrl}${categoryRoute}`),
          axios.get(`${backendUrl}${measurementRoute}`),
        ]);

        const categories = categoriesResponse.data.data;
        const measurements = measurementsResponse.data.data;

        setCategories(categories);
        setMeasurements(measurements);

        // Only set good if oldData is not present and data exists
        if (!oldData) {
          const updatedGood = { ...good };

          if (categories.length > 0) {
            updatedGood.catagoryId = categories[0]._id;
          }

          if (measurements.length > 0) {
            updatedGood.unitOfMeasureId = measurements[0]._id;
          }

          // Only update state if changes were made to avoid unnecessary re-renders
          setGood(updatedGood);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // Add dependencies for oldData and good if necessary

    // If `oldData` is provided, populate the form with existing good data
    if (oldData) {
      setGood({
        id: oldData.id || "",
        name: oldData.name || "",
        catagoryId: oldData.catagoryId._id || "",
        unitOfMeasureId: oldData.unitOfMeasureId._id || "",
        qty: oldData.qty || 0,
        description: oldData.description || "",
        shortageLevel: oldData.shortageLevel || 0,
      });

      // Set image previews if there are existing images
      if (oldData.photo && oldData.photo.length > 0) {
        setImagePreviews(oldData.photo);
      }
    }
  }, [backendUrl, oldData]);
  const handleImageChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files); // Convert FileList to an array

    // Add new files to the existing ones
    setImages((prevImages) => [...prevImages, ...fileArray]);

    // Create previews of the selected images
    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  const handleImageDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(good);
    const formData = new FormData();

    // Append form data
    formData.append("id", good.id);
    formData.append("name", good.name);
    formData.append("catagoryId", good.catagoryId);
    formData.append("unitOfMeasureId", good.unitOfMeasureId);
    formData.append("qty", good.qty);
    formData.append("description", good.description);
    formData.append("shortageLevel", good.shortageLevel);

    // Append images to form data (if any)
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
      let response;
      if (oldData) {
        // Update existing good
        response = await axios.put(
          `${backendUrl}${goodsRoute}/${oldData._id}`,
          formData,
          {
            headers,
          }
        );
      } else {
        // Create new good
        response = await axios.post(`${backendUrl}${goodsRoute}`, formData, {
          headers,
        });
      }

      alert(response.data?.message);

      if (onSave && typeof onSave === "function") {
        onSave(); // Refresh the data in AdminDashboard (or other parent component)
      }
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
        <h2 className="text-center">
          {oldData ? translate("Edit Good") : translate("Create Good")}
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
                value={good.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Category")}</label>
              <select
                name="catagoryId"
                className="form-control"
                value={good.catagoryId}
                onChange={handleChange}
              >
                {/* <option>{translate("Select Category")}</option> */}
                {oldData && (
                  <option value={good.catagoryId._id}>
                    {good.catagoryId.name}
                  </option>
                )}
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
                disabled={!!oldData} // Disable if editing (we don't want to change the ID)
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
                {/* <option>{translate("Select Unit of Measure")}</option> */}
                {oldData && (
                  <option value={good.unitOfMeasureId._id}>
                    {good.unitOfMeasureId.name}
                  </option>
                )}

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
              {imagePreviews.length > 0 &&
                imagePreviews.map((preview, index) => (
                  <div
                    key={index}
                    className="image-preview-container position-relative m-2"
                  >
                    <img
                      src={
                        oldData
                          ? `${backendUrl}/${oldData.photo[0]}`
                          : `${preview}`
                      }
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
              {oldData ? translate("Update Good") : translate("Create Good")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoodForm;
