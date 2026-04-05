
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./PropertyDetails.css";
// import { fetchWithAuth } from '../login/api';
// import { getCurrentUser, getToken } from '../login/Auth';

// export default function PropertyDetails() {
//     console.log("🏘️ PropertyDetails component rendered");
//   console.log("  - User:", getCurrentUser());
//   console.log("  - Token exists:", !!getToken());
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [property, setProperty] = useState(null);
//   const [bhk, setBhk] = useState(null);
//   const [owner, setOwner] = useState(null);
//   const [showNearby, setShowNearby] = useState(false);
//   const [loadingNearby, setLoadingNearby] = useState(false);
//   const [coordinates, setCoordinates] = useState(null);
//   const [nearbyPlaces, setNearbyPlaces] = useState({});
// const currentUser = getCurrentUser();

// const canEdit =
//   currentUser &&
//   (currentUser.userType === 'seller' || currentUser.userType === 'admin');

//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric"
//     });

//   // Fetch owner details
//   useEffect(() => {
//   if (!property?.user?.userId) return;

//   const getOwner = async () => {
//     const users = await fetchWithAuth("https://propeitia-backhand.onrender.com/api/Users");
//     if (users) {
//       const found = users.find(u => Number(u.userId) === Number(property.user.userId));
//       setOwner(found);
//     }
//   };
//   getOwner();
// }, [property]);


// useEffect(() => {
//   if (!property?.address?.latitude || !property?.address?.longitude) return;

//   setCoordinates({
//     lat: property.address.latitude,
//     lon: property.address.longitude
//   });
// }, [property]);

//   // Fetch nearby places using Overpass API
//   useEffect(() => {
//     if (!coordinates || !showNearby) return;

//     setLoadingNearby(true);

//     const query = `
//       [out:json];
//       (
//         node["amenity"="hospital"](around:1500,${coordinates.lat},${coordinates.lon});
//         node["amenity"="police"](around:1500,${coordinates.lat},${coordinates.lon});
//         node["amenity"="fire_station"](around:1500,${coordinates.lat},${coordinates.lon});
//         node["railway"="station"](around:1500,${coordinates.lat},${coordinates.lon});
//         node["leisure"="park"](around:1500,${coordinates.lat},${coordinates.lon});
//       );
//       out;
//     `;

//     fetch("https://overpass-api.de/api/interpreter", {
//       method: "POST",
//       body: query
//     })
//       .then(res => res.json())
//       .then(data => {
//         const grouped = data.elements.reduce((acc, el) => {
//           const type = el.tags.amenity || el.tags.railway || el.tags.leisure;
//           if (!type) return acc;
//           acc[type] = acc[type] || [];
//           acc[type].push(el.tags.name || "Unknown");
//           return acc;
//         }, {});
//         setNearbyPlaces(grouped);
//       })
//       .catch(err => console.error("Error fetching nearby places:", err))
//       .finally(() => setLoadingNearby(false));

//   }, [coordinates, showNearby]);

//   // Fetch property details
//   useEffect(() => {
//   const getProperty = async () => {
//     const data = await fetchWithAuth(`${process.env.REACT_APP_API_BASE || "https://propeitia-backhand.onrender.com"}/api/properties/${id}`);
//     if (data) setProperty(data);
//     if(!data){
//       console.error("Error fetching property data");
//     }
//   };
//   getProperty();
// }, [id])
//   // useEffect(() => {
//   //   fetch(`${process.env.REACT_APP_API_BASE || "https://propeitia-backhand.onrender.com"}/api/properties/${id}`)
//   //     .then(res => res.json())
//   //     .then(setProperty)
//   //     .catch(err => console.error("Error fetching property:", err));
//   // }, [id]);

//   // Fetch BHK details
//   useEffect(() => {
//   const getBhk = async () => {
//     const data = await fetchWithAuth("https://propeitia-backhand.onrender.com/api/BHK");
//     if (data) {
//       const match = data.find(b => b.propertyId === Number(id));
//       setBhk(match);
//     }
//     if(!data){
//       console.error("Error fetching BHK data");
//     }
//   };
//   getBhk();
// }, [id]);
//   // useEffect(() => {
//   //   fetch("https://propeitia-backhand.onrender.com/api/BHK")
//   //     .then(res => res.json())
//   //     .then(data => {
//   //       const match = data.find(b => b.propertyId === Number(id));
//   //       setBhk(match);
//   //     })
//   //     .catch(err => console.error("Error fetching BHK:", err));
//   // }, [id]);

//   if (!property) return <p className="loading">Loading...</p>;

//   return (
//     <div className="details-container">

//       {/* BACK */}
//       <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>

//       {/* HERO IMAGE */}
//       {property.images?.length > 0 && (
//         <div className="hero-image">
//           <img
//             src={`${process.env.REACT_APP_API_BASE || "https://propeitia-backhand.onrender.com"}{getImageUrl(property.images[0])}`}
//             alt="property"
//           />
//         </div>
//       )}

//       {/* MAIN CARD */}
//       <div className="details-card">

//         <div className="price-row">
//           {property.prices?.map((p, i) => (
//             p.amount > 0 && (
//               <span
//                 key={i}
//                 className={`price-chip ${p.transactionType.toLowerCase()}`}
//               >
//                 {p.transactionType}: ₹{p.amount}
//                 {p.transactionType.toLowerCase() === "rent" && " / month"}
//               </span>
//             )
//           ))}
//         </div>

//         <h1 className="title">{property.title}</h1>
//         <p className="description">{property.description}</p>

