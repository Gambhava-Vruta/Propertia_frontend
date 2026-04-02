// // import React, { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, Circle } from "react-leaflet";
// // import "leaflet/dist/leaflet.css";
// // import L from "leaflet";
// // import "./PropertyRouteMap.css";

// // // Fix default marker icons
// // delete L.Icon.Default.prototype._getIconUrl;
// // L.Icon.Default.mergeOptions({
// //   iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
// //   iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
// //   shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// // });

// // // Custom icons
// // const userIcon = new L.Icon({
// //   iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
// //   shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// //   iconSize: [25, 41],
// //   iconAnchor: [12, 41],
// //   popupAnchor: [1, -34],
// //   shadowSize: [41, 41]
// // });

// // const propertyIcon = new L.Icon({
// //   iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
// //   shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// //   iconSize: [25, 41],
// //   iconAnchor: [12, 41],
// //   popupAnchor: [1, -34],
// //   shadowSize: [41, 41]
// // });

// // function MapFitter({ userLocation, propertyLocation, route, trackUser }) {
// //   const map = useMap();

// //   useEffect(() => {
// //     if (!map) return;

// //     // Prevent map manipulation during transitions
// //     const timer = setTimeout(() => {
// //       try {
// //         if (trackUser && userLocation) {
// //           // Center on user when tracking is enabled
// //           map.setView([userLocation.lat, userLocation.lon], 15, { 
// //             animate: true,
// //             duration: 1
// //           });
// //         } else if (route && route.length > 0 && !trackUser) {
// //           const bounds = L.latLngBounds(route);
// //           map.fitBounds(bounds, { 
// //             padding: [50, 50],
// //             animate: true,
// //             duration: 1
// //           });
// //         } else if (userLocation && propertyLocation && !trackUser) {
// //           const bounds = L.latLngBounds([
// //             [userLocation.lat, userLocation.lon],
// //             [propertyLocation.lat, propertyLocation.lon]
// //           ]);
// //           map.fitBounds(bounds, { 
// //             padding: [50, 50],
// //             animate: true,
// //             duration: 1
// //           });
// //         }
// //       } catch (error) {
// //         console.warn("Map update skipped:", error);
// //       }
// //     }, 100);

// //     return () => clearTimeout(timer);
// //   }, [map, userLocation?.lat, userLocation?.lon, propertyLocation, route, trackUser]);

// //   return null;
// // }

// // export default function PropertyRouteMap() {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
  
// //   const [property, setProperty] = useState(null);
// //   const [propertyLocation, setPropertyLocation] = useState(null);
// //   const [userLocation, setUserLocation] = useState(null);
// //   const [route, setRoute] = useState([]);
// //   const [directions, setDirections] = useState([]);
// //   const [distance, setDistance] = useState(null);
// //   const [duration, setDuration] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [trackingEnabled, setTrackingEnabled] = useState(false);
// //   const [watchId, setWatchId] = useState(null);
// //   const [accuracy, setAccuracy] = useState(null);

// //   // Fetch property details
// //   useEffect(() => {
// //     fetch(`https://localhost:7117/api/properties/${id}`)
// //       .then(res => res.json())
// //       .then(data => {
// //         setProperty(data);
// //         // Add small delay before geocoding to respect API rate limits
// //         setTimeout(() => {
// //           geocodeAddress(data.address);
// //         }, 500);
// //       })
// //       .catch(err => {
// //         setError("Failed to load property details");
// //         console.error(err);
// //       });
// //   }, [id]);

// //   // Geocode property address
// //   const geocodeAddress = async (address) => {
// //     const query = `${address.location}, ${address.city}, ${address.state}, ${address.country}`;
    
// //     try {
// //       const res = await fetch(
// //         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`,
// //         {
// //           headers: {
// //             'User-Agent': 'PropertyApp/1.0 (React App)',
// //             'Accept': 'application/json'
// //           }
// //         }
// //       );
      
// //       if (!res.ok) {
// //         throw new Error(`HTTP error! status: ${res.status}`);
// //       }
      
// //       const data = await res.json();
      
// //       if (data.length > 0) {
// //         setPropertyLocation({
// //           lat: parseFloat(data[0].lat),
// //           lon: parseFloat(data[0].lon)
// //         });
// //       } else {
// //         // Fallback: Try geocoding just city and state
// //         const fallbackQuery = `${address.city}, ${address.state}, ${address.country}`;
// //         const fallbackRes = await fetch(
// //           `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fallbackQuery)}&limit=1`,
// //           {
// //             headers: {
// //               'User-Agent': 'PropertyApp/1.0 (React App)',
// //               'Accept': 'application/json'
// //             }
// //           }
// //         );
// //         const fallbackData = await fallbackRes.json();
        
// //         if (fallbackData.length > 0) {
// //           setPropertyLocation({
// //             lat: parseFloat(fallbackData[0].lat),
// //             lon: parseFloat(fallbackData[0].lon)
// //           });
// //         } else {
// //           setError("Could not find property location");
// //         }
// //       }
// //     } catch (err) {
// //       console.error("Geocoding error:", err);
// //       // Fallback to default Rajkot coordinates if geocoding fails
// //       setPropertyLocation({
// //         lat: 22.3039,
// //         lon: 70.8022
// //       });
// //     }
// //   };

// //   // Get user's initial location
// //   useEffect(() => {
// //     if (navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition(
// //         (position) => {
// //           setUserLocation({
// //             lat: position.coords.latitude,
// //             lon: position.coords.longitude
// //           });
// //           setAccuracy(position.coords.accuracy);
// //         },
// //         (err) => {
// //           // Default to Rajkot, Gujarat if location access denied
// //           setUserLocation({
// //             lat: 22.3039,
// //             lon: 70.8022
// //           });
// //           console.warn("Location access denied, using default location");
// //         },
// //         {
// //           enableHighAccuracy: true,
// //           timeout: 5000,
// //           maximumAge: 0
// //         }
// //       );
// //     } else {
// //       setUserLocation({
// //         lat: 22.3039,
// //         lon: 70.8022
// //       });
// //     }
// //   }, []);

// //   // Live location tracking
// //   const startTracking = () => {
// //     if (!navigator.geolocation) {
// //       alert("Geolocation is not supported by your browser");
// //       return;
// //     }

// //     const id = navigator.geolocation.watchPosition(
// //       (position) => {
// //         const newLocation = {
// //           lat: position.coords.latitude,
// //           lon: position.coords.longitude
// //         };
        
