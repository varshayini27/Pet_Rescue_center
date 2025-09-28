
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Divider
} from "@mui/material";
import Navbar from "../../../../Components/NavBar";
import { showToastSuccess1 } from "../../../../Components/Commen/TostifyNotification";
import type { ReduxState } from "../../../../Components/types/redux";
import { fetchRescueCenters } from "../../../../Services/fetch";
import { useDispatch, useSelector } from "react-redux";
import type { IRescueCenter } from "../../../../Components/types/RescueCenter";
import { loadStripe } from "@stripe/stripe-js";
import Http from "../../../../tools/Http";
const stripePromise = loadStripe(import.meta.env.VITE_SK); 


// Dummy API simulation


export default function RescueCenterDetailPage() {
  const { centerId } = useParams<{ centerId: string }>();
  const [center, setCenter] = useState<IRescueCenter | null>(null);
  const [form, setForm] = useState({ name: "", amount: "", message: "" });
  const { rescueCenters } = useSelector((state: ReduxState) => state.rescueCenter);
  console.log("center", centerId)

  useEffect(() => {
    if (centerId) {
      fetchRescueCenterById(centerId).then((data) => {
        setCenter(data);
        console.log({ data })
      });
      console.log("center", centerId)
    }
  }, [centerId]);

  const fetchRescueCenterById = async (centerId: string) => {
    await new Promise((res) => setTimeout(res, 500));
    return rescueCenters.find((c: any) => c.center_id === centerId) || null;
  };


  // const handleDonate = async () => {
  //   if (!form.name || !form.amount || parseFloat(form.amount) <= 0) {
  //     alert("Please enter your name and a valid donation amount.");
  //     return;
  //   }

  //   try {
  //     const body = {
  //       user_id: "38D6C543-A4F3-4B4E-B5FE-4603450AE84D",
  //       rescue_center_id: centerId,
  //       amount: parseFloat(form.amount),
  //       name: form.name,
  //       message: form.message,
  //     };

  //     const response = await Http.post('/DonationPayment/create-checkout-session', body);

  //     console.log("Stripe session:", response.data);

  //     const stripe = await stripePromise;
  //     if (!stripe) return alert("Stripe.js not loaded yet.");

  //     const { error } = await stripe.redirectToCheckout({
  //       sessionId: response.data.sessionId, // lowercase 's'
  //     });

  //     if (error) {
  //       console.error("Stripe redirect error:", error);
  //       alert("Payment failed: " + error.message);
  //     }
  //   } catch (err: any) {
  //     console.error("Donation error:", err.response || err.message || err);
  //     alert("Something went wrong while processing your donation.");
  //   }
  // };
  const handleDonate = async () => {
    // ... (input validation)

    try {
        const body = {
            user_id: "38D6C543-A4F3-4B4E-B5FE-4603450AE84D",
            rescue_center_id: centerId,
            amount: parseFloat(form.amount),
            name: form.name,
            message: form.message,
        };
        await Http.post('/DonationPayment/confirm', {
          user_id: body.user_id,
          rescue_center_id: body.rescue_center_id,
          amount: body.amount,
      });

        const response = await Http.post('/DonationPayment/create-checkout-session', body);

        // IMPORTANT: Place console.log *immediately* after the await call
        console.log("Full response object:", response); // Log the full response object
        console.log("Stripe session created (response.data):", response.data);

        const stripe = await stripePromise;
        if (!stripe) return alert("Stripe.js not loaded yet.");

        // Redirect to Stripe Checkout
        const sessionId = response.data.sessionId; // This was the fix suggested earlier

        const result = await stripe.redirectToCheckout({
            sessionId: sessionId,
        });
       
      console.log("Donation saved in DB (frontend-triggered).");

        if (result.error) {
            console.error("Stripe redirect error:", result.error.message);
            alert("Payment failed: " + result.error.message);
        }
    } catch (err: any) {
        console.error("Donation request error (in catch block):", err.response || err.message || err);
        alert("Something went wrong while processing your donation.");
    }
};





  if (!center) return <div style={{ padding: "20px" }}>Loading...</div>;

  return (
    <>
      <Navbar />

      <div style={{ backgroundColor: "#F2F4F7", minHeight: "100vh", padding: "30px" }}>
        {/* Header Image */}
        <div style={{ marginBottom: "20px" }}>
          <img
            src={center.image_url}
            alt={center.name}
            style={{
              width: "100%",
              maxHeight: "400px",
              objectFit: "cover",
              borderRadius: "8px"
            }}
          />
        </div>


        <div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
          {/* Left Content Section */}
          <div style={{ flex: 2, minWidth: "300px" }}>
            <Typography variant="h4" style={{ color: "#084C11", fontWeight: "bold" }}>
              {center.name}
            </Typography>
            <Typography variant="body1" style={{ marginTop: "10px" }}>
              {center.history}
            </Typography>

            <Divider style={{ margin: "20px 0" }} />
            <Typography variant="h6" style={{ color: "#084C11" }}>
              🐾 Rescue Count
            </Typography>
            {/* Show rescued pet details */}
            {center.pets && center.pets.length > 0 ? (
              <div style={{ marginTop: "10px" }}>
                <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
                  Total Rescued Pets: <strong>{center.pets.length}</strong>
                </Typography>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                  {center.pets.slice(0, 4).map((pet: any) => (
                    <div
                      key={pet.pet_id}
                      style={{
                        background: "#fff",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        padding: "10px",
                        minWidth: "120px",
                        maxWidth: "140px",
                        textAlign: "center",
                        boxShadow: "0 1px 4px rgba(8,76,17,0.06)"
                      }}
                    >
                      <img
                        src={pet.image_url || "https://via.placeholder.com/100x100?text=Pet"}
                        alt={pet.name}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "6px",
                          marginBottom: "6px"
                        }}
                      />
                      <Typography variant="body2" style={{ fontWeight: 500 }}>
                        {pet.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {pet.breed}
                      </Typography>
                    </div>
                  ))}
                  {center.pets.length > 4 && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "60px",
                        height: "80px",
                        fontWeight: "bold",
                        color: "#388e3c"
                      }}
                    >
                      +{center.pets.length - 4} more
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Typography variant="body2" color="textSecondary" style={{ marginTop: "10px" }}>
                No rescued pets listed yet.
              </Typography>
            )}
            <Divider style={{ margin: "20px 0" }} />
            <Typography variant="h6" style={{ color: "#084C11" }}>
              📞 Contact Details
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                background: "linear-gradient(90deg, #e8f5e9 0%, #f2f4f7 100%)",
                borderRadius: "10px",
                padding: "18px 22px",
                margin: "15px 0 25px 0",
                boxShadow: "0 2px 8px rgba(8, 76, 17, 0.07)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "1.3em", color: "#388e3c" }}>📧</span>
                <Typography variant="body1" style={{ color: "#333" }}>
                  <strong>Email:</strong> {center.email}
                </Typography>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "1.3em", color: "#388e3c" }}>📱</span>
                <Typography variant="body1" style={{ color: "#333" }}>
                  <strong>Phone:</strong> {center.phone_no}
                </Typography>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "1.3em", color: "#388e3c" }}>🏠</span>
                <Typography variant="body1" style={{ color: "#333" }}>
                  <strong>Address:</strong> {center.address}, {center.city}, {center.district}, {center.province}
                </Typography>
              </div>
            </div>

            <Typography variant="h6" style={{ color: "#084C11" }}>
              📍 Location
            </Typography>

            <iframe
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${center.latitude},${center.longitude}&hl=es;z=14&output=embed`}
            />

          </div>

          {/* Right Donation Form */}
          <div style={{ flex: 1, minWidth: "280px" }}>
            <Card style={{ padding: "20px", backgroundColor: "white" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  style={{ color: "#084C11", marginBottom: "15px" }}
                >
                  Make a Donation
                </Typography>

                <TextField
                  fullWidth
                  label="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{ marginBottom: "15px" }}
                />
                <TextField
                  fullWidth
                  label="Amount (LKR)"
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  style={{ marginBottom: "15px" }}
                />
                <TextField
                  fullWidth
                  label="Message (optional)"
                  multiline
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ marginBottom: "15px" }}
                />

                <Button
                  variant="contained"
                  fullWidth
                  style={{
                    backgroundColor: "#084C11",
                    color: "#fff",
                    padding: "10px",
                    fontWeight: "bold"
                  }}
                  type="button"
                  onClick={handleDonate}
                >
                  Donate Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}