//         {/* INFO GRID */}
//         <div className="info-grid">
//           <div><b>Property ID:</b> #{property.propertyId}</div>
//           <div><b>Status:</b> {property.status}</div>
//           <div><b>Category:</b> {property.category?.categoryName}</div>
//           <div><b>Requirement:</b> {property.requireType}</div>
//           <div><b>Owner:</b> {property.user?.name}</div>
//           <div><b>Posted On:</b> {formatDate(property.createdAt)}</div>
//           <div><b>Owner Email:</b>{" "}
//             {owner?.email?.trim() || "Not provided"}</div>
//         </div>
//         <div><b>Owner phone number:</b>{" "}
//           {owner?.phone?.trim() || "Not provided"}
//         </div>

//         {/* ADDRESS */}
//         <div className="address">
//           <b>Address:</b>
//           <p>
//             {property.address?.location}
//             {property.address?.societyName && `, ${property.address.societyName}`}
//             {property.address?.famousArea && `, ${property.address.famousArea}`}
//             {property.address?.landmark && ` (${property.address.landmark})`}
//             <br />
//             {property.address?.city}, {property.address?.state}, {property.address?.country}
//           </p>
//         </div>

//         {/* Amenities */}
//         <div className="amenities-section">
//           <b>Amenities:</b>
//           <div className="amenities-list">
//             {property.amenities.map(a => (
//               <span key={a.amenityId} className="amenity-tag">
//                 {a.amenityName}
//               </span>
//             ))}
//           </div>
//         </div>

//         <div className="stats-row">
//           <div className="stat-box">
//             <span>Area</span>
//             <b>{property.areaSqft} sqft</b>
//           </div>

//           <div className="stat-box">
//             <span>BHK</span>
//             <b>{bhk?.bhkType || "—"}</b>
//           </div>

//           <div className="stat-box">
//             <span>Washrooms</span>
//             <b>{bhk?.totalWashrooms || "—"}</b>
//           </div>

//           <div className="stat-box">
//             <span>Images</span>
//             <b>{property.images?.length}</b>
//           </div>
//         </div>

//         {/* Action buttons */}
//         <div className="action-buttons">

//          {canEdit && (
//     <button
//       className="details-btn light-btn"
//       onClick={() => navigate(`/property/Edit/${property.propertyId}`)}
//     >
//       ✏️ Edit Property
//     </button>
//   )}

// <button
//   className="details-btn nearby-btn"
//   onClick={() => {
//     setShowNearby(prev => !prev); // toggle visibility
//     setNearbyPlaces({});           // reset old data
//   }}
// >
//   📍 Nearby Places
// </button>


//           <button
//             className="details-btn map-btn"
//             onClick={() => navigate(`/property/route/${property.propertyId}`)}
//           >
//             🗺️ Show Route in Map
//           </button>
//           <button onClick={() => navigate(`/property/inquiry/${property.propertyId}`)}>
//              fill inquiry form
//           </button>
//     {/* <p className="warning">
//       Location coordinates not available for this property
//     </p> */}


//         </div>

//         {/* Nearby Places */}
//         {showNearby && (
//           <div className="nearby-section">
//             <h3>Nearby Places (within 1.5 km)</h3>

//             {loadingNearby && (
//               <p>Fetching nearby places…</p>
//             )}

//             {!loadingNearby && Object.keys(nearbyPlaces).length === 0 && (
//               <p>No nearby places found</p>
//             )}

//             {!loadingNearby && Object.keys(nearbyPlaces).map(type => (
//               <div key={type} className="nearby-category">
//                 <h4>{type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}</h4>
//                 <ul>
//                   {nearbyPlaces[type].map((place, i) => (
//                     <li key={i}>{place}</li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* IMAGE GALLERY */}
//         {property.images?.length > 1 && (
//           <div className="gallery">
//             <h3>More Images</h3>
//             <div className="gallery-grid">
//               {property.images.map((img, i) => (
//                 <img
//                   key={i}
//                   src={`${process.env.REACT_APP_API_BASE || "https://propeitia-backhand.onrender.com"}{getImageUrl(img)}
//                   alt="property"
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./PropertyDetails.css";
// import { fetchWithAuth } from '../login/api';
// import { getCurrentUser, getToken } from '../login/Auth';

// export default function PropertyDetails() {
//   console.log("🏘️ PropertyDetails component rendered");
//   console.log("  - User:", getCurrentUser());
//   console.log("  - Token exists:", !!getToken());

//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [property, setProperty] = useState(null);
//   const [bhk, setBhk] = useState(null);
//   const [owner, setOwner] = useState(null);
//   const [showNearby, setShowNearby] = useState(false);
//   const [loadingNearby, setLoadingNearby] = useState(false);
//   const [coordinates, setCoordinates] = useState(null);
//   const [nearbyPlaces, setNearbyPlaces] = useState({});

//   // Inquiry states
//   const [showInquiryDialog, setShowInquiryDialog] = useState(false);
//   const [inquiries, setInquiries] = useState([]);
//   const [loadingInquiries, setLoadingInquiries] = useState(false);
//   const [newInquiry, setNewInquiry] = useState("");
//   const [replyingTo, setReplyingTo] = useState(null);
//   const [replyText, setReplyText] = useState("");

//   const currentUser = getCurrentUser();
//   const isBuyer = currentUser?.userType === 'buyer';
//   const isSeller = currentUser?.userType === 'seller';
//   const isAdmin = currentUser?.userType === 'admin';

//   const canEdit = currentUser && (isSeller || isAdmin);
//   const canReply = currentUser && isSeller;

//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//       hour: '2-digit',
//       minute: '2-digit'
//     });

//   // Fetch owner details
//   useEffect(() => {
//     if (!property?.user?.userId) return;

