import { useEffect } from "react";
import Navbar from "../../../Components/NavBar";
import Footer from "../../Home/Components/Footer";
import { Box, Typography, Card, CardContent, CardMedia, Divider, Stack, Button } from "@mui/material";
import { fetchRescueCenters } from "../../../Services/fetch";
import { useDispatch, useSelector } from "react-redux";
import type { ReduxState } from "../../../Components/types/redux";
import { useNavigate } from "react-router-dom";

const rescueStories = [
  {
    title: "Hope's New Beginning",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNfTkosk_XISYGUe8YAUWMrv0kcP5a4YMcVQ&s",
    description:
      "Hope was found injured and alone on the roadside. Our volunteers rushed her to safety, provided medical care, and after weeks of love and attention, she found her forever home. Her transformation is a testament to the power of compassion.",
  },
  {
    title: "Max's Journey to Joy",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7hO0-U-sTiSgVlNcpAtPEXsy4ZO30dOptIQ&s",
    description:
      "Max, a senior dog, was abandoned by his previous owners. Our rescue center gave him a second chance. Today, Max enjoys his golden years surrounded by a loving family and furry friends.",
  },
  {
    title: "Luna the Miracle Cat",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s",
    description:
      "Luna was rescued from a dangerous construction site. Despite her initial fear, she blossomed into a playful, affectionate companion. Her story inspires us to never give up on any animal in need.",
  },
];

const services = [
  {
    title: "Rescue & Rehabilitation",
    image: "https://www.shutterstock.com/image-photo/dog-shelter-animal-volunteer-takes-600nw-2467677723.jpg",
    description:
      "We respond to reports of stray, injured, or abandoned animals, providing immediate rescue and medical attention. Our rehabilitation program ensures every animal gets the care and love they deserve.",
  },
  {
    title: "Adoption & Foster Care",
    image: "data:image/jpeg;base64,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",
    description:
      "We match rescued animals with loving families. Our adoption process is thorough, ensuring the best fit for both pets and adopters. Foster care is available for animals needing extra time before finding their forever home.",
  },
  {
    title: "Rescue Center Network",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoRfI_AjP2yvQmdhOc2EMi5JFA005w0YNj_Q&s",
    description:
      "We collaborate with a network of rescue centers across the region, sharing resources, expertise, and support to maximize our impact and reach more animals in need.",
  },
  {
    title: "Community Education & Outreach",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    description:
      "We conduct workshops, school programs, and community events to raise awareness about animal welfare, responsible pet ownership, and the importance of spaying/neutering. Our outreach efforts aim to build a compassionate and informed community.",
  },
  {
    title: "Behavioral Training & Socialization",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVHqkdrBQRLdKVcx3brCEUI91c5tmvVEXEVA&s",
    description:
      "Our trainers work with animals to address behavioral issues and help them adjust to home environments, making them more adoptable and improving their quality of life.",
  },
  
];


export default function AboutUs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { rescueCenters } = useSelector((state: ReduxState) => state.rescueCenter);


  
useEffect(() => {
  fetchRescueCenters(dispatch)
}, []);

  return (
    <>
      <Navbar />
      <Box sx={{ background: "linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)", minHeight: "100vh", pb: 6 }}>
        <Box sx={{ mx: "auto", pt: 6, px: 2 }}>
          {/* About Us Header */}
          <Typography variant="h2" sx={{ fontWeight: 700, color: "#226918", mb: 2, textAlign: "center" }}>
            About StrayCare
          </Typography>
          <Typography variant="h5" sx={{ color: "#444", mb: 4, textAlign: "center", maxWidth: 800, mx: "auto" }}>
            StrayCare is dedicated to rescuing, rehabilitating, and rehoming stray and abandoned animals across Sri Lanka. Our mission is to create a compassionate community where every animal is valued and protected.
          </Typography>
          <Divider sx={{ my: 4, borderColor: "#b2dfdb" }} />

          {/* Services Section */}
          <Typography variant="h4" sx={{ fontWeight: 600, color: "#388e3c", mb: 3 }}>
            Our Services
          </Typography>
          <Stack direction="row" spacing={3} flexWrap="wrap" justifyContent="center" mb={5}>
            {services.map((service, idx) => (
              <Card
                key={service.title}
                sx={{
                  width: 260,
                  m: 1,
                  boxShadow: 4,
                  borderRadius: 3,
                  background: "#fff",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.04)", boxShadow: 8 },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={service.image}
                  alt={service.title}
                  sx={{ objectFit: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#226918" }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555", mt: 1 }}>
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>

          <Divider sx={{ my: 4, borderColor: "#b2dfdb" }} />

          {/* Rescue Centers Section */}
          <Typography variant="h4" sx={{ fontWeight: 600, color: "#388e3c", mb: 3 }}>
            Our Rescue Centers
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center"  gap={3} mb={5}>
            {rescueCenters.map((center) => (
              <Card
                key={center.name}
                sx={{
                  width: 320,
                  m: 1,
                  mb:3,
                  boxShadow: 3,
                  borderRadius: 3,
                  background: "#f9fbe7",
                  border: "1px solid #c5e1a5",
                }}
              onClick={() => navigate(`/donation/${center.center_id}`)}

              >
                <CardMedia
                  component="img"
                  height="150"
                  image={center.image_url}
                  alt={center.name}
                  sx={{ objectFit: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#226918" }}>
                    {center.name}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: "#757575", mb: 1 }}>
                    {center.province}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    {center.history}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>

          <Divider sx={{ my: 4, borderColor: "#b2dfdb" }} />

          {/* Rescue Stories Section */}
          <Typography variant="h4" sx={{ fontWeight: 600, color: "#388e3c", mb: 3 }}>
            Rescue Stories
          </Typography>
          <Stack spacing={3} mb={5}>
            {rescueStories.map((story, idx) => (
              <Card
                key={story.title}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: idx % 2 === 0 ? "row" : "row-reverse" },
                  alignItems: "center",
                  boxShadow: 2,
                  borderRadius: 3,
                  background: "#fff",
                  p: 2,
                }}
              >
                <CardMedia
                  component="img"
                  image={story.image}
                  alt={story.title}
                  sx={{
                    width: { xs: "100%", sm: 220 },
                    height: 180,
                    objectFit: "cover",
                    borderRadius: 2,
                    mr: { sm: idx % 2 === 0 ? 3 : 0 },
                    ml: { sm: idx % 2 !== 0 ? 3 : 0 },
                    mb: { xs: 2, sm: 0 },
                  }}
                />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#226918" }}>
                    {story.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#444", mt: 1 }}>
                    {story.description}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Stack>

          <Divider sx={{ my: 4, borderColor: "#b2dfdb" }} />

          {/* Call to Action */}
          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Typography variant="h5" sx={{ color: "#226918", fontWeight: 600, mb: 2 }}>
              Join Us in Making a Difference!
            </Typography>
            <Typography variant="body1" sx={{ color: "#444", mb: 3 }}>
              Whether you want to adopt, volunteer, or support our mission, your involvement changes lives. Together, we can create a kinder world for all animals.
            </Typography>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #388e3c 0%, #8bc34a 100%)",
                color: "#fff",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: 3,
                boxShadow: 3,
                "&:hover": { background: "linear-gradient(90deg, #226918 0%, #689f38 100%)" },
              }}
              href="/donation"
            >
              Support Our Work
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
