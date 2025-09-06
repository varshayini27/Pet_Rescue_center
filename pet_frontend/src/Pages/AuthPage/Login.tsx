import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Http from '../../tools/Http';
import { showToastError, showToastSuccess, showToastSuccess1 } from "../../Components/Commen/TostifyNotification";
import { setAuth, setRescueCenter } from "../../redux/authSlice";
import { useDispatch } from "react-redux";


type LoginFormInputs = {
  email: string;
  password: string;
  role: string;
};

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()


  const onSubmit = async (data: LoginFormInputs) => {


    try {
      console.log({ data });
      const response = await Http.post('auth/login', data);
      const responseData = response?.data?.data;
      console.log({ responseData })
      console.log(responseData.role)
      if (response?.data?.status == 200) {

        const token = responseData?.token;
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('isLoggedIn', 'true');
          dispatch(setAuth({
            token: token,
            role: responseData.role,
            rescueCenter: responseData?.rescueCenter,
            rescueCenterId: responseData?.rescueCenter?.center_id
          }));
          // dispatch(setRescueCenter({
          //   rescueCenter: responseData.rescueCenter
          // }));
          showToastSuccess1("Login successfully")
          if (responseData.role == "Adopter") {
            navigate('/');
          } else {
            navigate('/center/dashboard');
          }
        }
      } else {

        showToastError('Login failed')
      }

    } catch (err: any) {
      console.log({ err });
      showToastError(err?.meta?.message || "Login fail");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to left, #d8f1d3, #1e7735ff)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
      }}
    >
      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h5"
          sx={{
            fontStyle: "italic",
            fontWeight: "bold",
            lineHeight: 1.5,
            color: "#fff",
            textAlign: "center",
            maxWidth: 600,
            textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          "When you adopt a dog, you don’t just save their life — you become their whole world."
        </Typography>
      </motion.div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card elevation={6} sx={{ borderRadius: 3, maxWidth: 450, width: "100%" }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Login
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Enter your credentials to access your account
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                margin="normal"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                select
                label="Role"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue="Adopter"
                {...register("role", { required: "Role is required" })}
                error={!!errors.role}
                helperText={errors.role?.message}
              >
                <MenuItem value="Adopter">Adopter</MenuItem>
                <MenuItem value="RescueCenter">Rescue Center</MenuItem>
              </TextField>

              <Box mt={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  fullWidth
                  size="large"
                  disabled={loading}
                  sx={{ py: 1.2, fontSize: "1rem", fontWeight: "bold" }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}
