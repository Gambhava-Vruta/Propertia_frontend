import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';
import { fetchWithAuth } from '../login/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    houses: 0,
    apartments: 0,
    lands: 0,
    offices: 0,
    shops: 0,
    pgs: 0,
    totalCategories: 0,
    totalAmenities: 0,
    totalInquiries: 0,
    pendingInquiries: 0,
    totalUsers: 0,
  });

  const [recentProperties, setRecentProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'https://propeitia-backhand.onrender.com/api';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel using fetchWithAuth
      const [properties, categories, amenities, inquiries, users] = await Promise.all([
        fetchWithAuth(`${API_BASE_URL}/properties`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        }).catch(() => []),
        fetchWithAuth(`${API_BASE_URL}/Categories`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        }).catch(() => []),
        fetchWithAuth(`${API_BASE_URL}/Amenities`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        }).catch(() => []),
        fetchWithAuth(`${API_BASE_URL}/property-inquiries`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        }).catch(() => []),
        fetchWithAuth(`${API_BASE_URL}/Users`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        }).catch(() => [])
      ]);

      // Ensure all responses are arrays
      const propertiesArray = Array.isArray(properties) ? properties : [];
      const categoriesArray = Array.isArray(categories) ? categories : [];
      const amenitiesArray = Array.isArray(amenities) ? amenities : [];
      const inquiriesArray = Array.isArray(inquiries) ? inquiries : [];
      const usersArray = Array.isArray(users) ? users : [];

const getType = (p) => (
  p.category?.categoryName || ''
).toLowerCase();

