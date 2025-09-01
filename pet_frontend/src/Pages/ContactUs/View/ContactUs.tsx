import React, { useState } from "react";
import Navbar from "../../../Components/NavBar";

const initialFormState = {
  name: "",
  email: "",
  message: "",
};

const validateEmail = (email: string) => {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const ContactUs: React.FC = () => {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(form.email)) newErrors.email = "Invalid email address";
    if (!form.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      return;
    }
    // Here you would send the form data to your backend
    setSubmitted(true);
    setForm(initialFormState);
    setErrors({});
  };

  return (
    <>
      <Navbar />
    
    <div style={{
      maxWidth: 500,
      margin: "40px auto",
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      padding: "32px 24px"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: 8, color: "#226918" }}>Contact Us</h2>
      <p style={{ textAlign: "center", color: "#555", marginBottom: 32 }}>
        Have a question or want to get in touch? Fill out the form below and we'll get back to you soon!
      </p>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="name" style={{ display: "block", fontWeight: 500, marginBottom: 6 }}>
            Name<span style={{ color: "#d32f2f" }}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: errors.name ? "1.5px solid #d32f2f" : "1.5px solid #ccc",
              borderRadius: 6,
              fontSize: 16,
              outline: "none"
            }}
            placeholder="Your Name"
          />
          {errors.name && (
            <div style={{ color: "#d32f2f", fontSize: 13, marginTop: 4 }}>{errors.name}</div>
          )}
        </div>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="email" style={{ display: "block", fontWeight: 500, marginBottom: 6 }}>
            Email<span style={{ color: "#d32f2f" }}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: errors.email ? "1.5px solid #d32f2f" : "1.5px solid #ccc",
              borderRadius: 6,
              fontSize: 16,
              outline: "none"
            }}
            placeholder="you@example.com"
          />
          {errors.email && (
            <div style={{ color: "#d32f2f", fontSize: 13, marginTop: 4 }}>{errors.email}</div>
          )}
        </div>
        <div style={{ marginBottom: 24 }}>
          <label htmlFor="message" style={{ display: "block", fontWeight: 500, marginBottom: 6 }}>
            Message<span style={{ color: "#d32f2f" }}>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: errors.message ? "1.5px solid #d32f2f" : "1.5px solid #ccc",
              borderRadius: 6,
              fontSize: 16,
              outline: "none",
              resize: "vertical"
            }}
            placeholder="Type your message here..."
          />
          {errors.message && (
            <div style={{ color: "#d32f2f", fontSize: 13, marginTop: 4 }}>{errors.message}</div>
          )}
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            background: "#226918",
            color: "#fff",
            fontWeight: 600,
            fontSize: 17,
            padding: "12px 0",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            transition: "background 0.2s"
          }}
        >
          Send Message
        </button>
        {submitted && (
          <div style={{
            marginTop: 24,
            color: "#388e3c",
            background: "#e8f5e9",
            borderRadius: 6,
            padding: "12px 0",
            textAlign: "center",
            fontWeight: 500
          }}>
            Thank you for contacting us! We'll get back to you soon.
          </div>
        )}
      </form>
      <div style={{
        marginTop: 40,
        borderTop: "1px solid #eee",
        paddingTop: 24,
        color: "#444"
      }}>
        <div style={{ marginBottom: 8, fontWeight: 600 }}>Contact Information</div>
        <div style={{ fontSize: 15 }}>
          <div><span style={{ fontWeight: 500 }}>Email:</span> support@petadoption.com</div>
          <div><span style={{ fontWeight: 500 }}>Phone:</span> +1 (555) 123-4567</div>
          <div><span style={{ fontWeight: 500 }}>Address:</span> 123 Pet Lane, Cityville, Country</div>
        </div>
      </div>
    </div>
    </>

  );
};

export default ContactUs;
