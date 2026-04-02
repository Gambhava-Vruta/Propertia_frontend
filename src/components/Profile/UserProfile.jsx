// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getCurrentUser } from "../login/Auth";
// import "./Userprofile.css";

// const UserProfilePage = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = getCurrentUser();
//     if (!storedUser) {
//       navigate("/auth");
//       return;
//     }
//     setUser(storedUser);
//   }, [navigate]);

//   if (!user) return null;

//   return (
//     <div className="buy-property-container">
//       <h1>My Profile</h1>

//       <div className="content-wrapper">
//         <div className="filters-sidebar filters-sidebar-desktop">
//           <h2>Profile Details</h2>

//           <div className="filter-group">
//             <h3>Full Name</h3>
//             <p>{user.name}</p>
//           </div>

//           <div className="filter-group">
//             <h3>Email</h3>
//             <p>{user.email}</p>
//           </div>

//           <div className="filter-group">
//             <h3>Phone</h3>
//             <p>{user.phone || "Not provided"}</p>
//           </div>

//           <div className="filter-group">
//             <h3>Member Since</h3>
//             <p>{new Date(user.createdAt).toLocaleDateString()}</p>
//           </div>

//           <button
//             className="details-btn"
//             onClick={() => navigate("/edit-profile")}
//           >
//             Edit Profile
//           </button>
//         </div>

//         <div className="properties-main">
//           <div className="light-card">
//             <div className="card-body">
//               <h3>Account Overview</h3>
//               <p className="location">
//                 Keep your personal information up to date for a better
//                 experience.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfilePage;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../login/Auth";
import "./Userprofile.css";

const API_BASE = (process.env.REACT_APP_API_BASE || "https://localhost:7117");
const getToken = () => localStorage.getItem("token");

