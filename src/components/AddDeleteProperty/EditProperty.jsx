import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Add_Property.css";
import { fetchWithAuth } from '../login/api';
import { getCurrentUser } from '../login/Auth';

export default function EditPropertyPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [showAmenities, setShowAmenities] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  const [property, setProperty] = useState({
    title: "",
    description: "",
    bhkType: "",
    preferredTenant: "any",
    status: "completed",
    transactionTypeId: "",
    salePrice: "",
    rentPrice: "",
    areaSqft: "",
    totalWashrooms: "",
    categoryId: "",
    address: {
      location: "",
      societyName: "",
      landmark: "",
      famousArea: "",
      city: "",
      state: "",
      country: "",
      latitude: null,
      longitude: null
    },
    images: [],
    imagePreviews: [],
    amenities: [],
    existingImages: []
  });

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [cats, ams, tTypes] = await Promise.all([
          fetchWithAuth("https://localhost:7117/api/Categories"),
          fetchWithAuth("https://localhost:7117/api/Amenities"),
          fetchWithAuth("https://localhost:7117/api/TransactionType")
        ]);

        setCategories(cats || []);
        setAmenitiesList(ams || []);
        setTransactionTypes(tTypes || []);
      } catch (err) {
        console.error("Error loading data:", err);
        alert("Failed to load form data. Please ensure you're logged in.");
      }
    };

    fetchInitialData();
  }, []);

  // Fetch property
  useEffect(() => {
    if (transactionTypes.length === 0 || !id) return;

    const fetchPropertyData = async () => {
      setLoading(true);
      try {
        const data = await fetchWithAuth(`${process.env.REACT_APP_API_BASE || "https://localhost:7117"}/api/properties/${id}`);

        if (!data) {
          alert("Property not found");
          navigate("/properties");
          return;
        }

        const hasRent = data.prices?.some(p => p.transactionType?.toLowerCase() === "rent" && p.amount > 0);
        const hasSale = data.prices?.some(p => p.transactionType?.toLowerCase() === "sale" && p.amount > 0);

        let transactionTypeId = "";
        if (hasRent && hasSale) {
          transactionTypeId = transactionTypes.find(t => t.transactionTypeName.toLowerCase() === "both")?.transactionTypeId || "";
        } else if (hasRent) {
          transactionTypeId = transactionTypes.find(t => t.transactionTypeName.toLowerCase() === "rent")?.transactionTypeId || "";
        } else if (hasSale) {
          transactionTypeId = transactionTypes.find(t => t.transactionTypeName.toLowerCase() === "sale")?.transactionTypeId || "";
        }

        const rentPrice = data.prices?.find(p => p.transactionType?.toLowerCase() === "rent")?.amount || "";
        const salePrice = data.prices?.find(p => p.transactionType?.toLowerCase() === "sale")?.amount || "";

        setProperty({
          title: data.title || "",
          description: data.description || "",
          bhkType: data.bhk?.bhkType || "",
          totalWashrooms: data.bhk?.totalWashrooms || "",
          preferredTenant: data.requireType || "any",
          status: data.status || "completed",
          transactionTypeId: String(transactionTypeId),
          rentPrice: String(rentPrice),
          salePrice: String(salePrice),
          areaSqft: String(data.areaSqft || ""),
          categoryId: String(data.category?.categoryId || ""),
          address: {
            location: data.address?.location || "",
            societyName: data.address?.societyName || "",
            landmark: data.address?.landmark || "",
            famousArea: data.address?.famousArea || "",
            city: data.address?.city || "",
            state: data.address?.state || "",
            country: data.address?.country || "",
            latitude: data.address?.latitude || null,
            longitude: data.address?.longitude || null
          },
          amenities: data.amenities?.map(a => a.amenityId) || [],
          existingImages: data.images || [],
          images: [],
          imagePreviews: []
        });
      } catch (err) {
        console.error("Property fetch error:", err);
        alert("Failed to load property");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [id, transactionTypes, navigate]);

  const fetchCoordinates = async () => {
    const { famousArea, city, state, country } = property.address;
    if (!city) throw new Error("City required");

    const address = [famousArea, city, state, country].filter(Boolean).join(", ");
    const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(address)}&limit=1`);
    const data = await res.json();

    if (data.features?.[0]) {
      const [lon, lat] = data.features[0].geometry.coordinates;
      return { lat, lon };
    }
    throw new Error("Address not found");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["location", "societyName", "landmark", "famousArea", "city", "state", "country"].includes(name)) {
      setProperty(prev => ({ ...prev, address: { ...prev.address, [name]: value } }));
    } else if (name === "transactionTypeId") {
      setProperty(prev => ({ ...prev, transactionTypeId: value, salePrice: "", rentPrice: "" }));
    } else {
      setProperty(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(f => URL.createObjectURL(f));
    setProperty(prev => ({
      ...prev,
      images: [...prev.images, ...files],
      imagePreviews: [...prev.imagePreviews, ...previews]
    }));
  };

  const removeImage = (i) => {
    URL.revokeObjectURL(property.imagePreviews[i]);
    setProperty(prev => ({

      ...prev,
      images: prev.images.filter((_, idx) => idx !== i),
      imagePreviews: prev.imagePreviews.filter((_, idx) => idx !== i)
    }));
  };

  const confirmDelete = (img, i) => {
    setImageToDelete({ imageName: img, index: i });
    setShowDeleteConfirm(true);
  };

  const removeExisting = async () => {
    if (!imageToDelete) return;
    try {
      await fetchWithAuth(`${process.env.REACT_APP_API_BASE || "https://localhost:7117"}/api/property-images/by-name/${imageToDelete.imageName}`
, { method: "DELETE" });
      setProperty(prev => ({
        ...prev,
        existingImages: prev.existingImages.filter((_, i) => i !== imageToDelete.index)
      }));
    } catch (err) {
      alert("Failed to delete image");
    } finally {
      setShowDeleteConfirm(false);
      setImageToDelete(null);
    }
  };

  const toggleAmenity = (id) => {
    setProperty(prev => ({
      ...prev,
      amenities: prev.amenities.includes(id) ? prev.amenities.filter(a => a !== id) : [...prev.amenities, id]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = getCurrentUser();
    if (!user?.userId) {
      alert("Please login");
      navigate("/login");
      return;
    }

    let coords = { lat: property.address.latitude, lon: property.address.longitude };
    if (!coords.lat || !coords.lon) {
      try {
        coords = await fetchCoordinates();
      } catch (err) {
        alert(err.message);
        return;
      }
    }

    const formData = new FormData();
    formData.append("Title", property.title);
    formData.append("Description", property.description || "");
    formData.append("BHKType", property.bhkType || "");
    formData.append("TotalWashrooms", Number(property.totalWashrooms || 0));
    formData.append("RequireType", property.preferredTenant || "any");
    formData.append("Status", property.status);
    formData.append("AreaSqft", Number(property.areaSqft || 0));
    formData.append("CategoryId", Number(property.categoryId || 0));
    formData.append("TransactionTypeId", Number(property.transactionTypeId || 0));
    formData.append("UserId", user.userId);

    const txType = transactionTypes.find(t => t.transactionTypeId === Number(property.transactionTypeId));
    const typeName = txType?.transactionTypeName.toLowerCase();

    if (typeName === "rent" && property.rentPrice) formData.append("RentPrice", Number(property.rentPrice));
    if (typeName === "sale" && property.salePrice) formData.append("SalePrice", Number(property.salePrice));
    if (typeName === "both") {
      if (property.rentPrice) formData.append("RentPrice", Number(property.rentPrice));
      if (property.salePrice) formData.append("SalePrice", Number(property.salePrice));
    }

    formData.append("Address.Location", property.address.location || "");
    formData.append("Address.SocietyName", property.address.societyName || "");
    formData.append("Address.Landmark", property.address.landmark || "");
    formData.append("Address.FamousArea", property.address.famousArea || "");
    formData.append("Address.City", property.address.city || "");
    formData.append("Address.State", property.address.state || "");
    formData.append("Address.Country", property.address.country || "");
    formData.append("Address.Latitude", coords.lat);
    formData.append("Address.Longitude", coords.lon);

    property.images.forEach(f => formData.append("Images", f));
    property.amenities.forEach(a => formData.append("AmenityIds", Number(a)));

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.REACT_APP_API_BASE || "https://localhost:7117"}/api/properties/${id}`, {
        method: "PUT",
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if (!res.ok) throw new Error("Update failed"); alert("âœ… Updated!");
      navigate(`/property/${id}`);
    } catch (err) {
      alert("Update failed");
    }
  };

  useEffect(() => {
    return () => property.imagePreviews.forEach(url => URL.revokeObjectURL(url));
  }, [property.imagePreviews]);

  if (loading) return <div className="add-property-container"><h2>Loading...</h2></div>;

  return (
    <div className="add-property-container">
      <button onClick={() => navigate(-1)} style={{ background: '#666', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', marginBottom: '20px' }}>â¬… Back</button>
      <h1>Edit Property</h1>

      <form className="add-property-form" onSubmit={handleSubmit}>
        <label>Title*</label>
        <input name="title" value={property.title} onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" value={property.description} onChange={handleChange} rows="4" />

        <label>Category*</label>
        <select name="categoryId" value={property.categoryId} onChange={handleChange} required>
          <option value="">Select</option>
          {categories.map(c => <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>)}
        </select>

        <label>BHK</label>
        <input name="bhkType" value={property.bhkType} onChange={handleChange} />

        <label>Preferred For</label>
        <select name="preferredTenant" value={property.preferredTenant} onChange={handleChange}>
          <option value="any">Any</option>
          <option value="family">Family</option>
          <option value="bachelor">Bachelor</option>
          <option value="girls">Girls</option>
          <option value="boys">Boys</option>
        </select>

        <label>Status</label>
        <select name="status" value={property.status} onChange={handleChange}>
          <option value="completed">Ready</option>
          <option value="ongoing">Under Construction</option>
        </select>

        <label>Available For*</label>
        <select name="transactionTypeId" value={property.transactionTypeId} onChange={handleChange} required>
          <option value="">Select</option>
          {transactionTypes.map(t => <option key={t.transactionTypeId} value={t.transactionTypeId}>{t.transactionTypeName}</option>)}
        </select>

        {property.transactionTypeId && (() => {
          const type = transactionTypes.find(t => t.transactionTypeId === Number(property.transactionTypeId));
          const name = type?.transactionTypeName.toLowerCase();
          return (name === "rent" || name === "both") && (
            <>
              <label>Rent (â‚¹/mo)</label>
              <input type="number" name="rentPrice" value={property.rentPrice} onChange={handleChange} min="0" />
            </>
          );
        })()}

        {property.transactionTypeId && (() => {
          const type = transactionTypes.find(t => t.transactionTypeId === Number(property.transactionTypeId));
          const name = type?.transactionTypeName.toLowerCase();
          return (name === "sale" || name === "both") && (
            <>
              <label>Sale Price (â‚¹)</label>
              <input type="number" name="salePrice" value={property.salePrice} onChange={handleChange} min="0" />
            </>
          );
        })()}

        <label>Area (sqft)</label>
        <input type="number" name="areaSqft" value={property.areaSqft} onChange={handleChange} />

        <label>Bathrooms</label>
        <input type="number" name="totalWashrooms" value={property.totalWashrooms} onChange={handleChange} />

        <h3>ðŸ“ Location</h3>
        <label>Location*</label>
        <input name="location" value={property.address.location} onChange={handleChange} required />
        <label>Society</label>
        <input name="societyName" value={property.address.societyName} onChange={handleChange} />
        <label>Landmark</label>
        <input name="landmark" value={property.address.landmark} onChange={handleChange} />
        <label>Area (Optional)</label>
        <input name="famousArea" value={property.address.famousArea} onChange={handleChange} />
        <label>City*</label>
        <input name="city" value={property.address.city} onChange={handleChange} required />
        <label>State*</label>
        <input name="state" value={property.address.state} onChange={handleChange} required />
        <label>Country*</label>
        <input name="country" value={property.address.country} onChange={handleChange} required />

        <h3>âœ¨ Amenities</h3>
        <div className="amenities-input-box" onClick={() => setShowAmenities(!showAmenities)}>
          {property.amenities.map(id => {
            const am = amenitiesList.find(a => a.amenityId === id);
            return am ? <span key={id} className="selected-amenity">{am.amenityName}<span className="remove" onClick={e => { e.stopPropagation(); toggleAmenity(id); }}>Ã—</span></span> : null;
          })}
          <input placeholder="Select..." readOnly />
        </div>
        {showAmenities && (
          <div className="amenities-dropdown">
            {amenitiesList.map(am => (
              <span key={am.amenityId} className={`amenity-chip ${property.amenities.includes(am.amenityId) ? "selected" : ""}`} onClick={() => toggleAmenity(am.amenityId)}>
                {property.amenities.includes(am.amenityId) ? "âœ“ " : ""}{am.amenityName}
              </span>
            ))}
          </div>
        )}

        <h3>ðŸ“¸ Images</h3>
        {property.existingImages.length > 0 && (
          <div className="image-preview-container">
            {property.existingImages.map((img, i) => (
              <div key={i} className="image-preview-wrapper">
                <img src={`${process.env.REACT_APP_API_BASE || "https://localhost:7117"}/images/${img}`} alt="" className="image-preview" />
                <button type="button" className="remove-image-btn" onClick={() => confirmDelete(img, i)}>Ã—</button>
              </div>
            ))}
          </div>
        )}

        <label>Add Images</label>
        <input type="file" multiple accept="image/*" onChange={handleFileChange} />
        {property.imagePreviews.length > 0 && (
          <div className="image-preview-container">
            {property.imagePreviews.map((img, i) => (
              <div key={i} className="image-preview-wrapper">
                <img src={img} alt="" className="image-preview" />
                <button type="button" className="remove-image-btn" onClick={() => removeImage(i)}>Ã—</button>
              </div>
            ))}
          </div>
        )}

        <button type="submit" className="submit-btn">Update</button>
      </form>

      {showDeleteConfirm && (
        <div className="dialog-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="dialog-box" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <h3>Delete Image?</h3>
            <p>This cannot be undone.</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={removeExisting} style={{ flex: 1, background: '#ef4444', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>Delete</button>
              <button onClick={() => setShowDeleteConfirm(false)} style={{ flex: 1, background: '#666', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}