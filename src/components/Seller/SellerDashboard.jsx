import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SellerDashboard.css';
import { fetchWithAuth } from '../login/api';

const BASE_URL = (process.env.REACT_APP_API_BASE || 'https://localhost:7117');

// Handles: full URL, /images/file.jpg, or just file.jpg
const resolveImageUrl = (img) => {
  if (!img) return null;
  if (img.startsWith('http://') || img.startsWith('https://')) return img;
  if (img.startsWith('/')) return `${BASE_URL}${img}`;
  return `${BASE_URL}/images/${img}`;
};

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Helpers
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const timeAgo = (ds) => {
  if (!ds) return 'Recently';
  const s = Math.floor((Date.now() - new Date(ds)) / 1000);
  if (s < 60) return 'Just now';
  const m = Math.floor(s / 60); if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60); if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24); if (d < 7) return `${d}d ago`;
  return `${Math.floor(d / 7)}w ago`;
};

const getStatusKey = (status) => {
  const s = (status || '').toLowerCase();
  if (s === 'ongoing')                     return 'ongoing';
  if (s === 'completed')                   return 'completed';
  if (s === 'cancelled' || s === 'canceled') return 'cancelled';
  return 'default';
};

const getRequireTypeKey = (requireType) => {
  const r = (requireType || '').toLowerCase();
  if (r === 'rent')              return 'rent';
  if (r === 'sell' || r === 'sale') return 'sell';
  return null;
};

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Sub-Components
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const StatCard = ({ icon, value, label, sub, link }) => {
  const inner = (
    <>
      <div className="stat-card__icon">{icon}</div>
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__label">{label}</div>
      {sub && <div className="stat-card__sub">{sub}</div>}
    </>
  );
  return link
    ? <Link to={link} className="stat-card">{inner}</Link>
    : <div className="stat-card">{inner}</div>;
};

const InfoRow = ({ label, value }) => (
  <div>
    <div className="modal-info-row__label">{label}</div>
    <div className="modal-info-row__value">{value}</div>
  </div>
);

const StatusBadge = ({ status }) => {
  const key = getStatusKey(status);
  return (
    <span className={`badge badge--status-${key}`}>
      <span className={`dot dot--${key}`} />
      {status || 'Unknown'}
    </span>
  );
};

