// // import React, { useState, useEffect } from 'react';
// // import './Auth.css';
// // import { useNavigate } from 'react-router-dom';



// // // Helper function to get current user from localStorage
// // export const getCurrentUser = () => {
// //   const storedUser = localStorage.getItem('currentUser');
// //   return storedUser ? JSON.parse(storedUser) : null;
// // };

// // // Helper function to get current user ID
// // export const getCurrentUserId = () => {
// //   const user = getCurrentUser();
// //   return user ? user.userId : null;
// // };




// // // Helper function to check if user is logged in
// // export const isAuthenticated = () => {
// //   return !!localStorage.getItem('token');
// // };

// // export const getToken = () => {
// //   return localStorage.getItem('token');
// // };


// // const Auth = () => {
// //   const [isLogin, setIsLogin] = useState(true);
// //   const [message, setMessage] = useState({ text: '', type: '' });
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const navigate = useNavigate();

// //   // Login form state
// //   const [loginData, setLoginData] = useState({
// //     email: '',
// //     password: ''
// //   });
  
// //   // Register form state
// //   const [registerData, setRegisterData] = useState({
// //     name: '',
// //     email: '',
// //     password: '',
// //     phone: '',
// //     userType: ''
// //   });

// //   const API_URL = 'https://localhost:7117/api/Users';
// //   const LOGIN_URL = 'https://localhost:7117/api/Users/login';

// //   useEffect(() => {
// //   const token = localStorage.getItem('token');
// //   const storedUser = localStorage.getItem('currentUser');
  
// //   if (token && storedUser) {
// //     setCurrentUser(JSON.parse(storedUser));
// //     setIsLoggedIn(true);
// //   }
// // }, []);

// //   // Handle login
// // const handleLogin = async (e) => {
// //   e.preventDefault();
// //   setMessage({ text: '', type: '' });

// //   try {
// //     const response = await fetch(LOGIN_URL, {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'accept': '*/*'
// //       },
// //       body: JSON.stringify({
// //         email: loginData.email,
// //         password: loginData.password
// //       })
// //     });

// //     if (response.ok) {
// //       const data = await response.json();

// //       localStorage.setItem('token', data.token);
// //       localStorage.setItem('currentUser', JSON.stringify(data.user));
// //       localStorage.setItem('isLoggedIn', 'true');
// //       localStorage.setItem('loginTime', new Date().toISOString());

// //       setCurrentUser(data.user);
// //       setIsLoggedIn(true);
// //       setMessage({ 
// //         text: `✓ Welcome back, ${data.user.name}!`, 
// //         type: 'success' 
// //       });
      
// //       setLoginData({ email: '', password: '' });
// //       window.dispatchEvent(new Event('userLoggedIn'));

// //       setTimeout(() => {
// //         navigate('/');
// //       }, 1000);

// //     } else {
// //       const errorData = await response.json();
// //       setMessage({ 
// //         text: `✗ ${errorData.message || 'Invalid email or password'}`, 
// //         type: 'error' 
// //       });
// //     }
// //   } catch (error) {
// //     console.error('Login error:', error);
// //     setMessage({ 
// //       text: `✗ Error: ${error.message}`, 
// //       type: 'error' 
// //     });
// //   }
// // };

// //   // Handle registration
// //   const handleRegister = async (e) => {
// //     e.preventDefault();
// //     setMessage({ text: '', type: '' });

// //     const userData = {
// //       userId: 0,
// //       name: registerData.name,
// //       email: registerData.email,
// //       password: registerData.password,
// //       phone: registerData.phone || null,
// //       userType: registerData.userType || "buyer",
// //       createdAt: new Date().toISOString()
// //     };

// //     console.log('Sending registration data:', userData);

// //     try {
// //       const response = await fetch(API_URL, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'accept': '*/*'
// //         },
// //         body: JSON.stringify(userData)
// //       });

// //       console.log('Response status:', response.status);

// //       if (response.ok) {
// //         const newUser = await response.json();
// //         console.log('Registration successful:', newUser);
        
// //         // Store registration info in localStorage
// //         localStorage.setItem('lastRegistration', JSON.stringify({
// //           email: userData.email,
// //           timestamp: new Date().toISOString()
// //         }));
        
// //         setMessage({ 
// //           text: '✓ Registration successful! Please login.', 
// //           type: 'success' 
// //         });
        
// //         setTimeout(() => {
// //           setRegisterData({
// //             name: '',
// //             email: '',
// //             password: '',
// //             phone: '',
// //             userType: ''
// //           });
// //           setIsLogin(true);
// //           setMessage({ text: '', type: '' });
// //         }, 2000);