// //         setUserLocation(newLocation);
// //         setAccuracy(position.coords.accuracy);
        
// //         // Throttle route recalculation to avoid too many updates
// //         if (trackingEnabled && propertyLocation) {
// //           // Only recalculate if moved significantly (more than 50 meters)
// //           const hasMoved = !userLocation || 
// //             Math.abs(newLocation.lat - userLocation.lat) > 0.0005 ||
// //             Math.abs(newLocation.lon - userLocation.lon) > 0.0005;
            
// //           if (hasMoved) {
// //             fetchRouteWithLocations(newLocation, propertyLocation);
// //           }
// //         }
// //       },
// //       (err) => {
// //         console.error("Error watching position:", err);
// //         setError("Unable to track your location");
// //       },
// //       {
// //         enableHighAccuracy: true,
// //         timeout: 10000,
// //         maximumAge: 5000 // Allow 5 second cache
// //       }
// //     );

// //     setWatchId(id);
// //     setTrackingEnabled(true);
// //   };

// //   const stopTracking = () => {
// //     if (watchId) {
// //       navigator.geolocation.clearWatch(watchId);
// //       setWatchId(null);
// //     }
// //     setTrackingEnabled(false);
// //   };

// //   // Cleanup on unmount
// //   useEffect(() => {
// //     return () => {
// //       if (watchId) {
// //         navigator.geolocation.clearWatch(watchId);
// //       }
// //     };
// //   }, [watchId]);

// //   // Fetch route when both locations are available
// //   useEffect(() => {
// //     if (userLocation && propertyLocation) {
// //       fetchRoute();
// //     }
// //   }, [userLocation, propertyLocation]);

// //   const fetchRouteWithLocations = async (userLoc, propLoc) => {
// //     try {
// //       const res = await fetch(
// //         `https://router.project-osrm.org/route/v1/driving/${userLoc.lon},${userLoc.lat};${propLoc.lon},${propLoc.lat}?overview=full&geometries=geojson&steps=true`
// //       );
// //       const data = await res.json();

// //       if (data.routes && data.routes.length > 0) {
// //         const routeData = data.routes[0];
// //         const coords = routeData.geometry.coordinates.map(coord => [coord[1], coord[0]]);
        
// //         // Update state in a batch to prevent multiple re-renders
// //         const steps = routeData.legs[0].steps.map(step => ({
// //           instruction: step.maneuver.instruction || getManeuverText(step.maneuver),
// //           distance: (step.distance / 1000).toFixed(2),
// //           duration: Math.round(step.duration / 60)
// //         }));
        
// //         setRoute(coords);
// //         setDirections(steps);
// //         setDistance((routeData.distance / 1000).toFixed(2));
// //         setDuration(Math.round(routeData.duration / 60));
// //       }
// //     } catch (err) {
// //       console.error("Failed to fetch route:", err);
// //     }
// //   };

// //   const fetchRoute = async () => {
// //     setLoading(true);
    
// //     try {
// //       const res = await fetch(
// //         `https://router.project-osrm.org/route/v1/driving/${userLocation.lon},${userLocation.lat};${propertyLocation.lon},${propertyLocation.lat}?overview=full&geometries=geojson&steps=true`
// //       );
// //       const data = await res.json();

// //       if (data.routes && data.routes.length > 0) {
// //         const routeData = data.routes[0];
        
// //         const coords = routeData.geometry.coordinates.map(coord => [coord[1], coord[0]]);
// //         setRoute(coords);
        
// //         const steps = routeData.legs[0].steps.map(step => ({
// //           instruction: step.maneuver.instruction || getManeuverText(step.maneuver),
// //           distance: (step.distance / 1000).toFixed(2),
// //           duration: Math.round(step.duration / 60)
// //         }));
// //         setDirections(steps);
        