const PropertyModal = ({ property: p, onClose }) => {
  const images    = p.Images    || p.images    || [];
  const prices    = p.Prices    || p.prices    || [];
  const amenities = p.Amenities || p.amenities || [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>âœ•</button>

        <h2 className="modal-title">{p.Title || p.title}</h2>

        <div className="modal-badges">
          <StatusBadge status={p.Status || p.status} />
          <span className="badge badge--orange">
            {p.Category?.CategoryName || p.category?.categoryName || 'â€”'}
          </span>
          <span className="badge badge--neutral">
            {p.RequireType || p.requireType || 'â€”'}
          </span>
        </div>

        {/* Images */}
        {images.length > 0 && (
          <div className="modal-images">
            {images.map((img, i) => (
              <img
                key={i}
                src={resolveImageUrl(img)}
                alt={`property-${i}`}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ))}
          </div>
        )}

        {/* Info Grid */}
        <div className="modal-info-grid">
          <InfoRow label="Area"     value={`${p.AreaSqft || p.areaSqft || 'â€”'} sqft`} />
          <InfoRow label="City"     value={p.Address?.City     || p.address?.city     || 'â€”'} />
          <InfoRow label="Location" value={p.Address?.Location || p.address?.location || 'â€”'} />
          <InfoRow label="State"    value={p.Address?.State    || p.address?.state    || 'â€”'} />
          <InfoRow label="Landmark" value={p.Address?.Landmark || p.address?.landmark || 'â€”'} />
          <InfoRow label="Listed"   value={timeAgo(p.CreatedAt || p.createdAt)} />
        </div>

        {/* Prices */}
        {prices.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <div className="modal-section-title">Pricing</div>
            <div className="modal-prices">
              {prices.map((pr, i) => (
                <div key={i} className="modal-price-chip">
                  <div className="modal-price-chip__amount">
                    â‚¹{Number(pr.Amount || pr.amount).toLocaleString('en-IN')}
                  </div>
                  <div className="modal-price-chip__type">
                    {pr.TransactionType || pr.transactionType}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Amenities */}
        {amenities.length > 0 && (
          <div>
            <div className="modal-section-title">Amenities</div>
            <div className="modal-amenities">
              {amenities.map((a, i) => (
                <span key={i} className="badge badge--neutral">âœ” {a}</span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        {(p.Description || p.description) && (
          <p className="modal-description">{p.Description || p.description}</p>
        )}
      </div>
    </div>
  );
};

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Main Component
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const SellerDashboard = () => {
  const [properties,   setProperties]   = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);
  const [selected,     setSelected]     = useState(null);
  const [search,       setSearch]       = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType,   setFilterType]   = useState('all');

  const API_BASE_URL = 'https://localhost:7117/api';

  /* â”€â”€ Fetch â”€â”€ */
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWithAuth(`${API_BASE_URL}/properties/my-properties`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      setProperties(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.message || 'Failed to load your properties. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  /* â”€â”€ Derived stats â”€â”€ */
  const total     = properties.length;
  const ongoing   = properties.filter(p =>
    (p.Status || p.status || '').toLowerCase() === 'ongoing'
  ).length;
  const completed = properties.filter(p =>
    (p.Status || p.status || '').toLowerCase() === 'completed'
  ).length;
const forRent = properties.filter(p => {
  const r = (p.RequireType || p.requireType || '').toLowerCase();
  return r === 'rent';
}).length;

const forSale = properties.filter(p => {
  const r = (p.RequireType || p.requireType || '').toLowerCase();
  return r === 'sell' || r === 'sale';
}).length;
  const cities    = [...new Set(
    properties.map(p => p.Address?.City || p.address?.city).filter(Boolean)
  )].length;

  /* â”€â”€ Filtered list â”€â”€ */
  const filtered = properties.filter(p => {
    const title      = (p.Title  || p.title  || '').toLowerCase();
    const city       = (p.Address?.City || p.address?.city || '').toLowerCase();
    const status     = (p.Status || p.status || '').toLowerCase();
    const reqType    = (p.RequireType || p.requireType || '').toLowerCase();

    const matchSearch = title.includes(search.toLowerCase()) || city.includes(search.toLowerCase());

    const matchStatus =
      filterStatus === 'all' ||
      status === filterStatus ||
      (filterStatus === 'cancelled' && status === 'canceled');

    const matchType =
      filterType === 'all' ||
      reqType === filterType ||
      (filterType === 'sell' && reqType === 'sale');

    return matchSearch && matchStatus && matchType;
  });

  /* â”€â”€â”€ Loading â”€â”€â”€ */
  if (loading) {
    return (
      <div className="seller-dash__loading">
        <div className="loader" />
        <p>Loading your propertiesâ€¦</p>
      </div>
    );
  }

  /* â”€â”€â”€ Error â”€â”€â”€ */
  if (error) {
    return (
      <div className="seller-dash__error">
        <div className="seller-dash__error-icon">âš ï¸</div>
        <p>{error}</p>
        <button onClick={fetchData} className="btn-retry">Retry</button>
      </div>
    );
  }

  /* â”€â”€â”€ Dashboard â”€â”€â”€ */
  return (
    <div className="seller-dash">

      {/* â”€â”€ Header â”€â”€ */}
      <div className="dash-header">
        <div className="dash-header__title">
          <h1>My Properties</h1>
          <p>Manage and monitor your listed properties</p>
        </div>
        <div className="dash-header__actions">
          <button onClick={fetchData} className="btn-refresh">
            ðŸ”„ Refresh
          </button>
          <Link to="/sell_rent" className="btn-add-property">
            + Add Property
          </Link>
        </div>
      </div>

      {/* â”€â”€ Stats â”€â”€ */}
      <div className="stats-grid">
        <StatCard value={total}     label="Total Listings"  sub="Your properties" />
        <StatCard value={ongoing}   label="Ongoing"         sub="Currently listed" />
        <StatCard value={forSale} label="For Sale"       sub="Properties for sale" />
        <StatCard value={forRent}   label="For Rent"        sub="Rental listings" />
      </div>

      {/* â”€â”€ Filter Bar â”€â”€ */}
      <div className="filter-bar">
        <input
          className="filter-bar__search"
          placeholder="Search by title or cityâ€¦"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Status filters */}
        <div className="filter-bar__group">
          <span className="filter-bar__group-label">Status:</span>
          {[
            { key: 'all',       label: 'All' },
            { key: 'ongoing',   label: 'Ongoing' },
            { key: 'completed', label: 'Completed' },
            { key: 'cancelled', label: 'Cancelled' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilterStatus(key)}
              className={`filter-btn${filterStatus === key ? ' filter-btn--active' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Type filters */}
        <div className="filter-bar__group">
          <span className="filter-bar__group-label">Type:</span>
          {[
            { key: 'all',  label: 'All' },
            { key: 'sell', label: 'For Sale' },
            { key: 'rent', label: 'For Rent' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilterType(key)}
              className={`filter-btn${filterType === key ? ' filter-btn--active filter-btn--type' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>

        <span className="filter-bar__count">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* â”€â”€ Property List â”€â”€ */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">ðŸ—ï¸</div>
          <p>No properties found</p>
          <Link to="/sell_rent" className="empty-state__cta">
            List Your First Property
          </Link>
        </div>
      ) : (
        <div className="properties-list">
          {filtered.map((p, i) => {
            const title     = p.Title     || p.title     || 'Untitled';
            const status    = p.Status    || p.status    || 'Unknown';
            const city      = p.Address?.City      || p.address?.city      || 'â€”';
            const state     = p.Address?.State     || p.address?.state     || '';
            const category  = p.Category?.CategoryName || p.category?.categoryName || 'â€”';
            const reqType   = p.RequireType || p.requireType || 'â€”';
            const area      = p.AreaSqft   || p.areaSqft;
            const prices    = p.Prices    || p.prices    || [];
            const images    = p.Images    || p.images    || [];
            const amenities = p.Amenities || p.amenities || [];
            const createdAt = p.CreatedAt || p.createdAt;

            return (
              <div
                key={p.PropertyId || p.propertyId || i}
                className="prop-item"
                onClick={() => setSelected(p)}
              >
                {/* Thumbnail */}
                <div className="prop-item__thumbnail">
                  {images[0]
                    ? <img
                        src={resolveImageUrl(images[0])}
                        alt={title}
                        onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = ''; }}
                      />
                    : ''}
                </div>

                {/* Info */}
                <div className="prop-item__info">
                  <div className="prop-item__title-row">
                    <span className="prop-item__title">{title}</span>
                    <StatusBadge status={status} />
                  </div>

                  <div className="prop-item__badges">
                    <span className="badge badge--orange">{category}</span>
                    <span className={`badge badge--type-${getRequireTypeKey(reqType) || 'default'}`}>
                      {getRequireTypeKey(reqType) === 'rent' ? ' For Rent' : getRequireTypeKey(reqType) === 'sell' ? ' For Sale' : reqType}
                    </span>
                    {area && <span className="badge badge--neutral">{area} sqft</span>}
                  </div>

                  <div className="prop-item__meta">
                    ðŸ“ {city}{state ? `, ${state}` : ''}&nbsp;Â·&nbsp;
                    ðŸ• {timeAgo(createdAt)}
                    {amenities.length > 0 && (
                      <>&nbsp;Â·&nbsp; {amenities.slice(0, 2).join(', ')}
                        {amenities.length > 2 ? ` +${amenities.length - 2}` : ''}
                      </>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="prop-item__price">
                  {prices.length > 0 ? (
                    <>
                      <div className="prop-item__price-amount">
                        â‚¹{Number(prices[0].Amount || prices[0].amount).toLocaleString('en-IN')}
                      </div>
                      <div className="prop-item__price-type">
                        {prices[0].TransactionType || prices[0].transactionType}
                      </div>
                    </>
                  ) : (
                    <div className="prop-item__no-price">No price</div>
                  )}
                  <div className="prop-item__price-cta">View details â†’</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* â”€â”€ Quick Actions â”€â”€ */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="quick-actions__grid">
          {[
            { title: 'Add Property',  desc: 'List a new property',   link: '/sell_rent' },
            { title: 'My Inquiries',  desc: 'View buyer inquiries',  link: '/property_inquiries' },
            {  title: 'Mnage Prices', desc: 'Update your listings',  link: '/explore_property' },
          ].map((a) => (
            <Link key={a.title} to={a.link} className="action-card">
              <div className="action-card__icon">{a.icon}</div>
              <div>
                <div className="action-card__title">{a.title}</div>
                <div className="action-card__desc">{a.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* â”€â”€ Detail Modal â”€â”€ */}
      {selected && (
        <PropertyModal
          property={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};

export default SellerDashboard;