// //       } else {
// //         const errorData = await response.json();
// //         console.error('Registration failed:', errorData);
// //         setMessage({ 
// //           text: `✗ ${errorData.message || 'Registration failed. Please check your input.'}`, 
// //           type: 'error' 
// //         });
// //       }
// //     } catch (error) {
// //       console.error('Network error:', error);
// //       setMessage({ 
// //         text: `✗ Error: ${error.message}`, 
// //         type: 'error' 
// //       });
// //     }
// //   };

// //   // Handle logout
// //   const handleLogout = () => {
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('currentUser');
// //     localStorage.removeItem('isLoggedIn');
// //     localStorage.removeItem('loginTime');

// //     setCurrentUser(null);
// //     setIsLoggedIn(false);
// //     setMessage({ text: '✓ Logged out successfully', type: 'success' });
    
// //     // Trigger custom event for other components
// //     window.dispatchEvent(new Event('userLoggedOut'));
    
// //     setTimeout(() => {
// //       setMessage({ text: '', type: '' });
// //       // Navigate to home after logout
// //       navigate('/');
// //     }, 1500);
// //   };

// //   // If user is logged in, show dashboard
// //   if (isLoggedIn && currentUser) {
// //     return (
// //       <div className="auth-container">
// //         <div className="auth-card dashboard-card">
// //           <div className="dashboard-header">
// //             <h1>Welcome, {currentUser.name || 'User'}!</h1>
// //             <p>You are successfully logged in</p>
// //           </div>

// //           <div className="user-info">
// //             <div className="info-row">
// //               <span className="info-label">Email:</span>
// //               <span className="info-value">{currentUser.email}</span>
// //             </div>
// //             <div className="info-row">
// //               <span className="info-label">Phone:</span>
// //               <span className="info-value">{currentUser.phone || 'Not provided'}</span>
// //             </div>
// //             <div className="info-row">
// //               <span className="info-label">User Type:</span>
// //               <span className="info-value user-type-badge">{currentUser.userType || 'N/A'}</span>
// //             </div>
// //             <div className="info-row">
// //               <span className="info-label">Member Since:</span>
// //               <span className="info-value">
// //                 {new Date(currentUser.createdAt).toLocaleDateString()}
// //               </span>
// //             </div>
// //           </div>

// //           <button onClick={handleLogout} className="logout-btn">
// //             Logout
// //           </button>

// //           {message.text && (
// //             <div className={`message ${message.type}`}>
// //               {message.text}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Authentication forms
// //   return (
// //     <div className="auth-container">
// //       <div className="auth-card">
// //         {/* Toggle Tabs */}
// //         <div className="auth-tabs">
// //           <button 
// //             className={`tab-btn ${isLogin ? 'active' : ''}`}
// //             onClick={() => {
// //               setIsLogin(true);
// //               setMessage({ text: '', type: '' });
// //             }}
// //           >
// //             Login
// //           </button>
// //           <button 
// //             className={`tab-btn ${!isLogin ? 'active' : ''}`}
// //             onClick={() => {
// //               setIsLogin(false);
// //               setMessage({ text: '', type: '' });
// //             }}
// //           >
// //             Register
// //           </button>
// //         </div>

// //         {/* Login Form */}
// //         {isLogin ? (
// //           <div className="form-wrapper">
// //             <div className="auth-header">
// //               <h1>Welcome Back</h1>
// //               <p>Sign in to continue to your account</p>
// //             </div>
            
// //             <form onSubmit={handleLogin} className="auth-form">
// //               <div className="form-group">
// //                 <label>Email Address</label>
// //                 <input 
// //                   type="email" 
// //                   className="form-input" 
// //                   placeholder="Enter your email"
// //                   value={loginData.email}
// //                   onChange={(e) => setLoginData({...loginData, email: e.target.value})}
// //                   required
// //                 />
// //               </div>

// //               <div className="form-group">
// //                 <label>Password</label>
// //                 <input 
// //                   type="password" 
// //                   className="form-input" 
// //                   placeholder="Enter your password"
// //                   value={loginData.password}
// //                   onChange={(e) => setLoginData({...loginData, password: e.target.value})}
// //                   required
// //                 />
// //               </div>

// //               <div className="form-options">
// //                 <label className="checkbox-label">
// //                   <input type="checkbox" />
// //                   <span>Remember me</span>
// //                 </label>
// //                 <a href="#" className="forgot-link">Forgot password?</a>
// //               </div>

// //               <button type="submit" className="auth-btn">
// //                 Sign In
// //               </button>
// //             </form>
// //           </div>
// //         ) : (
// //           // Register Form
// //           <div className="form-wrapper">
// //             <div className="auth-header">
// //               <h1>Create Account</h1>
// //               <p>Join us to find your perfect property</p>
// //             </div>
            