// //         setDistance((routeData.distance / 1000).toFixed(2));
// //         setDuration(Math.round(routeData.duration / 60));
// //       } else {
// //         setError("No route found");
// //       }
// //     } catch (err) {
// //       setError("Failed to fetch route");
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getManeuverText = (maneuver) => {
// //     const type = maneuver.type;
// //     const modifier = maneuver.modifier;
    
// //     if (type === "depart") return "Start your journey";
// //     if (type === "arrive") return "You have arrived at your destination";
// //     if (type === "turn") return `Turn ${modifier}`;
// //     if (type === "continue") return "Continue straight";
// //     if (type === "merge") return `Merge ${modifier}`;
// //     if (type === "roundabout") return `Take roundabout exit ${modifier}`;
    
// //     return `${type} ${modifier || ""}`.trim();
// //   };

// //   if (loading) {
// //     return (
// //       <div className="route-page">
// //         <div className="loading-container">
// //           <div className="spinner"></div>
// //           <p>Calculating route...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error && !property) {
// //     return (
// //       <div className="route-page">
// //         <div className="error-container">
// //           <p className="error-message">{error}</p>
// //           <button onClick={() => navigate(-1)} className="back-button">
// //             Go Back
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="route-page">
      
// //       {/* Header */}
// //       <div className="route-header">
// //         <button className="back-button" onClick={() => navigate(-1)}>
// //           ⬅ Back
// //         </button>
// //         <div className="route-info">
// //           <h2>Route to {property?.title}</h2>
// //           <div className="route-stats">
// //             <span className="stat">
// //               <strong>{distance}</strong> km
// //             </span>
// //             <span className="stat-divider">•</span>
// //             <span className="stat">
// //               <strong>{duration}</strong> min
// //             </span>
// //           </div>
// //         </div>
        
// //         {/* Live Tracking Toggle */}
// //         <button
// //           className={`tracking-button ${trackingEnabled ? "tracking-active" : ""}`}
// //           onClick={() => trackingEnabled ? stopTracking() : startTracking()}
// //         >
// //           {trackingEnabled ? "📍 Tracking ON" : "📍 Start Live Tracking"}
// //         </button>
// //       </div>

// //       <div className="route-content">
        
// //         {/* Directions Panel */}
// //         <div className="directions-panel">
// //           <h3>Turn-by-Turn Directions</h3>
          
// //           {trackingEnabled && (
// //             <div className="tracking-status">
// //               <div className="status-indicator">
// //                 <span className="pulse"></span>
// //                 <span>Live tracking active</span>
// //               </div>
// //               {accuracy && (
// //                 <span className="accuracy-info">
// //                   Accuracy: ±{Math.round(accuracy)}m
// //                 </span>
// //               )}
// //             </div>
// //           )}
          
// //           <div className="location-badges">
// //             <div className="badge start-badge">
// //               <span className="badge-icon">📍</span>
// //               <span>Your Location</span>
// //             </div>
// //             <div className="badge end-badge">
// //               <span className="badge-icon">🏠</span>
// //               <span>{property?.address?.city}</span>
// //             </div>
// //           </div>

// //           <div className="directions-list">
// //             {directions.map((step, idx) => (
// //               <div key={idx} className="direction-step">
// //                 <div className="step-number">{idx + 1}</div>
// //                 <div className="step-content">
// //                   <p className="step-instruction">{step.instruction}</p>
// //                   <p className="step-distance">
// //                     {step.distance} km • ~{step.duration} min
// //                   </p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="property-info-box">
// //             <h4>Destination</h4>
// //             <p className="property-title">{property?.title}</p>
// //             <p className="property-address">
// //               {property?.address?.location}, {property?.address?.city}
// //             </p>
// //             <p className="property-price">
// //               ₹{property?.prices?.[0]?.amount}
// //             </p>
// //           </div>
// //         </div>

// //         {/* Map */}
// //         <div className="route-map-container">
// //           <MapContainer
// //             center={[userLocation?.lat || 20.5937, userLocation?.lon || 78.9629]}
// //             zoom={13}
// //             style={{ height: "100%", width: "100%" }}
// //             key={`map-${userLocation?.lat}-${userLocation?.lon}`}
// //           >
// //             <TileLayer
// //               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// //             />

// //             {/* User location marker with accuracy circle */}
// //             {userLocation && (
// //               <>
// //                 <Marker position={[userLocation.lat, userLocation.lon]} icon={userIcon}>
// //                   <Popup>
// //                     <strong>Your Location</strong>
// //                     {trackingEnabled && <><br /><span style={{color: '#059669'}}>● Live tracking</span></>}
// //                   </Popup>
// //                 </Marker>
                
// //                 {accuracy && trackingEnabled && (
// //                   <Circle
// //                     center={[userLocation.lat, userLocation.lon]}
// //                     radius={accuracy}
// //                     pathOptions={{
// //                       color: '#10b981',
// //                       fillColor: '#10b981',
// //                       fillOpacity: 0.1,
// //                       weight: 1
// //                     }}
// //                   />
// //                 )}
// //               </>
// //             )}

// //             {/* Property location marker */}
// //             {propertyLocation && (
// //               <Marker position={[propertyLocation.lat, propertyLocation.lon]} icon={propertyIcon}>
// //                 <Popup>
// //                   <strong>{property?.title}</strong><br />
// //                   {property?.address?.city}
// //                 </Popup>
// //               </Marker>
// //             )}

// //             {/* Route polyline */}
// //             {route.length > 0 && (
// //               <Polyline
// //                 positions={route}
// //                 color="#2563eb"
// //                 weight={5}
// //                 opacity={0.7}
// //               />
// //             )}

// //             <MapFitter 
// //               userLocation={userLocation} 
// //               propertyLocation={propertyLocation}
// //               route={route}
// //               trackUser={trackingEnabled}
// //             />
// //           </MapContainer>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, Circle } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import "./PropertyRouteMap.css";

// // Fix default marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// // Custom icons
// const userIcon = new L.Icon({
//   iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
//   shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41]
// });

// const propertyIcon = new L.Icon({
//   iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
//   shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41]
// });

// function MapFitter({ userLocation, trackUser, followMode, onMapDrag, onMapReady }) {
//   const map = useMap();
//   const isUserDragging = React.useRef(false);

//   // Pass map instance to parent
//   React.useEffect(() => {
//     if (map && onMapReady) {
//       onMapReady(map);
//     }
//   }, [map, onMapReady]);

//   // Detect when user manually drags the map
//   React.useEffect(() => {
//     if (!map) return;

//     const handleDragStart = () => {
//       isUserDragging.current = true;
//       if (followMode) {
//         onMapDrag();
//       }
//     };

//     const handleDragEnd = () => {
//       setTimeout(() => {
//         isUserDragging.current = false;
//       }, 500);
//     };

//     map.on('dragstart', handleDragStart);
//     map.on('dragend', handleDragEnd);

//     return () => {
//       map.off('dragstart', handleDragStart);
//       map.off('dragend', handleDragEnd);
//     };
//   }, [map, followMode, onMapDrag]);

//   // Only handle follow mode, not initial route display
//   useEffect(() => {
//     if (!map || isUserDragging.current) return;

//     try {
//       // Follow user's movement when in follow mode
//       if (followMode && userLocation && trackUser) {
//         map.setView([userLocation.lat, userLocation.lon], 16, {
//           animate: true,
//           duration: 1.5,
//           easeLinearity: 0.25
//         });
//       }
//     } catch (error) {
//       console.warn("Map update skipped:", error);
//     }
//   }, [map, userLocation?.lat, userLocation?.lon, trackUser, followMode]);

//   return null;
// }

// export default function PropertyRouteMap() {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [property, setProperty] = useState(null);
//   const [propertyLocation, setPropertyLocation] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const [route, setRoute] = useState([]);
//   const [directions, setDirections] = useState([]);
//   const [distance, setDistance] = useState(null);
//   const [duration, setDuration] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [trackingEnabled, setTrackingEnabled] = useState(false);
//   const [watchId, setWatchId] = useState(null);
//   const [accuracy, setAccuracy] = useState(null);
//   const [lastRouteUpdate, setLastRouteUpdate] = useState(null);
//   const [followMode, setFollowMode] = useState(false);
//   const routeUpdateThrottle = 10000;
//   const mapRef = React.useRef(null);
//   const hasShownInitialRoute = React.useRef(false); // Track if we've shown the route once

//   // Fetch property details
//   useEffect(() => {
//     const controller = new AbortController();
    
//     fetch(`https://localhost:7117/api/properties/${id}`, {
//       signal: controller.signal
//     })
//       .then(res => res.json())
//       .then(data => {
//         setProperty(data);
//         // Geocode immediately, no delay needed
//         geocodeAddress(data.address);
//       })
//       .catch(err => {
//         if (err.name !== 'AbortError') {
//           setError("Failed to load property details");
//           console.error(err);
//         }
//       });

//     return () => controller.abort();
//   }, [id]);

//   // Geocode property address
//   const geocodeAddress = async (address) => {
//     const query = `${address.city}, ${address.state}, India`; // Simplified query for faster results
    
//     try {
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
//       const res = await fetch(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`,
//         {
//           signal: controller.signal,
//           headers: {
//             'User-Agent': 'PropertyApp/1.0',
//             'Accept': 'application/json'
//           }
//         }
//       );
      
//       clearTimeout(timeoutId);
      
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
      
//       const data = await res.json();
      
//       if (data.length > 0) {
//         setPropertyLocation({
//           lat: parseFloat(data[0].lat),
//           lon: parseFloat(data[0].lon)
//         });
//         setLoading(false);
//       } else {
//         // Fallback to default coordinates immediately
//         setPropertyLocation({
//           lat: 22.3039,
//           lon: 70.8022
//         });
//         setLoading(false);
//       }
//     } catch (err) {
//       console.error("Geocoding error:", err);
//       // Use default Rajkot coordinates immediately
//       setPropertyLocation({
//         lat: 22.3039,
//         lon: 70.8022
//       });
//       setLoading(false);
//     }
//   };

//   // Get user's initial location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setUserLocation({
//             lat: position.coords.latitude,
//             lon: position.coords.longitude
//           });
//           setAccuracy(position.coords.accuracy);
//         },
//         (err) => {
//           // Default to Rajkot, Gujarat if location access denied
//           setUserLocation({
//             lat: 22.3039,
//             lon: 70.8022
//           });
//           console.warn("Location access denied, using default location");
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 5000,
//           maximumAge: 0
//         }
//       );
//     } else {
//       setUserLocation({
//         lat: 22.3039,
//         lon: 70.8022
//       });
//     }
//   }, []);

//   // Live location tracking
//   const startTracking = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by your browser");
//       return;
//     }

//     setFollowMode(true); // Enable follow mode when tracking starts

//     const id = navigator.geolocation.watchPosition(
//       (position) => {
//         const newLocation = {
//           lat: position.coords.latitude,
//           lon: position.coords.longitude
//         };
        
//         // Always update marker position smoothly
//         setUserLocation(newLocation);
//         setAccuracy(position.coords.accuracy);
        
//         // Throttle route recalculation to reduce refreshing
//         const now = Date.now();
//         const shouldUpdateRoute = !lastRouteUpdate || (now - lastRouteUpdate) > routeUpdateThrottle;
        
//         if (shouldUpdateRoute && propertyLocation) {
//           // Only recalculate if moved significantly (more than 100 meters)
//           const hasMoved = !userLocation || 
//             Math.abs(newLocation.lat - userLocation.lat) > 0.001 ||
//             Math.abs(newLocation.lon - userLocation.lon) > 0.001;
            
//           if (hasMoved) {
//             setLastRouteUpdate(now);
//             fetchRouteWithLocations(newLocation, propertyLocation);
//           }
//         }
//       },
//       (err) => {
//         console.error("Error watching position:", err);
//         setError("Unable to track your location");
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 15000,
//         maximumAge: 10000 // Cache position for 10 seconds
//       }
//     );

//     setWatchId(id);
//     setTrackingEnabled(true);
//   };

//   const stopTracking = () => {
//     if (watchId) {
//       navigator.geolocation.clearWatch(watchId);
//       setWatchId(null);
//     }
//     setTrackingEnabled(false);
//     setFollowMode(false);
//   };

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (watchId) {
//         navigator.geolocation.clearWatch(watchId);
//       }
//     };
//   }, [watchId]);

//   // Fetch route when both locations are available
//   useEffect(() => {
//     if (userLocation && propertyLocation) {
//       fetchRoute();
//     }
//   }, [userLocation, propertyLocation]);

//   // Auto-fit map to route when route is loaded for the FIRST TIME ONLY
//   useEffect(() => {
//     console.log("Route effect triggered:", {
//       routeLength: route?.length,
//       hasMap: !!mapRef.current,
//       hasShown: hasShownInitialRoute.current
//     });
    
//     if (route && route.length > 0 && mapRef.current && !hasShownInitialRoute.current) {
//       // Wait a bit to ensure map is fully rendered
//       const timer = setTimeout(() => {
//         try {
//           console.log("Attempting to fit bounds to route");
//           const bounds = L.latLngBounds(route);
//           console.log("Bounds created:", bounds);
          
//           mapRef.current.fitBounds(bounds, { 
//             padding: [100, 100],
//             animate: true,
//             duration: 1.2,
//             maxZoom: 14
//           });
          
//           hasShownInitialRoute.current = true;
//           console.log("✅ Initial route displayed successfully!");
//         } catch (error) {
//           console.error("❌ Failed to fit bounds:", error);
//         }
//       }, 800); // Increased delay
      
//       return () => clearTimeout(timer);
//     }
//   }, [route, mapRef.current]); // Added mapRef.current to dependencies

//   const fetchRouteWithLocations = async (userLoc, propLoc) => {
//     try {
//       const res = await fetch(
//         `https://router.project-osrm.org/route/v1/driving/${userLoc.lon},${userLoc.lat};${propLoc.lon},${propLoc.lat}?overview=full&geometries=geojson&steps=true`
//       );
//       const data = await res.json();

//       if (data.routes && data.routes.length > 0) {
//         const routeData = data.routes[0];
//         const coords = routeData.geometry.coordinates.map(coord => [coord[1], coord[0]]);
        
//         // Update state in a batch to prevent multiple re-renders
//         const steps = routeData.legs[0].steps.map(step => ({
//           instruction: step.maneuver.instruction || getManeuverText(step.maneuver),
//           distance: (step.distance / 1000).toFixed(2),
//           duration: Math.round(step.duration / 60)
//         }));
        
//         setRoute(coords);
//         setDirections(steps);
//         setDistance((routeData.distance / 1000).toFixed(2));
//         setDuration(Math.round(routeData.duration / 60));
//       }
//     } catch (err) {
//       console.error("Failed to fetch route:", err);
//     }
//   };

//   const fetchRoute = async () => {
//     if (!userLocation || !propertyLocation) return;
    
//     setLoading(true);
    
//     try {
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), 8000);
      