const fmtPrice = (n) =>
  n >= 10000000
    ? `â‚¹${(n / 10000000).toFixed(2)} Cr`
    : n >= 100000
    ? `â‚¹${(n / 100000).toFixed(1)} L`
    : `â‚¹${n?.toLocaleString()}`;

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [propLoading, setPropLoading] = useState(true);
  const [propError, setPropError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = getCurrentUser();
    if (!storedUser) { navigate("/auth"); return; }
    setUser(storedUser);

    const fetchProps = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/properties/my-properties`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (res.status === 401) { setPropError("Session expired. Please log in again."); return; }
        if (!res.ok) throw new Error();
        const data = await res.json();
        setProperties(data);
      } catch {
        setPropError("Could not load properties.");
      } finally {
        setPropLoading(false);
      }
    };
    fetchProps();
  }, [navigate]);

  if (!user) return null;

  const totalValue = properties.reduce(
    (sum, p) => sum + (p.prices?.[0]?.amount || 0), 0
  );

  return (
    <div className="buy-property-container">
      <h1 className="user-profile-title">My Profile</h1>

      <div className="content-wrapper">

        {/* â”€â”€ Left Sidebar â”€â”€ */}
        <div className="filters-sidebar filters-sidebar-desktop profile-sidebar">

          <h2>Profile Details</h2>

          <div className="filter-group profile-item">
            <h3>Full Name</h3>
            <p>{user.name}</p>
          </div>

          <div className="filter-group profile-item">
            <h3>Email</h3>
            <p>{user.email}</p>
          </div>

          <div className="filter-group profile-item">
            <h3>Phone</h3>
            <p>{user.phone || "Not provided"}</p>
          </div>

          <div className="filter-group profile-item">
            <h3>Role</h3>
            <p style={{ textTransform: "capitalize" }}>{user.userType || "Member"}</p>
          </div>

          <div className="filter-group profile-item">
            <h3>Member Since</h3>
            <p>
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric", month: "long", day: "numeric",
                  })
                : "â€”"}
            </p>
          </div>

          {/* Stats summary */}
          <div className="filter-group" style={{ borderTop: "1px solid #eee", paddingTop: "16px" }}>
            <h3>My Listings</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "#555" }}>Total Properties</span>
                <span style={{ fontWeight: 600, color: "#333" }}>{properties.length}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "#555" }}>For Sale</span>
                <span style={{ fontWeight: 600, color: "#333" }}>
                  {properties.filter(p => p.requireType?.toLowerCase() === "sale").length}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "#555" }}>For Rent</span>
                <span style={{ fontWeight: 600, color: "#333" }}>
                  {properties.filter(p => p.requireType?.toLowerCase() === "rent").length}
                </span>
              </div>
              {totalValue > 0 && (
                <div style={{
                  display: "flex", justifyContent: "space-between", fontSize: "14px",
                  marginTop: "4px", borderTop: "1px dashed #eee", paddingTop: "8px"
                }}>
                  <span style={{ color: "#555" }}>Portfolio Value</span>
                  <span style={{ fontWeight: 600, color: "#2e7d32" }}>{fmtPrice(totalValue)}</span>
                </div>
              )}
            </div>
          </div>

          <button
            className="details-btn profile-edit-btn"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </button>
        </div>

        {/* â”€â”€ Right Main â”€â”€ */}
        <div className="properties-main">

          {/* Account overview card */}
          <div className="light-card" style={{ marginBottom: "20px" }}>
            <div className="card-body">
              <h3>Account Overview</h3>
              <p className="location">
                Keep your personal information up to date for a better experience.
              </p>
            </div>
          </div>

          {/* My Properties */}
          <div className="light-card">
            <div className="card-body">
              <h3 style={{ marginBottom: "16px" }}>
                My Properties
                {properties.length > 0 && (
                  <span style={{
                    marginLeft: "10px", fontSize: "13px", fontWeight: 500,
                    background: "#e8f5e9", color: "#2e7d32",
                    padding: "2px 10px", borderRadius: "20px",
                  }}>
                    {properties.length} listed
                  </span>
                )}
              </h3>

              {propLoading && (
                <p className="location">Loading propertiesâ€¦</p>
              )}

              {propError && (
                <p style={{ color: "#c62828", fontSize: "14px" }}>âš  {propError}</p>
              )}

              {!propLoading && !propError && properties.length === 0 && (
                <div style={{ textAlign: "center", padding: "32px 0", color: "#888" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>ðŸ </div>
                  <p>No properties listed yet.</p>
                  <button
                    className="details-btn"
                    style={{ marginTop: "14px" }}
                    onClick={() => navigate("/sell_rent")}
                  >
                    + List a Property
                  </button>
                </div>
              )}

              {!propLoading && !propError && properties.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {properties.map((p) => (
                    <div
                      key={p.propertyId}
                      onClick={() => navigate(`/explore_property/Detail/${p.propertyId}`)}
                      style={{
                        display: "flex", gap: "0",
                        border: "1px solid #eee", borderRadius: "10px",
                        overflow: "hidden", cursor: "pointer",
                        transition: "box-shadow 0.2s",
                        background: "#fff",
                      }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.10)"}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                    >
                      {/* Image */}
                      {p.images?.[0] ? (
                        <img
                          src={`${API_BASE}/uploads/${p.images[0]}`}
                          alt={p.title}
                          style={{ width: "120px", minHeight: "100px", objectFit: "cover", flexShrink: 0 }}
                          onError={e => { e.target.style.display = "none"; }}
                        />
                      ) : (
                        <div style={{
                          width: "120px", minHeight: "100px",
                          background: "#f5f5f5", display: "flex",
                          alignItems: "center", justifyContent: "center",
                          fontSize: "2rem", flexShrink: 0,
                        }}>ðŸ </div>
                      )}

                      {/* Info */}
                      <div style={{ padding: "12px 16px", flex: 1, minWidth: 0 }}>
                        <h4 style={{
                          fontSize: "15px", fontWeight: 600, color: "#222",
                          marginBottom: "4px",
                          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                        }}>
                          {p.title}
                        </h4>

                        <p className="location" style={{ marginBottom: "8px" }}>
                          ðŸ“ {p.address?.famousArea}, {p.address?.city}
                        </p>

                        {/* Badges */}
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
                          <span style={{
                            fontSize: "11px", fontWeight: 600, padding: "2px 9px",
                            borderRadius: "20px", textTransform: "uppercase",
                            background: p.requireType?.toLowerCase() === "sale" ? "#e8f5e9" : "#e3f2fd",
                            color: p.requireType?.toLowerCase() === "sale" ? "#2e7d32" : "#1565c0",
                          }}>
                            {p.requireType}
                          </span>
                          {p.status && (
                            <span style={{
                              fontSize: "11px", fontWeight: 600, padding: "2px 9px",
                              borderRadius: "20px", textTransform: "capitalize",
                              background: "#fff3e0", color: "#e65100",
                            }}>
                              {p.status}
                            </span>
                          )}
                          {p.category?.categoryName && (
                            <span style={{
                              fontSize: "11px", fontWeight: 500, padding: "2px 9px",
                              borderRadius: "20px", background: "#f3f3f3", color: "#555",
                            }}>
                              {p.category.categoryName}
                            </span>
                          )}
                        </div>

                        {/* Price & Area */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                          <span style={{ fontSize: "16px", fontWeight: 700, color: "#2e7d32" }}>
                            {p.prices?.[0] ? fmtPrice(p.prices[0].amount) : "â€”"}
                          </span>
                          <span style={{ fontSize: "12px", color: "#888" }}>
                            {p.areaSqft?.toLocaleString()} sqft
                          </span>
                        </div>

                        {/* Amenities */}
                        {p.amenities?.length > 0 && (
                          <p style={{ fontSize: "12px", color: "#999", marginTop: "5px" }}>
                            âœ¦ {p.amenities.slice(0, 3).join(" Â· ")}
                            {p.amenities.length > 3 && ` +${p.amenities.length - 3} more`}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}