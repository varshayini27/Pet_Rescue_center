import React from "react";
import { Box, Typography, Link, IconButton, Stack, Divider } from "@mui/material";
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhoneAlt, FaPaw } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(90deg, #226918 0%, #4caf50 100%)",
        color: "#fff",
        mt: 8,
        pt: 6,
        pb: 3,
        px: { xs: 2, md: 8 },
        boxShadow: "0 -4px 24px rgba(34, 105, 24, 0.10)",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={6}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
      >
        {/* Logo & Mission */}
        <Box flex={2} minWidth={220}>
          <Box display="flex" alignItems="center" mb={1}>
            <FaPaw size={32} style={{ marginRight: 8 }} />
            <Typography variant="h5" fontWeight={700} letterSpacing={1}>
              StrayCare
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 340 }}>
            Our mission is to rescue, protect, and find loving homes for stray animals. Join us in making a difference—one paw at a time.
          </Typography>
        </Box>

        {/* Quick Links */}
        <Box flex={1} minWidth={160}>
          <Typography variant="h6" fontWeight={600} mb={1}>
            Quick Links
          </Typography>
          <Stack spacing={0.5}>
            <Link href="/" color="inherit" underline="hover">Home</Link>
            <Link href="/profiles" color="inherit" underline="hover">Pet Profiles</Link>
            <Link href="/donation" color="inherit" underline="hover">Donate</Link>
            <Link href="/report" color="inherit" underline="hover">Report a Stray</Link>
            <Link href="/about" color="inherit" underline="hover">About Us</Link>
            <Link href="/contact" color="inherit" underline="hover">Contact</Link>
          </Stack>
        </Box>

        {/* Contact & Social */}
        <Box flex={1} minWidth={200}>
          <Typography variant="h6" fontWeight={600} mb={1}>
            Contact Us
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
            <FaEnvelope />
            <Typography variant="body2">info@straycare.org</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <FaPhoneAlt />
            <Typography variant="body2">+94 77 123 4567</Typography>
          </Stack>
          <Stack direction="row" spacing={1} mt={1}>
            <IconButton
              href="https://facebook.com"
              target="_blank"
              rel="noopener"
              sx={{ color: "#fff" }}
              aria-label="Facebook"
            >
              <FaFacebook />
            </IconButton>
            <IconButton
              href="https://instagram.com"
              target="_blank"
              rel="noopener"
              sx={{ color: "#fff" }}
              aria-label="Instagram"
            >
              <FaInstagram />
            </IconButton>
            <IconButton
              href="https://twitter.com"
              target="_blank"
              rel="noopener"
              sx={{ color: "#fff" }}
              aria-label="Twitter"
            >
              <FaTwitter />
            </IconButton>
          </Stack>
        </Box>
      </Stack>

      <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.2)" }} />

      <Box textAlign="center" fontSize={14} sx={{ opacity: 0.85 }}>
        © {new Date().getFullYear()} StrayCare. All rights reserved. | Designed with <FaPaw style={{ verticalAlign: "middle", color: "#FFD700" }} /> and compassion.
      </Box>
    </Box>
  );
};

export default Footer;