//       const res = await fetch(
//         `https://router.project-osrm.org/route/v1/driving/${userLocation.lon},${userLocation.lat};${propertyLocation.lon},${propertyLocation.lat}?overview=full&geometries=geojson&steps=true`,
//         { signal: controller.signal }
//       );
      
//       clearTimeout(timeoutId);
//       const data = await res.json();

//       if (data.routes && data.routes.length > 0) {
//         const routeData = data.routes[0];
        
//         const coords = routeData.geometry.coordinates.map(coord => [coord[1], coord[0]]);
//         const steps = routeData.legs[0].steps.map(step => ({
//           instruction: step.maneuver.instruction || getManeuverText(step.maneuver),
//           distance: (step.distance / 1000).toFixed(2),
//           duration: Math.round(step.duration / 60)
//         }));
        
//         setRoute(coords);
//         setDirections(steps);
//         setDistance((routeData.distance / 1000).toFixed(2));
//         setDuration(Math.round(routeData.duration / 60));
        
//         console.log("Route loaded with", coords.length, "points");
//       } else {
//         setError("No route found");
//       }
//     } catch (err) {
//       if (err.name !== 'AbortError') {
//         setError("Failed to fetch route");
//         console.error(err);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getManeuverText = (maneuver) => {
//     const type = maneuver.type;
//     const modifier = maneuver.modifier;
    
