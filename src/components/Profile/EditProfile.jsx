import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../login/api";
import { getCurrentUser } from "../login/Auth";
import "./Userprofile.css";

const EditUserProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const navigate = useNavigate();
const [user, setUser] = useState(null);

  useEffect(() => {
      const currentUser = getCurrentUser();

    if (!currentUser) {
      navigate("/auth");
      return;
    }
      setUser(currentUser);

    setFormData({
      name: currentUser.name || "",
      email: currentUser.email || "",
      phone: currentUser.phone || ""
    });
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchWithAuth(
        `https://localhost:7117/api/Users/${user.userId}`, // ✅ MUST match backend
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            userType: user.userType // REQUIRED by Userdto
            // password not sent → backend keeps old password
          })
        }
      );

      // backend returns { message: "User updated successfully" }
      if (response) {
        // update local user object
        const updatedUser = {
          ...user,
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        };

        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        navigate("/profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="buy-property-container">
      <h1>Edit Profile</h1>

      <div className="content-wrapper">
        <div className="filters-sidebar filters-sidebar-desktop">
          <h2>Update Information</h2>

          <form onSubmit={handleUpdate}>
            <div className="filter-group">
              <h3>Full Name</h3>
              <input
                type="text"
                name="name"
                className="filter-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="filter-group">
              <h3>Email</h3>
              <input
                type="email"
                name="email"
                className="filter-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="filter-group">
              <h3>Phone</h3>
              <input
                type="text"
                name="phone"
                className="filter-input"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="details-btn">
              Save Changes
            </button>

            <button
              type="button"
              className="reset-btn"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserProfilePage;
