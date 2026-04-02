

// import { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import "./Buy_Property.css";
// import { fetchWithAuth } from '../login/api'; // adjust path
// import { getCurrentUser } from '../login/Auth';

// export default function BuyProperty() {
//   const [searchParams] = useSearchParams();
//   const [properties, setProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [imageIndexes, setImageIndexes] = useState({});
//   const [bhkData, setBhkData] = useState([]);
//   const [amenitiesList, setAmenitiesList] = useState([]);
//   const [showFilters, setShowFilters] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);
//   const PAGE_SIZE = 9;
//   const navigate = useNavigate();
//   const currentUser = getCurrentUser();

//   const canEdit =
//     currentUser &&
//     (currentUser.userType === 'admin');

//   const [filters, setFilters] = useState({
//     categoryName: "",
//     minBudget: 0,
//     maxBudget: 10000000,
//     bedrooms: "Any",
//     bathrooms: "Any",
//     minSqft: 0,
//     maxSqft: 10000,
//     status: "Any",
//     amenities: []
//   });
//   useEffect(() => {
//     const getProperties = async () => {
//       const data = await fetchWithAuth(
//         `https://localhost:7117/api/properties?page=${currentPage}&pageSize=${PAGE_SIZE}`
//       );
//       if (data) {
//         setProperties(data.items);        // ← now it's data.items
//         setTotalPages(data.totalPages);
//         setTotalCount(data.totalCount);
//       }
//     };

//     getProperties();
//   }, [currentPage]);
//   function Pagination() {
//     return (
//       <div className="pagination-wrapper">
//         <button
//           onClick={() => setCurrentPage(p => p - 1)}
//           disabled={currentPage === 1}
//           className="details-btn"
//         >
//           ← Prev
//         </button>

//         {/* Page number buttons */}
//         {Array.from({ length: totalPages }, (_, i) => i + 1)
//           .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
//           .map((p, idx, arr) => (
//             <>
//               {idx > 0 && arr[idx - 1] !== p - 1 && <span key={`dots-${p}`}>...</span>}
//               <button
//                 key={p}
//                 onClick={() => setCurrentPage(p)}
//                 className={`details-btn ${currentPage === p ? 'active' : ''}`}
//               >
//                 {p}
//               </button>
//             </>
//           ))
//         }

//         <button
//           onClick={() => setCurrentPage(p => p + 1)}
//           disabled={currentPage === totalPages}
//           className="details-btn"
//         >
//           Next →
//         </button>

//         <span className="results-info">
//           Page {currentPage} of {totalPages} ({totalCount} properties)
//         </span>
//       </div>
//     );
//   }
//   // Apply URL parameter filters on component mount
//   useEffect(() => {
//     const typeParam = searchParams.get("type");
//     if (typeParam) {
//       setFilters(prev => ({
//         ...prev,
//         categoryName: typeParam
//       }));
//       setShowFilters(true); // Auto-show filters when navigating from Hero
//     }
//   }, [searchParams]);
// useEffect(() => {
//   const getProperties = async () => {
//     const data = await fetchWithAuth(
//       `https://localhost:7117/api/properties?page=${currentPage}&pageSize=${PAGE_SIZE}`
//     );
//     if (data) {
//       setProperties(data.items);        // ← changed from data to data.items
//       setTotalPages(data.totalPages);
//       setTotalCount(data.totalCount);
//       console.log(localStorage.getItem("currentUser"));
//       console.log(localStorage.getItem("token"));
//     }
//   };
//   getProperties();
// }, [currentPage]);  // ← re-fetches whenever page changes

// // 3. Add this RIGHT AFTER the above useEffect
// useEffect(() => {
//   setCurrentPage(1);  // resets to page 1 whenever filters change
// }, [filters]);
//   // Fetch BHK data
//   useEffect(() => {
//     const getBHK = async () => {
//       const data = await fetchWithAuth("https://localhost:7117/api/BHK");
//       if (data) setBhkData(data);
//     };
//     getBHK();
//   }, []);

//   // Fetch Amenities
//   useEffect(() => {
//     const getAmenities = async () => {
//       const data = await fetchWithAuth("https://localhost:7117/api/Amenities");
//       if (data) setAmenitiesList(data);
//     };
//     getAmenities();
//   }, []);

//   useEffect(() => {
//     let filtered = [...properties];

//     if (filters.categoryName) {
//       filtered = filtered.filter(p => p.category?.categoryName === filters.categoryName);
//     }

//     filtered = filtered.filter(p => {
//       const amount = p.prices?.[0]?.amount;
//       const price = typeof amount === 'string' ? parseInt(amount.replace(/,/g, '')) : parseInt(amount || 0);
//       return price >= filters.minBudget && price <= filters.maxBudget;
//     });