//     if (type === "depart") return "Start your journey";
//     if (type === "arrive") return "You have arrived at your destination";
//     if (type === "turn") return `Turn ${modifier}`;
//     if (type === "continue") return "Continue straight";
//     if (type === "merge") return `Merge ${modifier}`;
//     if (type === "roundabout") return `Take roundabout exit ${modifier}`;
    
//     return `${type} ${modifier || ""}`.trim();
//   };

//   if (loading) {
//     return (
//       <div className="route-page">
//         <div className="loading-container">
//           <div className="spinner"></div>
//           <p>Calculating route...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error && !property) {
//     return (
//       <div className="route-page">
//         <div className="error-container">
//           <p className="error-message">{error}</p>
//           <button onClick={() => navigate(-1)} className="back-button">
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="route-page">
      
//       {/* Header */}
//       <div className="route-header">
//         <button className="back-button" onClick={() => navigate(-1)}>
//           ⬅ Back
//         </button>
//         <div className="route-info">
//           <h2>Route to {property?.title}</h2>
//           <div className="route-stats">
//             <span className="stat">
//               <strong>{distance}</strong> km
//             </span>
//             <span className="stat-divider">•</span>
//             <span className="stat">
//               <strong>{duration}</strong> min
//             </span>
//           </div>
//         </div>
        
//         {/* Live Tracking Toggle */}
//         <button
//           className={`tracking-button ${trackingEnabled ? "tracking-active" : ""}`}
//           onClick={() => trackingEnabled ? stopTracking() : startTracking()}
//         >
//           {trackingEnabled ? "📍 Tracking ON" : "📍 Start Live Tracking"}
//         </button>
        
//         {/* Follow mode toggle - only show when tracking */}
//         {trackingEnabled && (
//           <button
//             className={`follow-button ${followMode ? "follow-active" : ""}`}
//             onClick={() => setFollowMode(!followMode)}
//             title={followMode ? "Stop following (explore freely)" : "Follow your movement"}
//           >
//             {followMode ? "🧭 Following" : "🗺️ Explore"}
//           </button>
//         )}
        
//         {/* Show Full Route button */}
//         {route && route.length > 0 && (
//           <button
//             className="route-overview-button"
//             onClick={() => {
//               console.log("Show full route clicked");
//               if (mapRef.current && route.length > 0) {
//                 const bounds = L.latLngBounds(route);
//                 mapRef.current.fitBounds(bounds, { 
//                   padding: [100, 100],
//                   animate: true,
//                   duration: 1,
//                   maxZoom: 14
//                 });
//                 console.log("✅ Showing full route");
//               }
//             }}
//             title="Show full route overview"
//           >
//             🗺️ Full Route
//           </button>
//         )}
//       </div>

//       <div className="route-content">
        
//         {/* Directions Panel */}
//         <div className="directions-panel">
//           <h3>Turn-by-Turn Directions</h3>
          
//           {trackingEnabled && (
//             <div className="tracking-status">
//               <div className="status-indicator">
//                 <span className="pulse"></span>
//                 <span>Live tracking active</span>
//               </div>
//               {accuracy && (
//                 <span className="accuracy-info">
//                   Accuracy: ±{Math.round(accuracy)}m
//                 </span>
//               )}
//             </div>
//           )}
          
//           <div className="location-badges">
//             <div className="badge start-badge">
//               <span className="badge-icon">📍</span>
//               <span>Your Location</span>
//             </div>
//             <div className="badge end-badge">
//               <span className="badge-icon">🏠</span>
//               <span>{property?.address?.city}</span>
//             </div>
//           </div>

//           <div className="directions-list">
//             {directions.map((step, idx) => (
//               <div key={idx} className="direction-step">
//                 <div className="step-number">{idx + 1}</div>
//                 <div className="step-content">
//                   <p className="step-instruction">{step.instruction}</p>
//                   <p className="step-distance">
//                     {step.distance} km • ~{step.duration} min
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="property-info-box">
//             <h4>Destination</h4>
//             <p className="property-title">{property?.title}</p>
//             <p className="property-address">
//               {property?.address?.location}, {property?.address?.city}
//             </p>
//             <p className="property-price">
//               ₹{property?.prices?.[0]?.amount}
//             </p>
//           </div>
//         </div>

//         {/* Map */}
//         <div className="route-map-container">
//           {/* Custom Navigation Controls */}
//           <div className="map-controls">
//             <div className="direction-controls">
//               <button 
//                 className="nav-btn nav-up" 
//                 onClick={() => {
//                   console.log("Up button clicked, map exists:", !!mapRef.current);
//                   if (mapRef.current) {
//                     mapRef.current.panBy([0, -100]);
//                     console.log("✅ Panned up");
//                   }
//                 }}
//                 title="Pan Up"
//               >
//                 ▲
//               </button>
//               <div className="nav-middle">
//                 <button 
//                   className="nav-btn nav-left" 
//                   onClick={() => {
//                     if (mapRef.current) {
//                       mapRef.current.panBy([-100, 0]);
//                     }
//                   }}
//                   title="Pan Left"
//                 >
//                   ◀
//                 </button>
//                 <button 
//                   className="nav-btn nav-center" 
//                   onClick={() => {
//                     console.log("Center button clicked", {
//                       hasMap: !!mapRef.current,
//                       hasLocation: !!userLocation,
//                       location: userLocation
//                     });
                    
