import React, { useState, useEffect } from "react";
import "./ViewAllCategories.css";
import { fetchWithAuth } from "../login/api";
export default function ViewAllCategories() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleting, setDeleting] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editFormData, setEditFormData] = useState({ categoryId: 0, categoryName: "" });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addFormData, setAddFormData] = useState({ categoryName: "" });

  // Fetch all categories on component mount
  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategories = async () => {
    setLoading(true);
    setError("");

    try {
  const data = await fetchWithAuth(
    "https://localhost:7117/api/Categories",
    {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    }
  );

  setCategoriesList(Array.isArray(data) ? data : []);
  setError("");

} catch (err) {
  setError(err.message || "Unable to connect to server");
} finally {
  setLoading(false);
}
  };

  const handleDelete = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    setDeleting(categoryId);
    // try {
    //   const response = await fetch(`https://localhost:7117/api/Categories/${categoryId}`, {
    //     method: "DELETE",
    //     headers: {
    //       "Accept": "*/*"
    //     }
    //   });

    //   if (response.ok) {
    //     setCategoriesList(categoriesList.filter(c => c.categoryId !== categoryId));
    //   } else {
    //     setError("Failed to delete category. Please try again.");
    //   }
    // } catch (err) {
    //   setError(`Error: ${err.message}`);
    // } finally {
    //   setDeleting(null);
    // }
    try {
  await fetchWithAuth(
    `https://localhost:7117/api/Categories/${categoryId}`,
    {
      method: "DELETE",
      headers: {
        "Accept": "*/*"
      }
    }
  );

  // If no error is thrown, deletion was successful
  setCategoriesList(categoriesList.filter(c => c.categoryId !== categoryId));

} catch (err) {
  setError("Failed to delete category. Please try again.");
  console.error(err);
} finally {
  setDeleting(null);
}
  };

  const handleEdit = (category) => {
    setEditingCategory(category.categoryId);
    setEditFormData({ categoryId: category.categoryId, categoryName: category.categoryName });
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditFormData({ categoryId: 0, categoryName: "" });
    setError("");
  };

  const handleUpdateCategory = async () => {
    if (!editFormData.categoryName.trim()) {
      setError("Category Name is required");
      return;
    }

    setIsUpdating(true);
    // try {
    //   const response = await fetch(`https://localhost:7117/api/Categories/${editFormData.categoryId}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Accept": "*/*"
    //     },
    //     body: JSON.stringify({
    //       categoryId: editFormData.categoryId,
    //       categoryName: editFormData.categoryName
    //     })
    //   });

    //   if (response.ok) {
    //     setCategoriesList(categoriesList.map(c => 
    //       c.categoryId === editFormData.categoryId 
    //         ? { ...c, categoryName: editFormData.categoryName }
    //         : c
    //     ));
    //     setEditingCategory(null);
    //     setEditFormData({ categoryId: 0, categoryName: "" });
    //     setError("");
    //   } else {
    //     setError("Failed to update category. Please try again.");
    //   }
    // } catch (err) {
    //   setError(`Error: ${err.message}`);
    // } finally {
    //   setIsUpdating(false);
    // }
    try {
  await fetchWithAuth(
    `https://localhost:7117/api/Categories/${editFormData.categoryId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*"
      },
      body: JSON.stringify({
        categoryId: editFormData.categoryId,
        categoryName: editFormData.categoryName
      })
    }
  );

  // success (no error thrown)
  setCategoriesList(categoriesList.map(c =>
    c.categoryId === editFormData.categoryId
      ? { ...c, categoryName: editFormData.categoryName }
      : c
  ));

  setEditingCategory(null);
  setEditFormData({ categoryId: 0, categoryName: "" });
  setError("");

} catch (err) {
  setError("Failed to update category. Please try again.");
  console.error(err);
} finally {
  setIsUpdating(false);
}
  };

  const handleAddCategory = async () => {
    if (!addFormData.categoryName.trim()) {
      setError("Category Name is required");
      return;
    }

    setIsAdding(true);
    setError("");
    setSuccess("");
    
    try {
const response = await fetchWithAuth(
  "https://localhost:7117/api/Categories",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "*/*"
    },
    body: JSON.stringify({
      categoryId: 0,
      categoryName: addFormData.categoryName
    })
  }
)

      if (response.ok) {
        const data = await response.json();
        setCategoriesList([...categoriesList, data]);
        setAddFormData({ categoryName: "" });
        setSuccess("Category added successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError("Failed to add category. Please try again.");
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setIsAdding(false);
    }
  };

  // Filter the list based on search
  const filteredList = categoriesList.filter((category) =>
    category.categoryId.toString().includes(searchTerm) ||
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="view-all-categories-container">
      <div className="categories-header">
        <h1>All Categories</h1>
        <p className="categories-count">Total: {categoriesList.length} Category(ies)</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading categories data...</div>
      ) : (
        <>
          {/* Add Category Form */}
          <div className="add-category-section">
            <h2>Add New Category</h2>
            {success && <div className="success-message">{success}</div>}
            <div className="add-category-form">
              <input
                type="text"
                placeholder="Enter Category Name (e.g., Flat, House, Apartment)"
                value={addFormData.categoryName}
                onChange={(e) => setAddFormData({ categoryName: e.target.value })}
                className="add-input"
              />
              <button 
                className="add-btn" 
                onClick={handleAddCategory}
                disabled={isAdding}
              >
                {isAdding ? "Adding..." : "Add Category"}
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="filters-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by Category ID or Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="results-info">
            Showing {filteredList.length} of {categoriesList.length} Category(ies)
          </div>

          {/* Table */}
          {filteredList.length > 0 ? (
            <div className="table-wrapper">
              <table className="categories-table">
                <thead>
                  <tr>
                    <th>Category ID</th>
                    <th>Category Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((category) => (
                    <React.Fragment key={category.categoryId}>
                      <tr>
                        <td className="category-id">{category.categoryId}</td>
                        <td className="category-name">{category.categoryName}</td>
                        <td className="actions">
                          <button
                            className="edit-btn"
                            onClick={() => handleEdit(category)}
                            disabled={isUpdating}
                          >
                            ✎ Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(category.categoryId)}
                            disabled={deleting === category.categoryId}
                          >
                            {deleting === category.categoryId ? "Deleting..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                      {editingCategory === category.categoryId && (
                        <tr className="edit-row">
                          <td colSpan="3">
                            <div className="edit-form">
                              <label>Edit Category Name:</label>
                              <input
                                type="text"
                                value={editFormData.categoryName}
                                onChange={(e) => setEditFormData({ ...editFormData, categoryName: e.target.value })}
                                placeholder="Enter new category name"
                              />
                              <div className="edit-buttons">
                                <button 
                                  className="save-btn" 
                                  onClick={handleUpdateCategory}
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
              <p>No categories found matching your search criteria.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
