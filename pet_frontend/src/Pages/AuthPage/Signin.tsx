import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const RegisterChoicePage = () => {
  const navigate = useNavigate();

  // Animation variants
    const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    hover: {
      scale: 1.05,
      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f3f9f4, #d8f1d3)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: { xs: 3, md: 5 },
      }}
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{
            textAlign: "center",
            background: "linear-gradient(90deg, #084C11, #1ea446)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Get Started with PetConnect
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Typography variant="subtitle1" color="text.secondary" mb={4} textAlign="center">
          Select the option that best describes you
        </Typography>
      </motion.div>

      {/* Cards */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 5,
          alignItems: "center",
          justifyContent: "center",
          mt: 3,
        }}
      >
        {/* Rescue Center Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          custom={0}
        >
          <Card
            sx={{
              width: 340,
              padding: 4,
              cursor: "pointer",
              borderRadius: 4,
              textAlign: "center",
              background: "white",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            }}
            onClick={() => navigate("/signin/register_rescue")}
          >
            <CardContent>
              <Typography variant="h2" fontSize={56} mb={1}>🏥</Typography>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Rescue Center
              </Typography>
              <Typography color="text.secondary" fontSize={15}>
                Register as a verified animal rescue center and help save lives.
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        {/* Common Register Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          custom={1}
        >
          <Card
            sx={{
              width: 340,
              padding: 4,
              cursor: "pointer",
              borderRadius: 4,
              textAlign: "center",
              background: "white",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            }}
            onClick={() => navigate("/signin/register_user")}
          >
            <CardContent>
              <Typography variant="h2" fontSize={56} mb={1}>👤</Typography>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Common Register
              </Typography>
              <Typography color="text.secondary" fontSize={15}>
                Sign up as a pet adopter or a general user to find your new friend.
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Box>

      {/* Login Link */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Box mt={6}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{" "}
            <Button
              variant="text"
              onClick={() => navigate("/login")}
              sx={{
                color: "#084C11",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Log in
            </Button>
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};

export default RegisterChoicePage;
