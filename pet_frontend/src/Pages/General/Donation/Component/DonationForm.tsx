
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
import { rescueCenters } from "../../../AboutUs/View/aboutUs";
import Navbar from "../../../../Components/NavBar";
import { showToastSuccess1 } from "../../../../Components/Commen/TostifyNotification";

// Dummy API simulation
const fetchRescueCenterById = async (id: string) => {
  await new Promise((res) => setTimeout(res, 500));
  return rescueCenters.find((c) => c.id === id) || null;
};


export default function RescueCenterDetailPage() {
  const { id } = useParams();
  const [center, setCenter] = useState<null | any>(null);
  const [form, setForm] = useState({ name: "", amount: "", message: "" });

  useEffect(() => {
    if (id) {
      fetchRescueCenterById(id).then((data) => {
        setCenter(data);
      });
    }
  }, [id]);

  const handleDonate = () => {
    console.log("Donation submitted:", {
      ...form,
      rescueCenterId: id
    });
    showToastSuccess1("Thank you for your donation!");
  };

  if (!center) return <div style={{ padding: "20px" }}>Loading...</div>;

  return (
    <>
      <Navbar />

    <div style={{ backgroundColor: "#F2F4F7", minHeight: "100vh", padding: "30px" }}>
      {/* Header Image */}
      <div style={{ marginBottom: "20px" }}>
        <img
          src={center.image}
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
            {center.description}
          </Typography>

          <Divider style={{ margin: "20px 0" }} />

          <Typography variant="h6" style={{ color: "#084C11" }}>
            📍 Location
          </Typography>
          <Typography variant="body2" style={{ marginBottom: "15px" }}>
            {center.location}
          </Typography>

          <Typography variant="h6" style={{ color: "#084C11" }}>
            🐾 Rescue Count
          </Typography>
          <Typography variant="body2" style={{ marginBottom: "15px" }}>
            {center.rescueCount} animals rescued
          </Typography>

          <Typography variant="h6" style={{ color: "#084C11" }}>
            📜 History
          </Typography>
          <Typography variant="body2" style={{ lineHeight: "1.6" }}>
            {center.history}
          </Typography>
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
