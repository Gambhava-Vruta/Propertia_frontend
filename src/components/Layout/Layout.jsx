import React from 'react';
import Navbar from '../Navbar/Navbar';
import Propertiachatbot from '../Propertiachatbot/Propertiachatbot';
import GlobalLoadingBar from '../GlobalLoadingBar/GlobalLoadingBar';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <div className="layout-wrapper">
      <GlobalLoadingBar />
      <Navbar />
      
      <main className="layout-main">
        {children}
      </main>

      <Propertiachatbot />
    </div>
  );
}
