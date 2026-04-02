import React from "react";
import "./Hero.css";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  const navigate = useNavigate();
  const mainCards = [
    { title: "Buy", img: "/Logo/buy.png", description: "Find your dream property", buttonText: "Find Home", path: "/explore_property" },
    { title: "Sell", img: "/Logo/shell.png", description: "Sell or rent your property quickly", buttonText: "sell/rent Property", path: "/sell_rent" },
    { title: "Rent", img: "/Logo/rent.png", description: "Find rentals easily", buttonText: "Find a Rental", path: "/explore_property" },
  ];
  const propertyTypeCards = [
    { title: "House", img: "/Logo/house.png" },
    { title: "Apartment", img: "/Logo/apartment.png" },
    { title: "PG", img: "/Logo/house.png" },
    { title: "Land", img: "/Logo/land.png" },
    { title: "Commercial", img: "/Logo/office.png" },
    { title: "Office", img: "/Logo/office.png" },
    { title: "Shop", img: "/Logo/shop (1).png" },
  ];
  return (
    <>
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-overlay"></div>
        
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >

          <p className="tag">THE BEST WAY TO</p>
          <h1>Find Your Dream properties</h1>
          <p className="subtitle">
            We've more than 745,000 properties, plots & rentals.
          </p>



          <div className="explore-button-wrapper">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="explore-btn"
            >
              Explore
            </motion.button>
          </div>
          <div className="hero-features"> <div className="feature-card">  <p>Properties across cities and neighborhoods.</p> </div> <div className="feature-card"> <h3>Trusted Agents</h3> <p>Verified agents to help you find your dream home.</p> </div> <div className="feature-card"> <h3>Fast & Easy</h3> <p>Quick and seamless property browsing experience.</p> </div> </div>

        </motion.div>
      </header>


      <section className="main-three-cards">
        {mainCards.map((card, index) => (
          <motion.div 
            className="main-card" 
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            whileHover={{ y: -10 }}
          >
            <motion.img 
              src={card.img} 
              alt={card.title}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <Link to={card.path}>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                {card.buttonText}
              </motion.button>
            </Link>          
          </motion.div>
        ))}
      </section>





      <section className="property-types-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Property Types
        </motion.h2>

        <motion.div 
          className="property-types-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {propertyTypeCards.map((item, index) => (
            <motion.div
              className="property-type-card"
              key={index}
              onClick={() => navigate(`/explore_property?type=${item.title}`)}
              style={{ cursor: "pointer" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </section>





    </>
  );
}