//     if (filters.bedrooms !== "Any") {
//       const minBhk = parseInt(filters.bedrooms);
//       filtered = filtered.filter(p => {
//         const bhk = getBhkInfo(p.propertyId);
//         return bhk && parseInt(bhk.bhkType) >= minBhk;
//       });
//     }

//     if (filters.bathrooms !== "Any") {
//       const minBath = parseInt(filters.bathrooms);
//       filtered = filtered.filter(p => {
//         const bhk = getBhkInfo(p.propertyId);
//         return bhk && bhk.totalWashrooms >= minBath;
//       });
//     }

//     filtered = filtered.filter(p =>
//       p.areaSqft >= filters.minSqft && p.areaSqft <= filters.maxSqft
//     );

//     if (filters.status !== "Any") {
//       filtered = filtered.filter(
//         p => p.status?.toLowerCase() === filters.status.toLowerCase()
//       );
//     }

//     if (filters.amenities.length > 0) {
//       filtered = filtered.filter(p => {
//         if (!p.amenities || !Array.isArray(p.amenities)) return false;
//         return filters.amenities.every(selectedAmenity =>
//           p.amenities.some(propertyAmenity =>
//             propertyAmenity.toLowerCase() === selectedAmenity.toLowerCase()
//           )
//         );
//       });
//     }

//     setFilteredProperties(filtered);
//   }, [filters, properties]);


//   const handleDelete = async (propertyId) => {
//     if (!window.confirm("Are you sure you want to delete this property?")) return;

//     try {
//       await fetchWithAuth(`https://localhost:7117/api/properties/${propertyId}`, {
//         method: 'DELETE'
//       });

//       setProperties(prev => prev.filter(p => p.propertyId !== propertyId));
//     } catch (err) {
//       console.error('Failed to delete property', err);
//     }
//   };


//   const handleAmenityToggle = (amenity) => {
//     setFilters(prev => ({
//       ...prev,
//       amenities: prev.amenities.includes(amenity)
//         ? prev.amenities.filter(a => a !== amenity)
//         : [...prev.amenities, amenity]
//     }));
//   };

//   const getBhkInfo = (propertyId) => {
//     return bhkData.find(b => b.propertyId === propertyId);
//   };

//   const handleResetFilters = () => {
//     setFilters({
//       categoryName: "",
//       minBudget: 0,
//       maxBudget: 10000000,
//       bedrooms: "Any",
//       bathrooms: "Any",
//       minSqft: 0,
//       maxSqft: 10000,
//       status: "Any",
//       amenities: []
//     });
//   };

//   const handleViewDetails = (propertyId) => {
//     navigate(`/explore_property/Detail/${propertyId}`);
//   };

//   return (
//     <div className="buy-property-container">

//       {/* Header with Filter Toggle */}
//       <div className="header-wrapper">
//         <button
//           onClick={() => setShowFilters(!showFilters)}
//           className="details-btn filter-toggle-btn"
//         >
//           <svg className="filter-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
//           </svg>
//           {showFilters ? 'Hide Filters' : 'Show Filters'}
//           {(filters.categoryName || filters.amenities.length > 0 || filters.bedrooms !== "Any") && (
//             <span className="active-indicator">
//               Active
//             </span>
//           )}
//         </button>
//       </div>

//       {/* Active Filter Badge */}
//       {/* Active Filters Badges */}
//       {(filters.categoryName || filters.bedrooms !== "Any" || filters.bathrooms !== "Any" ||
//         filters.status !== "Any" || filters.amenities.length > 0 ||
//         filters.minBudget > 0 || filters.maxBudget < 10000000 ||
//         filters.minSqft > 0 || filters.maxSqft < 10000) && (
//           <div className="active-filters-container">
//             <span className="active-filters-label">Active Filters:</span>

//             {/* Category Filter */}
//             {filters.categoryName && (
//               <div className="filter-badge badge-category">
//                 Type: {filters.categoryName}
//                 <button
//                   onClick={() => setFilters(prev => ({ ...prev, categoryName: "" }))}
//                   className="badge-remove-btn"
//                 >
//                   ×
//                 </button>
//               </div>
//             )}

//             {/* Budget Filter */}
//             {(filters.minBudget > 0 || filters.maxBudget < 10000000) && (
//               <div className="filter-badge badge-budget">
//                 Budget: ₹{filters.minBudget.toLocaleString()} - ₹{filters.maxBudget >= 10000000 ? '10Cr+' : filters.maxBudget.toLocaleString()}
//                 <button
//                   onClick={() => setFilters(prev => ({ ...prev, minBudget: 0, maxBudget: 10000000 }))}
//                   className="badge-remove-btn"
//                 >
//                   ×
//                 </button>
//               </div>
//             )}

