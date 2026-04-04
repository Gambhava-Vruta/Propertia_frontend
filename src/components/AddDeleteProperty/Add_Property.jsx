// // import React, { useState } from "react";
// // import './Add_Property.css';

// // export default function AddPropertyPage() {
// //   const [property, setProperty] = useState({
// //     title: "",
// //     description: "",
// //     bhkType: "",
// //     requireType: "any",
// //     transactionType: "rent",
// //     status: "ongoing",
// //     salePrice: "",
// //     rentPrice: "",
// //     areaSqft: "",
// //     totalWashrooms: "",
// //     address: {
// //       location: "",
// //       city: "",
// //       state: "",
// //       country: ""
// //     },
// //     images: [],
// //     imagePreviews: [],
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     if (["location", "city", "state", "country"].includes(name)) {
// //       setProperty({
// //         ...property,
// //         address: { ...property.address, [name]: value }
// //       });
// //     } else {
// //       setProperty({ ...property, [name]: value });
// //     }
// //   };

// //   const handleFileChange = (e) => {
// //     const files = Array.from(e.target.files);
// //     const previews = files.map((file) => URL.createObjectURL(file));
// //     setProperty({ ...property, images: files, imagePreviews: previews });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     // Match backend DTO
// //     const payload = {
// //   Title: property.title,
// //   Description: property.description,
// //   BHKType: property.bhkType,
// //   RequireType: property.requireType,
// //   Status: property.status,

// //   SalePrice: property.salePrice ? Number(property.salePrice) : null,
// //   RentPrice: property.rentPrice ? Number(property.rentPrice) : null,

// //   AreaSqft: Number(property.areaSqft),
// //   TotalWashrooms: Number(property.totalWashrooms),

// //   UserId: 1,          // ✅ TEMP (logged-in user later)
// //   CategoryId: 1,      // ✅ REQUIRED

// //   Address: {
// //     Location: property.address.location,
// //     City: property.address.city,
// //     State: property.address.state,
// //     Country: property.address.country
// //   },

// //   ImagePaths: property.images.map(f => f.name),
// //   AmenityIds: []      // optional
// // };


// //     try {
// //       const response = await fetch("https://propeitia-backhand.onrender.com/api/properties", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload)
// //       });

// //       if (response.ok) {
// //         alert("Property submitted successfully!");
// //         setProperty({
// //           title: "",
// //           description: "",
// //           bhkType: "",
// //           requireType: "any",
// //           transactionType: "rent",
// //           status: "ongoing",
// //           salePrice: "",
// //           rentPrice: "",
// //           areaSqft: "",
// //           totalWashrooms: "",
// //           address: { location: "", city: "", state: "", country: "" },
// //           images: [],
// //           imagePreviews: [],
// //         });
// //       } else {
// //         const data = await response.json();
// //         console.error(data);
// //         alert("Failed to submit property. Check console for errors.");
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       alert("An error occurred while submitting property.");
// //     }
// //   };

// //   return (
// //     <div className="add-property-container">
// //       <h1>Add New Property</h1>
// //       <form onSubmit={handleSubmit} className="add-property-form">
// //         <label>Title*</label>
// //         <input type="text" name="title" value={property.title} onChange={handleChange} required />

// //         <label>Description</label>
// //         <textarea name="description" value={property.description} onChange={handleChange}></textarea>

// //         <label>BHK Type</label>
// //         <input type="text" name="bhkType" value={property.bhkType} onChange={handleChange} />

// //         <label>Requirement Type</label>
// //         <select name="requireType" value={property.requireType} onChange={handleChange}>
// //           <option value="any">Any</option>
// //           <option value="family">Family</option>
// //           <option value="bachelor">Bachelor</option>
// //           <option value="girls">Girls</option>
// //           <option value="boys">Boys</option>
// //         </select>

// //         <label>Transaction Type*</label>
// //         <select name="transactionType" value={property.transactionType} onChange={handleChange} required>
// //           <option value="rent">Rent</option>
// //           <option value="sale">Sale</option>
// //         </select>

// //         <label>Status</label>
// //         <select name="status" value={property.status} onChange={handleChange}>
// //           <option value="ongoing">Ongoing</option>
// //           <option value="completed">Completed</option>
// //           <option value="cancelled">Cancelled</option>
// //         </select>

// //         <label>Sale Price</label>
// //         <input type="number" name="salePrice" value={property.salePrice} onChange={handleChange} step="0.01" />

// //         <label>Rent Price</label>
// //         <input type="number" name="rentPrice" value={property.rentPrice} onChange={handleChange} step="0.01" />

// //         <label>Area (sqft)</label>
// //         <input type="number" name="areaSqft" value={property.areaSqft} onChange={handleChange} step="0.01" />

// //         <label>Total Washrooms</label>
// //         <input type="number" name="totalWashrooms" value={property.totalWashrooms} onChange={handleChange} />

// //         <label>Location*</label>
// //         <input type="text" name="location" value={property.address.location} onChange={handleChange} required />
// //         <label>City</label>
// //         <input type="text" name="city" value={property.address.city} onChange={handleChange} />
// //         <label>State</label>
// //         <input type="text" name="state" value={property.address.state} onChange={handleChange} />
// //         <label>Country</label>
// //         <input type="text" name="country" value={property.address.country} onChange={handleChange} />

// //         <label>Property Images</label>
// //         <input type="file" multiple onChange={handleFileChange} />

// //         <div className="image-preview-container">
// //           {property.imagePreviews.map((src, index) => (
// //             <img key={index} src={src} alt={`Preview ${index}`} className="image-preview" />
// //           ))}
// //         </div>

// //         <button type="submit" className="submit-btn">Add Property</button>
// //       </form>
// //     </div>
// //   );
// // }









// // import React, { useState } from "react";
// // import './Add_Property.css';

// // export default function AddPropertyPage() {
// //   const [property, setProperty] = useState({
// //     title: "",
// //     description: "",
// //     bhkType: "",
// //     requireType: "any",
// //     status: "ongoing",
// //     salePrice: "",
// //     rentPrice: "",
// //     areaSqft: "",
// //     totalWashrooms: "",
// //     address: {
// //       location: "",
// //       city: "",
// //       state: "",
// //       country: ""
// //     },
// //     images: [],
// //     imagePreviews: [],
// //     amenities: [] // array of selected amenity IDs
// //   });

// //   // Handle input change
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     if (["location", "city", "state", "country"].includes(name)) {
// //       setProperty({
// //         ...property,
// //         address: { ...property.address, [name]: value }
// //       });
// //     } else {
// //       setProperty({ ...property, [name]: value });
// //     }
// //   };

// //   // Handle file selection
// //   const handleFileChange = (e) => {
// //     const files = Array.from(e.target.files);
// //     const previews = files.map((file) => URL.createObjectURL(file));
// //     setProperty({ ...property, images: files, imagePreviews: previews });
// //   };

// //   // Handle form submit
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const formData = new FormData();

// //     formData.append("Title", property.title);
// //     formData.append("Description", property.description);
// //     formData.append("BHKType", property.bhkType);
// //     formData.append("RequireType", property.requireType);
// //     formData.append("Status", property.status);
// //     formData.append("SalePrice", property.salePrice || "");
// //     formData.append("RentPrice", property.rentPrice || "");
// //     formData.append("AreaSqft", property.areaSqft);
// //     formData.append("TotalWashrooms", property.totalWashrooms);
// //     formData.append("UserId", 1); // TEMP: logged-in user
// //     formData.append("CategoryId", 1); // TEMP: selected category

// //     formData.append("Address.Location", property.address.location);
// //     formData.append("Address.City", property.address.city);
// //     formData.append("Address.State", property.address.state);
// //     formData.append("Address.Country", property.address.country);

// //     // Add images
// //     property.images.forEach(file => formData.append("Images", file));

// //     // Add selected amenities
// //     property.amenities.forEach(id => formData.append("AmenityIds", id));

// //     try {
// //       const res = await fetch("https://propeitia-backhand.onrender.com/api/properties", {
// //         method: "POST",
// //         body: formData // ✅ Do NOT set Content-Type manually
// //       });

// //       if (res.ok) {
// //         alert("Property submitted successfully!");
// //         setProperty({
// //           title: "",
// //           description: "",
// //           bhkType: "",
// //           requireType: "any",
// //           status: "ongoing",
// //           salePrice: "",
// //           rentPrice: "",
// //           areaSqft: "",
// //           totalWashrooms: "",
// //           address: { location: "", city: "", state: "", country: "" },
// //           images: [],
// //           imagePreviews: [],
// //           amenities: [1
            
// //           ]
// //         });
// //       } else {
// //         const data = await res.json();
// //         console.error(data);
// //         alert("Failed to submit property. Check console for errors.");
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       alert("An error occurred while submitting property.");
// //     }
// //   };

// //   return (
// //     <div className="add-property-container">
// //       <h1>Add New Property</h1>
// //       <form onSubmit={handleSubmit} className="add-property-form">

// //         <label>Title*</label>
// //         <input type="text" name="title" value={property.title} onChange={handleChange} required />

// //         <label>Description</label>
// //         <textarea name="description" value={property.description} onChange={handleChange}></textarea>

// //         <label>BHK Type</label>
// //         <input type="text" name="bhkType" value={property.bhkType} onChange={handleChange} />

// //         <label>Requirement Type</label>
// //         <select name="requireType" value={property.requireType} onChange={handleChange}>
// //           <option value="any">Any</option>
// //           <option value="family">Family</option>
// //           <option value="bachelor">Bachelor</option>
// //           <option value="girls">Girls</option>
// //           <option value="boys">Boys</option>
// //         </select>

// //         <label>Status</label>
// //         <select name="status" value={property.status} onChange={handleChange}>
// //           <option value="ongoing">Ongoing</option>
// //           <option value="completed">Completed</option>
// //           <option value="cancelled">Cancelled</option>
// //         </select>

// //         <label>Sale Price</label>
// //         <input type="number" name="salePrice" value={property.salePrice} onChange={handleChange} />

// //         <label>Rent Price</label>
// //         <input type="number" name="rentPrice" value={property.rentPrice} onChange={handleChange} />

// //         <label>Area (sqft)</label>
// //         <input type="number" name="areaSqft" value={property.areaSqft} onChange={handleChange} />

// //         <label>Total Washrooms</label>
// //         <input type="number" name="totalWashrooms" value={property.totalWashrooms} onChange={handleChange} />

// //         <label>Location</label>
// //         <input type="text" name="location" value={property.address.location} onChange={handleChange} />
// //         <label>City</label>
// //         <input type="text" name="city" value={property.address.city} onChange={handleChange} />
// //         <label>State</label>
// //         <input type="text" name="state" value={property.address.state} onChange={handleChange} />
// //         <label>Country</label>
// //         <input type="text" name="country" value={property.address.country} onChange={handleChange} />

// //         <label>Property Images</label>
// //         <input type="file" multiple onChange={handleFileChange} />

// //         <div className="image-preview-container">
// //           {property.imagePreviews.map((src, i) => (
// //             <img key={i} src={src} alt={`Preview ${i}`} className="image-preview" />
// //           ))}
// //         </div>

// //         <button type="submit" className="submit-btn">Add Property</button>
// //       </form>
// //     </div>
// //   );
// // }



// // import React, { useEffect, useState } from "react";
// // import "./Add_Property.css";

// // export default function AddPropertyPage() {
// //   const [categories, setCategories] = useState([]);
// //   const [amenitiesList, setAmenitiesList] = useState([]);
// //   const [showAmenities, setShowAmenities] = useState(false);
// //   const [property, setProperty] = useState({
// //     title: "",
// //     description: "",
// //     bhkType: "",
// //     requireType: "any",
// //     status: "ongoing",
// //     salePrice: "",
// //     rentPrice: "",
// //     areaSqft: "",
// //     totalWashrooms: "",
// //     categoryId: "",
// //     address: {
// //       location: "",
// //       city: "",
// //       state: "",
// //       country: ""
// //     },
// //     images: [],
// //     imagePreviews: [],
// //     amenities: []
// //   });

// //   // ================= FETCH CATEGORY & AMENITIES =================
// //   useEffect(() => {
// //     fetch("https://propeitia-backhand.onrender.com/api/Categories")
// //       .then(res => res.json())
// //       .then(data => setCategories(data))
// //       .catch(err => console.error("Category error:", err));

// //     fetch("https://propeitia-backhand.onrender.com/api/Amenities")
// //       .then(res => res.json())
// //       .then(data => setAmenitiesList(data))
// //       .catch(err => console.error("Amenities error:", err));
// //   }, []);

// //   // ================= HANDLE INPUT =================
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;

// //     if (["location", "city", "state", "country"].includes(name)) {
// //       setProperty(prev => ({
// //         ...prev,
// //         address: { ...prev.address, [name]: value }
// //       }));
// //     } else {
// //       setProperty(prev => ({ ...prev, [name]: value }));
// //     }
// //   };

// //   // ================= HANDLE IMAGES =================
// // const handleFileChange = (e) => {
// //   const newFiles = Array.from(e.target.files);
// //   const newPreviews = newFiles.map(file => URL.createObjectURL(file));

// //   setProperty(prev => ({
// //     ...prev,
// //     images: [...prev.images, ...newFiles],           // append new files
// //     imagePreviews: [...prev.imagePreviews, ...newPreviews] // append new previews
// //   }));
// // };


// //   // ================= TOGGLE AMENITY =================
// //   const toggleAmenity = (id) => {
// //     setProperty(prev => ({
// //       ...prev,
// //       amenities: prev.amenities.includes(id)
// //         ? prev.amenities.filter(a => a !== id)
// //         : [...prev.amenities, id]
// //     }));
// //   };

// //   // ================= SUBMIT =================
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const formData = new FormData();

// //     formData.append("Title", property.title);
// //     formData.append("Description", property.description);
// //     formData.append("BHKType", property.bhkType);
// //     formData.append("RequireType", property.requireType);
// //     formData.append("Status", property.status);
// //     formData.append("SalePrice", property.salePrice || "");
// //     formData.append("RentPrice", property.rentPrice || "");
// //     formData.append("AreaSqft", property.areaSqft);
// //     formData.append("TotalWashrooms", property.totalWashrooms);
// //     formData.append("UserId", 1); // temp
// //     formData.append("CategoryId", property.categoryId);

// //     formData.append("Address.Location", property.address.location);
// //     formData.append("Address.City", property.address.city);
// //     formData.append("Address.State", property.address.state);
// //     formData.append("Address.Country", property.address.country);

// //     property.images.forEach(file =>
// //       formData.append("Images", file)
// //     );

// //     property.amenities.forEach(id =>
// //       formData.append("AmenityIds", id)
// //     );

// //     try {
// //       const res = await fetch("https://propeitia-backhand.onrender.com/api/properties", {
// //         method: "POST",
// //         body: formData
// //       });

// //       if (res.ok) {
// //         alert("Property added successfully!");

// //         setProperty({
// //           title: "",
// //           description: "",
// //           bhkType: "",
// //           requireType: "any",
// //           status: "ongoing",
// //           salePrice: "",
// //           rentPrice: "",
// //           areaSqft: "",
// //           totalWashrooms: "",
// //           categoryId: "",
// //           address: { location: "", city: "", state: "", country: "" },
// //           images: [],
// //           imagePreviews: [],
// //           amenities: []
// //         });
// //       } else {
// //         const err = await res.json();
// //         console.error(err);
// //         alert("Failed to add property");
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       alert("Server error");
// //     }
// //   };

// //   // ================= UI =================
// //   return (
// //     <div className="add-property-container">
// //       <h1>Add Property</h1>

// //       <form className="add-property-form" onSubmit={handleSubmit}>

// //         <label>Title*</label>
// //         <input name="title" value={property.title} onChange={handleChange} required />

// //         <label>Description</label>
// //         <textarea name="description" value={property.description} onChange={handleChange} />

// //         <label>Category*</label>
// //         <select name="categoryId" value={property.categoryId} onChange={handleChange} required>
// //           <option value="">Select Category</option>
// //           {categories.map(cat => (
// //             <option key={cat.categoryId} value={cat.categoryId}>
// //               {cat.categoryName}
// //             </option>
// //           ))}
// //         </select>

// //         <label>BHK Type</label>
// //         <input name="bhkType" value={property.bhkType} onChange={handleChange} />

// //         <label>Requirement Type</label>
// //         <select name="requireType" value={property.requireType} onChange={handleChange}>
// //           <option value="any">Any</option>
// //           <option value="family">Family</option>
// //           <option value="bachelor">Bachelor</option>
// //           <option value="girls">Girls</option>
// //           <option value="boys">Boys</option>
// //         </select>

// //         <label>Status</label>
// //         <select name="status" value={property.status} onChange={handleChange}>
// //           <option value="ongoing">Ongoing</option>
// //           <option value="completed">Completed</option>
// //           <option value="cancelled">Cancelled</option>
// //         </select>

// //         <label>Sale Price</label>
// //         <input type="number" name="salePrice" value={property.salePrice} onChange={handleChange} />

// //         <label>Rent Price</label>
// //         <input type="number" name="rentPrice" value={property.rentPrice} onChange={handleChange} />

// //         <label>Area (sqft)</label>
// //         <input type="number" name="areaSqft" value={property.areaSqft} onChange={handleChange} />

// //         <label>Total Washrooms</label>
// //         <input type="number" name="totalWashrooms" value={property.totalWashrooms} onChange={handleChange} />

// //         <label>Location</label>
// //         <input name="location" value={property.address.location} onChange={handleChange} />

// //         <label>City</label>
// //         <input name="city" value={property.address.city} onChange={handleChange} />

// //         <label>State</label>
// //         <input name="state" value={property.address.state} onChange={handleChange} />

// //         <label>Country</label>
// //         <input name="country" value={property.address.country} onChange={handleChange} />

// //         <label>Amenities</label>
// //          <div
// //           className="amenities-input-box"
// //           onClick={() => setShowAmenities(!showAmenities)}
// //         >
// //           {property.amenities.map(id => {
// //             const am = amenitiesList.find(a => a.amenityId === id);
// //             return (
// //               <span key={id} className="selected-amenity">
// //                 {am?.amenityName}
// //                 <span
// //                   className="remove"
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     toggleAmenity(id);
// //                   }}
// //                 >
// //                   ×
// //                 </span>
// //               </span>
// //             );
// //           })}
// //           <input placeholder="Select amenities" readOnly />
// //         </div>

// //         {showAmenities && (
// //           <div className="amenities-dropdown">
// //             {amenitiesList.map(am => (
// //               <span
// //                 key={am.amenityId}
// //                 className={`amenity-chip ${
// //                   property.amenities.includes(am.amenityId) ? "selected" : ""
// //                 }`}
// //                 onClick={() => toggleAmenity(am.amenityId)}
// //               >
// //                 {am.amenityName}
// //               </span>
// //             ))}
// //           </div>
// //         )}

// //         <label>Images</label>
// //         <input type="file" multiple onChange={handleFileChange} />

// //         <div className="image-preview-container">
// //           {property.imagePreviews.map((img, i) => (
// //             <img key={i} src={img} alt="preview" className="image-preview" />
// //           ))}
// //         </div>

// //         <button type="submit" className="submit-btn">
// //           Add Property
// //         </button>

// //       </form>
// //     </div>
// //   );
// // }



// import React, { useEffect, useState } from "react";
// import "./Add_Property.css";

// export default function AddPropertyPage() {
//   const [categories, setCategories] = useState([]);
//   const [amenitiesList, setAmenitiesList] = useState([]);
//   const [showAmenities, setShowAmenities] = useState(false);

//   const [property, setProperty] = useState({
//     title: "",
//     description: "",
//     bhkType: "",
//     requireType: "any",
//     status: "ongoing",

//     transactionType: "rent", // ✅ NEW (rent | sell | both)

//     salePrice: "",
//     rentPrice: "",
//     areaSqft: "",
//     totalWashrooms: "",
//     categoryId: "",
// address: {
//   location: "",
//   societyName: "",
//   landmark: "",
//   famousArea: "",
//   city: "",
//   state: "",
//   country: ""
// },

//     images: [],
//     imagePreviews: [],
//     amenities: []
//   });

//   // ================= FETCH CATEGORY & AMENITIES =================
//   useEffect(() => {
//     fetch("https://propeitia-backhand.onrender.com/api/Categories")
//       .then(res => res.json())
//       .then(setCategories);

//     fetch("https://propeitia-backhand.onrender.com/api/Amenities")
//       .then(res => res.json())
//       .then(setAmenitiesList);
//   }, []);

//   // ================= HANDLE INPUT =================
//   const handleChange = (e) => {
//     const { name, value } = e.target;

// if (
//   ["location", "societyName", "landmark", "famousArea", "city", "state", "country"]
//   .includes(name)
// ) {
//       setProperty(prev => ({
//         ...prev,
//         address: { ...prev.address, [name]: value }
//       }));
//     } else {
//       setProperty(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   // ================= HANDLE IMAGES (APPEND) =================
//   const handleFileChange = (e) => {
//     const newFiles = Array.from(e.target.files);
//     const newPreviews = newFiles.map(file =>
//       URL.createObjectURL(file)
//     );

//     setProperty(prev => ({
//       ...prev,
//       images: [...prev.images, ...newFiles],
//       imagePreviews: [...prev.imagePreviews, ...newPreviews]
//     }));
//   };

//   // ================= TOGGLE AMENITY =================
//   const toggleAmenity = (id) => {
//     setProperty(prev => ({
//       ...prev,
//       amenities: prev.amenities.includes(id)
//         ? prev.amenities.filter(a => a !== id)
//         : [...prev.amenities, id]
//     }));
//   };

//   // ================= SUBMIT =================
// // ================= SUBMIT =================
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   const formData = new FormData();
//   formData.append("Title", property.title);
//   formData.append("Description", property.description || "");
//   formData.append("BHKType", property.bhkType || "");
//   formData.append("RequireType", property.requireType);
//   formData.append("Status", property.status);
//   formData.append("AreaSqft", property.areaSqft || 0);
//   formData.append("TotalWashrooms", property.totalWashrooms || 0);
//   formData.append("UserId", 1);
//   formData.append("CategoryId", property.categoryId || 0);

//   // Prices
//   if (property.transactionType === "rent" || property.transactionType === "both")
//     formData.append("RentPrice", property.rentPrice || 0);

//   if (property.transactionType === "sell" || property.transactionType === "both")
//     formData.append("SalePrice", property.salePrice || 0);

//   // ✅ Address - Send as individual fields, not JSON
//   formData.append("Address.Location", property.address.location || "");
//   formData.append("Address.City", property.address.city || "");
//   formData.append("Address.State", property.address.state || "");
//   formData.append("Address.Country", property.address.country || "");
//   formData.append("Address.SocietyName", property.address.societyName || "");
//   formData.append("Address.Landmark", property.address.landmark || "");
//   formData.append("Address.FamousArea", property.address.famousArea || "");

//   // Images
//   property.images.forEach(file => formData.append("Images", file));

//   // Amenities
//   property.amenities.forEach(id => formData.append("AmenityIds", Number(id)));

//   // Debug
//   console.log("FormData contents:");
//   for (let pair of formData.entries()) {
//     console.log(pair[0], pair[1]);
//   }

//   try {
//     const res = await fetch("https://propeitia-backhand.onrender.com/api/properties", {
//       method: "POST",
//       body: formData
//     });

//     if (res.ok) {
//       alert("Property added successfully!");
//       // Reset form
//       setProperty({
//         title: "",
//         description: "",
//         bhkType: "",
//         requireType: "any",
//         status: "ongoing",
//         transactionType: "rent",
//         salePrice: "",
//         rentPrice: "",
//         areaSqft: "",
//         totalWashrooms: "",
//         categoryId: "",
//         address: {
//           location: "",
//           societyName: "",
//           landmark: "",
//           famousArea: "",
//           city: "",
//           state: "",
//           country: ""
//         },
//         images: [],
//         imagePreviews: [],
//         amenities: []
//       });
//     } else {
//       const errorData = await res.text();
//       console.error("Error response:", errorData);
//       alert(`Failed to add property: ${errorData}`);
//     }
//   } catch (err) {
//     console.error("Server error:", err);
//     alert("Server error: " + err.message);
//   }
// };


//   // ================= UI =================
//   return (
//     <div className="add-property-container">
//       <h1>Add Property</h1>

//       <form className="add-property-form" onSubmit={handleSubmit}>

//         <label>Title*</label>
//         <input name="title" value={property.title} onChange={handleChange} required />

//         <label>Description</label>
//         <textarea name="description" value={property.description} onChange={handleChange} />

//         <label>Category*</label>
//         <select name="categoryId" value={property.categoryId} onChange={handleChange} required>
//           <option value="">Select Category</option>
//           {categories.map(cat => (
//             <option key={cat.categoryId} value={cat.categoryId}>
//               {cat.categoryName}
//             </option>
//           ))}
//         </select>

//         <label>BHK Type</label>
//         <input name="bhkType" value={property.bhkType} onChange={handleChange} />

//         <label>Requirement Type</label>
//         <select name="requireType" value={property.requireType} onChange={handleChange}>
//           <option value="any">Any</option>
//           <option value="family">Family</option>
//           <option value="bachelor">Bachelor</option>
//           <option value="girls">Girls</option>
//           <option value="boys">Boys</option>
//         </select>

//         <label>Status</label>
//         <select name="status" value={property.status} onChange={handleChange}>
//           <option value="ongoing">Ongoing</option>
//           <option value="completed">Completed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>

//         {/* ✅ TRANSACTION TYPE */}
//         <label>Transaction Type*</label>
//         <select
//           name="transactionType"
//           value={property.transactionType}
//           onChange={handleChange}
//           required
//         >
//           <option value="rent">Rent</option>
//           <option value="sell">Sell</option>
//           <option value="both">Both</option>
//         </select>

//         {/* ✅ CONDITIONAL PRICE FIELDS */}
//         {(property.transactionType === "rent" ||
//           property.transactionType === "both") && (
//           <>
//             <label>Rent Price</label>
//             <input
//               type="number"
//               name="rentPrice"
//               value={property.rentPrice}
//               onChange={handleChange}
//             />
//           </>
//         )}

//         {(property.transactionType === "sell" ||
//           property.transactionType === "both") && (
//           <>
//             <label>Sale Price</label>
//             <input
//               type="number"
//               name="salePrice"
//               value={property.salePrice}
//               onChange={handleChange}
//             />
//           </>
//         )}

//         <label>Area (sqft)</label>
//         <input type="number" name="areaSqft" value={property.areaSqft} onChange={handleChange} />

//         <label>Total Washrooms</label>
//         <input type="number" name="totalWashrooms" value={property.totalWashrooms} onChange={handleChange} />

//         <label>Location</label>
//         <input name="location" value={property.address.location} onChange={handleChange} />

//         <label>City</label>
//         <input name="city" value={property.address.city} onChange={handleChange} />
// <label>Society / Building Name</label>
// <input
//   name="societyName"
//   value={property.address.societyName}
//   onChange={handleChange}
// />

// <label>Landmark</label>
// <input
//   name="landmark"
//   value={property.address.landmark}
//   onChange={handleChange}
// />

// <label>Famous Area (used for map)</label>
// <input
//   name="famousArea"
//   value={property.address.famousArea}
//   onChange={handleChange}
//   placeholder="e.g. Mavdi, Andheri West"
// />

//         <label>State</label>
//         <input name="state" value={property.address.state} onChange={handleChange} />

//         <label>Country</label>
//         <input name="country" value={property.address.country} onChange={handleChange} />

//         {/* AMENITIES */}
//         <label>Amenities</label>
//         <div
//           className="amenities-input-box"
//           onClick={() => setShowAmenities(!showAmenities)}
//         >
//           {property.amenities.map(id => {
//             const am = amenitiesList.find(a => a.amenityId === id);
//             return (
//               <span key={id} className="selected-amenity">
//                 {am?.amenityName}
//                 <span
//                   className="remove"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     toggleAmenity(id);
//                   }}
//                 >
//                   ×
//                 </span>
//               </span>
//             );
//           })}
//           <input placeholder="Select amenities" readOnly />
//         </div>

//         {showAmenities && (
//           <div className="amenities-dropdown">
//             {amenitiesList.map(am => (
//               <span
//                 key={am.amenityId}
//                 className={`amenity-chip ${
//                   property.amenities.includes(am.amenityId) ? "selected" : ""
//                 }`}
//                 onClick={() => toggleAmenity(am.amenityId)}
//               >
//                 {am.amenityName}
//               </span>
//             ))}
//           </div>
//         )}

//         {/* IMAGES */}
//         <label>Images</label>
//         <input type="file" multiple onChange={handleFileChange} />

//         <div className="image-preview-container">
//           {property.imagePreviews.map((img, i) => (
//             <img key={i} src={img} alt="preview" className="image-preview" />
//           ))}
//         </div>

//         <button type="submit" className="submit-btn">
//           Add Property
//         </button>

//       </form>
//     </div>
//   );
// }
import  { useEffect, useState } from "react";
import "./Add_Property.css";
import { fetchWithAuth } from '../login/api'; // adjust path
export default function AddPropertyPage() {
  const [categories, setCategories] = useState([]);
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [showAmenities, setShowAmenities] = useState(false);
  const User=localStorage.getItem("currentUser")
  const [property, setProperty] = useState({
    title: "",
    description: "",
    bhkType: "",
    preferredTenant: "any",
    status: "ongoing",
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
    amenities: []
  });

  // Fetch categories, amenities, and transaction types
  // useEffect(() => {
  //   fetch("https://propeitia-backhand.onrender.com/api/Categories")
  //     .then(res => res.json())
  //     .then(setCategories)
  //     .catch(err => console.error("Category error:", err));

  //   fetch("https://propeitia-backhand.onrender.com/api/Amenities")
  //     .then(res => res.json())
  //     .then(setAmenitiesList)
  //     .catch(err => console.error("Amenities error:", err));

  //   fetch("https://propeitia-backhand.onrender.com/api/TransactionType")
  //     .then(res => res.json())
  //     .then(setTransactionTypes)
  //     .catch(err => console.error("Transaction types error:", err));
  // }, []);
  useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    try {
      const cats = await fetchWithAuth("https://propeitia-backhand.onrender.com/api/Categories", {
        signal: controller.signal
      });
      setCategories(cats);

      const ams = await fetchWithAuth("https://propeitia-backhand.onrender.com/api/Amenities", {
        signal: controller.signal
      });
      setAmenitiesList(ams);

      const tTypes = await fetchWithAuth("https://propeitia-backhand.onrender.com/api/TransactionType", {
        signal: controller.signal
      });
      setTransactionTypes(tTypes);

    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Error fetching data:", err);
      }
    }
  };

  fetchData();

  return () => controller.abort();
}, []);