//     const getOwner = async () => {
//       const users = await fetchWithAuth("https://propeitia-backhand.onrender.com/api/Users");
//       if (users) {
//         const found = users.find(u => Number(u.userId) === Number(property.user.userId));
//         setOwner(found);
//       }
//     };
//     getOwner();
//   }, [property]);

//   useEffect(() => {
//     if (!property?.address?.latitude || !property?.address?.longitude) return;

//     setCoordinates({
//       lat: property.address.latitude,
//       lon: property.address.longitude
//     });
//   }, [property]);

//   // Fetch nearby places using Overpass API
//   useEffect(() => {
//     if (!coordinates || !showNearby) return;

//     setLoadingNearby(true);

//     const query = `
//       [out:json];
//       (
//         node["amenity"="hospital"](around:1500,${coordinates.lat},${coordinates.lon});
//         node["amenity"="police"](around:1500,${coordinates.lat},${coordinates.lon});
//         node["amenity"="fire_station"](around:1500,${coordinates.lat},${coordinates.lon});
//         node["railway"="station"](around:1500,${coordinates.lat},${coordinates.lon});
//         node["leisure"="park"](around:1500,${coordinates.lat},${coordinates.lon});
//       );
//       out;
//     `;

//     fetch("https://overpass-api.de/api/interpreter", {
//       method: "POST",
//       body: query
//     })
//       .then(res => res.json())
//       .then(data => {
//         const grouped = data.elements.reduce((acc, el) => {
//           const type = el.tags.amenity || el.tags.railway || el.tags.leisure;
//           if (!type) return acc;
//           acc[type] = acc[type] || [];
//           acc[type].push(el.tags.name || "Unknown");
//           return acc;
//         }, {});
//         setNearbyPlaces(grouped);
//       })
//       .catch(err => console.error("Error fetching nearby places:", err))
//       .finally(() => setLoadingNearby(false));

//   }, [coordinates, showNearby]);

//   // Fetch property details
//   useEffect(() => {
//     const getProperty = async () => {
//       const data = await fetchWithAuth(`${process.env.REACT_APP_API_BASE || "https://propeitia-backhand.onrender.com"}/api/properties/${id}`);
//       if (data) setProperty(data);
//       if (!data) {
//         console.error("Error fetching property data");
//       }
//     };
//     getProperty();
//   }, [id]);

//   // Fetch BHK details
//   useEffect(() => {
//     const getBhk = async () => {
//       const data = await fetchWithAuth("https://propeitia-backhand.onrender.com/api/BHK");
//       if (data) {
//         const match = data.find(b => b.propertyId === Number(id));
//         setBhk(match);
//       }
//       if (!data) {
//         console.error("Error fetching BHK data");
//       }
//     };
//     getBhk();
//   }, [id]);

//   // Fetch inquiries when dialog opens
//   const fetchInquiries = async () => {
//     setLoadingInquiries(true);
//     try {
//       const data = await fetchWithAuth(
//         `${process.env.REACT_APP_API_BASE || "https://propeitia-backhand.onrender.com"}/api/property-inquiries/property/${id}`
//       );
//       if (data) {
//         setInquiries(Array.isArray(data) ? data : [data]);
//       }
//     } catch (err) {
//       console.error("Error fetching inquiries:", err);
//       setInquiries([]);
//     } finally {
//       setLoadingInquiries(false);
//     }
//   };

//   const handleOpenInquiryDialog = () => {
//     setShowInquiryDialog(true);
//     fetchInquiries();
//   };

//   const handleCloseInquiryDialog = () => {
//     setShowInquiryDialog(false);
//     setNewInquiry("");
//     setReplyingTo(null);
//     setReplyText("");
//   };

//   // Submit new inquiry (buyer only)
//   const handleSubmitInquiry = async (e) => {
//     e.preventDefault();
//     if (!newInquiry.trim()) return;

//     try {
//       const inquiryData = {
//         propertyId: Number(id),
//         userId: currentUser.userId,
//         query: newInquiry.trim(),
//         answer: null,
//         createdAt: new Date().toISOString()
//       };

//       await fetchWithAuth("https://propeitia-backhand.onrender.com/api/property-inquiries", {
//         method: 'POST',
//         body: JSON.stringify(inquiryData)
//       });

//       setNewInquiry("");
//       fetchInquiries(); // Refresh list
//     } catch (err) {
//       console.error("Error submitting inquiry:", err);
//       alert("Failed to submit inquiry. Please try again.");
//     }
//   };

//   // Submit reply to inquiry (seller/admin only)
//   const handleSubmitReply = async (inquiryId) => {
//     if (!replyText.trim()) return;

//     try {
//       await fetchWithAuth(
//         `${process.env.REACT_APP_API_BASE || "https://propeitia-backhand.onrender.com"}/api/property-inquiries/reply/${inquiryId}`,
//         {
//           method: 'PUT',
//           body: JSON.stringify(replyText.trim()),
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       );


//       setReplyingTo(null);
//       setReplyText("");
//       fetchInquiries(); // Refresh list
//     } catch (err) {
//       console.error("Error submitting reply:", err);
//       alert("Failed to submit reply. Please try again.");
//     }
//   };

//   if (!property) return <p className="loading">Loading...</p>;

//   return (
//     <div className="details-container">
//       {/* BACK */}
//       <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>

//       {/* HERO IMAGE */}
//       {property.images?.length > 0 && (
//         <div className="hero-image">
//           <img
//             src={`${process.env.REACT_APP_API_BASE || "https://propeitia-backhand.onrender.com"}{getImageUrl(property.images[0])}`}
//             alt="property"
//             onError={(e) => {
//               e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect width="800" height="400" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';
//             }}
//           />
//         </div>
//       )}