// //             <form onSubmit={handleRegister} className="auth-form">
// //               <div className="form-group">
// //                 <label>Full Name</label>
// //                 <input 
// //                   type="text" 
// //                   className="form-input" 
// //                   placeholder="Enter your full name"
// //                   value={registerData.name}
// //                   onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
// //                   required
// //                 />
// //               </div>

// //               <div className="form-group">
// //                 <label>Email Address</label>
// //                 <input 
// //                   type="email" 
// //                   className="form-input" 
// //                   placeholder="Enter your email"
// //                   value={registerData.email}
// //                   onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
// //                   required
// //                 />
// //               </div>

// //               <div className="form-group">
// //                 <label>Password</label>
// //                 <input 
// //                   type="password" 
// //                   className="form-input" 
// //                   placeholder="Create a password"
// //                   value={registerData.password}
// //                   onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
// //                   required
// //                 />
// //               </div>

// //               <div className="form-group">
// //                 <label>Phone Number</label>
// //                 <input 
// //                   type="tel" 
// //                   className="form-input" 
// //                   placeholder="Enter your phone number"
// //                   value={registerData.phone}
// //                   onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
// //                   required
// //                 />
// //               </div>

// //               <div className="form-group">
// //                 <label>I am a</label>
// //                 <select 
// //                   className="form-input" 
// //                   value={registerData.userType}
// //                   onChange={(e) => setRegisterData({...registerData, userType: e.target.value})}
// //                   required
// //                 >
// //                   <option value="">Select user type</option>
// //                   <option value="buyer">Buyer</option>
// //                   <option value="seller">Seller</option>
// //                   <option value="agent">Agent</option>
// //                 </select>
// //               </div>

// //               <div className="form-options">
// //                 <label className="checkbox-label">
// //                   <input type="checkbox" required />
// //                   <span>I agree to the Terms & Conditions</span>
// //                 </label>
// //               </div>

// //               <button type="submit" className="auth-btn">
// //                 Create Account
// //               </button>
// //             </form>

// //           </div>
// //         )}

// //         {/* Message Display */}
// //         {message.text && (
// //           <div className={`message ${message.type}`}>
// //             {message.text}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Auth;
// import React, { useState, useEffect } from 'react';
// import './Auth.css';
// import { useNavigate } from 'react-router-dom';

// // Helper function to get current user from localStorage
// export const getCurrentUser = () => {
//   const storedUser = localStorage.getItem('currentUser');
//   return storedUser ? JSON.parse(storedUser) : null;
// };

// // Helper function to get current user ID
// export const getCurrentUserId = () => {
//   const user = getCurrentUser();
//   return user ? user.userId : null;
// };

// // Helper function to check if user is logged in
// export const isAuthenticated = () => {
//   return !!localStorage.getItem('token');
// };

// export const getToken = () => {
//   return localStorage.getItem('token');
// };

// // NEW: Helper function to validate token
// export const validateToken = async () => {
//   const token = getToken();
//   if (!token) return false;

//   try {
//     // Call your API endpoint to validate the token
//     const response = await fetch('https://localhost:7117/api/Users/validate-token', {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     if (response.ok) {
//       return true;
//     } else {
//       // Token is invalid, clear storage
//       clearAuthData();
//       return false;
//     }
//   } catch (error) {
//     console.error('Token validation error:', error);
//     clearAuthData();
//     return false;
//   }
// };

// // NEW: Helper function to clear all auth data
// export const clearAuthData = () => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('currentUser');
//   localStorage.removeItem('isLoggedIn');
//   localStorage.removeItem('loginTime');
//   window.dispatchEvent(new Event('userLoggedOut'));
// };

// // NEW: Helper function to check token expiration based on time
// export const isTokenExpired = () => {
//   const loginTime = localStorage.getItem('loginTime');
//   if (!loginTime) return true;

//   const loginDate = new Date(loginTime);
//   const now = new Date();
//   const hoursSinceLogin = (now - loginDate) / (1000 * 60 * 60);

//   // Token expires after 24 hours (adjust as needed)
//   return hoursSinceLogin > 24;
// };

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [message, setMessage] = useState({ text: '', type: '' });
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isValidating, setIsValidating] = useState(true);
//   const navigate = useNavigate();

//   // Login form state
//   const [loginData, setLoginData] = useState({
//     email: '',
//     password: ''
//   });
  
//   // Register form state
//   const [registerData, setRegisterData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phone: '',
//     userType: ''
//   });

//   const API_URL = 'https://localhost:7117/api/Users';
//   const LOGIN_URL = 'https://localhost:7117/api/Users/login';

