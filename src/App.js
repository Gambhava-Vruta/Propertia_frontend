
// export default App;
import Layout from './components/Layout/Layout';
import Hero from './components/Hero/Hero';
import AddPropertyPage from './components/AddDeleteProperty/Add_Property';
import { Routes, Route } from 'react-router-dom';
import BuyProperty from './components/BuyProperty/Buy_Property';
import PropertyDetails from './components/BuyProperty/Buy_property_detail';
import EditProperty from './components/AddDeleteProperty/EditProperty';
// import ShowPropertyinMap from './components/BuyProperty/ShowPropertyinMap';
import PropertyRouteMap from './components/BuyProperty/PropertyRouteMap';
import ViewAllAmenities from './components/AddAmenities/ViewAllAmenities';
import ViewAllCategories from './components/AddCategories/ViewAllCategories';
import PropertyInquiryModal from './components/PropertyInquiry/PropertyInquiryModal';
import Auth from './components/login/Auth';
import Unauthorized from './components/UnAuthorized/Unauthorized';
import UserProfilePage from './components/Profile/UserProfile';
import EditUserProfilePage from './components/Profile/EditProfile';
import AdminDashboard from './components/Hero/AdminDashboard';
import { ProtectedRoute, SellerRoute, AdminRoute } from './ProtectedRoute';
import SellerDashboard from './components/Seller/SellerDashboard';
import PropertyInquiries from './components/PropertyInquiry/PropertyInquiryModal';
import { Navigate } from 'react-router-dom';
import Propertiachatbot from './components/Propertiachatbot/Propertiachatbot'
import AllError from './components/UnAuthorized/ALLError';
import GlobalLoadingBar from './components/GlobalLoadingBar/GlobalLoadingBar';
const HomeRedirect = () => {
  const stored = localStorage.getItem('currentUser');
  const user = stored ? JSON.parse(stored) : null;
  const role = user?.userType?.toLowerCase();

  if (role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  if (role === 'seller') return <Navigate to="/seller/dashboard" replace />;
  return <Hero />;
};
function App() {
  return (
    <Layout>
      <Routes>
        {/* Public Routes - Anyone can access */}
        <Route path="/Auth" element={<Auth />} />
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/explore_property" element={<BuyProperty />} />
        <Route
          path="/explore_property/Detail/:id"
          element={
            <ProtectedRoute>  {/* Allows ALL authenticated users */}
              <PropertyDetails />
            </ProtectedRoute>
          }
        />                 {/* <Route path="/explore_property/Detail/:id" element={<PropertyDetails/>} /> */}

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/error" element={<AllError />} />
        {/* Protected Routes - Only logged in users */}
        <Route
          path="/property/route/:id"
          element={
            <ProtectedRoute>
              <PropertyRouteMap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/property/inquiry/:id"
          element={
            <ProtectedRoute>
              <PropertyInquiryModal />
            </ProtectedRoute>
          }
        />

        {/* Seller/Admin Only Routes - Only sellers and admins can add/edit properties */}
        <Route
          path="/sell_rent"
          element={
            <SellerRoute showUnauthorizedPage={true}>
              <AddPropertyPage />
            </SellerRoute>
          }
        />
        <Route
          path="/property/Edit/:id"
          element={
            <SellerRoute showUnauthorizedPage={true}>
              <EditProperty />
            </SellerRoute>
          }
        />
        <Route
          path="/property_inquiries"
          element={
            <SellerRoute showUnauthorizedPage={true}>
              <PropertyInquiries />
            </SellerRoute>
          }
        />
        <Route path="/seller/dashboard" element={<SellerRoute showUnauthorizedPage={true}>
          <SellerDashboard />
        </SellerRoute>} />
        {/* Admin Only Routes - Only admins can manage amenities and categories */}
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

        <Route
          path="/View_All_Amenities"
          element={
            <AdminRoute showUnauthorizedPage={true}>
              <ViewAllAmenities />
            </AdminRoute>
          }
        />
        <Route
          path="/View_All_Categories"
          element={
            <AdminRoute showUnauthorizedPage={true}>
              <ViewAllCategories />
            </AdminRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditUserProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;