//       {/* MAIN CARD */}
//       <div className="details-card">
//         <div className="price-row">
//           {property.prices?.map((p, i) => (
//             p.amount > 0 && (
//               <span
//                 key={i}
//                 className={`price-chip ${p.transactionType.toLowerCase()}`}
//               >
//                 {p.transactionType}: ₹{p.amount}
//                 {p.transactionType.toLowerCase() === "rent" && " / month"}
//               </span>
//             )
//           ))}
//         </div>

//         <h1 className="title">{property.title}</h1>
//         <p className="description">{property.description}</p>

//         {/* INFO GRID */}
//         <div className="info-grid">
//           <div><b>Status:</b> <span className={`status-badge ${property.status.toLowerCase()}`}>{property.status}</span></div>
//           <div><b>Category:</b> {property.category?.categoryName}</div>
//           <div><b>Requirement:</b> {property.requireType}</div>
//           <div><b>Owner:</b> {property.user?.name}</div>
//           <div><b>Posted On:</b> {formatDate(property.createdAt)}</div>
//           <div><b>Area:</b> {property.areaSqft} sqft</div>
//         </div>

//         {/* CONTACT INFO */}
//         <div className="contact-section">
//           <h3>Contact Information</h3>
//           <div className="contact-grid">
//             <div className="contact-item">
//               <span className="contact-label">📧 Email:</span>
//               <span className="contact-value">{owner?.email?.trim() || "Not provided"}</span>
//             </div>
//             <div className="contact-item">
//               <span className="contact-label">📱 Phone:</span>
//               <span className="contact-value">{owner?.phone?.trim() || "Not provided"}</span>
//             </div>
//           </div>
//         </div>

//         {/* ADDRESS */}
//         <div className="address-section">
//           <h3>📍 Location</h3>
//           <p className="address-text">
//             {property.address?.location}
//             {property.address?.societyName && `, ${property.address.societyName}`}
//             {property.address?.famousArea && `, ${property.address.famousArea}`}
//             {property.address?.landmark && ` (${property.address.landmark})`}
//             <br />
//             {property.address?.city}, {property.address?.state}, {property.address?.country}
//           </p>
//         </div>

//         {/* PROPERTY DETAILS */}
//         <div className="stats-section">
//           <h3>Property Details</h3>
//           <div className="stats-row">
//             <div className="stat-box">
//               <span className="stat-label">Area</span>
//               <b className="stat-value">{property.areaSqft} sqft</b>
//             </div>

//             <div className="stat-box">
//               <span className="stat-label">BHK</span>
//               <b className="stat-value">{bhk?.bhkType || "—"}</b>
//             </div>

//             <div className="stat-box">
//               <span className="stat-label">Washrooms</span>
//               <b className="stat-value">{bhk?.totalWashrooms || "—"}</b>
//             </div>

//             <div className="stat-box">
//               <span className="stat-label">Images</span>
//               <b className="stat-value">{property.images?.length || 0}</b>
//             </div>
//           </div>
//         </div>

//         {/* Amenities */}
//         {property.amenities && property.amenities.length > 0 && (
//           <div className="amenities-section">
//             <h3>✨ Amenities</h3>
//             <div className="amenities-list">
//               {property.amenities.map((a, idx) => (
//                 <span key={idx} className="amenity-tag">
//                   {a.amenityName || a}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Action buttons */}
//         <div className="action-buttons">
//           {canEdit && (
//             <button
//               className="details-btn edit-btn"
//               onClick={() => navigate(`/property/Edit/${property.propertyId}`)}
//             >
//               ✏️ Edit Property
//             </button>
//           )}

//           <button
//             className="details-btn inquiry-btn"
//             onClick={handleOpenInquiryDialog}
//           >
//             💬 {isBuyer ? 'Ask Questions' : 'View Inquiries'}
//           </button>

//           <button
//             className="details-btn nearby-btn"
//             onClick={() => {
//               setShowNearby(prev => !prev);
//               setNearbyPlaces({});
//             }}
//           >
//             📍See Near Places of this property
//           </button>

//           <button
//             className="details-btn map-btn"
//             onClick={() => navigate(`/property/route/${property.propertyId}`)}
//           >
//             🗺️ Show Route
//           </button>
//         </div>

//         {/* Nearby Places */}
//         {showNearby && (
//           <div className="nearby-section">
//             <h3>📍 Nearby Places (within 1.5 km)</h3>

//             {loadingNearby && <p className="loading-text">Fetching nearby places…</p>}

//             {!loadingNearby && Object.keys(nearbyPlaces).length === 0 && (
//               <p className="no-data">No nearby places found</p>
//             )}

//             {!loadingNearby && Object.keys(nearbyPlaces).map(type => (
//               <div key={type} className="nearby-category">
//                 <h4>{type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}</h4>
//                 <ul>
//                   {nearbyPlaces[type].map((place, i) => (
//                     <li key={i}>{place}</li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* IMAGE GALLERY */}
//         {property.images?.length > 1 && (
//           <div className="gallery">
//             <h3>📸 Photo Gallery</h3>
//             <div className="gallery-grid">
//               {property.images.map((img, i) => (
//                 <img
//                   key={i}
//                   src={`${process.env.REACT_APP_API_BASE || "https://propeitia-backhand.onrender.com"}{getImageUrl(img)}
//                   alt={`property ${i + 1}`}
//                   onError={(e) => {
//                     e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="18" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* INQUIRY DIALOG */}
//       {showInquiryDialog && (
//         <div className="dialog-overlay" onClick={handleCloseInquiryDialog}>
//           <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
//             <div className="dialog-header">
//               <h2>💬 Property Inquiries</h2>
//               <button className="close-dialog" onClick={handleCloseInquiryDialog}>
//                 ✕
//               </button>
//             </div>

