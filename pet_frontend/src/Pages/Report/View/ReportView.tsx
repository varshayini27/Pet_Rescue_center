import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  Fab,
  CircularProgress,
} from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { showToastError, showToastSuccess1 } from "../../../Components/Commen/TostifyNotification";

function ReportView() {
  const navigate = useNavigate();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [details, setDetails] = useState({
    petType: "",
    description: "",
    urgency: "Normal",
  });
  const [loadingLocation, setLoadingLocation] = useState(false); // for spinner

  // Get current location
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      showToastError("Geolocation is not supported by your browser");
      return;
    }

    setLoadingLocation(true); // start spinner

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoadingLocation(false); // stop spinner
      },
      (err) => {
        console.error("Error retrieving location:", err);
        showToastError("Unable to retrieve your location. Please allow permission.");
        setLoadingLocation(false); // stop spinner
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!location) {
      showToastError("Please get the current location before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("petType", details.petType);
    formData.append("description", details.description);
    formData.append("urgency", details.urgency);
    formData.append("latitude", location.lat.toString());
    formData.append("longitude", location.lng.toString());
    if (image) {
      formData.append("image", image);
    }

    console.log("Report Data:", Object.fromEntries(formData.entries()));
    showToastSuccess1("Report submitted successfully!");
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 10, px: 2 }}>
      <Card sx={{ maxWidth: 600, width: "100%", boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" textAlign="center" color="green" gutterBottom>
            Report a Stray Animal
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Pet Type (e.g., Dog, Cat)"
              value={details.petType}
              onChange={(e) => setDetails({ ...details, petType: e.target.value })}
              required
              fullWidth
            />

            <TextField
              label="Description"
              value={details.description}
              onChange={(e) => setDetails({ ...details, description: e.target.value })}
              required
              multiline
              rows={3}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Urgency</InputLabel>
              <Select
                value={details.urgency}
                label="Urgency"
                onChange={(e) => setDetails({ ...details, urgency: e.target.value })}
              >
                <MenuItem value="Normal">Normal</MenuItem>
                <MenuItem value="Urgent">Urgent</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
              </Select>
            </FormControl>

            <Button variant="outlined" component="label">
              Upload Pet Image
              <input type="file" accept="image/*" hidden onChange={handleFileChange} required />
            </Button>
            {image && <Typography variant="body2">📷 {image.name}</Typography>}

            {/* FAB for Location with feedback */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1, mb: 1 }}>
              <Fab
                color={location ? "success" : "primary"} // green if detected
                onClick={handleGetLocation}
                sx={{ boxShadow: 3, position: "relative" }}
              >
                {loadingLocation ? (
                  <CircularProgress size={24} color="inherit" />
                ) : location ? (
                  <CheckCircleIcon />
                ) : (
                  <NearMeIcon />
                )}
              </Fab>
            </Box>

            <Typography textAlign="center" variant="body2" color={location ? "green" : "text.secondary"}>
              {location
                ? `Location Captured: Latitude ${location.lat.toFixed(6)}, Longitude ${location.lng.toFixed(6)}`
                : "Tap the pin to detect current location"}
            </Typography>

            <Button type="submit" variant="contained" color="success" sx={{ mt: 2 }}>
              Submit Report
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ReportView;
