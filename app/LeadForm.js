"use client";
import { useState, useEffect } from "react";
import site from "../config/site.json";

export default function LeadForm({ initialConcern = "", onBookingComplete }) {
  const [d, setD] = useState({
    name: "",
    phone: "",
    concern: initialConcern || "",
    date: "",
    time: "Morning (10:00 AM - 1:00 PM)",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (initialConcern) {
      setD((prev) => ({ ...prev, concern: initialConcern }));
    }
  }, [initialConcern]);

  const set = (k) => (e) => setD({ ...d, [k]: e.target.value });

  function submit(e) {
    e.preventDefault();
    setLoading(true);

    if (site.webhookUrl) {
      fetch(site.webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          name: d.name,
          phone: d.phone,
          concern: d.concern || "General Checkup",
          date: d.date || "As soon as possible",
          time: d.time,
          notes: d.notes,
        }),
        keepalive: true,
      }).catch(() => {});
    }

    setOk(true);
    setLoading(false);
    if (onBookingComplete) onBookingComplete(d);

    const message = `Namaste ${site.doctorName || "Doctor"}, I want to book an Appointment at ${site.clinicName}:
• Name: ${d.name}
• Phone: ${d.phone}
• Treatment / Concern: ${d.concern || "Dental / Aesthetic Consultation"}
• Preferred Date: ${d.date || "Earliest Available"}
• Preferred Time: ${d.time}
${d.notes ? `• Note: ${d.notes}` : ""}

Please confirm my appointment slot. Thank you!`;

    const waUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
    setTimeout(() => {
      window.open(waUrl, "_blank");
    }, 900);
  }

  if (ok) {
    return (
      <div className="form-card success-card">
        <div className="success-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h3>Appointment Request Sent!</h3>
        <p className="lead-text">
          Dhanyawad <strong>{d.name}</strong>! Aapki appointment request receive ho gayi hai.
        </p>
        <div className="booking-summary">
          <div><span>Treatment:</span> <b>{d.concern || "General Checkup"}</b></div>
          <div><span>Time:</span> <b>{d.time}</b></div>
          <div><span>Mobile:</span> <b>+91 {d.phone}</b></div>
        </div>
        <p className="sub-text">WhatsApp par confirmation khul raha hai. Hamari team aapse 15 minute ke andar sampark karegi.</p>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => {
            setOk(false);
            setD({ name: "", phone: "", concern: "", date: "", time: "Morning (10:00 AM - 1:00 PM)", notes: "" });
          }}
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={submit} id="lead-form-element">
      <div className="form-header">
        <span className="form-badge">📅 Online Appointment</span>
        <h3>Schedule Your Consultation</h3>
        <p>Zero waiting time. Get expert diagnosis and pain-free care.</p>
      </div>

      <div className="form-grid-2">
        <div className="input-group">
          <label htmlFor="patient-name">Patient Full Name <span className="req">*</span></label>
          <div className="input-wrap">
            <span className="input-icon">👤</span>
            <input
              id="patient-name"
              required
              placeholder="e.g. John Doe / Amit Kumar"
              value={d.name}
              onChange={set("name")}
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="patient-phone">Phone Number (10 Digits) <span className="req">*</span></label>
          <div className="input-wrap">
            <span className="input-icon">📞</span>
            <input
              id="patient-phone"
              required
              type="tel"
              inputMode="numeric"
              pattern="[0-9]{10}"
              title="Please enter a valid 10 digit mobile number"
              placeholder="e.g. 9876543210"
              value={d.phone}
              onChange={set("phone")}
            />
          </div>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="patient-treatment">Select Treatment / Concern</label>
        <div className="input-wrap">
          <span className="input-icon">🦷</span>
          <select id="patient-treatment" value={d.concern} onChange={set("concern")}>
            <option value="">Choose dental service...</option>
            <option value="General Dentistry & Cleaning">General Dentistry & Cleaning</option>
            <option value="Dental Implant">Dental Implant</option>
            <option value="Teeth Whitening">Teeth Whitening</option>
            <option value="Root Canal Treatment (RCT)">Root Canal Treatment (RCT)</option>
            <option value="Braces & Invisible Aligners">Braces & Invisible Aligners</option>
            <option value="Emergency Toothache Relief">Emergency Toothache Relief</option>
            <option value="Kids Dentistry">Kids Dental Care</option>
            <option value="Routine Smile Checkup">Routine Smile Checkup</option>
          </select>
        </div>
      </div>

      <div className="form-grid-2">
        <div className="input-group">
          <label htmlFor="patient-date">Preferred Date</label>
          <div className="input-wrap">
            <span className="input-icon">📅</span>
            <input
              id="patient-date"
              type="date"
              value={d.date}
              onChange={set("date")}
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="patient-time">Preferred Time Slot</label>
          <div className="input-wrap">
            <span className="input-icon">⏰</span>
            <select id="patient-time" value={d.time} onChange={set("time")}>
              <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
              <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
              <option value="Evening (5:00 PM - 8:30 PM)">Evening (5:00 PM - 8:30 PM)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="patient-notes">Any specific problem? (Optional)</label>
        <div className="input-wrap">
          <span className="input-icon">📝</span>
          <input
            id="patient-notes"
            placeholder="e.g. Sensitivity in lower molar, bleeding gums..."
            value={d.notes}
            onChange={set("notes")}
          />
        </div>
      </div>

      <button className="btn btn-primary btn-block submit-btn" type="submit" disabled={loading}>
        {loading ? (
          <span className="spinner">Booking...</span>
        ) : (
          <>
            <span>Confirm & Book Appointment</span>
            <span className="btn-arrow">→</span>
          </>
        )}
      </button>

      <div className="form-security">
        <span className="security-icon">🔒</span>
        <span>Your data is confidential. Instant WhatsApp confirmation sent.</span>
      </div>
    </form>
  );
}