//             <div className="dialog-body">
//               {/* Buyer: Show inquiry form */}
//               {isBuyer && (
//                 <form className="inquiry-form" onSubmit={handleSubmitInquiry}>
//                   <h3>Ask a Question</h3>
//                   <textarea
//                     className="inquiry-textarea"
//                     placeholder="Type your question here..."
//                     value={newInquiry}
//                     onChange={(e) => setNewInquiry(e.target.value)}
//                     rows="4"
//                     required
//                   />
//                   <button type="submit" className="submit-inquiry-btn">
//                     Send Question
//                   </button>
//                 </form>
//               )}

//               {/* List of inquiries */}
//               <div className="inquiries-list">
//                 <h3>All Questions & Answers</h3>

//                 {loadingInquiries && <p className="loading-text">Loading inquiries...</p>}

//                 {!loadingInquiries && inquiries.length === 0 && (
//                   <p className="no-data">No inquiries yet. Be the first to ask!</p>
//                 )}

//                 {!loadingInquiries && inquiries.map((inq, idx) => (
//                   <div key={idx} className="inquiry-item">
//                     <div className="inquiry-question">
//                       <div className="inquiry-header">
//                         <span className="inquiry-user">👤 {inq.user?.name || 'User'}</span>
//                         <span className="inquiry-date">{formatDate(inq.createdAt)}</span>
//                       </div>
//                       <p className="inquiry-text">{inq.query}</p>
//                     </div>

//                     {inq.answer ? (
//                       <div className="inquiry-answer">
//                         <b>✅ Answer:</b>
//                         <p>{inq.answer}</p>
//                       </div>
//                     ) : canReply ? (
//                       replyingTo === idx ? (
//                         <div className="reply-form">
//                           <textarea
//                             className="reply-textarea"
//                             placeholder="Type your answer..."
//                             value={replyText}
//                             onChange={(e) => setReplyText(e.target.value)}
//                             rows="3"
//                           />
//                           <div className="reply-actions">
//                             <button
//                               className="submit-reply-btn"
//                               onClick={() => handleSubmitReply(inq.inquiryId)}
//                             >
//                               Submit Answer
//                             </button>
//                             <button
//                               className="cancel-reply-btn"
//                               onClick={() => {
//                                 setReplyingTo(null);
//                                 setReplyText("");
//                               }}
//                             >
//                               Cancel
//                             </button>
//                           </div>
//                         </div>
//                       ) : (
//                         <button
//                           className="reply-btn"
//                           onClick={() => setReplyingTo(idx)}
//                         >
//                           Reply to this question
//                         </button>
//                       )
//                     ) : (
//                       <p className="pending-answer">⏳ Awaiting answer from seller</p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PropertyDetails.css";
import { fetchWithAuth } from '../login/api';
import { getCurrentUser, getToken } from '../login/Auth';
import SimilarProperties from "./SimilarProperties";
import { motion } from "framer-motion";

