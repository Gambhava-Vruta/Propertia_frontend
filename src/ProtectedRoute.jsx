
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { isAuthenticated, getCurrentUser } from './components/login/Auth';
// import Unauthorized from './components/UnAuthorized/Unauthorized';

// // Helper function to get user type from localStorage
// const getUserType = () => {
//   const user = getCurrentUser();
//   console.log("📋 getUserType called, user:", user);
//   return user ? user.userType : null;
// };

// // Component to protect routes that require authentication
// export const ProtectedRoute = ({ children }) => {
//   console.log("🔒 ProtectedRoute called");
//   console.log("  - isAuthenticated:", isAuthenticated());
//   console.log("  - token:", localStorage.getItem('token'));
//   console.log("  - currentUser:", localStorage.getItem('currentUser'));
  
//   if (!isAuthenticated()) {
//     console.log("  ❌ Redirecting to /Auth");
//     return <Navigate to="/Auth" replace />;
//   }
  
//   console.log("  ✅ Access granted by ProtectedRoute");
//   return children;
// };

// // Component to protect routes based on user role/type
// export const RoleProtectedRoute = ({ children, allowedRoles, showUnauthorizedPage = false }) => {
//   console.log("🔐 RoleProtectedRoute called");
//   console.log("  - allowedRoles:", allowedRoles);
  
//   if (!isAuthenticated()) {
//     console.log("  ❌ Not authenticated");
//     return <Navigate to="/Auth" replace />;
//   }
  
//   const userType = getUserType();
//   console.log("  - userType:", userType);
//   console.log("  - checking if", userType, "is in", allowedRoles);
  
//   // Check if user's role is in the allowed roles
//   if (!allowedRoles.includes(userType)) {
//     console.log("  ❌ Role not allowed");
//     if (showUnauthorizedPage) {
//       return <Unauthorized />;
//     }
//     return <Navigate to="/" replace />;
//   }
  
//   console.log("  ✅ Role allowed");
//   return children;
// };

// // Specific role guards
// export const SellerRoute = ({ children, showUnauthorizedPage = false }) => {
//   console.log("🏠 SellerRoute called");
//   return (
//     <RoleProtectedRoute allowedRoles={['seller', 'admin']} showUnauthorizedPage={showUnauthorizedPage}>
//       {children}
//     </RoleProtectedRoute>
//   );
// };

// export const AdminRoute = ({ children, showUnauthorizedPage = false }) => {
//   console.log(" AdminRoute called");
//   return (
//     <RoleProtectedRoute allowedRoles={['admin']} showUnauthorizedPage={showUnauthorizedPage}>
//       {children}
//     </RoleProtectedRoute>
//   );
// };

// export const BuyerRoute = ({ children, showUnauthorizedPage = false }) => {
//   console.log(" BuyerRoute called");
//   console.log("  - showUnauthorizedPage:", showUnauthorizedPage);
  
//   const isAuth = isAuthenticated();
//   const role = getUserType();

//   console.log("  - isAuth:", isAuth);
//   console.log("  - role:", role);

//   // Not logged in
//   if (!isAuth) {
//     console.log("  ❌ Not authenticated, redirecting to /Auth");
//     return <Navigate to="/Auth" replace />;
//   }

//   // Logged in but wrong role
//   if (role !== "buyer") {
//     console.log("  ❌ Wrong role, role is:", role);
//     return showUnauthorizedPage
//       ? <Unauthorized />
//       : <Navigate to="/" replace />;
//   }

//   console.log("  ✅ Buyer access granted");
//   return children;
// };

// export const AgentRoute = ({ children, showUnauthorizedPage = false }) => {
//   console.log("🏢 AgentRoute called");
//   return (
//     <RoleProtectedRoute allowedRoles={['agent', 'admin']} showUnauthorizedPage={showUnauthorizedPage}>
//       {children}
//     </RoleProtectedRoute>
//   );
// };

// export default ProtectedRoute;










// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { isAuthenticated, getCurrentUser, isTokenExpired, clearAuthData } from './components/login/Auth';
// import Unauthorized from './components/UnAuthorized/Unauthorized';

// // Helper function to get user type from localStorage
// const getUserType = () => {
//   const user = getCurrentUser();
//   console.log("📋 getUserType called, user:", user);
//   return user ? user.userType : null;
// };

// // Helper function to check auth validity (checks both authentication and token expiration)
// const isAuthValid = () => {
//   if (!isAuthenticated()) {
//     return false;
//   }
  
//   if (isTokenExpired()) {
//     console.log("⏰ Token has expired - clearing auth data");
//     clearAuthData();
//     return false;
//   }
  
//   return true;
// };

// // Component to protect routes that require authentication
// export const ProtectedRoute = ({ children }) => {
//   console.log("🔒 ProtectedRoute called");
//   console.log("  - isAuthenticated:", isAuthenticated());
//   console.log("  - token:", localStorage.getItem('token'));
//   console.log("  - currentUser:", localStorage.getItem('currentUser'));
  
//   if (!isAuthValid()) {
//     console.log("  ❌ Redirecting to /Auth (not authenticated or token expired)");
//     return <Navigate to="/Auth" replace />;
//   }
  
//   console.log("  ✅ Access granted by ProtectedRoute");
//   return children;
// };

