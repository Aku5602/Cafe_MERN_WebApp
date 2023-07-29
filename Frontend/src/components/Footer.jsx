import React from "react";
import "./Footer.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li>About Us</li>
            <li>Our Story</li>
            <li>Blog</li>
            <li>Careers</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <FaPhoneAlt /> +919594626402
            </li>
            <li>
              <FaPhoneAlt /> +917219429480
            </li>
            <li>
              <IoLogoWhatsapp /> +919594626402
            </li>
            <li>
              <FaEnvelope /> info@foodorderin.com
            </li>
            <li>
              <FaEnvelope /> support@foodordering.com
            </li>
            <li>
              <FaMapMarkerAlt /> nigdi,pune
            </li>
          </ul>
        </div>
      
        {/* <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-media-icons">
            <a href="#"><AiFillFacebook /></a>
            <a href="#"><AiFillTwitterCircle /></a>
            <a href="#"><AiFillInstagram /></a>
          </div>
          <div className="store-icons">
            <a href="#"><img src="https://i.ibb.co/zX9nJGr/google-play.png" alt="Google Play Store" /></a>
          </div>
        </div> */}
      </div>
      <div className="footer-section">
        <h3>About Us</h3>
        <p>
         Welcome to our food ordering app, the ultimate solution for ordering your favorite meals from a diverse menu. Our mission is to provide a seamless, fast, and convenient food ordering experience for everyone, so you can indulge in your desired dishes with ease.
        </p>
      </div>
      <div className="footer-section">
          <p style={{textAlign:"center"}}>
            Copyright 2023-24  by Food Orderding System. All Rights Reserve.
          </p>
        </div>
    </footer>
  );
};

export default Footer;