//   // Validate existing session on component mount
//   useEffect(() => {
//     const checkAuth = async () => {
//       setIsValidating(true);
//       const token = localStorage.getItem('token');
//       const storedUser = localStorage.getItem('currentUser');
      
//       if (token && storedUser) {
//         // Check if token is expired based on time
//         if (isTokenExpired()) {
//           console.log('Token expired based on time');
//           clearAuthData();
//           setIsLoggedIn(false);
//           setCurrentUser(null);
//           setMessage({ 
//             text: '⚠ Your session has expired. Please login again.', 
//             type: 'error' 
//           });
//         } else {
//           // Optionally validate token with server
//           // Uncomment the following if you have a token validation endpoint
//           /*
//           const isValid = await validateToken();
//           if (isValid) {
//             setCurrentUser(JSON.parse(storedUser));
//             setIsLoggedIn(true);
//           } else {
//             setMessage({ 
//               text: '⚠ Your session is invalid. Please login again.', 
//               type: 'error' 
//             });
//           }
//           */
          
//           // For now, just restore the session
//           setCurrentUser(JSON.parse(storedUser));
//           setIsLoggedIn(true);
//         }
//       }
//       setIsValidating(false);
//     };

//     checkAuth();
//   }, []);

//   // Handle login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setMessage({ text: '', type: '' });

//     try {
//       const response = await fetch(LOGIN_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'accept': '*/*'
//         },
//         body: JSON.stringify({
//           email: loginData.email,
//           password: loginData.password
//         })
//       });

//       if (response.ok) {
//         const data = await response.json();

//         localStorage.setItem('token', data.token);
//         localStorage.setItem('currentUser', JSON.stringify(data.user));
//         localStorage.setItem('isLoggedIn', 'true');
//         localStorage.setItem('loginTime', new Date().toISOString());

//         setCurrentUser(data.user);
//         setIsLoggedIn(true);
//         setMessage({ 
//           text: `✓ Welcome back, ${data.user.name}!`, 
//           type: 'success' 
//         });
        
//         setLoginData({ email: '', password: '' });
//         window.dispatchEvent(new Event('userLoggedIn'));

//         // setTimeout(() => {
//         //   navigate('/');
//         // }, 1000);
//         setTimeout(() => {
//   const role = data.user.userType?.toLowerCase();
//   if (role === 'admin') {
//     navigate('/admin/dashboard');
//   } else if (role === 'seller') {
//     navigate('/seller/dashboard');
//   } else {
//     navigate('/');
//   }
// }, 1000);