//                     if (mapRef.current && userLocation) {
//                       mapRef.current.setView(
//                         [userLocation.lat, userLocation.lon], 
//                         15, 
//                         {
//                           animate: true,
//                           duration: 0.8
//                         }
//                       );
//                       console.log("✅ Centered on location");
//                     } else {
//                       console.log("❌ Cannot center - missing map or location");
//                     }
//                   }}
//                   title="Center on Your Location"
//                 >
//                   ⊙
//                 </button>
//                 <button 
//                   className="nav-btn nav-right" 
//                   onClick={() => {
//                     if (mapRef.current) {
//                       mapRef.current.panBy([100, 0]);
//                     }
//                   }}
//                   title="Pan Right"
//                 >
//                   ▶
//                 </button>
//               </div>
//               <button 
//                 className="nav-btn nav-down" 
//                 onClick={() => {
//                   if (mapRef.current) {
//                     mapRef.current.panBy([0, 100]);
//                   }
//                 }}
//                 title="Pan Down"
//               >
//                 ▼
//               </button>
//             </div>
            
//             <div className="zoom-controls">
//               <button 
//                 className="zoom-btn zoom-in" 
//                 onClick={() => {
//                   if (mapRef.current) {
//                     mapRef.current.zoomIn();
//                   }
//                 }}
//                 title="Zoom In"
//               >
//                 +
//               </button>
//               <button 
//                 className="zoom-btn zoom-out" 
//                 onClick={() => {
//                   if (mapRef.current) {
//                     mapRef.current.zoomOut();
//                   }
//                 }}
//                 title="Zoom Out"
//               >
//                 −
//               </button>
//             </div>
//           </div>

//           <MapContainer
//             center={[22.3039, 70.8022]}
//             zoom={6}
//             style={{ height: "100%", width: "100%" }}
//             zoomControl={false}
//             scrollWheelZoom={true}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//             />

//             {/* User location marker with accuracy circle */}
//             {userLocation && (
//               <>
//                 <Marker position={[userLocation.lat, userLocation.lon]} icon={userIcon}>
//                   <Popup>
//                     <strong>Your Location</strong>
//                     {trackingEnabled && <><br /><span style={{color: '#059669'}}>● Live tracking</span></>}
//                   </Popup>
//                 </Marker>
                
//                 {accuracy && trackingEnabled && (
//                   <Circle
//                     center={[userLocation.lat, userLocation.lon]}
//                     radius={accuracy}
//                     pathOptions={{
//                       color: '#10b981',
//                       fillColor: '#10b981',
//                       fillOpacity: 0.1,
//                       weight: 1
//                     }}
//                   />
//                 )}
//               </>
//             )}

//             {/* Property location marker */}
//             {propertyLocation && (
//               <Marker position={[propertyLocation.lat, propertyLocation.lon]} icon={propertyIcon}>
//                 <Popup>
//                   <strong>{property?.title}</strong><br />
//                   {property?.address?.city}
//                 </Popup>
//               </Marker>
//             )}

//             {/* Route polyline */}
//             {route.length > 0 && (
//               <Polyline
//                 positions={route}
//                 color="#2563eb"
//                 weight={5}
//                 opacity={0.7}
//               />
//             )}

//             <MapFitter 
//               userLocation={userLocation}
//               trackUser={trackingEnabled}
//               followMode={followMode}
//               onMapDrag={() => setFollowMode(false)}
//               onMapReady={(map) => { mapRef.current = map; }}
//             />
//           </MapContainer>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./PropertyRouteMap.css";
  import { fetchWithAuth } from "../login/api";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icons
const userIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const propertyIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapFitter({ userLocation, trackUser, followMode, onMapDrag, onMapReady }) {
  const map = useMap();
  const isUserDragging = React.useRef(false);

  // Pass map instance to parent
  React.useEffect(() => {
    if (map && onMapReady) {
      onMapReady(map);
    }
  }, [map, onMapReady]);

  // Detect when user manually drags the map
  React.useEffect(() => {
    if (!map) return;

    const handleDragStart = () => {
      isUserDragging.current = true;
      if (followMode) {
        onMapDrag();
      }
    };

    const handleDragEnd = () => {
      setTimeout(() => {
        isUserDragging.current = false;
      }, 500);
    };

    map.on('dragstart', handleDragStart);
    map.on('dragend', handleDragEnd);

    return () => {
      map.off('dragstart', handleDragStart);
      map.off('dragend', handleDragEnd);
    };
  }, [map, followMode, onMapDrag]);

  // Only handle follow mode, not initial route display
  useEffect(() => {
    if (!map || isUserDragging.current) return;
    // Safety check: ensure map container pane exists before any view changes
    if (!map.getPane('mapPane')) return;

    try {
      // Follow user's movement when in follow mode
      if (followMode && userLocation && trackUser) {
        // Stop any ongoing animations first to prevent _leaflet_pos error
        map.stop();
        setTimeout(() => {
          try {
            if (map.getPane('mapPane')) {
              map.setView([userLocation.lat, userLocation.lon], 16, {
                animate: true,
                duration: 1.5,
                easeLinearity: 0.25
              });
            }
          } catch (innerErr) {
            console.warn("Map setView skipped:", innerErr.message);
          }
        }, 50);
      }
    } catch (error) {
      console.warn("Map update skipped:", error.message);
    }
  }, [map, userLocation?.lat, userLocation?.lon, trackUser, followMode]);

  return null;
}

export default function PropertyRouteMap() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [property, setProperty] = useState(null);
  const [propertyLocation, setPropertyLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [route, setRoute] = useState([]);
  const [directions, setDirections] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trackingEnabled, setTrackingEnabled] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [lastRouteUpdate, setLastRouteUpdate] = useState(null);
  const [followMode, setFollowMode] = useState(false);
  const routeUpdateThrottle = 10000;
  const mapRef = React.useRef(null);
  const hasShownInitialRoute = React.useRef(false);

  // Fetch property details
  // useEffect(() => {
  //   const controller = new AbortController();
    
  //   fetch(`https://localhost:7117/api/properties/${id}`, {
  //     signal: controller.signal
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setProperty(data);
  //       geocodeAddress(data.address);
  //     })
  //     .catch(err => {
  //       if (err.name !== 'AbortError') {
  //         setError("Failed to load property details");
  //         console.error(err);
  //       }
  //     });

  //   return () => controller.abort();
  // }, [id]);