//             {/* Bedrooms Filter */}
//             {filters.bedrooms !== "Any" && (
//               <div className="filter-badge badge-bedrooms">
//                 Bedrooms: {filters.bedrooms}
//                 <button
//                   onClick={() => setFilters(prev => ({ ...prev, bedrooms: "Any" }))}
//                   className="badge-remove-btn"
//                 >
//                   ×
//                 </button>
//               </div>
//             )}

//             {/* Bathrooms Filter */}
//             {filters.bathrooms !== "Any" && (
//               <div className="filter-badge badge-bathrooms">
//                 Bathrooms: {filters.bathrooms}
//                 <button
//                   onClick={() => setFilters(prev => ({ ...prev, bathrooms: "Any" }))}
//                   className="badge-remove-btn"
//                 >
//                   ×
//                 </button>
//               </div>
//             )}

//             {/* Square Footage Filter */}
//             {(filters.minSqft > 0 || filters.maxSqft < 10000) && (
//               <div className="filter-badge badge-area">
//                 Area: {filters.minSqft} - {filters.maxSqft >= 10000 ? '10,000+' : filters.maxSqft} sqft
//                 <button
//                   onClick={() => setFilters(prev => ({ ...prev, minSqft: 0, maxSqft: 10000 }))}
//                   className="badge-remove-btn"
//                 >
//                   ×
//                 </button>
//               </div>
//             )}

//             {/* Status Filter */}
//             {filters.status !== "Any" && (
//               <div className="filter-badge badge-status">
//                 Status: {filters.status}
//                 <button
//                   onClick={() => setFilters(prev => ({ ...prev, status: "Any" }))}
//                   className="badge-remove-btn"
//                 >
//                   ×
//                 </button>
//               </div>
//             )}

//             {/* Amenities Filters */}
//             {filters.amenities.map((amenity, index) => (
//               <div key={index} className="filter-badge badge-amenity">
//                 {amenity}
//                 <button
//                   onClick={() => handleAmenityToggle(amenity)}
//                   className="badge-remove-btn"
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}

//             {/* Clear All Button */}
//             <button
//               onClick={handleResetFilters}
//               className="clear-all-filters-btn"
//             >
//               Clear All
//             </button>
//           </div>
//         )}

//       <div className="content-wrapper">
//         {/* SIDEBAR FILTERS */}
//         {showFilters && (
//           <>
//             {/* Mobile Overlay */}
//             <div
//               className="filter-overlay"
//               onClick={() => setShowFilters(false)}
//             />

//             <aside className={`filters-sidebar ${window.innerWidth < 1024 ? 'filters-sidebar-mobile' : 'filters-sidebar-desktop'}`}>
//               <div className="sidebar-header">
//                 <h2>Filters</h2>
//                 {window.innerWidth < 1024 && (
//                   <button
//                     onClick={() => setShowFilters(false)}
//                     className="close-sidebar-btn"
//                   >
//                     ✕
//                   </button>
//                 )}
//               </div>



//               {/* Property Type */}
//               <div className="filter-group">
//                 <h3>Property Type</h3>
//                 <select
//                   value={filters.categoryName}
//                   onChange={(e) => setFilters({ ...filters, categoryName: e.target.value })}
//                   className="filter-select"
//                 >
//                   <option value="">All Types</option>
//                   <option value="Apartment">Apartment</option>
//                   <option value="Commercial">Commercial</option>
//                   <option value="House">House</option>
//                   <option value="Land">Land</option>
//                   <option value="Office">Office</option>
//                   <option value="PG">PG</option>
//                   <option value="Shop">Shop</option>
//                 </select>
//               </div>

//               {/* Budget */}
//               <div className="filter-group">
//                 <h3>Budget</h3>
//                 <div className="range-display">
//                   <span>₹{filters.minBudget.toLocaleString()}</span>
//                   <span>₹{filters.maxBudget >= 10000000 ? '10Cr+' : filters.maxBudget.toLocaleString()}</span>
//                 </div>
//                 <input
//                   type="range"
//                   min="0"
//                   max="10000000"
//                   step="100000"
//                   value={filters.maxBudget}
//                   onChange={(e) => setFilters({ ...filters, maxBudget: parseInt(e.target.value) })}
//                   className="range-slider"
//                 />
//                 <div className="input-row">
//                   <input
//                     type="number"
//                     placeholder="Min"
//                     value={filters.minBudget}
//                     onChange={(e) => setFilters({ ...filters, minBudget: parseInt(e.target.value) || 0 })}
//                     className="filter-input"
//                   />
//                   <input
//                     type="number"
//                     placeholder="Max"
//                     value={filters.maxBudget}
//                     onChange={(e) => setFilters({ ...filters, maxBudget: parseInt(e.target.value) || 10000000 })}
//                     className="filter-input"
//                   />
//                 </div>
//               </div>

