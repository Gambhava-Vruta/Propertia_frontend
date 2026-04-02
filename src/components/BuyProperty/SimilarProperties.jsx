
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../login/api";
import "./SimilarProperties.css";

export default function SimilarProperties({ propertyId }) {
  const navigate = useNavigate();
  const [similarProperties, setSimilarProperties] = useState([]);
  const [imageIndexes, setImageIndexes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!propertyId) return;
    const getSimilar = async () => {
      setLoading(true);
      const data = await fetchWithAuth(
        `https://localhost:7117/api/properties/${propertyId}/similar`
      );
      if (data) setSimilarProperties(data);
      setLoading(false);
    };
    getSimilar();
  }, [propertyId]);

  const handleCardClick = (targetId) => {
    navigate(`/explore_property/Detail/${targetId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Don't render anything if loading or no results
  if (loading || similarProperties.length === 0) return null;

  return (
    <div className="similar-section">
      <h3> You Might Also Like</h3>
      <p className="similar-intro">
        Properties in the same area or similar price range
      </p>

      <div className="similar-grid">
        {similarProperties.map((p) => {
          const price = p.prices?.[0];
          const images = Array.isArray(p.images) ? p.images : [];
          const currentIndex = imageIndexes[p.propertyId] || 0;

          return (
            <div
              key={p.propertyId}
              className="similar-card"
              onClick={() => handleCardClick(p.propertyId)}
            >
              {/* ── Image Slider ── */}
              <div className="similar-card-image">

                {/* RENT / SALE badge — reuses your existing badge-overlay classes */}
                {price?.transactionType && (
                  <div
                    className={`badge-overlay ${
                      price.transactionType.toLowerCase() === "rent"
                        ? "rent-badge"
                        : "sale-badge"
                    }`}
                  >
                    {price.transactionType.toUpperCase()}
                  </div>
                )}

                {images.length > 0 ? (
                  <>
                    <div
                      id={`sim-track-${p.propertyId}`}
                      className="similar-image-track"
                      onScroll={(e) => {
                        const newIndex = Math.round(
                          e.target.scrollLeft / e.target.clientWidth
                        );
                        setImageIndexes((prev) => ({
                          ...prev,
                          [p.propertyId]: newIndex,
                        }));
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {images.map((img, idx) => (
                        <img
                          key={idx}
                          src={`https://localhost:7117/images/${img}`}
                          alt={`${p.title} ${idx + 1}`}
                          className="similar-slide-img"
                          onError={(e) => {
                            e.target.src =
                              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="220"%3E%3Crect width="400" height="220" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      ))}
                    </div>

                    {images.length > 1 && (
                      <div
                        className="similar-dots"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {images.map((_, idx) => (
                          <span
                            key={idx}
                            className={`similar-dot ${
                              currentIndex === idx ? "active" : ""
                            }`}
                            onClick={() => {
                              const track = document.getElementById(
                                `sim-track-${p.propertyId}`
                              );
                              if (track) {
                                track.scrollTo({
                                  left: idx * track.clientWidth,
                                  behavior: "smooth",
                                });
                              }
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="similar-no-image">No Image Available</div>
                )}
              </div>

              {/* ── Card Body ── */}
              <div className="similar-card-body">
                <div className="similar-price">
                  ₹ {Number(price?.amount).toLocaleString("en-IN") || "—"}
                  {price?.transactionType?.toLowerCase() === "rent" && (
                    <span className="similar-per-month"> /month</span>
                  )}
                </div>

                <div className="similar-title">{p.title}</div>

                <div className="similar-location">
                   {p.address?.city}, {p.address?.state}
                </div>

                <div className="similar-meta">
                  <span>{p.areaSqft} sqft</span>
                  <span>•</span>
                  <span>{p.category?.categoryName}</span>
                </div>

                <button
                  className="light-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(p.propertyId);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}