//       } else {
//         const errorData = await response.json();
//         setMessage({ 
//           text: `✗ ${errorData.message || 'Invalid email or password'}`, 
//           type: 'error' 
//         });
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setMessage({ 
//         text: `✗ Error: ${error.message}`, 
//         type: 'error' 
//       });
//     }
//   };

//   // Handle registration
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setMessage({ text: '', type: '' });

//     const userData = {
//       userId: 0,
//       name: registerData.name,
//       email: registerData.email,
//       password: registerData.password,
//       phone: registerData.phone || null,
//       userType: registerData.userType || "buyer",
//       createdAt: new Date().toISOString()
//     };

//     console.log('Sending registration data:', userData);

//     try {
//       const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'accept': '*/*'
//         },
//         body: JSON.stringify(userData)
//       });

//       console.log('Response status:', response.status);

//       if (response.ok) {
//         const newUser = await response.json();
//         console.log('Registration successful:', newUser);
        
//         localStorage.setItem('lastRegistration', JSON.stringify({
//           email: userData.email,
//           timestamp: new Date().toISOString()
//         }));
        
//         setMessage({ 
//           text: '✓ Registration successful! Please login.', 
//           type: 'success' 
//         });
        
//         setTimeout(() => {
//           setRegisterData({
//             name: '',
//             email: '',
//             password: '',
//             phone: '',
//             userType: ''
//           });
//           setIsLogin(true);
//           setMessage({ text: '', type: '' });
//         }, 2000);

//       } else {
//         const errorData = await response.json();
//         console.error('Registration failed:', errorData);
//         setMessage({ 
//           text: `✗ ${errorData.message || 'Registration failed. Please check your input.'}`, 
//           type: 'error' 
//         });
//       }
//     } catch (error) {
//       console.error('Network error:', error);
//       setMessage({ 
//         text: `✗ Error: ${error.message}`, 
//         type: 'error' 
//       });
//     }
//   };

//   // Handle logout
//   const handleLogout = () => {
//     clearAuthData();
//     setCurrentUser(null);
//     setIsLoggedIn(false);
//     setMessage({ text: '✓ Logged out successfully', type: 'success' });
    
//     setTimeout(() => {
//       setMessage({ text: '', type: '' });
//       navigate('/');
//     }, 1500);
//   };

//   // Show loading state while validating
//   if (isValidating) {
//     return (
//       <div className="auth-container">
//         <div className="auth-card">
//           <div style={{ textAlign: 'center', padding: '40px' }}>
//             <p>Validating session...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // If user is logged in, show dashboard
//   if (isLoggedIn && currentUser) {
//     return (
//       <div className="auth-container">
//         <div className="auth-card dashboard-card">
//           <div className="dashboard-header">
//             <h1>Welcome, {currentUser.name || 'User'}!</h1>
//             <p>You are successfully logged in</p>
//           </div>

//           <div className="user-info">
//             <div className="info-row">
//               <span className="info-label">Email:</span>
//               <span className="info-value">{currentUser.email}</span>
//             </div>
//             <div className="info-row">
//               <span className="info-label">Phone:</span>
//               <span className="info-value">{currentUser.phone || 'Not provided'}</span>
//             </div>
//             <div className="info-row">
//               <span className="info-label">User Type:</span>
//               <span className="info-value user-type-badge">{currentUser.userType || 'N/A'}</span>
//             </div>
//             <div className="info-row">
//               <span className="info-label">Member Since:</span>
//               <span className="info-value">
//                 {new Date(currentUser.createdAt).toLocaleDateString()}
//               </span>
//             </div>
//           </div>

//           <button onClick={handleLogout} className="logout-btn">
//             Logout
//           </button>

//           {message.text && (
//             <div className={`message ${message.type}`}>
//               {message.text}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }

//   // Authentication forms
//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         {/* Toggle Tabs */}
//         <div className="auth-tabs">
//           <button 
//             className={`tab-btn ${isLogin ? 'active' : ''}`}
//             onClick={() => {
//               setIsLogin(true);
//               setMessage({ text: '', type: '' });
//             }}
//           >
//             Login
//           </button>
//           <button 
//             className={`tab-btn ${!isLogin ? 'active' : ''}`}
//             onClick={() => {
//               setIsLogin(false);
//               setMessage({ text: '', type: '' });
//             }}
//           >
//             Register
//           </button>
//         </div>

//         {/* Login Form */}
//         {isLogin ? (
//           <div className="form-wrapper">
//             <div className="auth-header">
//               <h1>Welcome Back</h1>
//               <p>Sign in to continue to your account</p>
//             </div>
            
//             <form onSubmit={handleLogin} className="auth-form">
//               <div className="form-group">
//                 <label>Email Address</label>
//                 <input 
//                   type="email" 
//                   className="form-input" 
//                   placeholder="Enter your email"
//                   value={loginData.email}
//                   onChange={(e) => setLoginData({...loginData, email: e.target.value})}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Password</label>
//                 <input 
//                   type="password" 
//                   className="form-input" 
//                   placeholder="Enter your password"
//                   value={loginData.password}
//                   onChange={(e) => setLoginData({...loginData, password: e.target.value})}
//                   required
//                 />
//               </div>

//               <div className="form-options">
//                 <label className="checkbox-label">
//                   <input type="checkbox" />
//                   <span>Remember me</span>
//                 </label>
//                 <a href="#" className="forgot-link">Forgot password?</a>
//               </div>

//               <button type="submit" className="auth-btn">
//                 Sign In
//               </button>
//             </form>
//           </div>
//         ) : (
//           // Register Form
//           <div className="form-wrapper">
//             <div className="auth-header">
//               <h1>Create Account</h1>
//               <p>Join us to find your perfect property</p>
//             </div>
            
//             <form onSubmit={handleRegister} className="auth-form">
//               <div className="form-group">
//                 <label>Full Name</label>
//                 <input 
//                   type="text" 
//                   className="form-input" 
//                   placeholder="Enter your full name"
//                   value={registerData.name}
//                   onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Email Address</label>
//                 <input 
//                   type="email" 
//                   className="form-input" 
//                   placeholder="Enter your email"
//                   value={registerData.email}
//                   onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Password</label>
//                 <input 
//                   type="password" 
//                   className="form-input" 
//                   placeholder="Create a password"
//                   value={registerData.password}
//                   onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Phone Number</label>
//                 <input 
//                   type="tel" 
//                   className="form-input" 
//                   placeholder="Enter your phone number"
//                   value={registerData.phone}
//                   onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>I am a</label>
//                 <select 
//                   className="form-input" 
//                   value={registerData.userType}
//                   onChange={(e) => setRegisterData({...registerData, userType: e.target.value})}
//                   required
//                 >
//                   <option value="">Select user type</option>
//                   <option value="buyer">Buyer</option>
//                   <option value="seller">Seller</option>
//                   <option value="agent">Agent</option>
//                 </select>
//               </div>

//               <div className="form-options">
//                 <label className="checkbox-label">
//                   <input type="checkbox" required />
//                   <span>I agree to the Terms & Conditions</span>
//                 </label>
//               </div>

//               <button type="submit" className="auth-btn">
//                 Create Account
//               </button>
//             </form>

//           </div>
//         )}

//         {/* Message Display */}
//         {message.text && (
//           <div className={`message ${message.type}`}>
//             {message.text}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Auth;
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

// Helper function to get current user from localStorage
export const getCurrentUser = () => {
  const storedUser = localStorage.getItem('currentUser');
  return storedUser ? JSON.parse(storedUser) : null;
};

// Helper function to get current user ID
export const getCurrentUserId = () => {
  const user = getCurrentUser();
  return user ? user.userId : null;
};

// Helper function to check if user is logged in
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

// Helper function to validate token
export const validateToken = async () => {
  const token = getToken();
  if (!token) return false;
  try {
    const response = await fetch('https://localhost:7117/api/Users/validate-token', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) return true;
    clearAuthData();
    return false;
  } catch (error) {
    console.error('Token validation error:', error);
    clearAuthData();
    return false;
  }
};

// Helper function to clear all auth data
export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('loginTime');
  window.dispatchEvent(new Event('userLoggedOut'));
};

// Helper function to check token expiration based on time
export const isTokenExpired = () => {
  const loginTime = localStorage.getItem('loginTime');
  if (!loginTime) return true;
  const loginDate = new Date(loginTime);
  const now = new Date();
  const hoursSinceLogin = (now - loginDate) / (1000 * 60 * 60);
  return hoursSinceLogin > 24;
};

// ── Inline spinner ────────────────────────────────────────────────────────────
const Spinner = () => (
  <span style={{
    display:       'inline-block',
    width:         '16px',
    height:        '16px',
    border:        '2.5px solid rgba(255,255,255,0.35)',
    borderTopColor:'#fff',
    borderRadius:  '50%',
    animation:     'auth-spin 0.7s linear infinite',
    verticalAlign: 'middle',
    marginRight:   '8px',
  }} />
);

// ── Component ─────────────────────────────────────────────────────────────────
const Auth = () => {

  const [isLogin, setIsLogin]       = useState(true);
  const [message, setMessage]       = useState({ text: '', type: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser]   = useState(null);
  const [isValidating, setIsValidating] = useState(true);

  // ── Loading states ──
  const [isLoginLoading, setIsLoginLoading]       = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading]     = useState(false);

  // Google Sign-In role modal
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [pendingGoogleCredential, setPendingGoogleCredential] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '', email: '', password: '', phone: '', userType: ''
  });

  const API_URL   = 'https://localhost:7117/api/Users';
  const LOGIN_URL = 'https://localhost:7117/api/Users/login';
  const GOOGLE_LOGIN_URL = 'https://localhost:7117/api/Users/google-login';

  // Validate existing session
  useEffect(() => {
    const checkAuth = async () => {
      setIsValidating(true);
      const token      = localStorage.getItem('token');
      const storedUser = localStorage.getItem('currentUser');

      if (token && storedUser) {
        if (isTokenExpired()) {
          clearAuthData();
          setIsLoggedIn(false);
          setCurrentUser(null);
          setMessage({ text: '⚠ Your session has expired. Please login again.', type: 'error' });
        } else {
          setCurrentUser(JSON.parse(storedUser));
          setIsLoggedIn(true);
        }
      }
      setIsValidating(false);
    };
    checkAuth();
  }, []);

  // ── Handle login ────────────────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    setIsLoginLoading(true);

    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'accept': '*/*' },
        body: JSON.stringify({ email: loginData.email, password: loginData.password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token',       data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        localStorage.setItem('isLoggedIn',  'true');
        localStorage.setItem('loginTime',   new Date().toISOString());

        setCurrentUser(data.user);
        setIsLoggedIn(true);
        setMessage({ text: `✓ Welcome back, ${data.user.name}!`, type: 'success' });
        setLoginData({ email: '', password: '' });
        window.dispatchEvent(new Event('userLoggedIn'));

        setTimeout(() => {
          const role = data.user.userType?.toLowerCase();
          if (role === 'admin')       navigate('/admin/dashboard');
          else if (role === 'seller') navigate('/seller/dashboard');
          else                        navigate('/');
        }, 1000);

      } else {
        const errorData = await response.json();
        setMessage({ text: `✗ ${errorData.message || 'Invalid email or password'}`, type: 'error' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage({ text: `✗ Error: ${error.message}`, type: 'error' });
    } finally {
      setIsLoginLoading(false);
    }
  };

  // ── Handle register ─────────────────────────────────────────────────────────
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    setIsRegisterLoading(true);

    const userData = {
      userId:    0,
      name:      registerData.name,
      email:     registerData.email,
      password:  registerData.password,
      phone:     registerData.phone || null,
      userType:  registerData.userType || 'buyer',
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'accept': '*/*' },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        localStorage.setItem('lastRegistration', JSON.stringify({
          email: userData.email, timestamp: new Date().toISOString()
        }));
        setMessage({ text: '✓ Registration successful! Please login.', type: 'success' });
        setTimeout(() => {
          setRegisterData({ name: '', email: '', password: '', phone: '', userType: '' });
          setIsLogin(true);
          setMessage({ text: '', type: '' });
        }, 2000);
      } else {
        const errorData = await response.json();
        setMessage({ text: `✗ ${errorData.message || 'Registration failed. Please check your input.'}`, type: 'error' });
      }
    } catch (error) {
      console.error('Network error:', error);
      setMessage({ text: `✗ Error: ${error.message}`, type: 'error' });
    } finally {
      setIsRegisterLoading(false);
    }
  };

  // ── Handle Google Login ─────────────────────────────────────────────────────
  // Step 1: On Google login, show role modal
  const handleGoogleSuccess = (credentialResponse) => {
    setPendingGoogleCredential(credentialResponse.credential);
    setShowRoleModal(true);
  };

  // Step 2: After role selection, create user
  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole || !pendingGoogleCredential) return;
    setShowRoleModal(false);
    setIsGoogleLoading(true);
    setMessage({ text: '', type: '' });
    try {
      const response = await fetch(GOOGLE_LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'accept': '*/*' },
        body: JSON.stringify({ 
          credential: pendingGoogleCredential,
          role: selectedRole
        })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token',       data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        localStorage.setItem('isLoggedIn',  'true');
        localStorage.setItem('loginTime',   new Date().toISOString());

        setCurrentUser(data.user);
        setIsLoggedIn(true);
        setMessage({ text: `✓ Welcome, ${data.user.name}!`, type: 'success' });
        window.dispatchEvent(new Event('userLoggedIn'));

        setTimeout(() => {
          const role = data.user.userType?.toLowerCase();
          if (role === 'admin')       navigate('/admin/dashboard');
          else if (role === 'seller') navigate('/seller/dashboard');
          else                        navigate('/');
        }, 1000);

      } else {
        const errorData = await response.json();
        setMessage({ text: `✗ ${errorData.message || 'Google Login failed'}`, type: 'error' });
      }
    } catch (error) {
      console.error('Google Login error:', error);
      setMessage({ text: `✗ Error: ${error.message}`, type: 'error' });
    } finally {
      setIsGoogleLoading(false);
      setPendingGoogleCredential(null);
      setSelectedRole('');
    }
  };

  // ── Handle logout ───────────────────────────────────────────────────────────
  const handleLogout = () => {
    clearAuthData();
    setCurrentUser(null);
    setIsLoggedIn(false);
    setMessage({ text: '✓ Logged out successfully', type: 'success' });
    setTimeout(() => { setMessage({ text: '', type: '' }); navigate('/'); }, 1500);
  };

  // ── Validating session screen ───────────────────────────────────────────────
  if (isValidating) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Validating session...</p>
          </div>
        </div>
      </div>
    );
  }

  // ── Logged-in dashboard ─────────────────────────────────────────────────────
  if (isLoggedIn && currentUser) {
    return (
      <div className="auth-container">
        <div className="auth-card dashboard-card">
          <div className="dashboard-header">
            <h1>Welcome, {currentUser.name || 'User'}!</h1>
            <p>You are successfully logged in</p>
          </div>
          <div className="user-info">
            <div className="info-row"><span className="info-label">Email:</span><span className="info-value">{currentUser.email}</span></div>
            <div className="info-row"><span className="info-label">Phone:</span><span className="info-value">{currentUser.phone || 'Not provided'}</span></div>
            <div className="info-row"><span className="info-label">User Type:</span><span className="info-value user-type-badge">{currentUser.userType || 'N/A'}</span></div>
            <div className="info-row"><span className="info-label">Member Since:</span><span className="info-value">{new Date(currentUser.createdAt).toLocaleDateString()}</span></div>
          </div>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
          {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
        </div>
      </div>
    );
  }

  // ── Auth forms ──────────────────────────────────────────────────────────────
  return (
    <>
      {/* Inject spinner keyframe once */}
      <style>{`@keyframes auth-spin { to { transform: rotate(360deg); } }`}</style>

      <div className="auth-container">
        <div className="auth-card">

          {/* Tabs */}
          <div className="auth-tabs">
            <button className={`tab-btn ${isLogin ? 'active' : ''}`}
              onClick={() => { setIsLogin(true); setMessage({ text: '', type: '' }); }}>
              Login
            </button>
            <button className={`tab-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => { setIsLogin(false); setMessage({ text: '', type: '' }); }}>
              Register
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '10px' }}>
            {isGoogleLoading ? (
              <div style={{ display: 'flex', alignItems: 'center', padding: '10px', color: '#555' }}>
                <Spinner /> Processing Google Sign-In...
              </div>
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  console.log('Google Login Failed');
                  setMessage({ text: `✗ Google Login failed`, type: 'error' });
                }}
                useOneTap
              />
            )}
            {/* Role selection modal for Google Sign-In */}
            <Modal
              isOpen={showRoleModal}
              onRequestClose={() => setShowRoleModal(false)}
              contentLabel="Select Role"
              ariaHideApp={false}
              style={{
                overlay: { zIndex: 1000, background: 'rgba(0,0,0,0.4)' },
                content: { maxWidth: 350, margin: 'auto', borderRadius: 12, padding: 24 }
              }}
            >
              <h2 style={{ textAlign: 'center', marginBottom: 18 }}>Select Your Role</h2>
              <form onSubmit={handleRoleSubmit}>
                <div style={{ marginBottom: 18 }}>
                  <select
                    value={selectedRole}
                    onChange={e => setSelectedRole(e.target.value)}
                    required
                    style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
                  >
                    <option value="">Choose role...</option>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button
                  type="submit"
                  style={{ width: '100%', padding: 10, borderRadius: 6, background: '#1976d2', color: '#fff', border: 'none', fontWeight: 600 }}
                  disabled={!selectedRole}
                >
                  Continue
                </button>
              </form>
            </Modal>
          </div>
          <div style={{ textAlign: 'center', margin: '15px 0', color: '#888', fontSize: '14px' }}>
            or continue with
          </div>

          {/* ── Login Form ── */}
          {isLogin ? (
            <div className="form-wrapper">
              <div className="auth-header">
                <h1>Welcome Back</h1>
                <p>Sign in to continue to your account</p>
              </div>

              <form onSubmit={handleLogin} className="auth-form">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="form-input" placeholder="Enter your email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required disabled={isLoginLoading} />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-input" placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required disabled={isLoginLoading} />
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" /><span>Remember me</span>
                  </label>
                  <a href="#" className="forgot-link">Forgot password?</a>
                </div>

                <button type="submit" className="auth-btn" disabled={isLoginLoading}
                  style={{ opacity: isLoginLoading ? 0.85 : 1, cursor: isLoginLoading ? 'not-allowed' : 'pointer' }}>
                  {isLoginLoading ? <><Spinner />Signing In...</> : 'Sign In'}
                </button>
              </form>
            </div>

          ) : (
            /* ── Register Form ── */
            <div className="form-wrapper">
              <div className="auth-header">
                <h1>Create Account</h1>
                <p>Join us to find your perfect property</p>
              </div>

              <form onSubmit={handleRegister} className="auth-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" className="form-input" placeholder="Enter your full name"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    required disabled={isRegisterLoading} />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="form-input" placeholder="Enter your email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required disabled={isRegisterLoading} />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-input" placeholder="Create a password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required disabled={isRegisterLoading} />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" className="form-input" placeholder="Enter your phone number"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                    required disabled={isRegisterLoading} />
                </div>

                <div className="form-group">
                  <label>I am a</label>
                  <select className="form-input" value={registerData.userType}
                    onChange={(e) => setRegisterData({ ...registerData, userType: e.target.value })}
                    required disabled={isRegisterLoading}>
                    <option value="">Select user type</option>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                    <option value="agent">Agent</option>
                  </select>
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" required disabled={isRegisterLoading} />
                    <span>I agree to the Terms & Conditions</span>
                  </label>
                </div>

                <button type="submit" className="auth-btn" disabled={isRegisterLoading}
                  style={{ opacity: isRegisterLoading ? 0.85 : 1, cursor: isRegisterLoading ? 'not-allowed' : 'pointer' }}>
                  {isRegisterLoading ? <><Spinner />Creating Account...</> : 'Create Account'}
                </button>
              </form>
            </div>
          )}

          {/* Message */}
          {message.text && (
            <div className={`message ${message.type}`}>{message.text}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Auth;