export default function PropertyDetails() {
  console.log("🏘️ PropertyDetails component rendered");
  console.log("  - User:", getCurrentUser());
  console.log("  - Token exists:", !!getToken());

  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [bhk, setBhk] = useState(null);
  const [owner, setOwner] = useState(null);
  const [showNearby, setShowNearby] = useState(false);
  const [loadingNearby, setLoadingNearby] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState({});

  // Inquiry states
  const [showInquiryDialog, setShowInquiryDialog] = useState(false);
  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);
  const [newInquiry, setNewInquiry] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const currentUser = getCurrentUser();
  const isBuyer = currentUser?.userType === 'buyer';
  const isSeller = currentUser?.userType === 'seller';
  const isAdmin = currentUser?.userType === 'admin';

  const canEdit = currentUser && (isSeller || isAdmin);
  const canReply = currentUser && (isSeller || isAdmin);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: '2-digit',
      minute: '2-digit'
    });

  // Helper function to format price in Indian format
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Fetch owner details
  useEffect(() => {
    if (!property?.user?.userId) return;

    const getOwner = async () => {
      const users = await fetchWithAuth("https://propeitia-backhand.onrender.com/api/Users");
      if (users) {
        const found = users.find(u => Number(u.userId) === Number(property.user.userId));
        setOwner(found);
      }
    };
    getOwner();
  }, [property]);

  useEffect(() => {
    if (!property?.address?.latitude || !property?.address?.longitude) return;

    setCoordinates({
      lat: property.address.latitude,
      lon: property.address.longitude
    });
  }, [property]);

  // Fetch nearby places using Overpass API
  useEffect(() => {
    if (!coordinates || !showNearby) return;

    setLoadingNearby(true);

    // 1.5km approx bounding box is much faster than math-heavy `around:distance`
    const delta = 0.015;
    const minLat = coordinates.lat - delta;
    const minLon = coordinates.lon - delta;
    const maxLat = coordinates.lat + delta;
    const maxLon = coordinates.lon + delta;
    const bbox = `${minLat},${minLon},${maxLat},${maxLon}`;

    const query = `
      [out:json][timeout:25];
      (
        node["amenity"~"hospital|police|fire_station"](${bbox});
        way["amenity"~"hospital"](${bbox});
        node["railway"="station"](${bbox});
        way["leisure"="park"](${bbox});
      );
      out center qt;
    `;

    fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query
    })
      .then(async res => {
        const text = await res.text();
        try {
          return JSON.parse(text);
        } catch {
          throw new Error("Overpass API returned an invalid response (possibly overloaded)");
        }
      })
      .then(data => {
        if (!data || !data.elements) return;

        // Haversine formula
        const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
          const R = 6371; // Radius of the earth in km
          const dLat = (lat2 - lat1) * (Math.PI / 180);
          const dLon = (lon2 - lon1) * (Math.PI / 180);
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          return R * c; // Distance in km
        };

        const grouped = data.elements.reduce((acc, el) => {
          if (!el.tags) return acc;
          const type = el.tags.amenity || el.tags.railway || el.tags.leisure;
          const name = el.tags.name;
          const lat = el.lat || el.center?.lat;
          const lon = el.lon || el.center?.lon;

          if (!type || !name || !lat || !lon) return acc; // Skip unnamed or location-less

          const distance = getDistanceFromLatLonInKm(coordinates.lat, coordinates.lon, lat, lon).toFixed(1);
          if (distance > 2) return acc; // Filter out anything mathematically beyond our real radius

          acc[type] = acc[type] || [];
          if (!acc[type].some(p => p.name === name)) {
            acc[type].push({ name, distance });
          }
          return acc;
        }, {});

        // Sort by distance and limit to top 5
        Object.keys(grouped).forEach(key => {
          grouped[key] = grouped[key].sort((a, b) => a.distance - b.distance).slice(0, 5);
        });

        setNearbyPlaces(grouped);
      })
      .catch(err => console.error("Error fetching nearby places:", err))
      .finally(() => setLoadingNearby(false));

  }, [coordinates, showNearby]);

  // Fetch property details
  useEffect(() => {
    const getProperty = async () => {
      const data = await fetchWithAuth(`${process.env.REACT_APP_API_BASE || "https://propeitia-backhand.onrender.com"}/api/properties/${id}`);
      if (data) setProperty(data);
      if (!data) {
        console.error("Error fetching property data");
      }
    };
    getProperty();
  }, [id]);

  // Fetch BHK details
  useEffect(() => {
    const getBhk = async () => {
      const data = await fetchWithAuth("https://propeitia-backhand.onrender.com/api/BHK");
      if (data) {
        const match = data.find(b => b.propertyId === Number(id));
        setBhk(match);
      }
      if (!data) {
        console.error("Error fetching BHK data");
      }
    };
    getBhk();
  }, [id]);

  // Fetch inquiries when dialog opens
  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const data = await fetchWithAuth(
        `${process.env.REACT_APP_API_BASE || "https://propeitia-backhand.onrender.com"}/api/property-inquiries/property/${id}`
      );
      if (data) {
        setInquiries(Array.isArray(data) ? data : [data]);
      }
    } catch (err) {
      console.error("Error fetching inquiries:", err);
      setInquiries([]);
    } finally {
      setLoadingInquiries(false);
    }
  };

  const handleOpenInquiryDialog = () => {
    setShowInquiryDialog(true);
    fetchInquiries();
  };

  const handleCloseInquiryDialog = () => {
    setShowInquiryDialog(false);
    setNewInquiry("");
    setReplyingTo(null);
    setReplyText("");
  };

  // Submit new inquiry (buyer only)
  const handleSubmitInquiry = async (e) => {
    e.preventDefault();
    if (!newInquiry.trim()) return;

    try {
      const inquiryData = {
        inquiryId: 0,
        propertyId: Number(id),
        userId: currentUser.userId,
        message: newInquiry.trim(),
        inquiryDate: new Date().toISOString()
      };

      await fetchWithAuth("https://propeitia-backhand.onrender.com/api/property-inquiries", {
        method: 'POST',
        body: JSON.stringify(inquiryData)
      });

      setNewInquiry("");
      fetchInquiries(); // Refresh list
    } catch (err) {
      console.error("Error submitting inquiry:", err);
      alert("Failed to submit inquiry. Please try again.");
    }
  };

  // Submit reply to inquiry (seller/admin only)
  const handleSubmitReply = async (inquiryId) => {
    if (!replyText.trim()) return;

    try {
      await fetchWithAuth(
        `${process.env.REACT_APP_API_BASE || "https://propeitia-backhand.onrender.com"}/api/property-inquiries/reply/${inquiryId}`,
        {
          method: 'PUT',
          body: JSON.stringify(replyText.trim()),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );


      setReplyingTo(null);
      setReplyText("");
      fetchInquiries(); // Refresh list
    } catch (err) {
      console.error("Error submitting reply:", err);
      alert("Failed to submit reply. Please try again.");
    }
  };

  if (!property) return <p className="loading">Loading...</p>;

  return (
    <motion.div
      className="details-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* BACK */}
      <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>

      {/* HERO IMAGE */}
      {property.images?.length > 0 && (
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            src={`${process.env.REACT_APP_API_BASE || "https://propeitia-backhand.onrender.com"}{getImageUrl(property.images[0])}`}
            alt="property"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect width="800" height="400" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';
            }}
          />
        </motion.div>
      )}

      {/* MAIN CARD */}
      <motion.div
        className="details-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <div className="price-row">
          {property.prices?.map((p, i) => (
            p.amount > 0 && (
              <span
                key={i}
                className={`price-chip ${p.transactionType.toLowerCase()}`}
              >
                {p.transactionType}: {formatPrice(p.amount)}
                {p.transactionType.toLowerCase() === "rent" && " / month"}
              </span>
            )
          ))}
        </div>

        <h1 className="title">{property.title}</h1>
        <p className="description">{property.description}</p>

        {/* QUICK INFO GRID */}
        <div className="info-grid">
          <div><b>Property Status:</b> <span className={`status-badge ${property.status.toLowerCase()}`}>{property.status === 'completed' ? 'Ready to Move' : property.status === 'under_construction' ? 'Under Construction' : property.status}</span></div>
          <div><b>Property Type:</b> {property.category?.categoryName}</div>
          <div><b>Available For:</b> <span className="requirement-badge">{property.requireType === 'rent' ? 'Rent' : property.requireType === 'sale' ? 'Sale' : property.requireType}</span></div>
          <div><b>Posted By:</b> {property.user?.name}</div>
          <div><b>Listed On:</b> {formatDate(property.createdAt)}</div>
          <div><b>Total Area:</b> {property.areaSqft} sq.ft</div>
        </div>

        {/* PROPERTY CONFIGURATION */}
        <div className="stats-section">
          <h3> Property Configuration</h3>
          <div className="stats-row">
            <div className="stat-box">
              <span className="stat-label">Carpet Area</span>
              <span className="stat-value-primary">{property.areaSqft} sq.ft</span>
            </div>

            <div className="stat-box">
              <span className="stat-label">Bedrooms</span>
              <span className="stat-value-primary">{property.bhk?.bhkType ? `${property.bhk.bhkType} BHK` : bhk?.bhkType ? `${bhk.bhkType} BHK` : "—"}</span>
            </div>

            <div className="stat-box">
              <span className="stat-label">Bathrooms</span>
              <span className="stat-value-primary">{property.bhk?.totalWashrooms || bhk?.totalWashrooms || "—"}</span>
            </div>


          </div>
        </div>

        {/* LOCATION DETAILS */}
        <div className="address-section">
          <h3> Location Details</h3>
          <div className="location-details">
            {property.address?.societyName && (
              <div className="location-item">
                <span className="location-label">Society/Building:</span>
                <span className="location-value">{property.address.societyName}</span>
              </div>
            )}
            <div className="location-item">
              <span className="location-label">Street Address:</span>
              <span className="location-value">{property.address?.location}</span>
            </div>
            {property.address?.famousArea && (
              <div className="location-item">
                <span className="location-label">Area:</span>
                <span className="location-value">{property.address.famousArea}</span>
              </div>
            )}
            {property.address?.landmark && (
              <div className="location-item">
                <span className="location-label">Nearby Landmark:</span>
                <span className="location-value">{property.address.landmark}</span>
              </div>
            )}
            <div className="location-item">
              <span className="location-label">City:</span>
              <span className="location-value">{property.address?.city}, {property.address?.state}</span>
            </div>
            <div className="location-item">
              <span className="location-label">Country:</span>
              <span className="location-value">{property.address?.country}</span>
            </div>
          </div>
        </div>

        {/* Amenities & Features */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="amenities-section">
            <h3> Amenities & Features</h3>
            <div className="amenities-list">
              {property.amenities.map((a, idx) => (
                <span key={idx} className="amenity-tag">
                  ✓ {a.amenityName || a}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* PRICING BREAKDOWN */}
        {property.prices && property.prices.length > 0 && (
          <div className="pricing-section">
            <h3> Pricing Information</h3>
            <div className="pricing-details">
              {property.prices.map((p, i) => (
                p.amount > 0 && (
                  <div key={i} className="pricing-item">
                    <span className="pricing-label">{p.transactionType}:</span>
                    <span className="pricing-value">
                      {formatPrice(p.amount)}
                      {p.transactionType.toLowerCase() === "rent" && <span className="pricing-note"> per month</span>}
                    </span>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* CONTACT INFO */}
        <div className="contact-section">
          <h3> Contact Information</h3>
          <p className="contact-intro">Get in touch with the property owner for more details or to schedule a visit.</p>
          <div className="contact-grid">
            <div className="contact-item">
              <span className="contact-label">👤 Owner Name:</span>
              <span className="contact-value">{property.user?.name || owner?.name || "Not available"}</span>
            </div>
            <div className="contact-item">
              <span className="contact-label">📧 Email Address:</span>
              <span className="contact-value">{owner?.email?.trim() || "Not provided"}</span>
            </div>
            <div className="contact-item">
              <span className="contact-label">📱 Phone Number:</span>
              <span className="contact-value">{owner?.phone?.trim() || "Not provided"}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        {/* <div className="action-buttons">
          { (
            <button
              className="details-btn edit-btn"
              onClick={() => navigate(`/property/Edit/${property.propertyId}`)}
            >
              ✏️ Edit Property Details
            </button>
          )}

          <button
            className="details-btn inquiry-btn"
            onClick={handleOpenInquiryDialog}
          >
            💬 {isBuyer ? 'Ask Questions About This Property' : 'View All Inquiries'}
          </button>

          <button
            className="details-btn nearby-btn"
            onClick={() => {
              setShowNearby(prev => !prev);
              setNearbyPlaces({});
            }}
          >
            📍 Explore Nearby Places & Amenities
          </button>

          <button
            className="details-btn map-btn"
            onClick={() => navigate(`/property/route/${property.propertyId}`)}
          >
            🗺️ Get Directions to Property
          </button>
        </div> */}
        <div className="property-action-grid">
          <button
            className="property-action-card"
            onClick={() => navigate(`/property/Edit/${property.propertyId}`)}
          >
            <div className="property-action-title"> Edit Property detail and price</div>
            <div className="property-action-subtitle">
              Update property details and pricing
            </div>
          </button>

          <button
            className="property-action-card"
            onClick={handleOpenInquiryDialog}
          >
            <div className="property-action-title">
              {isBuyer ? 'Ask Questions' : '💬 View & Reply to Inquiries'}
            </div>
            <div className="property-action-subtitle">
              {isBuyer ? 'Communicate with sellers' : 'Answer buyer questions about this property'}
            </div>
          </button>

          <button
            className="property-action-card"
            onClick={() => {
              setShowNearby(prev => !prev);
              setNearbyPlaces({});
            }}
          >
            <div className="property-action-title">Nearby Places</div>
            <div className="property-action-subtitle">
              Schools, hospitals & amenities
            </div>
          </button>

          <button
            className="property-action-card"
            onClick={() => {
              const addr = property.address;
              const destination = [
                addr?.location,
                addr?.famousArea,
                addr?.city,
                addr?.state,
                addr?.country
              ].filter(Boolean).join(', ');
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`,
                '_blank'
              );
            }}
          >
            <div className="property-action-title">🗺️ Get Directions</div>
            <div className="property-action-subtitle">
              Open route in Google Maps
            </div>
          </button>

          {isBuyer && (
            <button
              className="property-action-card"
              onClick={handleOpenInquiryDialog}
            >
              <div className="property-action-title">📝 Add New Inquiry</div>
              <div className="property-action-subtitle">
                Ask a question about this property
              </div>
            </button>
          )}
        </div>



        {/* Nearby Places */}
        {showNearby && (
          <div className="nearby-section">
            <h3>📍 What's Nearby? (within 1.5 km radius)</h3>
            <p className="nearby-intro">Discover essential services and amenities around this property</p>

            {loadingNearby && <p className="loading-text">Finding nearby places for you…</p>}

            {!loadingNearby && Object.keys(nearbyPlaces).length === 0 && (
              <p className="no-data">No nearby places found in our database</p>
            )}

            {!loadingNearby && Object.keys(nearbyPlaces).map(type => {
              const typeIcons = {
                'hospital': '🏥',
                'police': '👮',
                'fire_station': '🚒',
                'station': '🚂',
                'park': '🌳',
                'school': '🏫',
                'college': '🎓',
                'university': '🎓'
              };

              return (
                <div key={type} className="nearby-category">
                  <h4>{typeIcons[type] || '📍'} {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}</h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {nearbyPlaces[type].map((place, i) => (
                      <li key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                        <span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>{place.name}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '13px', background: 'var(--bg-body)', padding: '2px 8px', borderRadius: '12px' }}>
                          {place.distance} km
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}

        {/* IMAGE GALLERY */}
        {property.images?.length > 1 && (
          <div className="gallery">
            <h3>📸 Photo Gallery ({property.images.length} Images)</h3>
            <p className="gallery-intro">Browse through all the pictures of this property</p>
            <div className="gallery-grid">
              {property.images.map((img, i) => (
                <motion.img
                  key={i}
                  src={`${process.env.REACT_APP_API_BASE || "https://propeitia-backhand.onrender.com"}{getImageUrl(img)}
                  alt={`${property.title} - Image ${ i + 1}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="18" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';
              }}
                />
              ))}
            </div>
          </div>
        )}
        <SimilarProperties propertyId={id} />   {/* ← add this */}

      </motion.div>

      {/* INQUIRY DIALOG */}
      {showInquiryDialog && (
        <div className="dialog-overlay" onClick={handleCloseInquiryDialog}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h2>💬 Property Questions & Answers</h2>
              <button className="close-dialog" onClick={handleCloseInquiryDialog}>
                ✕
              </button>
            </div>

            <div className="dialog-body">
              {/* Buyer: Show inquiry form */}
              {isBuyer && (
                <form className="inquiry-form" onSubmit={handleSubmitInquiry}>
                  <h3>Have a Question?</h3>
                  <p className="form-help-text">Ask anything about this property - availability, pricing, features, or schedule a visit!</p>
                  <textarea
                    className="inquiry-textarea"
                    placeholder="Type your question here... (e.g., Is parking available? Can I schedule a visit this weekend?)"
                    value={newInquiry}
                    onChange={(e) => setNewInquiry(e.target.value)}
                    rows="4"
                    required
                  />
                  <button type="submit" className="submit-inquiry-btn">
                    Send Your Question
                  </button>
                </form>
              )}

              {/* List of inquiries */}
              <div className="inquiries-list">
                <h3>Previous Questions & Answers</h3>

                {loadingInquiries && <p className="loading-text">Loading all questions...</p>}

                {!loadingInquiries && inquiries.length === 0 && (
                  <p className="no-data">No questions asked yet. Be the first to inquire about this property!</p>
                )}

                {!loadingInquiries && inquiries.map((inq, idx) => (
                  <div key={idx} className="inquiry-item">
                    <div className="inquiry-question">
                      <div className="inquiry-header">
                        <span className="inquiry-user">👤 {inq.user?.name || 'Anonymous User'}</span>
                        <span className="inquiry-date">{formatDate(inq.createdAt)}</span>
                      </div>
                      <p className="inquiry-text"><b>Q:</b> {inq.query}</p>
                    </div>

                    {inq.answer ? (
                      <div className="inquiry-answer">
                        <b>✅ Owner's Response:</b>
                        <p>{inq.answer}</p>
                      </div>
                    ) : canReply ? (
                      replyingTo === idx ? (
                        <div className="reply-form">
                          <textarea
                            className="reply-textarea"
                            placeholder="Type your answer here..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            rows="3"
                          />
                          <div className="reply-actions">
                            <button
                              className="submit-reply-btn"
                              onClick={() => handleSubmitReply(inq.inquiryId)}
                            >
                              Send Answer
                            </button>
                            <button
                              className="cancel-reply-btn"
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyText("");
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          className="reply-btn"
                          onClick={() => setReplyingTo(idx)}
                        >
                          💬 Reply to This Question
                        </button>
                      )
                    ) : (
                      <p className="pending-answer">⏳ Waiting for owner's response...</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
