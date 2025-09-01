import { useState, useEffect } from "react";
import { Typography, Card, CardContent, Select, MenuItem, Box, InputLabel, FormControl } from "@mui/material";
import Navbar from "../../../Components/NavBar";
import dummy from "../../../assets/dummy-profile.jpg";
import { rescueCenters } from "../../AboutUs/View/aboutUs";
import { dummyPets } from "../../RescueCeter/ManagePets/View/ManagePetsview";


export default function PetProfiles() {
  const [selectedCenter, setSelectedCenter] = useState<string>("all");
  const [filteredPets, setFilteredPets] = useState(dummyPets);

  useEffect(() => {
    if (selectedCenter === "all") {
      setFilteredPets(dummyPets);
    } else {
      setFilteredPets(dummyPets.filter((dummyPets) => dummyPets.rescue_center_id === selectedCenter));
    }
  }, [selectedCenter]);

  return (
    <>
      <Navbar />
      <Box sx={{ background: "#F2F4F7", minHeight: "100vh", pb: 6 }}>
        <Box sx={{  mx: "auto", pt: 6, px: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#226918", mb: 2}}>
            Meet Our Lovely Pets 🐾
          </Typography>
          <Typography variant="body1" sx={{ color: "#444", mb: 4 }}>
            Browse all pets available for adoption. Filter by rescue center to find your new best friend!
          </Typography>

          <Box sx={{ display: "flex",  mb: 4 }}>
            <FormControl sx={{ minWidth: 240 }}>
              <InputLabel id="center-select-label">Filter by Rescue Center</InputLabel>
              <Select
                labelId="center-select-label"
                value={selectedCenter}
                label="Filter by Rescue Center"
                onChange={(e) => setSelectedCenter(e.target.value)}
              >
                <MenuItem value="all">All Rescue Centers</MenuItem>
                {rescueCenters.map((center) => (
                  <MenuItem key={center.id} value={center.id}>
                    {center.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            {filteredPets.length === 0 ? (
              <Typography variant="h6" sx={{ color: "#888", mt: 4 }}>
                No pets found for the selected rescue center.
              </Typography>
            ) : (
              filteredPets.map((pet) => {
                const center = rescueCenters.find((c) => c.id === pet.rescue_center_id);
                return (
                  <Card
                    key={pet.id}
                    sx={{
                      width: 300,
                      border: "2px solid #226918",
                      borderRadius: 2,
                      backgroundColor: "white",
                      boxShadow: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "scale(1.03)", boxShadow: 4 },
                    }}
                  >
                    <img
                      src={pet.imageUrl}
                      alt={pet.name}
                      style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "cover",
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                      }}
                    />
                    <CardContent sx={{ width: "100%",ml:3 }}>
                      <Typography variant="h6" sx={{ color: "#226918", fontWeight: 600 }}>
                        {pet.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555", mb: 1 }}>
                        {pet.type} • {pet.age} {pet.age === 1 ? "year" : "years"} old
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#888", mb: 1 }}>
                        Rescue Center: {center ? center.name : "Unknown"}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#444" }}>
                        {pet.description}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
