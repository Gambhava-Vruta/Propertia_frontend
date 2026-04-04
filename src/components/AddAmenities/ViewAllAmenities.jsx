import React, { useState, useEffect } from "react";
import "./ViewAllAmenities.css";
import { fetchWithAuth } from "../login/api";
export default function ViewAllAmenities() {
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleting, setDeleting] = useState(null);
  const [editingAmenity, setEditingAmenity] = useState(null);
  const [editFormData, setEditFormData] = useState({ amenityId: 0, amenityName: "" });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addFormData, setAddFormData] = useState({ amenityName: "" });

  // Fetch all amenities on component mount
  useEffect(() => {
    fetchAllAmenities();
  }, []);

  const fetchAllAmenities = async () => {
    setLoading(true);
    setError("");

    
    try {
  const data = await fetchWithAuth(
    "https://propeitia-backhand.onrender.com/api/Amenities",
    {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    }
  );

  setAmenitiesList(Array.isArray(data) ? data : []);
  setError("");

} catch (err) {
  setError(err.message || "Unable to connect to server");
} finally {
  setLoading(false);
}
  };

  const handleDelete = async (amenityId) => {
    if (!window.confirm("Are you sure you want to delete this amenity?")) return;

    setDeleting(amenityId);
    // try {
    //   const response = await fetch(`${process.env.REACT_APP_API_BASE || "https://propeitia-backhand.onrender.com"}/api/Amenities/${amenityId}`, {
    //     method: "DELETE",
    //     headers: {
    //       "Accept": "*/*"
    //     }
    //   });

    //   if (response.ok) {
    //     setAmenitiesList(amenitiesList.filter(a => a.amenityId !== amenityId));
    //   } else {
    //     setError("Failed to delete amenity. Please try again.");
    //   }
    // } catch (err) {
    //   setError(`Error: ${err.message}`);
    // } finally {
    //   setDeleting(null);
    // }
    try {
  await fetchWithAuth(
    `${process.env.REACT_APP_API_BASE || "https://propeitia-backhand.onrender.com"}/api/Amenities/${amenityId}`,
    {
      method: "DELETE",
      headers: {
        "Accept": "*/*"
      }
    }
  );

  // If delete succeeds
  setAmenitiesList(
    amenitiesList.filter(a => a.amenityId !== amenityId)
  );
  setError("");

} catch (err) {
  setError(err.message || "Failed to delete amenity. Please try again.");
} finally {
  setDeleting(null);
}
  };

  const handleEdit = (amenity) => {
    setEditingAmenity(amenity.amenityId);
    setEditFormData({ amenityId: amenity.amenityId, amenityName: amenity.amenityName });
  };

  const handleCancelEdit = () => {
    setEditingAmenity(null);
    setEditFormData({ amenityId: 0, amenityName: "" });
    setError("");
  };

  const handleUpdateAmenity = async () => {
    if (!editFormData.amenityName.trim()) {
      setError("Amenity Name is required");
      return;
    }

    setIsUpdating(true);
    // try {
    //   const response = await fetch(`${process.env.REACT_APP_API_BASE || "https://propeitia-backhand.onrender.com"}/api/Amenities/${editFormData.amenityId}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Accept": "*/*"
    //     },
    //     body: JSON.stringify({
    //       amenityId: editFormData.amenityId,
    //       amenityName: editFormData.amenityName
    //     })
    //   });

    //   if (response.ok) {
    //     setAmenitiesList(amenitiesList.map(a => 
    //       a.amenityId === editFormData.amenityId 
    //         ? { ...a, amenityName: editFormData.amenityName }
    //         : a
    //     ));
    //     setEditingAmenity(null);
    //     setEditFormData({ amenityId: 0, amenityName: "" });
    //     setError("");
    //   } else {
    //     setError("Failed to update amenity. Please try again.");
    //   }
    // } catch (err) {
    //   setError(`Error: ${err.message}`);
    // } finally {
    //   setIsUpdating(false);
    // }
    try {
  await fetchWithAuth(
    `${process.env.REACT_APP_API_BASE || "https://propeitia-backhand.onrender.com"}/api/Amenities/${editFormData.amenityId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*"
      },
      body: JSON.stringify({
        amenityId: editFormData.amenityId,
        amenityName: editFormData.amenityName
      })
    }
  );

  // Update UI after success
  setAmenitiesList(amenitiesList.map(a =>
    a.amenityId === editFormData.amenityId
      ? { ...a, amenityName: editFormData.amenityName }
      : a
  ));

  setEditingAmenity(null);
  setEditFormData({ amenityId: 0, amenityName: "" });
  setError("");

} catch (err) {
  setError(err.message || "Failed to update amenity. Please try again.");
} finally {
  setIsUpdating(false);
}

  };

  const handleAddAmenity = async () => {
    if (!addFormData.amenityName.trim()) {
      setError("Amenity Name is required");
      return;
    }

    setIsAdding(true);
    setError("");
    setSuccess("");
    try {
  const data = await fetchWithAuth(
    "https://propeitia-backhand.onrender.com/api/Amenities",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*"
      },
      body: JSON.stringify({
        amenityId: 0,
        amenityName: addFormData.amenityName
      })
    }
  );

  // Update UI after success
  setAmenitiesList([...amenitiesList, data]);
  setAddFormData({ amenityName: "" });
  setSuccess("Amenity added successfully!");
  setTimeout(() => setSuccess(""), 3000);

} catch (err) {
  setError(err.message || "Failed to add amenity. Please try again.");
} finally {
  setIsAdding(false);
}
    // try {
    //   const response = await fetch("https://propeitia-backhand.onrender.com/api/Amenities", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Accept": "*/*"
    //     },
    //     body: JSON.stringify({
    //       amenityId: 0,
    //       amenityName: addFormData.amenityName
    //     })
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     setAmenitiesList([...amenitiesList, data]);
    //     setAddFormData({ amenityName: "" });
    //     setSuccess("Amenity added successfully!");
    //     setTimeout(() => setSuccess(""), 3000);
    //   } else {
    //     setError("Failed to add amenity. Please try again.");
    //   }
    // } catch (err) {
    //   setError(`Error: ${err.message}`);
    // } finally {
    //   setIsAdding(false);
    // }
  };

  // Filter the list based on search
  const filteredList = amenitiesList.filter((amenity) =>
    amenity.amenityId.toString().includes(searchTerm) ||
    amenity.amenityName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="view-all-amenities-container">
      <div className="amenities-header">
        <h1>All Amenities</h1>
        <p className="amenities-count">Total: {amenitiesList.length} Amenity(ies)</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading amenities data...</div>
      ) : (
        <>
          {/* Add Amenity Form */}
          <div className="add-amenity-section">
            <h2>Add New Amenity</h2>
            {success && <div className="success-message">{success}</div>}
            <div className="add-amenity-form">
              <input
                type="text"
                placeholder="Enter Amenity Name (e.g., Gym, WiFi, Swimming Pool)"
                value={addFormData.amenityName}
                onChange={(e) => setAddFormData({ amenityName: e.target.value })}
                className="add-input"
              />
              <button 
                className="add-btn" 
                onClick={handleAddAmenity}
                disabled={isAdding}
              >
                {isAdding ? "Adding..." : "Add Amenity"}
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="filters-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by Amenity ID or Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="results-info">
            Showing {filteredList.length} of {amenitiesList.length} Amenity(ies)
          </div>

          {/* Table */}
          {filteredList.length > 0 ? (
            <div className="table-wrapper">
              <table className="amenities-table">
                <thead>
                  <tr>
                    <th>Amenity ID</th>
                    <th>Amenity Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((amenity) => (
                    <React.Fragment key={amenity.amenityId}>
                      <tr>
                        <td className="amenity-id">{amenity.amenityId}</td>
                        <td className="amenity-name">{amenity.amenityName}</td>
                        <td className="actions">
                          <button
                            className="edit-btn"
                            onClick={() => handleEdit(amenity)}
                            disabled={isUpdating}
                          >
                            ✎ Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(amenity.amenityId)}
                            disabled={deleting === amenity.amenityId}
                          >
                            {deleting === amenity.amenityId ? "Deleting..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                      {editingAmenity === amenity.amenityId && (
                        <tr className="edit-row">
                          <td colSpan="3">
                            <div className="edit-form">
                              <label>Edit Amenity Name:</label>
                              <input
                                type="text"
                                value={editFormData.amenityName}
                                onChange={(e) => setEditFormData({ ...editFormData, amenityName: e.target.value })}
                                placeholder="Enter new amenity name"
                              />
                              <div className="edit-buttons">
                                <button 
                                  className="save-btn" 
                                  onClick={handleUpdateAmenity}
                                  disabled={isUpdating}
                                >
                                  {isUpdating ? "Saving..." : "Save"}
                                </button>
                                <button 
                                  className="cancel-edit-btn" 
                                  onClick={handleCancelEdit}
                                  disabled={isUpdating}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-results">
              <p>No amenities found matching your search criteria.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