const fetchCoordinates = async () => {
  const { famousArea, city, state, country } = property.address;

  const address = [famousArea, city, state, country]
    .filter(Boolean)
    .join(", ");

  if (!address) throw new Error("No address parts provided");

  console.log("📍 Geocoding address:", address);

  const res = await fetch(
    `https://photon.komoot.io/api/?q=${encodeURIComponent(address)}&limit=1`
  );

  const data = await res.json();
  console.log("🌍 Photon response:", data);

  if (data.features && data.features.length > 0) {
    const [lon, lat] = data.features[0].geometry.coordinates;
    return { lat, lon };
  }

  throw new Error("Address not found in Photon");
};


  // Handle input changes
  const handleChange = async (e) => {
    const { name, value } = e.target;
   if (["location", "societyName", "landmark", "famousArea", "city", "state", "country"].includes(name)) {
    setProperty(prev => ({
      ...prev,
      address: { ...prev.address, [name]: value }
    }));
  } else if (name === "transactionTypeId") {
    setProperty(prev => ({
      ...prev,
      transactionTypeId: value,
      salePrice: "",
      rentPrice: ""
    }));
  } else {
    setProperty(prev => ({ ...prev, [name]: value }));
  }
};

  // Handle image uploads (append new images)
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));

    setProperty(prev => ({
      ...prev,
      images: [...prev.images, ...newFiles],
      imagePreviews: [...prev.imagePreviews, ...newPreviews]
    }));
  };

  // Remove image
  const removeImage = (index) => {
    setProperty(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imagePreviews: prev.imagePreviews.filter((_, i) => i !== index)
    }));
  };

  // Toggle amenity selection
  const toggleAmenity = (id) => {
    setProperty(prev => ({
      ...prev,
      amenities: prev.amenities.includes(id)
        ? prev.amenities.filter(a => a !== id)
        : [...prev.amenities, id]
    }));
  };
    const getUserId = () => {
    const currentUserStr = localStorage.getItem("currentUser");
    if (currentUserStr) {
      try {
        const currentUser = JSON.parse(currentUserStr);
        return currentUser.userId;
      } catch (error) {
        console.error("Error parsing currentUser from localStorage:", error);
        return null;
      }
    }
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();
  // Get userId from localStorage


  const UserId = getUserId();
  
  // // Debugging: Check if UserId exists
  // useEffect(() => {
  //   if (!UserId) {
  //     console.warn("⚠️ No user ID found in localStorage. User must be logged in.");
  //   } else {
  //     console.log("✅ User ID:", UserId);
  //   }
  // }, [UserId]);

  let coordinates = null;
  try {
    coordinates = await fetchCoordinates();
  } catch {
    console.warn("⚠️ Geocoding failed — saving property without coordinates.");
  }
    const formData = new FormData();

    // Basic property info
    formData.append("Title", property.title);
    formData.append("Description", property.description || "");
    formData.append("BHKType", property.bhkType || "");
    
    // Map transaction type to RequireType for backend
    const selectedTransactionType = transactionTypes.find(
      t => t.transactionTypeId === Number(property.transactionTypeId)
    );
    const transactionTypeName = selectedTransactionType?.transactionTypeName.toLowerCase();
    formData.append("RequireType", transactionTypeName || "any");
    
    formData.append("Status", property.status);
    formData.append("AreaSqft", property.areaSqft || 0);
    formData.append("TotalWashrooms", property.totalWashrooms || 0);
    formData.append("UserId", UserId); // TODO: Replace with actual logged-in user
    formData.append("CategoryId", property.categoryId || 0);

    // Prices based on transaction type
    //  selectedTransactionType = transactionTypes.find(
    //   t => t.transactionTypeId === Number(property.transactionTypeId)
    // );
    //  transactionTypeName = selectedTransactionType?.transactionTypeName.toLowerCase();

    if (transactionTypeName === "rent" || transactionTypeName === "any") {
      if (property.rentPrice && Number(property.rentPrice) > 0) {
        formData.append("RentPrice", Number(property.rentPrice));
      }
    }

    if (transactionTypeName === "sale" || transactionTypeName === "any") {
      if (property.salePrice && Number(property.salePrice) > 0) {
        formData.append("SalePrice", Number(property.salePrice));
      }
    }

    // Address fields - matching backend DTO naming
    formData.append("Address.Location", property.address.location || "");
    formData.append("Address.City", property.address.city || "");
    formData.append("Address.State", property.address.state || "");
    formData.append("Address.Country", property.address.country || "");
    formData.append("Address.SocietyName", property.address.societyName || "");
    formData.append("Address.Landmark", property.address.landmark || "");
    formData.append("Address.FamousArea", property.address.famousArea || "");
    // Only send coordinates if geocoding succeeded
    if (coordinates) {
      formData.append("Address.Latitude", coordinates.lat);
      formData.append("Address.Longitude", coordinates.lon);
    }

    // Images
    property.images.forEach(file => formData.append("Images", file));

    // Amenities
    property.amenities.forEach(id => formData.append("AmenityIds", Number(id)));

    // Debug: Log FormData contents
    console.log("=== FormData Contents ===");
    for (let pair of formData.entries()) {
      console.log(pair[0], ":", pair[1]);
    }

    try {
const token = localStorage.getItem('token');
const res = await fetch("https://propeitia-backhand.onrender.com/api/properties", {
  method: "POST",
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});

      if (res.ok) {
        const result = await res.json();
        alert("Property added successfully!");
        console.log("Created property ID:", result);

        // Reset form
        setProperty({
          title: "",
          description: "",
          bhkType: "",
          preferredTenant: "any",
          status: "ongoing",
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
          amenities: []
        });
      } else {
        const errorData = await res.text();
        console.error("Error response:", errorData);
        alert(`Failed to add property: ${errorData}`);
      }
    } catch (err) {
      console.error("Server error:", err);
      alert("Server error: " + err.message);
    }
  };

  return (
    <div className="add-property-container">
      <h1>Add Property</h1>

      <form className="add-property-form" onSubmit={handleSubmit}>

        <label>Title*</label>
        <input 
          name="title" 
          value={property.title} 
          onChange={handleChange} 
          required 
          placeholder="e.g., Spacious 2BHK Apartment"
        />

        <label>Description</label>
        <textarea 
          name="description" 
          value={property.description} 
          onChange={handleChange}
          placeholder="Describe the property..."
          rows="4"
        />

        <label>Category*</label>
        <select name="categoryId" value={property.categoryId} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.categoryName}
            </option>
          ))}
        </select>

        <label>BHK Type</label>
        <input 
          name="bhkType" 
          value={property.bhkType} 
          onChange={handleChange}
          placeholder="e.g., 2BHK, 3BHK, Studio"
        />

        <label>Preferred Tenant/Buyer (Optional)</label>
        <select name="preferredTenant" value={property.preferredTenant} onChange={handleChange}>
          <option value="any">Any</option>
          <option value="family">Family</option>
          <option value="bachelor">Bachelor</option>
          <option value="girls">Girls Only</option>
          <option value="boys">Boys Only</option>
        </select>

        <label>Status</label>
        <select name="status" value={property.status} onChange={handleChange}>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <label>Transaction Type*</label>
        <select
          name="transactionTypeId"
          value={property.transactionTypeId}
          onChange={handleChange}
          required
        >
          <option value="">Select Transaction Type</option>
          {transactionTypes.map(type => (
            <option key={type.transactionTypeId} value={type.transactionTypeId}>
              {type.transactionTypeName}
            </option>
          ))}
        </select>

        {/* Show Rent Price field */}
        {property.transactionTypeId && (() => {
          const selectedType = transactionTypes.find(
            t => t.transactionTypeId === Number(property.transactionTypeId)
          );
          const typeName = selectedType?.transactionTypeName.toLowerCase();
          
          return (typeName === "rent" || typeName === "both") && (
            <>
              <label>Rent Price (₹/month) {typeName === "rent" ? "*" : ""}</label>
              <input
                type="number"
                name="rentPrice"
                value={property.rentPrice}
                onChange={handleChange}
                placeholder="e.g., 15000"
                required={typeName === "rent"}
                min="0"
              />
            </>
          );
        })()}

        {/* Show Sale Price field */}
        {property.transactionTypeId && (() => {
          const selectedType = transactionTypes.find(
            t => t.transactionTypeId === Number(property.transactionTypeId)
          );
          const typeName = selectedType?.transactionTypeName.toLowerCase();
          
          return (typeName === "sale" || typeName === "both") && (
            <>
              <label>Sale Price (₹) {typeName === "sale" ? "*" : ""}</label>
              <input
                type="number"
                name="salePrice"
                value={property.salePrice}
                onChange={handleChange}
                placeholder="e.g., 5500000"
                required={typeName === "sale"}
                min="0"
              />
            </>
          );
        })()}

        <label>Area (sqft)</label>
        <input 
          type="number" 
          name="areaSqft" 
          value={property.areaSqft} 
          onChange={handleChange}
          placeholder="e.g., 950"
        />

        <label>Total Washrooms</label>
        <input 
          type="number" 
          name="totalWashrooms" 
          value={property.totalWashrooms} 
          onChange={handleChange}
          placeholder="e.g., 2"
        />

        <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>Address Details</h3>

        <label>Location / House Number*</label>
        <input 
          name="location" 
          value={property.address.location} 
          onChange={handleChange}
          placeholder="e.g., 181 J.K Sagar Vatika"
          required
        />

        <label>Society / Building Name</label>
        <input
          name="societyName"
          value={property.address.societyName}
          onChange={handleChange}
          placeholder="e.g., JK Sagar Vatika"
        />

        <label>Landmark</label>
        <input
          name="landmark"
          value={property.address.landmark}
          onChange={handleChange}
          placeholder="e.g., Near Mavdi Circle"
        />

        <label>Famous Area (Optional)</label>
        <input
          name="famousArea"
          value={property.address.famousArea}
          onChange={handleChange}
          placeholder="e.g., Mavdi"
        />

        <label>City*</label>
        <input 
          name="city" 
          value={property.address.city} 
          onChange={handleChange}
          placeholder="e.g., Rajkot"
          required
        />

        <label>State*</label>
        <input 
          name="state" 
          value={property.address.state} 
          onChange={handleChange}
          placeholder="e.g., Gujarat"
          required
        />

        <label>Country*</label>
        <input 
          name="country" 
          value={property.address.country} 
          onChange={handleChange}
          placeholder="e.g., India"
          required
        />

        <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>Amenities</h3>
        
        <label>Select Amenities</label>
        <div
          className="amenities-input-box"
          onClick={() => setShowAmenities(!showAmenities)}
        >
          {property.amenities.map(id => {
            const am = amenitiesList.find(a => a.amenityId === id);
            return (
              <span key={id} className="selected-amenity">
                {am?.amenityName}
                <span
                  className="remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleAmenity(id);
                  }}
                >
                  ×
                </span>
              </span>
            );
          })}
          <input placeholder="Click to select amenities..." readOnly />
        </div>

        {showAmenities && (
          <div className="amenities-dropdown">
            {amenitiesList.map(am => (
              <span
                key={am.amenityId}
                className={`amenity-chip ${
                  property.amenities.includes(am.amenityId) ? "selected" : ""
                }`}
                onClick={() => toggleAmenity(am.amenityId)}
              >
                {am.amenityName}
              </span>
            ))}
          </div>
        )}

        <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>Property Images</h3>
        
        <label>Upload Images</label>
        <input type="file" multiple accept="image/*" onChange={handleFileChange} />

        <div className="image-preview-container">
          {property.imagePreviews.map((img, i) => (
            <div key={i} className="image-preview-wrapper">
              <img src={img} alt={`Preview ${i + 1}`} className="image-preview" />
              <button
                type="button"
                className="remove-image-btn"
                onClick={() => removeImage(i)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <button type="submit" className="submit-btn">
          Add Property
        </button>

      </form>
    </div>
  );
}