//               {/* Bedrooms */}
//               <div className="filter-group">
//                 <h3>Bedrooms</h3>
//                 <div className="button-group">
//                   {['Any', '1+', '2+', '3+', '4+', '5+'].map(option => (
//                     <button
//                       key={option}
//                       onClick={() => setFilters({ ...filters, bedrooms: option })}
//                       className={`filter-btn ${filters.bedrooms === option ? 'active' : ''}`}
//                     >
//                       {option}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Bathrooms */}
//               <div className="filter-group">
//                 <h3>Bathrooms</h3>
//                 <div className="button-group">
//                   {['Any', '1+', '2+', '3+', '4+', '5+'].map(option => (
//                     <button
//                       key={option}
//                       onClick={() => setFilters({ ...filters, bathrooms: option })}
//                       className={`filter-btn ${filters.bathrooms === option ? 'active' : ''}`}
//                     >
//                       {option}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Square Footage */}
//               <div className="filter-group">
//                 <h3>Square Footage</h3>
//                 <div className="range-display">
//                   <span>Min: {filters.minSqft} sqft</span>
//                   <span>Max: {filters.maxSqft >= 10000 ? '10,000+' : filters.maxSqft} sqft</span>
//                 </div>
//                 <div className="input-row">
//                   <input
//                     type="number"
//                     placeholder="Min sqft"
//                     value={filters.minSqft}
//                     onChange={(e) => setFilters({ ...filters, minSqft: parseInt(e.target.value) || 0 })}
//                     className="filter-input"
//                   />
//                   <input
//                     type="number"
//                     placeholder="Max sqft"
//                     value={filters.maxSqft}
//                     onChange={(e) => setFilters({ ...filters, maxSqft: parseInt(e.target.value) || 10000 })}
//                     className="filter-input"
//                   />
//                 </div>
//               </div>

//               {/* Status */}
//               <div className="filter-group">
//                 <h3>Status</h3>
//                 <div className="button-group">
//                   {['Any', 'ongoing', 'completed', 'Cancelled'].map(option => (
//                     <button
//                       key={option}
//                       onClick={() => setFilters({ ...filters, status: option })}
//                       className={`filter-btn ${filters.status === option ? 'active' : ''}`}
//                     >
//                       {option}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Amenities */}
//               <div className="filter-group">
//                 <h3>Amenities</h3>
//                 <div className="amenities-grid">
//                   {amenitiesList.map(amenity => (
//                     <label key={amenity.amenityId} className="amenity-checkbox">
//                       <input
//                         type="checkbox"
//                         checked={filters.amenities.includes(amenity.amenityName)}
//                         onChange={() => handleAmenityToggle(amenity.amenityName)}
//                       />
//                       <span>{amenity.amenityName}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* Reset Filters */}
//               <button onClick={handleResetFilters} className="reset-btn">
//                 Reset All Filters
//               </button>
//             </aside>

//           </>
//         )}

//         {/* PROPERTY LIST */}
//         <div className={`properties-main ${!showFilters ? 'filters-hidden' : ''}`}>
//           <div className="results-count">
//             <p>Showing {filteredProperties.length} of {properties.length} properties</p>
//           </div>

//           <div className="property-list">
//             {filteredProperties.map((p) => (
//               <div key={p.propertyId} className="light-card">
//                 <div className="card-image-slider">
//                   <div
//                     className={
//                       p.prices?.[0]?.transactionType?.toLowerCase() === "rent"
//                         ? "badge-overlay rent-badge"
//                         : "badge-overlay sale-badge"
//                     }
//                   >
//                     {p.prices?.[0]?.transactionType?.toUpperCase()}
//                   </div>


//                   {p.images && p.images.length > 0 ? (
//                     <>
//                       <div
//                         id={`track-${p.propertyId}`}
//                         className="image-track"
//                         onScroll={(e) => {
//                           const scrollLeft = e.target.scrollLeft;
//                           const width = e.target.clientWidth;
//                           const newIndex = Math.round(scrollLeft / width);
//                           if (imageIndexes[p.propertyId] !== newIndex) {
//                             setImageIndexes(prev => ({
//                               ...prev,
//                               [p.propertyId]: newIndex
//                             }));
//                           }
//                         }}
//                       >
//                         {p.images.map((img, idx) => (
//                           <img
//                             key={idx}
//                             src={`https://localhost:7117/images/${img}`}
//                             alt={`property ${idx}`}
//                             className="slider-image"
//                             onError={(e) => {
//                               e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="18" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';
//                             }}
//                           />
//                         ))}
//                       </div>
//                       {p.images.length > 1 && (
//                         <div className="dots">
//                           {p.images.map((_, idx) => (
//                             <span
//                               key={idx}
//                               className={`dot ${(imageIndexes[p.propertyId] || 0) === idx ? 'active' : ''}`}
//                               onClick={() => {
//                                 const track = document.getElementById(`track-${p.propertyId}`);
//                                 if (track) {
//                                   track.scrollTo({
//                                     left: idx * track.clientWidth,
//                                     behavior: "smooth"
//                                   });
//                                 }
//                               }}
//                             />
//                           ))}
//                         </div>
                       
