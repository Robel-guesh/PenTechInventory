import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../../contexts/AppContext";

const UserForm = ({ oldData, onSave }) => {
  const { backendUrl, translate, isAdmin } = useAppContext();
  const userRoute = "/user";
  const totalUsersRoute = "/user/api/totalUsers";
  const roleRoute = "/role";

  const [totalUsers, setTotalUsers] = useState(0);
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

    // If oldData exists, set initial user data (editing case)
    if (oldData) {
      setUser({
        name: oldData.name,
        sex: oldData.sex,
        id: oldData.id,
        email: oldData.email,
        password: "", // In case the password shouldn't be pre-filled
        photo: [], // Assuming we don't need to pre-load photos on update
        roleId: oldData.roleId,
        isAdmin: oldData.isAdmin,
        isVerified: oldData.isVerified,
      });
    } else {
      // Generate user ID for new user
      axios.get(`${backendUrl}${totalUsersRoute}`).then((response) => {
        setTotalUsers(response.data.data);
        setUser((prevUser) => ({
          ...prevUser,
          id: `PTSC/${response.data.data}`,
        }));
      });
    }
  }, [backendUrl, oldData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUser({ ...user, photo: files });
  };

  const generateUserId = () => {
    const userId = `PTSC/${totalUsers}`;
    setUser({ ...user, id: userId });
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

      const headers = {
        "Content-Type": "application/json",
      };

      if (user.photo.length > 0) {
        headers["Content-Type"] = "multipart/form-data";
      }

      let response;

      if (oldData) {
        // Update existing user (PUT request)
        response = await axios.put(
          `${backendUrl}${userRoute}/${oldData._id}`,
          formData,
          { headers }
        );
      } else {
        // Create new user (POST request)
        response = await axios.post(`${backendUrl}${userRoute}`, formData, {
          headers,
        });
      }

      alert(response.data?.message);

      if (onSave && typeof onSave === "function") {
        onSave(); // Callback to refresh data or close the form
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message);
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <div>
        <h2 className="text-center">
          {oldData ? translate("Edit User") : translate("Create User")}
        </h2>
        <form
          className="d-flex flex-wrap p-2 gap-3 justify-content-center"
          onSubmit={handleSubmit}
        >
          <div className="form-containers">
            {/* Name */}
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

            {/* Sex */}
            <div className="form-group">
              <label>{translate("Sex")}</label>
              <div className="d-flex w-100 gap-2">
                <label>
                  <input
                    className="me-2"
                    type="radio"
                    name="sex"
                    value="Male"
                    checked={user.sex === "Male"}
                    onChange={handleChange}
                    required
                  />
                  {translate("Male")}
                </label>
                <label>
                  <input
                    className="me-2"
                    type="radio"
                    name="sex"
                    value="Female"
                    checked={user.sex === "Female"}
                    onChange={handleChange}
                    required
                  />
                  {translate("Female")}
                </label>
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
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

            {/* Photos */}
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

            {/* Role */}
            <div className="form-group mb-1">
              <label className="my-2">{translate("Role")}</label>
              <select
                name="roleId"
                className="form-control"
                value={user.roleId}
                onChange={handleChange}
              >
                <option>{translate("Select Role")}</option>
                {roles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            {/* User ID */}
            <div className="form-group mb-1">
              <label className="my-2">{translate("ID")}</label>
              <div className="d-flex align-items-center justify-content-between">
                <input
                  type="text"
                  name="id"
                  className="form-control me-2 w-75"
                  value={user.id}
                  onChange={handleChange}
                  required
                />
                <span
                  className="w-25 btn btn-secondary fw-bolder"
                  onClick={generateUserId}
                >
                  {translate("Generate ID")}
                </span>
              </div>
            </div>

            {/* Admin & Verified */}
            {isAdmin && (
              <div className="d-flex gap-2 w-100 justify-content-evenly">
                <div className="form-group mb-1">
                  <label className="m-2">{translate("Is Admin")}</label>
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
                  <label className="m-2">{translate("Is Verified")}</label>
                  <input
                    type="checkbox"
                    name="isVerified"
                    checked={user.isVerified}
                    onChange={(e) =>
                      setUser({ ...user, isVerified: e.target.checked })
                    }
                  />
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-primary my-2 w-100">
              {oldData ? translate("Update User") : translate("Create User")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