// // Component to protect routes based on user role/type
// export const RoleProtectedRoute = ({ children, allowedRoles, showUnauthorizedPage = false }) => {
//   console.log("🔐 RoleProtectedRoute called");
//   console.log("  - allowedRoles:", allowedRoles);
  
//   if (!isAuthValid()) {
//     console.log("  ❌ Not authenticated or token expired");
//     return <Navigate to="/Auth" replace />;
//   }
  
//   const userType = getUserType();
//   console.log("  - userType:", userType);
//   console.log("  - checking if", userType, "is in", allowedRoles);
  
//   // Check if user's role is in the allowed roles
//   if (!allowedRoles.includes(userType)) {
//     console.log("  ❌ Role not allowed");
//     if (showUnauthorizedPage) {
//       return <Unauthorized />;
//     }
//     return <Navigate to="/" replace />;
//   }
  
//   console.log("  ✅ Role allowed");
//   return children;
// };

// // Specific role guards
// export const SellerRoute = ({ children, showUnauthorizedPage = false }) => {
//   console.log("🏠 SellerRoute called");
//   return (
//     <RoleProtectedRoute allowedRoles={['seller', 'admin']} showUnauthorizedPage={showUnauthorizedPage}>
//       {children}
//     </RoleProtectedRoute>
//   );
// };

// export const AdminRoute = ({ children, showUnauthorizedPage = false }) => {
//   console.log("👑 AdminRoute called");
//   return (
//     <RoleProtectedRoute allowedRoles={['admin']} showUnauthorizedPage={showUnauthorizedPage}>
//       {children}
//     </RoleProtectedRoute>
//   );
// };

// export const BuyerRoute = ({ children, showUnauthorizedPage = false }) => {
//   console.log("🛒 BuyerRoute called");
//   console.log("  - showUnauthorizedPage:", showUnauthorizedPage);
  
//   const isAuth = isAuthValid();
//   const role = getUserType();

//   console.log("  - isAuth:", isAuth);
//   console.log("  - role:", role);

//   // Not logged in or token expired
//   if (!isAuth) {
//     console.log("  ❌ Not authenticated or token expired, redirecting to /Auth");
//     return <Navigate to="/Auth" replace />;
//   }

//   // Logged in but wrong role
//   if (role !== "buyer") {
//     console.log("  ❌ Wrong role, role is:", role);
//     return showUnauthorizedPage
//       ? <Unauthorized />
//       : <Navigate to="/" replace />;
//   }

//   console.log("✅ Buyer access granted");
//   return children;
// };

// export const AgentRoute = ({ children, showUnauthorizedPage = false }) => {
//   console.log("🏢 AgentRoute called");
//   return (
//     <RoleProtectedRoute allowedRoles={['agent', 'admin']} showUnauthorizedPage={showUnauthorizedPage}>
//       {children}
//     </RoleProtectedRoute>
//   );
// };

// export default ProtectedRoute;











import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser, isTokenExpired, clearAuthData } from './components/login/Auth';
import Unauthorized from './components/UnAuthorized/Unauthorized';

/* ── helpers ── */
const getUserType = () => getCurrentUser()?.userType ?? null;

const isAuthValid = () => {
  if (!isAuthenticated()) return false;
  if (isTokenExpired()) {
    clearAuthData();
    return false;
  }
  return true;
};

/* ══════════════════════════════════════════
   ProtectedRoute — any logged-in user
══════════════════════════════════════════ */
export const ProtectedRoute = ({ children }) => {
  if (!isAuthValid()) {
    return <Navigate to="/Auth" replace />;
  }
  return children;
};

/* ══════════════════════════════════════════
   RoleProtectedRoute — specific roles
══════════════════════════════════════════ */
export const RoleProtectedRoute = ({ children, allowedRoles, showUnauthorizedPage = false }) => {
  if (!isAuthValid()) {
    return <Navigate to="/Auth" replace />;
  }

  const userType = getUserType();
  if (!allowedRoles.includes(userType)) {
    return showUnauthorizedPage
      ? <Unauthorized />
      : <Navigate to="/" replace />;
  }

  return children;
};

/* ══════════════════════════════════════════
   Role shortcuts
══════════════════════════════════════════ */

// seller OR admin
export const SellerRoute = ({ children, showUnauthorizedPage = false }) => (
  <RoleProtectedRoute allowedRoles={['seller', 'admin']} showUnauthorizedPage={showUnauthorizedPage}>
    {children}
  </RoleProtectedRoute>
);

// admin only
export const AdminRoute = ({ children, showUnauthorizedPage = false }) => (
  <RoleProtectedRoute allowedRoles={['admin']} showUnauthorizedPage={showUnauthorizedPage}>
    {children}
  </RoleProtectedRoute>
);

// buyer only
export const BuyerRoute = ({ children, showUnauthorizedPage = false }) => {
  if (!isAuthValid()) return <Navigate to="/Auth" replace />;
  const role = getUserType();
  if (role !== 'buyer') {
    return showUnauthorizedPage ? <Unauthorized /> : <Navigate to="/" replace />;
  }
  return children;
};

// agent OR admin
export const AgentRoute = ({ children, showUnauthorizedPage = false }) => (
  <RoleProtectedRoute allowedRoles={['agent', 'admin']} showUnauthorizedPage={showUnauthorizedPage}>
    {children}
  </RoleProtectedRoute>
);

export default ProtectedRoute;