const propertyTypes = {
  houses:     propertiesArray.filter(p => getType(p) === 'house').length,
  apartments: propertiesArray.filter(p => getType(p) === 'apartment').length,
  lands:      propertiesArray.filter(p => getType(p) === 'land').length,
  offices:    propertiesArray.filter(p => getType(p) === 'office').length,
  shops:      propertiesArray.filter(p => getType(p) === 'shop').length,
  pgs:        propertiesArray.filter(p => getType(p) === 'pg').length,
};

      // Calculate pending inquiries
      const pendingInquiries = inquiriesArray.filter(
        i => i.status?.toLowerCase() === 'pending' || !i.status
      ).length;

      // Get recent properties (last 5)
      const sortedProperties = propertiesArray
        .sort((a, b) => new Date(b.createdAt || b.dateAdded) - new Date(a.createdAt || a.dateAdded))
        .slice(0, 5)
        .map(p => ({
          id: p.propertyId,
          title: p.title || p.name || 'Untitled Property',
          type: p.category?.categoryName || 'Property',
          time: formatTimeAgo(p.createdAt || p.dateAdded)
        }));

      setStats({
        totalProperties: propertiesArray.length,
        houses: propertyTypes.houses,
        apartments: propertyTypes.apartments,
        lands: propertyTypes.lands,
        offices: propertyTypes.offices,
        shops: propertyTypes.shops,
        pgs: propertyTypes.pgs,
        totalCategories: categoriesArray.length,
        totalAmenities: amenitiesArray.length,
        totalInquiries: inquiriesArray.length,
        pendingInquiries: pendingInquiries,
        totalUsers: usersArray.length,
      });

      setRecentProperties(sortedProperties);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError(error?.message || 'Failed to load dashboard data. Please try again.');
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Recently';
    
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    const weeks = Math.floor(days / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  };

  const StatCard = ({ title, value, icon, subtitle, link }) => {
    const content = (
      <>
        <div className="stat-card-header">
          <div className="stat-icon">{icon}</div>
        </div>
        <div className="stat-content">
          <h3 className="stat-value">{typeof value === 'number' ? value.toLocaleString() : value}</h3>
          <p className="stat-title">{title}</p>
          {subtitle && <p className="stat-subtitle">{subtitle}</p>}
        </div>
      </>
    );

    if (link) {
      return (
        <Link to={link} className="stat-card">
          {content}
        </Link>
      );
    }

    return <div className="stat-card">{content}</div>;
  };

  const PropertyTypeCard = ({ type, count, icon, link }) => (
    <Link to={link} className="property-type-card">
      <div className="property-icon">{icon}</div>
      <div className="property-details">
        <h4>{count}</h4>
        <p>{type}</p>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loader"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <div className="error-icon">⚠️</div>
        <p>{error}</p>
        <button onClick={fetchDashboardData} className="btn-retry">Retry</button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="dashboard-subtitle">Manage your property listings and monitor activity</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn-refresh" onClick={fetchDashboardData}>
            <span className="icon">🔄</span>
            <span>Refresh</span>
          </button>
          <Link to="/sell_rent" className="btn-add-property">
            <span className="icon">+</span>
            <span>Add Property</span>
          </Link>
        </div>
      </div>

      {/* Top Statistics Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Properties"
          value={stats.totalProperties}
          subtitle="All listed properties"
          link="/explore_property"
        />
        <StatCard
          title="Pending Inquiries"
          value={stats.pendingInquiries}
          subtitle={`${stats.totalInquiries} total inquiries`}
          link="/property_inquiries"
        />
        <StatCard
          title="Categories"
          value={stats.totalCategories}
          subtitle="Property categories"
          link="/view_all_categories"
        />
        <StatCard
          title="Amenities"
          value={stats.totalAmenities}
          subtitle="Available amenities"
          link="/view_all_amenities"
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          subtitle="Registered users"
        />
      </div>

      {/* Property Types Breakdown */}
      <div className="section-container">
        <div className="section-header">
          <h2>Property Distribution</h2>
          <Link to="/explore_property" className="view-all-link">
            View All Properties →
          </Link>
        </div>
        <div className="property-types-grid">
          <PropertyTypeCard 
            type="Houses" 
            count={stats.houses} 
            link="/explore_property?type=House"
          />
          <PropertyTypeCard 
            type="Apartments" 
            count={stats.apartments} 
            link="/explore_property?type=Apartment"
          />
          <PropertyTypeCard 
            type="Land/Plots" 
            count={stats.lands} 
            link="/explore_property?type=Land"
          />
          <PropertyTypeCard 
            type="Offices" 
            count={stats.offices} 
            link="/explore_property?type=Office"
          />
          <PropertyTypeCard 
            type="Shops" 
            count={stats.shops} 
            link="/explore_property?type=Shop"
          />
          <PropertyTypeCard 
            type="PG/Rentals" 
            count={stats.pgs} 
            link="/explore_property?type=PG"
          />
        </div>
      </div>

      {/* Recent Activity and Overview */}
      <div className="dashboard-grid">
        {/* Recent Properties */}
        <div className="card recent-properties-card">
          <div className="card-header">
            <h3>Recently Added Properties</h3>
            <Link to="/explore_property" className="card-link">View All →</Link>
          </div>
          <div className="properties-list">
            {recentProperties.length > 0 ? (
              recentProperties.map((property) => (
                <Link 
                  to={`/explore_property/Detail/${property.id}`} 
                  key={property.id} 
                  className="property-item"
                >
                  <div className="property-info">
                    <h4>{property.title}</h4>
                    <span className="property-type">{property.type}</span>
                  </div>
                  <span className="property-time">{property.time}</span>
                </Link>
              ))
            ) : (
              <div className="empty-state">
                <p>No properties added yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="card stats-summary-card">
          <div className="card-header">
            <h3>Quick Overview</h3>
          </div>
          <div className="stats-summary">
            <div className="summary-item">
              <div className="summary-label">Property Types</div>
              <div className="summary-value">6</div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Total Listings</div>
              <div className="summary-value">{stats.totalProperties}</div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Active Inquiries</div>
              <div className="summary-value">{stats.pendingInquiries}</div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Platform Users</div>
              <div className="summary-value">{stats.totalUsers}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          <Link to="/sell_rent" className="action-card">
            <div className="action-content">
              <h4>Add Property</h4>
              <p>List a new property</p>
            </div>
          </Link>
          <Link to="/view_all_categories" className="action-card">
            <div className="action-content">
              <h4>Manage Categories</h4>
              <p>Edit property categories</p>
            </div>
          </Link>
          <Link to="/view_all_amenities" className="action-card">
            <div className="action-content">
              <h4>Manage Amenities</h4>
              <p>Update available amenities</p>
            </div>
          </Link>
          <Link to="/property_inquiries" className="action-card">
            <div className="action-content">
              <h4>View Inquiries</h4>
              <p>{stats.pendingInquiries} pending</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;