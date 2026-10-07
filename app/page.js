"use client";

import { useState, useRef } from "react";
import site from "../config/site.json";
import LeadForm from "./LeadForm";

export default function Home() {
  const [selectedService, setSelectedService] = useState("");
  const [videoOpen, setVideoOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [highlightForm, setHighlightForm] = useState(false);

  // Quick hero bar state
  const [quickName, setQuickName] = useState("");
  const [quickPhone, setQuickPhone] = useState("");
  const [quickDate, setQuickDate] = useState("");
  const [quickTime, setQuickTime] = useState("");

  const appointmentRef = useRef(null);

  const scrollToAppointment = (serviceName = "") => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    const el = document.getElementById("appointment");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setHighlightForm(true);
      setTimeout(() => {
        const inputEl = document.getElementById("patient-name");
        if (inputEl) inputEl.focus();
      }, 600);
      setTimeout(() => {
        setHighlightForm(false);
      }, 2500);
    }
  };

  const handleQuickBarSubmit = (e) => {
    e.preventDefault();
    scrollToAppointment();
    setTimeout(() => {
      const nameInput = document.getElementById("patient-name");
      const phoneInput = document.getElementById("patient-phone");
      const dateInput = document.getElementById("patient-date");
      if (nameInput && quickName) nameInput.value = quickName;
      if (phoneInput && quickPhone) phoneInput.value = quickPhone;
      if (dateInput && quickDate) dateInput.value = quickDate;
    }, 400);
  };

  const waUrl = (text = "Namaste! I would like to book an appointment.") =>
    `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

  return (
    <div className="page-wrapper">
      {/* ================= TOP ANNOUNCEMENT BAR ================= */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <span>📍 {site.address}</span>
            <span className="divider">•</span>
            <span>🕒 {site.hours}</span>
          </div>
          <div className="top-bar-right">
            <span>📞 Call for Booking: </span>
            <a href={`tel:+91${site.phone}`}>+91 {site.phone}</a>
          </div>
        </div>
      </div>

      {/* ================= NAVIGATION HEADER ================= */}
      <header className="main-header">
        <div className="container header-inner">
          <a href="#top" className="site-logo">
            <span className="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.5 2 6 4.5 6 7.5c0 2 .8 4.2 1.8 6.5 1 2.3 2.2 4.6 2.2 6.5 0 .8.6 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-1.9 1.2-4.2 2.2-6.5C16.2 11.7 17 9.5 17 7.5 17 4.5 14.5 2 12 2zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
              </svg>
            </span>
            <div className="logo-text">
              <span className="brand-title">{site.clinicName}</span>
              <span className="brand-subtitle">DENTAL & HEALTH CARE</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            <a href="#top" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About Us</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#why-us" className="nav-link">Why Choose Us</a>
            <a href="#reviews" className="nav-link">Reviews</a>
            {/* Contact Us button triggers smooth scroll to appointment section */}
            <button
              type="button"
              className="nav-link contact-nav-btn"
              onClick={() => scrollToAppointment()}
            >
              Contact Us
            </button>
          </nav>

          <div className="header-actions">
            <a href={`tel:+91${site.phone}`} className="btn btn-ghost header-call-btn">
              <span>📞</span> +91 {site.phone}
            </a>
            {/* Main CTA: Contact Us / Appointment button */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => scrollToAppointment()}
              id="header-appointment-btn"
            >
              Book an Appointment
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="mobile-menu-toggle"
              aria-label="Toggle Navigation Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="mobile-nav-menu">
            <a href="#top" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About Us</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#why-us" onClick={() => setMobileMenuOpen(false)}>Why Choose Us</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
            <button
              type="button"
              className="mobile-contact-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToAppointment();
              }}
            >
              📅 Contact Us / Book Appointment
            </button>
          </div>
        )}
      </header>

      <main id="top">
        {/* ================= HERO SECTION ================= */}
        <section className="hero-section">
          <div className="container hero-grid">
            {/* Left Content */}
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-icon">👨‍⚕️</span>
                <span>{site.tagline || "Top-Notch Dental Care, Just for You"}</span>
              </div>

              <h1 className="hero-heading">
                Your <span className="highlight-text">Best Dental Experience</span> Awaits
              </h1>

              <p className="hero-subtext">
                {site.heroSub ||
                  "Personalized, painless dental solutions delivered by certified specialists. Experience world-class oral healthcare crafted for you and your family."}
              </p>

              <div className="hero-cta-group">
                <a href="#services" className="btn btn-primary btn-lg">
                  Explore Our Services
                </a>
                <button
                  type="button"
                  className="btn btn-video-play"
                  onClick={() => setVideoOpen(true)}
                >
                  <span className="play-triangle">▶</span>
                  <span>Watch Video</span>
                </button>
              </div>

              {/* Trust stats badge */}
              <div className="hero-trust-bar">
                <div className="trust-item">
                  <div className="trust-rating">
                    <span className="stars">★★★★★</span>
                    <b>{site.rating}</b>
                  </div>
                  <small>Google Rating</small>
                </div>
                <div className="trust-divider"></div>
                <div className="trust-item">
                  <b>{site.reviews}+</b>
                  <small>Verified Reviews</small>
                </div>
                <div className="trust-divider"></div>
                <div className="trust-item">
                  <b>{site.experience} Years</b>
                  <small>Clinical Experience</small>
                </div>
              </div>
            </div>

            {/* Right Doctor Visual */}
            <div className="hero-visual">
              <div className="doctor-visual-backdrop"></div>
              {/* Decorative Stars */}
              <div className="deco-star star-1">✦</div>
              <div className="deco-star star-2">✦</div>
              <div className="deco-star star-3">✦</div>

              <div className="doctor-image-wrapper">
                <img
                  src="/images/hero-dentist.jpg"
                  alt="Certified Dentist Doctor"
                  className="doctor-image"
                />
              </div>

              {/* Floating verified badge */}
              <div className="floating-doctor-tag">
                <span className="verified-check">✔</span>
                <div>
                  <strong>{site.doctorName}</strong>
                  <span>{site.doctorDegree}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= FLOATING QUICK BOOKING BAR ================= */}
          <div className="container quick-booking-container">
            <form className="quick-booking-bar" onSubmit={handleQuickBarSubmit}>
              <div className="quick-field">
                <label>Name</label>
                <div className="quick-input-wrap">
                  <span className="q-icon">👤</span>
                  <input
                    placeholder="John Doe"
                    value={quickName}
                    onChange={(e) => setQuickName(e.target.value)}
                  />
                </div>
              </div>

              <div className="quick-field">
                <label>Phone Number</label>
                <div className="quick-input-wrap">
                  <span className="q-icon">📞</span>
                  <input
                    placeholder="Your Phone (10-digit)"
                    type="tel"
                    value={quickPhone}
                    onChange={(e) => setQuickPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="quick-field">
                <label>Preferred Date</label>
                <div className="quick-input-wrap">
                  <span className="q-icon">📅</span>
                  <input
                    type="date"
                    value={quickDate}
                    onChange={(e) => setQuickDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="quick-field">
                <label>Preferred Time</label>
                <div className="quick-input-wrap">
                  <span className="q-icon">⏰</span>
                  <select
                    value={quickTime}
                    onChange={(e) => setQuickTime(e.target.value)}
                  >
                    <option value="">Select Time</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="05:30 PM">05:30 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary quick-submit-btn">
                Book an Appointment
              </button>
            </form>
          </div>
        </section>

        {/* ================= ABOUT US SECTION ================= */}
        <section id="about" className="section-padding about-section">
          <div className="container about-grid">
            {/* Left Collage & Rotating Contact Badge */}
            <div className="about-visual-col">
              <div className="about-collage-card">
                <img
                  src="/images/about-clinic.jpg"
                  alt="Modern Dental Consultation"
                  className="about-image-primary"
                />
                {/* Floating Rotating Contact Stamp Badge */}
                <button
                  type="button"
                  className="contact-rotating-stamp"
                  onClick={() => scrollToAppointment()}
                  title="Click to Contact Us & Book Appointment"
                >
                  <svg viewBox="0 0 100 100" className="stamp-svg">
                    <path
                      id="circlePath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text fontSize="9.5" fontWeight="bold" fill="white" letterSpacing="2">
                      <textPath href="#circlePath" startOffset="0%">
                        • CONTACT US • BOOK NOW • CLINIC CARE •
                      </textPath>
                    </text>
                  </svg>
                  <span className="stamp-center-icon">💬</span>
                </button>
              </div>
            </div>

            {/* Right Information */}
            <div className="about-content-col">
              <div className="section-badge">ABOUT US</div>
              <h2 className="section-title">
                15 Years of Expertise in Dental Care
              </h2>
              <p className="section-lead">
                {site.doctorBio ||
                  "With over 15 years of clinical excellence, our team combines gentle, patient-focused care with state-of-the-art dental technology to give you a pain-free experience."}
              </p>

              <div className="about-checklist">
                <div className="check-item">
                  <span className="check-icon">✓</span>
                  <div>
                    <strong>Premium Dental Services You Can Trust</strong>
                    <p>Rigorous clinical hygiene protocols and biocompatible dental materials.</p>
                  </div>
                </div>

                <div className="check-item">
                  <span className="check-icon">✓</span>
                  <div>
                    <strong>Award-Winning Experts in Dental Care</strong>
                    <p>Specialized treatments led by certified Endodontists and Implantologists.</p>
                  </div>
                </div>

                <div className="check-item">
                  <span className="check-icon">✓</span>
                  <div>
                    <strong>Dedicated Experts Behind Every Smile</strong>
                    <p>Transparent pricing, no hidden costs, and comprehensive post-procedure care.</p>
                  </div>
                </div>
              </div>

              <div className="about-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => scrollToAppointment()}
                >
                  Book Consultation Now
                </button>
                <a href={waUrl("Namaste, I want to inquire about clinic timings and doctor availability.")} className="btn btn-outline">
                  Inquire on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ================= BLUE TICKER RIBBON 1 ================= */}
        <div className="blue-ticker-wrapper">
          <div className="ticker-track">
            <span>General Dentistry 🦷</span>
            <span>Teeth Whitening 🦷</span>
            <span>Dental Implant 🦷</span>
            <span>Dental Sealant 🦷</span>
            <span>Root Canal (RCT) 🦷</span>
            <span>Braces & Aligners 🦷</span>
            <span>Cosmetic Dentistry 🦷</span>
            <span>Emergency Care 🦷</span>
            <span>General Dentistry 🦷</span>
            <span>Teeth Whitening 🦷</span>
            <span>Dental Implant 🦷</span>
            <span>Dental Sealant 🦷</span>
            <span>Root Canal (RCT) 🦷</span>
            <span>Braces & Aligners 🦷</span>
          </div>
        </div>

        {/* ================= OUR SERVICES SECTION ================= */}
        <section id="services" className="section-padding services-section">
          <div className="container">
            <div className="section-header-row">
              <div>
                <div className="section-badge">OUR SERVICES</div>
                <h2 className="section-title">
                  A Wide Range of Services for Your Best Smile
                </h2>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => scrollToAppointment()}
              >
                Explore All Services
              </button>
            </div>

            <div className="services-grid">
              {site.services && site.services.map((service, idx) => (
                <div className="service-card" key={service.title || idx}>
                  <div className="service-img-wrap">
                    <img
                      src={service.image || "/images/service-general.jpg"}
                      alt={service.title}
                      className="service-card-img"
                    />
                    <div className="service-floating-icon">
                      {idx % 3 === 0 ? "🦷" : idx % 3 === 1 ? "🛡️" : "✨"}
                    </div>
                  </div>
                  <div className="service-card-body">
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-desc">{service.desc}</p>
                    <button
                      type="button"
                      className="service-link-btn"
                      onClick={() => scrollToAppointment(service.title)}
                    >
                      <span>Book Treatment</span>
                      <span className="arrow">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= BLUE TICKER RIBBON 2 ================= */}
        <div className="blue-ticker-wrapper secondary-ticker">
          <div className="ticker-track reverse">
            <span>Advanced 3D Dental Scanning 🦷</span>
            <span>Painless Injections 🦷</span>
            <span>Zero-Wait Appointments 🦷</span>
            <span>100% Sterilized Equipment 🦷</span>
            <span>Experienced Dental Surgeons 🦷</span>
            <span>Emergency Toothache Support 🦷</span>
            <span>Advanced 3D Dental Scanning 🦷</span>
            <span>Painless Injections 🦷</span>
          </div>
        </div>

        {/* ================= WHY CHOOSE US SECTION ================= */}
        <section id="why-us" className="section-padding why-section">
          <div className="container why-grid">
            {/* Left Circular Frame */}
            <div className="why-visual-col">
              <div className="why-circular-wrapper">
                <div className="circular-ring"></div>
                <img
                  src="/images/why-us.jpg"
                  alt="Doctor with patient"
                  className="why-circular-img"
                />
                <button
                  type="button"
                  className="why-play-btn"
                  onClick={() => setVideoOpen(true)}
                  aria-label="Play clinic overview"
                >
                  ▶
                </button>
                <div className="why-deco-sparkle sparkle-top">✦</div>
                <div className="why-deco-sparkle sparkle-bottom">✦</div>
              </div>
            </div>

            {/* Right Content */}
            <div className="why-content-col">
              <div className="section-badge">WHY CHOOSE US</div>
              <h2 className="section-title">
                Benefits of Our Dental Services: Your Path to a Healthier Smile
              </h2>
              <p className="section-lead">
                We believe in preventive, pain-free dental health. Utilizing high-resolution digital imaging and gentle clinical procedures, we ensure maximum comfort for adults and children alike.
              </p>

              {/* Stats Row */}
              <div className="why-stats-row">
                <div className="stat-box">
                  <div className="stat-number">10+</div>
                  <div className="stat-label">Skilled Doctors</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">99%</div>
                  <div className="stat-label">Patient Satisfaction</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">20K+</div>
                  <div className="stat-label">Appointments Booked</div>
                </div>
              </div>

              {/* Checklist */}
              <div className="why-checklist">
                <div className="why-check-item">
                  <span className="dot-check">✔</span>
                  <span>Easy Online Appointment Booking with instant confirmation</span>
                </div>
                <div className="why-check-item">
                  <span className="dot-check">✔</span>
                  <span>Experienced and caring dental specialists in Haridwar</span>
                </div>
                <div className="why-check-item">
                  <span className="dot-check">✔</span>
                  <span>Advanced dental equipment and sanitized operatory rooms</span>
                </div>
              </div>

              <div className="why-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => scrollToAppointment()}
                >
                  Book an Appointment
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TESTIMONIALS SECTION ================= */}
        <section id="reviews" className="section-padding reviews-section">
          <div className="container">
            <div className="text-center-wrapper">
              <div className="section-badge">TESTIMONIALS</div>
              <h2 className="section-title">What Our Patients Say</h2>
              <p className="section-subtitle">Real experiences from patients who regained their natural, confident smile.</p>
            </div>

            <div className="testimonials-grid">
              {site.testimonials && site.testimonials.map((item, idx) => (
                <div className="testimonial-card" key={item.name || idx}>
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">"{item.text}"</p>
                  <div className="review-author">
                    <div className="author-avatar">{item.name[0]}</div>
                    <div>
                      <strong className="author-name">{item.name}</strong>
                      <span className="author-treatment">{item.treatment || "Verified Patient"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= APPOINTMENT & CONTACT US SECTION ================= */}
        {/* TARGET OF ALL CONTACT US BUTTONS */}
        <section
          id="appointment"
          ref={appointmentRef}
          className={`section-padding appointment-contact-section ${highlightForm ? "form-highlight-active" : ""}`}
        >
          <div className="container">
            <div className="text-center-wrapper">
              <div className="section-badge highlight-badge">📍 GET IN TOUCH</div>
              <h2 className="section-title">
                Book Your Appointment & Contact Us
              </h2>
              <p className="section-subtitle">
                Fill the quick form below or reach us directly via call or WhatsApp. We guarantee quick confirmation!
              </p>
            </div>

            <div className="appointment-contact-grid">
              {/* Left Column: Direct Contact & Info */}
              <div className="contact-info-card">
                <div className="clinic-brand-badge">
                  <span className="tooth-icon">🦷</span>
                  <div>
                    <h3>{site.clinicName}</h3>
                    <p className="sub">{site.tagline}</p>
                  </div>
                </div>

                <div className="contact-methods-list">
                  <div className="contact-method-item">
                    <div className="method-icon phone-icon">📞</div>
                    <div>
                      <span className="method-title">Direct Calling Hotline</span>
                      <a href={`tel:+91${site.phone}`} className="method-link">
                        +91 {site.phone}
                      </a>
                      <p className="method-hint">Instant consultation & emergency assistance</p>
                    </div>
                  </div>

                  <div className="contact-method-item">
                    <div className="method-icon wa-icon">💬</div>
                    <div>
                      <span className="method-title">Official WhatsApp</span>
                      <a
                        href={waUrl("Namaste Doctor, mujhe appointment chahiye.")}
                        target="_blank"
                        rel="noreferrer"
                        className="method-link wa-link"
                      >
                        Chat on WhatsApp
                      </a>
                      <p className="method-hint">Send reports, photos, or ask queries</p>
                    </div>
                  </div>

                  <div className="contact-method-item">
                    <div className="method-icon loc-icon">📍</div>
                    <div>
                      <span className="method-title">Clinic Address</span>
                      <p className="address-text">{site.address}</p>
                      <a
                        href={site.mapUrl || "https://maps.google.com"}
                        target="_blank"
                        rel="noreferrer"
                        className="map-btn"
                      >
                        <span>Open in Google Maps</span> ↗
                      </a>
                    </div>
                  </div>

                  <div className="contact-method-item">
                    <div className="method-icon time-icon">🕒</div>
                    <div>
                      <span className="method-title">Consultation Timings</span>
                      <p className="timing-text">{site.hours}</p>
                    </div>
                  </div>
                </div>

                {/* Emergency Notice Card */}
                <div className="emergency-notice-box">
                  <span className="emer-icon">🚨</span>
                  <div>
                    <strong>Severe Toothache or Dental Emergency?</strong>
                    <p>Walk-ins and same-day priority appointments are available. Call immediately!</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Appointment Form */}
              <div className="appointment-form-column">
                <LeadForm initialConcern={selectedService} />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-col brand-col">
            <div className="site-logo footer-logo">
              <span className="logo-icon">🦷</span>
              <span className="brand-title">{site.clinicName}</span>
            </div>
            <p className="footer-desc">
              State-of-the-art dental clinic delivering painless, compassionate oral healthcare. Serving patients across {site.city} with smile transformations and restorative excellence.
            </p>
            <div className="footer-emergency">
              <span>Emergency Helpline:</span>
              <a href={`tel:+91${site.phone}`}>+91 {site.phone}</a>
            </div>
          </div>

          <div className="footer-col links-col">
            <h4 className="footer-title">Quick Navigation</h4>
            <ul className="footer-links">
              <li><a href="#top">Home</a></li>
              <li><a href="#about">About Our Clinic</a></li>
              <li><a href="#services">Dental Treatments</a></li>
              <li><a href="#why-us">Why Choose Us</a></li>
              <li><a href="#reviews">Patient Stories</a></li>
              <li>
                <button
                  type="button"
                  className="footer-contact-link"
                  onClick={() => scrollToAppointment()}
                >
                  Contact Us & Appointment
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-col services-col">
            <h4 className="footer-title">Popular Treatments</h4>
            <ul className="footer-links">
              <li><button type="button" onClick={() => scrollToAppointment("General Dentistry")}>General Dentistry & Cleaning</button></li>
              <li><button type="button" onClick={() => scrollToAppointment("Dental Implant")}>Dental Implants</button></li>
              <li><button type="button" onClick={() => scrollToAppointment("Teeth Whitening")}>Teeth Whitening</button></li>
              <li><button type="button" onClick={() => scrollToAppointment("Root Canal Treatment (RCT)")}>Root Canal (RCT)</button></li>
              <li><button type="button" onClick={() => scrollToAppointment("Braces & Invisible Aligners")}>Braces & Aligners</button></li>
            </ul>
          </div>

          <div className="footer-col timing-col">
            <h4 className="footer-title">Visiting Hours</h4>
            <p className="footer-time-text">{site.hours}</p>
            <p className="footer-loc-text">{site.address}</p>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => scrollToAppointment()}
            >
              Book Your Visit
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <p>© {new Date().getFullYear()} {site.clinicName}. All Rights Reserved. Single-Page Dental Clinic Portal.</p>
            <div className="footer-socials">
              <a href={`tel:+91${site.phone}`}>Call Us</a>
              <span>•</span>
              <a href={waUrl()}>WhatsApp</a>
              <span>•</span>
              <a href={site.mapUrl || "https://maps.google.com"}>Location</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= FLOATING WHATSAPP BUTTON ================= */}
      <a
        href={waUrl("Namaste Doctor, mujhe appointment ke bare me jankari chahiye.")}
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp-widget"
        aria-label="Chat on WhatsApp"
      >
        <span className="wa-dot"></span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 18.06c-1.49 0-2.96-.4-4.24-1.16l-.3-.18-3.12.82.83-3.04-.2-.32a8.03 8.03 0 0 1-1.23-4.27c0-4.45 3.63-8.08 8.08-8.08 2.16 0 4.19.84 5.72 2.37 1.53 1.53 2.37 3.56 2.37 5.71 0 4.45-3.63 8.08-8.11 8.08zm4.44-6.05c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.73-.65-1.22-1.45-1.36-1.7-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.41-.41-.56-.42l-.48-.01c-.16 0-.43.06-.66.3-.23.24-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.16 1.78 2.71 4.31 3.8.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.44-.59 1.64-1.16.21-.57.21-1.06.14-1.16-.06-.1-.22-.16-.46-.28z"/>
        </svg>
        <span className="wa-text">WhatsApp Us</span>
      </a>

      {/* ================= VIDEO MODAL ================= */}
      {videoOpen && (
        <div className="video-modal-overlay" onClick={() => setVideoOpen(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setVideoOpen(false)}
            >
              ✕
            </button>
            <div className="video-preview-box">
              <div className="video-header">
                <h3>{site.clinicName} - Clinic Virtual Tour</h3>
                <p>Take a look at our hygienic operatory and advanced dental facilities.</p>
              </div>
              <div className="tour-photo-display">
                <img src="/images/about-clinic.jpg" alt="Clinic Tour" />
                <div className="tour-badge">
                  <span>✨ 100% Sterilized Environment</span>
                </div>
              </div>
              <div className="video-footer-cta">
                <p>Ready to meet Dr. Sharma and experience painless dental treatment?</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setVideoOpen(false);
                    scrollToAppointment();
                  }}
                >
                  Book Your Visit Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