useEffect(() => {
  const controller = new AbortController();

  const getProperty = async () => {
    try {
      const data = await fetchWithAuth(
        `https://localhost:7117/api/properties/${id}`,
        { signal: controller.signal }
      );

      if (data) {
        setProperty(data);
        geocodeAddress(data.address);
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setError("Failed to load property details");
        console.error(err);
      }
    }
  };

  getProperty();

  return () => controller.abort();
}, [id]);



  // Geocode property address using Photon API
  const geocodeAddress = async (address) => {
    // Build address string, prioritizing famousArea for better results
    const addressParts = [
      address?.famousArea,
      address?.city,
      address?.state,
      address?.country
    ].filter(Boolean);

    const query = addressParts.join(', ');
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const res = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=1`,
        { signal: controller.signal }
      );
      
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (data.features && data.features.length > 0) {
        const coords = data.features[0].geometry.coordinates;
        setPropertyLocation({
          lat: coords[1], // Photon returns [lon, lat]
          lon: coords[0]
        });
        setLoading(false);
      } else {
        // Fallback to default coordinates
        setPropertyLocation({
          lat: 22.3039,
          lon: 70.8022
        });
        setLoading(false);
      }
    } catch (err) {
      console.error("Geocoding error:", err);
      // Use default Rajkot coordinates
      setPropertyLocation({
        lat: 22.3039,
        lon: 70.8022
      });
      setLoading(false);
    }
  };

  // Get user's initial location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
          setAccuracy(position.coords.accuracy);
        },
        (err) => {
          // Default to Rajkot, Gujarat if location access denied
          setUserLocation({
            lat: 22.3039,
            lon: 70.8022
          });
          console.warn("Location access denied, using default location");
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setUserLocation({
        lat: 22.3039,
        lon: 70.8022
      });
    }
  }, []);

  // Live location tracking
  const startTracking = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setFollowMode(true);

    const id = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        };
        
        setUserLocation(newLocation);
        setAccuracy(position.coords.accuracy);
        
        // Throttle route recalculation
        const now = Date.now();
        const shouldUpdateRoute = !lastRouteUpdate || (now - lastRouteUpdate) > routeUpdateThrottle;
        
        if (shouldUpdateRoute && propertyLocation) {
          const hasMoved = !userLocation || 
            Math.abs(newLocation.lat - userLocation.lat) > 0.001 ||
            Math.abs(newLocation.lon - userLocation.lon) > 0.001;
            
          if (hasMoved) {
            setLastRouteUpdate(now);
            fetchRouteWithLocations(newLocation, propertyLocation);
          }
        }
      },
      (err) => {
        console.error("Error watching position:", err);
        setError("Unable to track your location");
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000
      }
    );

    setWatchId(id);
    setTrackingEnabled(true);
  };

  const stopTracking = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setTrackingEnabled(false);
    setFollowMode(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  // Fetch route when both locations are available
  useEffect(() => {
    if (userLocation && propertyLocation) {
      fetchRoute();
    }
  }, [userLocation, propertyLocation]);

  // Auto-fit map to route when route is loaded for the FIRST TIME ONLY
  useEffect(() => {
    if (route && route.length > 0 && mapRef.current && !hasShownInitialRoute.current) {
      const timer = setTimeout(() => {
        try {
          if (!mapRef.current || !mapRef.current.getPane('mapPane')) return;
          mapRef.current.stop(); // Stop any ongoing animations
          const bounds = L.latLngBounds(route);
          mapRef.current.fitBounds(bounds, { 
            padding: [100, 100],
            animate: true,
            duration: 1.2,
            maxZoom: 14
          });
          
          hasShownInitialRoute.current = true;
        } catch (error) {
          console.warn("Failed to fit bounds:", error.message);
        }
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [route, mapRef.current]);

  const fetchRouteWithLocations = async (userLoc, propLoc) => {
    try {
      const res = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${userLoc.lon},${userLoc.lat};${propLoc.lon},${propLoc.lat}?overview=full&geometries=geojson&steps=true`
      );
      const data = await res.json();

      if (data.routes && data.routes.length > 0) {
        const routeData = data.routes[0];
        const coords = routeData.geometry.coordinates.map(coord => [coord[1], coord[0]]);
        
        const steps = routeData.legs[0].steps.map(step => ({
          instruction: step.maneuver.instruction || getManeuverText(step.maneuver),
          distance: (step.distance / 1000).toFixed(2),
          duration: Math.round(step.duration / 60)
        }));
        
        setRoute(coords);
        setDirections(steps);
        setDistance((routeData.distance / 1000).toFixed(2));
        setDuration(Math.round(routeData.duration / 60));
      }
    } catch (err) {
      console.error("Failed to fetch route:", err);
    }
  };

  const fetchRoute = async () => {
    if (!userLocation || !propertyLocation) return;
    
    setLoading(true);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const res = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${userLocation.lon},${userLocation.lat};${propertyLocation.lon},${propertyLocation.lat}?overview=full&geometries=geojson&steps=true`,
        { signal: controller.signal }
      );
      
      clearTimeout(timeoutId);
      const data = await res.json();

      if (data.routes && data.routes.length > 0) {
        const routeData = data.routes[0];
        
        const coords = routeData.geometry.coordinates.map(coord => [coord[1], coord[0]]);
        const steps = routeData.legs[0].steps.map(step => ({
          instruction: step.maneuver.instruction || getManeuverText(step.maneuver),
          distance: (step.distance / 1000).toFixed(2),
          duration: Math.round(step.duration / 60)
        }));
        
        setRoute(coords);
        setDirections(steps);
        setDistance((routeData.distance / 1000).toFixed(2));
        setDuration(Math.round(routeData.duration / 60));
      } else {
        setError("No route found");
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError("Failed to fetch route");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const getManeuverText = (maneuver) => {
    const type = maneuver.type;
    const modifier = maneuver.modifier;
    
    if (type === "depart") return "Start your journey";
    if (type === "arrive") return "You have arrived at your destination";
    if (type === "turn") return `Turn ${modifier}`;
    if (type === "continue") return "Continue straight";
    if (type === "merge") return `Merge ${modifier}`;
    if (type === "roundabout") return `Take roundabout exit ${modifier}`;
    
    return `${type} ${modifier || ""}`.trim();
  };

  if (loading) {
    return (
      <div className="route-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Calculating route...</p>
        </div>
      </div>
    );
  }

  if (error && !property) {
    return (
      <div className="route-page">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={() => navigate(-1)} className="back-button">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="route-page">
      
      {/* Header */}
      <div className="route-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
        <div className="route-info">
          <h2>Route to {property?.title}</h2>
          <div className="route-stats">
            <span className="stat">
              <strong>{distance}</strong> km
            </span>
            <span className="stat-divider">•</span>
            <span className="stat">
              <strong>{duration}</strong> min
            </span>
          </div>
        </div>
        
        {/* Live Tracking Toggle */}
        <button
          className={`tracking-button ${trackingEnabled ? "tracking-active" : ""}`}
          onClick={() => trackingEnabled ? stopTracking() : startTracking()}
        >
          {trackingEnabled ? "📍 Tracking ON" : "📍 Start Live Tracking"}
        </button>
        
        {/* Follow mode toggle */}
        {trackingEnabled && (
          <button
            className={`follow-button ${followMode ? "follow-active" : ""}`}
            onClick={() => setFollowMode(!followMode)}
            title={followMode ? "Stop following (explore freely)" : "Follow your movement"}
          >
            {followMode ? "🧭 Following" : "🗺️ Explore"}
          </button>
        )}
        
        {/* Show Full Route button */}
        {route && route.length > 0 && (
          <button
            className="route-overview-button"
            onClick={() => {
              if (mapRef.current && route.length > 0) {
                const bounds = L.latLngBounds(route);
                mapRef.current.fitBounds(bounds, { 
                  padding: [100, 100],
                  animate: true,
                  duration: 1,
                  maxZoom: 14
                });
              }
            }}
            title="Show full route overview"
          >
            🗺️ Full Route
          </button>
        )}
      </div>

      <div className="route-content">
        
        {/* Directions Panel */}
        <div className="directions-panel">
          <h3>Turn-by-Turn Directions</h3>
          
          {trackingEnabled && (
            <div className="tracking-status">
              <div className="status-indicator">
                <span className="pulse"></span>
                <span>Live tracking active</span>
              </div>
              {accuracy && (
                <span className="accuracy-info">
                  Accuracy: ±{Math.round(accuracy)}m
                </span>
              )}
            </div>
          )}
          
          <div className="location-badges">
            <div className="badge start-badge">
              <span className="badge-icon">📍</span>
              <span>Your Location</span>
            </div>
            <div className="badge end-badge">
              <span className="badge-icon">🏠</span>
              <span>{property?.address?.famousArea || property?.address?.city}</span>
            </div>
          </div>

          <div className="directions-list">
            {directions.map((step, idx) => (
              <div key={idx} className="direction-step">
                <div className="step-number">{idx + 1}</div>
                <div className="step-content">
                  <p className="step-instruction">{step.instruction}</p>
                  <p className="step-distance">
                    {step.distance} km • ~{step.duration} min
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="property-info-box">
            <h4>Destination</h4>
            <p className="property-title">{property?.title}</p>
            <p className="property-address">
              {property?.address?.location}
              {property?.address?.societyName && `, ${property.address.societyName}`}
              {property?.address?.famousArea && `, ${property.address.famousArea}`}
              <br />
              {property?.address?.city}
            </p>
            <p className="property-price">
              ₹{property?.prices?.[0]?.amount?.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Map */}
        <div className="route-map-container">
          {/* Custom Navigation Controls */}
          <div className="map-controls">
            <div className="direction-controls">
              <button 
                className="nav-btn nav-up" 
                onClick={() => {
                  if (mapRef.current) {
                    mapRef.current.panBy([0, -100]);
                  }
                }}
                title="Pan Up"
              >
                ▲
              </button>
              <div className="nav-middle">
                <button 
                  className="nav-btn nav-left" 
                  onClick={() => {
                    if (mapRef.current) {
                      mapRef.current.panBy([-100, 0]);
                    }
                  }}
                  title="Pan Left"
                >
                  ◀
                </button>
                <button 
                  className="nav-btn nav-center" 
                  onClick={() => {
                    if (mapRef.current && userLocation) {
                      mapRef.current.setView(
                        [userLocation.lat, userLocation.lon], 
                        15, 
                        {
                          animate: true,
                          duration: 0.8
                        }
                      );
                    }
                  }}
                  title="Center on Your Location"
                >
                  ⊙
                </button>
                <button 
                  className="nav-btn nav-right" 
                  onClick={() => {
                    if (mapRef.current) {
                      mapRef.current.panBy([100, 0]);
                    }
                  }}
                  title="Pan Right"
                >
                  ▶
                </button>
              </div>
              <button 
                className="nav-btn nav-down" 
                onClick={() => {
                  if (mapRef.current) {
                    mapRef.current.panBy([0, 100]);
                  }
                }}
                title="Pan Down"
              >
                ▼
              </button>
            </div>
            
            <div className="zoom-controls">
              <button 
                className="zoom-btn zoom-in" 
                onClick={() => {
                  if (mapRef.current) {
                    mapRef.current.zoomIn();
                  }
                }}
                title="Zoom In"
              >
                +
              </button>
              <button 
                className="zoom-btn zoom-out" 
                onClick={() => {
                  if (mapRef.current) {
                    mapRef.current.zoomOut();
                  }
                }}
                title="Zoom Out"
              >
                −
              </button>
            </div>
          </div>

          <MapContainer
            center={[22.3039, 70.8022]}
            zoom={6}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            {/* User location marker with accuracy circle */}
            {userLocation && (
              <>
                <Marker position={[userLocation.lat, userLocation.lon]} icon={userIcon}>
                  <Popup>
                    <strong>Your Location</strong>
                    {trackingEnabled && <><br /><span style={{color: '#059669'}}>● Live tracking</span></>}
                  </Popup>
                </Marker>
                
                {accuracy && trackingEnabled && (
                  <Circle
                    center={[userLocation.lat, userLocation.lon]}
                    radius={accuracy}
                    pathOptions={{
                      color: '#10b981',
                      fillColor: '#10b981',
                      fillOpacity: 0.1,
                      weight: 1
                    }}
                  />
                )}
              </>
            )}

            {/* Property location marker */}
            {propertyLocation && (
              <Marker position={[propertyLocation.lat, propertyLocation.lon]} icon={propertyIcon}>
                <Popup>
                  <strong>{property?.title}</strong><br />
                  {property?.address?.famousArea || property?.address?.city}
                </Popup>
              </Marker>
            )}

            {/* Route polyline */}
            {route.length > 0 && (
              <Polyline
                positions={route}
                color="#2563eb"
                weight={5}
                opacity={0.7}
              />
            )}

            <MapFitter 
              userLocation={userLocation}
              trackUser={trackingEnabled}
              followMode={followMode}
              onMapDrag={() => setFollowMode(false)}
              onMapReady={(map) => { mapRef.current = map; }}
            />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}