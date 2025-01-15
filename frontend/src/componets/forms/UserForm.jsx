import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../../contexts/AppContext";

const UserForm = () => {
  const { backendUrl, translate } = useAppContext();
  const userRoute = "/user";
  const roleRoute = "/role";

  const [user, setUser] = useState({
    name: "",
    sex: "",
    id: "",
    email: "",
    password: "",
    photo: [],
    roleId: "",
    isAdmin: false,
    isVerified: false,
  });

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios.get(`${backendUrl}${roleRoute}`).then((response) => {
      setRoles(response.data.data);
    });
  }, [backendUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUser({ ...user, photo: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("sex", user.sex);
      formData.append("id", user.id);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("isAdmin", user.isAdmin);
      formData.append("isVerified", user.isVerified);
      formData.append("roleId", user.roleId);
      user.photo.forEach((file) => {
        formData.append("photo", file);
      });

      const response = await axios.post(`${backendUrl}${userRoute}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data?.message);
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <div>
        <h2 className="text-center">{translate("Create User")}</h2>
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
                value={user.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Sex")}</label>
              <select
                name="sex"
                className="form-control"
                value={user.sex}
                onChange={handleChange}
                required
              >
                <option>{translate("Select Sex")}</option>
                <option value="Male">{translate("Male")}</option>
                <option value="Female">{translate("Female")}</option>
              </select>
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("ID")}</label>
              <input
                type="text"
                name="id"
                className="form-control"
                value={user.id}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Email")}</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Password")}</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={user.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Photos")}</label>
              <input
                type="file"
                name="photo"
                className="form-control"
                multiple
                onChange={handleFileChange}
              />
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Role")}</label>
              <select
                name="roleId"
                className="form-control"
                value={user.roleId}
                onChange={handleChange}
                required
              >
                <option>{translate("Select Role")}</option>
                {roles &&
                  roles.map((role) => (
                    <option key={role._id} value={role._id}>
                      {role.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Is Admin")}</label>
              <input
                type="checkbox"
                name="isAdmin"
                checked={user.isAdmin}
                onChange={(e) =>
                  setUser({ ...user, isAdmin: e.target.checked })
                }
              />
            </div>

            <div className="form-group mb-1">
              <label className="my-2">{translate("Is Verified")}</label>
              <input
                type="checkbox"
                name="isVerified"
                checked={user.isVerified}
                onChange={(e) =>
                  setUser({ ...user, isVerified: e.target.checked })
                }
              />
            </div>

            <button type="submit" className="btn btn-primary my-2 w-100">
              {translate("Create User")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