//                       )}
//                        <Pagination />
//                     </>
//                   ) : (
//                     <div className="no-image-placeholder">
//                       No Image Available
//                     </div>
//                   )}
//                 </div>

//                 <div className="card-body">
//                   <h3>{p.title}</h3>
//                   <p className="location">{p.address?.city}, {p.address?.state}</p>

//                   <div className="price">
//                     ₹ {p.prices?.[0]?.amount}
//                     {p.prices?.[0]?.transactionType === "rent" && <span> /month</span>}
//                   </div>

//                   <div className="meta">
//                     <span>{p.areaSqft} sqft</span>
//                     <span>{p.category?.categoryName}</span>
//                   </div>

//                   <button
//                     onClick={() => handleViewDetails(p.propertyId)}
//                     className="light-btn"
//                   >
//                     View Details
//                   </button>
//                   {canEdit && (
//                     <button
//                       onClick={() => handleDelete(p.propertyId)}
//                       className="light-btn delete-btn-custom"
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {filteredProperties.length === 0 && (
//             <div className="no-results">
//               <p>No properties found matching your filters.</p>
//               <p className="no-results-subtitle">Try adjusting your search criteria.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./Buy_Property.css";
import { fetchWithAuth } from '../login/api';
import { getCurrentUser } from '../login/Auth';
import { motion } from "framer-motion";

// ✅ Pagination moved OUTSIDE component to avoid re-creation on every render
function Pagination({ currentPage, totalPages, totalCount, setCurrentPage }) {
  return (
    <div className="pagination-wrapper">
      <button
        onClick={() => setCurrentPage(p => p - 1)}
        disabled={currentPage === 1}
        className="details-btn"
      >
        ← Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
        .map((p, idx, arr) => (
          <span key={p}>
            {idx > 0 && arr[idx - 1] !== p - 1 && (
              <span className="pagination-dots">...</span>
            )}
            <button
              onClick={() => setCurrentPage(p)}
              className={`details-btn ${currentPage === p ? 'active' : ''}`}
            >
              {p}
            </button>
          </span>
        ))
      }

      <button
        onClick={() => setCurrentPage(p => p + 1)}
        disabled={currentPage === totalPages}
        className="details-btn"
      >
        Next →
      </button>

      <span className="results-info">
        Page {currentPage} of {totalPages} ({totalCount} properties)
      </span>
    </div>
  );
}

export default function BuyProperty() {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [imageIndexes, setImageIndexes] = useState({});
  const [bhkData, setBhkData] = useState([]);
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const PAGE_SIZE = 3;

  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const canEdit = currentUser && currentUser.userType === 'admin';

  const [filters, setFilters] = useState({
    categoryName: "",
    minBudget: 0,
    maxBudget: 10000000,
    bedrooms: "Any",
    bathrooms: "Any",
    minSqft: 0,
    maxSqft: 10000,
    status: "Any",
    amenities: []
  });

  // ✅ Single fetch useEffect — runs when currentPage changes
useEffect(() => {
  const getProperties = async () => {
    // ✅ If any filter is active, fetch ALL properties
    const hasActiveFilters =
      filters.categoryName ||
      filters.bedrooms !== "Any" ||
      filters.bathrooms !== "Any" ||
      filters.status !== "Any" ||
      filters.amenities.length > 0 ||
      filters.minBudget > 0 ||
      filters.maxBudget < 10000000  ||
      filters.minSqft > 0 ||
      filters.maxSqft < 10000;

    const url = hasActiveFilters
      ? `https://localhost:7117/api/properties?page=1&pageSize=10000`  // fetch all
      : `https://localhost:7117/api/properties?page=${currentPage}&pageSize=${PAGE_SIZE}`;

    const data = await fetchWithAuth(url);
    if (data) {
      setProperties(data.items ?? []);
      setTotalPages(hasActiveFilters ? 1 : (data.totalPages ?? 1));
      setTotalCount(data.totalCount ?? 0);
    }
  };
  getProperties();
}, [currentPage, filters]);   // ✅ add filters as dependency

  // ✅ Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // ✅ Apply URL param filters on mount
  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam) {
      setFilters(prev => ({ ...prev, categoryName: typeParam }));
      setShowFilters(true);
    }
  }, [searchParams]);

  // ✅ Fetch BHK data
  useEffect(() => {
    const getBHK = async () => {
      const data = await fetchWithAuth("https://localhost:7117/api/BHK");
      if (data) setBhkData(data);
    };
    getBHK();
  }, []);

  // ✅ Fetch Amenities
  useEffect(() => {
    const getAmenities = async () => {
      const data = await fetchWithAuth("https://localhost:7117/api/Amenities");
      if (data) setAmenitiesList(data);
    };
    getAmenities();
  }, []);

  // ✅ Client-side filtering on top of paginated results
  useEffect(() => {
    let filtered = [...properties];

    if (filters.categoryName) {
      filtered = filtered.filter(p => p.category?.categoryName === filters.categoryName);
    }

    filtered = filtered.filter(p => {
      const amount = p.prices?.[0]?.amount;
      const price = typeof amount === 'string'
        ? parseInt(amount.replace(/,/g, ''))
        : parseInt(amount || 0);
      return price >= filters.minBudget && price <= filters.maxBudget;
    });

    if (filters.bedrooms !== "Any") {
      const minBhk = parseInt(filters.bedrooms);
      filtered = filtered.filter(p => {
        const bhk = getBhkInfo(p.propertyId);
        return bhk && parseInt(bhk.bhkType) >= minBhk;
      });
    }

    if (filters.bathrooms !== "Any") {
      const minBath = parseInt(filters.bathrooms);
      filtered = filtered.filter(p => {
        const bhk = getBhkInfo(p.propertyId);
        return bhk && bhk.totalWashrooms >= minBath;
      });
    }

    filtered = filtered.filter(p =>
      p.areaSqft >= filters.minSqft && p.areaSqft <= filters.maxSqft
    );

    if (filters.status !== "Any") {
      filtered = filtered.filter(
        p => p.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter(p => {
        if (!p.amenities || !Array.isArray(p.amenities)) return false;
        return filters.amenities.every(selectedAmenity =>
          p.amenities.some(pa => pa.toLowerCase() === selectedAmenity.toLowerCase())
        );
      });
    }

    setFilteredProperties(filtered);
  }, [filters, properties]);

  const handleDelete = async (propertyId) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      await fetchWithAuth(`https://localhost:7117/api/properties/${propertyId}`, {
        method: 'DELETE'
      });
      setProperties(prev => prev.filter(p => p.propertyId !== propertyId));
    } catch (err) {
      console.error('Failed to delete property', err);
    }
  };

  const handleAmenityToggle = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const getBhkInfo = (propertyId) => {
    return bhkData.find(b => b.propertyId === propertyId);
  };

  const handleResetFilters = () => {
    setFilters({
      categoryName: "",
      minBudget: 0,
      maxBudget: 10000000,
      bedrooms: "Any",
      bathrooms: "Any",
      minSqft: 0,
      maxSqft: 10000,
      status: "Any",
      amenities: []
    });
  };

  const handleViewDetails = (propertyId) => {
    navigate(`/explore_property/Detail/${propertyId}`);
  };

  return (
    <div className="buy-property-container">

      {/* Header with Filter Toggle */}
      <div className="header-wrapper">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="details-btn filter-toggle-btn"
        >
          <svg className="filter-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
          {(filters.categoryName || filters.amenities.length > 0 || filters.bedrooms !== "Any") && (
            <span className="active-indicator">Active</span>
          )}
        </button>
      </div>

      {/* Active Filters Badges */}
      {(filters.categoryName || filters.bedrooms !== "Any" || filters.bathrooms !== "Any" ||
        filters.status !== "Any" || filters.amenities.length > 0 ||
        filters.minBudget > 0 || filters.maxBudget < 10000000  ||
        filters.minSqft > 0 || filters.maxSqft < 10000) && (
          <div className="active-filters-container">
            <span className="active-filters-label">Active Filters:</span>

            {filters.categoryName && (
              <div className="filter-badge badge-category">
                Type: {filters.categoryName}
                <button onClick={() => setFilters(prev => ({ ...prev, categoryName: "" }))} className="badge-remove-btn">×</button>
              </div>
            )}

            {(filters.minBudget > 0 || filters.maxBudget < 10000000) && (
              <div className="filter-badge badge-budget">
                Budget: ₹{filters.minBudget.toLocaleString()} - ₹{filters.maxBudget >= 10000000 ? '10Cr+' : filters.maxBudget.toLocaleString()}
                <button onClick={() => setFilters(prev => ({ ...prev, minBudget: 0, maxBudget: 10000000 }))} className="badge-remove-btn">×</button>
              </div>
            )}

            {filters.bedrooms !== "Any" && (
              <div className="filter-badge badge-bedrooms">
                Bedrooms: {filters.bedrooms}
                <button onClick={() => setFilters(prev => ({ ...prev, bedrooms: "Any" }))} className="badge-remove-btn">×</button>
              </div>
            )}

            {filters.bathrooms !== "Any" && (
              <div className="filter-badge badge-bathrooms">
                Bathrooms: {filters.bathrooms}
                <button onClick={() => setFilters(prev => ({ ...prev, bathrooms: "Any" }))} className="badge-remove-btn">×</button>
              </div>
            )}

            {(filters.minSqft > 0 || filters.maxSqft < 10000) && (
              <div className="filter-badge badge-area">
                Area: {filters.minSqft} - {filters.maxSqft >= 10000 ? '10,000+' : filters.maxSqft} sqft
                <button onClick={() => setFilters(prev => ({ ...prev, minSqft: 0, maxSqft: 10000 }))} className="badge-remove-btn">×</button>
              </div>
            )}

            {filters.status !== "Any" && (
              <div className="filter-badge badge-status">
                Status: {filters.status}
                <button onClick={() => setFilters(prev => ({ ...prev, status: "Any" }))} className="badge-remove-btn">×</button>
              </div>
            )}

            {filters.amenities.map((amenity, index) => (
              <div key={index} className="filter-badge badge-amenity">
                {amenity}
                <button onClick={() => handleAmenityToggle(amenity)} className="badge-remove-btn">×</button>
              </div>
            ))}

            <button onClick={handleResetFilters} className="clear-all-filters-btn">Clear All</button>
          </div>
        )}

      <div className="content-wrapper">

        {/* SIDEBAR FILTERS */}
        {showFilters && (
          <>
            <div className="filter-overlay" onClick={() => setShowFilters(false)} />

            <aside className={`filters-sidebar ${window.innerWidth < 1024 ? 'filters-sidebar-mobile' : 'filters-sidebar-desktop'}`}>
              <div className="sidebar-header">
                <h2>Filters</h2>
                {window.innerWidth < 1024 && (
                  <button onClick={() => setShowFilters(false)} className="close-sidebar-btn">✕</button>
                )}
              </div>

              {/* Property Type */}
              <div className="filter-group">
                <h3>Property Type</h3>
                <select
                  value={filters.categoryName}
                  onChange={(e) => setFilters({ ...filters, categoryName: e.target.value })}
                  className="filter-select"
                >
                  <option value="">All Types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Commercial">Commercial</option>
                  <option value="House">House</option>
                  <option value="Land">Land</option>
                  <option value="Office">Office</option>
                  <option value="PG">PG</option>
                  <option value="Shop">Shop</option>
                </select>
              </div>

              {/* Budget */}
              <div className="filter-group">
                <h3>Budget</h3>
                <div className="range-display">
                  <span>₹{filters.minBudget.toLocaleString()}</span>
                  <span>₹{filters.maxBudget >= 10000000 ? '10Cr+' : filters.maxBudget.toLocaleString()}</span>
                </div>
                <input
                  type="range" min="0" max="10000000" step="100000"
                  value={filters.maxBudget}
                  onChange={(e) => setFilters({ ...filters, maxBudget: parseInt(e.target.value) })}
                  className="range-slider"
                />
                <div className="input-row">
                  <input type="number" placeholder="Min" value={filters.minBudget}
                    onChange={(e) => setFilters({ ...filters, minBudget: parseInt(e.target.value) || 0 })}
                    className="filter-input" />
                  <input type="number" placeholder="Max" value={filters.maxBudget}
                    onChange={(e) => setFilters({ ...filters, maxBudget: parseInt(e.target.value) || 10000000 })}
                    className="filter-input" />
                </div>
              </div>

              {/* Bedrooms */}
              <div className="filter-group">
                <h3>Bedrooms</h3>
                <div className="button-group">
                  {['Any', '1+', '2+', '3+', '4+', '5+'].map(option => (
                    <button key={option}
                      onClick={() => setFilters({ ...filters, bedrooms: option })}
                      className={`filter-btn ${filters.bedrooms === option ? 'active' : ''}`}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bathrooms */}
              <div className="filter-group">
                <h3>Bathrooms</h3>
                <div className="button-group">
                  {['Any', '1+', '2+', '3+', '4+', '5+'].map(option => (
                    <button key={option}
                      onClick={() => setFilters({ ...filters, bathrooms: option })}
                      className={`filter-btn ${filters.bathrooms === option ? 'active' : ''}`}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Square Footage */}
              <div className="filter-group">
                <h3>Square Footage</h3>
                <div className="range-display">
                  <span>Min: {filters.minSqft} sqft</span>
                  <span>Max: {filters.maxSqft >= 10000 ? '10,000+' : filters.maxSqft} sqft</span>
                </div>
                <div className="input-row">
                  <input type="number" placeholder="Min sqft" value={filters.minSqft}
                    onChange={(e) => setFilters({ ...filters, minSqft: parseInt(e.target.value) || 0 })}
                    className="filter-input" />
                  <input type="number" placeholder="Max sqft" value={filters.maxSqft}
                    onChange={(e) => setFilters({ ...filters, maxSqft: parseInt(e.target.value) || 10000 })}
                    className="filter-input" />
                </div>
              </div>

              {/* Status */}
              <div className="filter-group">
                <h3>Status</h3>
                <div className="button-group">
                  {['Any', 'ongoing', 'completed', 'Cancelled'].map(option => (
                    <button key={option}
                      onClick={() => setFilters({ ...filters, status: option })}
                      className={`filter-btn ${filters.status === option ? 'active' : ''}`}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="filter-group">
                <h3>Amenities</h3>
                <div className="amenities-grid">
                  {amenitiesList.map(amenity => (
                    <label key={amenity.amenityId} className="amenity-checkbox">
                      <input
                        type="checkbox"
                        checked={filters.amenities.includes(amenity.amenityName)}
                        onChange={() => handleAmenityToggle(amenity.amenityName)}
                      />
                      <span>{amenity.amenityName}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button onClick={handleResetFilters} className="reset-btn">Reset All Filters</button>
            </aside>
          </>
        )}

        {/* PROPERTY LIST */}
        <div className={`properties-main ${!showFilters ? 'filters-hidden' : ''}`}>

          {/* ✅ Updated results count using totalCount */}
          <div className="results-count">
            <p>Showing {filteredProperties.length} of {totalCount} properties</p>
          </div>

          <motion.div 
            className="property-list"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {filteredProperties.map((p, index) => (
              <motion.div 
                key={p.propertyId} 
                className="light-card"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } }
                }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <div className="card-image-slider">
                  <div className={
                    p.prices?.[0]?.transactionType?.toLowerCase() === "rent"
                      ? "badge-overlay rent-badge"
                      : "badge-overlay sale-badge"
                  }>
                    {p.prices?.[0]?.transactionType?.toUpperCase()}
                  </div>

                  {p.images && p.images.length > 0 ? (
                    <>
                      <div
                        id={`track-${p.propertyId}`}
                        className="image-track"
                        onScroll={(e) => {
                          const scrollLeft = e.target.scrollLeft;
                          const width = e.target.clientWidth;
                          const newIndex = Math.round(scrollLeft / width);
                          if (imageIndexes[p.propertyId] !== newIndex) {
                            setImageIndexes(prev => ({ ...prev, [p.propertyId]: newIndex }));
                          }
                        }}
                      >
                        {p.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={`https://localhost:7117/images/${img}`}
                            alt={`property ${idx}`}
                            className="slider-image"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="18" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';
                            }}
                          />
                        ))}
                      </div>
                      {p.images.length > 1 && (
                        <div className="dots">
                          {p.images.map((_, idx) => (
                            <span
                              key={idx}
                              className={`dot ${(imageIndexes[p.propertyId] || 0) === idx ? 'active' : ''}`}
                              onClick={() => {
                                const track = document.getElementById(`track-${p.propertyId}`);
                                if (track) track.scrollTo({ left: idx * track.clientWidth, behavior: "smooth" });
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="no-image-placeholder">No Image Available</div>
                  )}
                </div>

                <div className="card-body">
                  <h3>{p.title}</h3>
                  <p className="location">{p.address?.city}, {p.address?.state}</p>

                  <div className="price">
                    ₹ {p.prices?.[0]?.amount}
                    {p.prices?.[0]?.transactionType === "rent" && <span> /month</span>}
                  </div>

                  <div className="meta">
                    <span>{p.areaSqft} sqft</span>
                    <span>{p.category?.categoryName}</span>
                  </div>

                  <button onClick={() => handleViewDetails(p.propertyId)} className="light-btn">
                    View Details
                  </button>

                  {canEdit && (
                    <button onClick={() => handleDelete(p.propertyId)} className="light-btn delete-btn-custom">
                      Delete
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProperties.length === 0 && (
            <div className="no-results">
              <p>No properties found matching your filters.</p>
              <p className="no-results-subtitle">Try adjusting your search criteria.</p>
            </div>
          )}

          {/* ✅ Pagination placed BELOW the property list, ONCE */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            setCurrentPage={setCurrentPage}
          />

        </div>
      </div>
    </div>
  );
}