import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import { showToastError, showToastSuccess1 } from '../../Components/Commen/TostifyNotification';
import Http from '../../tools/Http';
import FormFooter from '../../Components/Commen/FormFooter';
import { handleCancel } from '../../Services/service';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '../../redux/authSlice';
import { uploadImage } from '../../Services/ImageUpload';

interface RescueCenterFormInputs {
  name: string;
  email: string;
  phone_no: string;
  address: string;
  city: string;
  district: string;
  province: string;
  password: string;
  confirm_password: string;
  images: FileList;
}

interface Location {
  latitude: number | null;
  longitude: number | null;
}

const RescueCenterRegister: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<RescueCenterFormInputs>();
  const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      showToastError("Geolocation is not supported by your browser")
      return;

    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      () => {
        showToastSuccess1("Unable to retrieve your location")
      }
    );
  };

  const onSubmit: SubmitHandler<RescueCenterFormInputs> = async (data) => {
    if (!location.latitude || !location.longitude) {

      showToastError("Please click 'Get My Location' to set your location.");
      return;
    }
    const { confirm_password, ...dataToSend } = data;
    let image_url: string | null = null;
    if (image) {
      image_url = await uploadImage(image); // Upload to Supabase and get URL
    }
    const payload = {
      ...dataToSend,
      image_url: image_url,
      latitude: location.latitude,
      longitude: location.longitude
    };
    console.log({ payload });

    // try {
    //   const response = await Http.post(`api/auth/register/rescuecenter`, payload);
    //   const responseData = response?.data?.data
    //   const token = responseData?.token;
    //   if (token) {
    //     localStorage.setItem('token', token);
    //     localStorage.setItem('isLoggedIn', 'true');
    //     dispatch(setAuth({
    //       token: token,
    //       role: responseData.role
    //     }));
    //     showToastSuccess1(response.data.message || "Registration successful!");
    //     navigate('/');

    //   }
    //   dispatch(setAuth({
    //     token: token,
    //     role: responseData.role
    //   }));
    // } catch (error) {
    //   console.error(error);
    //   showToastError("Registration failed. Please try again.");
    // }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: "linear-gradient(to right, #f3f9f4, #d8f1d3)",
        minHeight: "100vh",
        py: 6
      }}
    >
      <Card
        elevation={6}
        sx={{
          borderRadius: 4,
          maxWidth: 600,
          width: "100%",
          p: 3,
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#084C11", textAlign: "center" }}
          >
            Register Rescue Center
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, textAlign: "center" }}
          >
            Fill in the details below to register your rescue center.
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Rescue Center Name"
              fullWidth
              margin="normal"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              label="Contact Email"
              type="email"
              fullWidth
              margin="normal"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Phone Number"
              fullWidth
              margin="normal"
              {...register("phone_no", { required: "Phone is required" })}
              error={!!errors.phone_no}
              helperText={errors.phone_no?.message}
            />
            <TextField
              label="Full Address"
              fullWidth
              margin="normal"
              {...register("address", { required: "Address is required" })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
            <TextField
              label="City"
              fullWidth
              margin="normal"
              {...register("city", { required: "City is required" })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
            <TextField
              label="District"
              fullWidth
              margin="normal"
              {...register("district", { required: "District is required" })}
              error={!!errors.district}
              helperText={errors.district?.message}
            />
            <TextField
              label="Province"
              fullWidth
              margin="normal"
              {...register("province", { required: "Province is required" })}
              error={!!errors.province}
              helperText={errors.province?.message}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              {...register("confirm_password", {
                required: "Please confirm your password",
                validate: (value, formValues) =>
                  value === formValues.password || "Passwords do not match"
              })}
              error={!!errors.confirm_password}
              helperText={errors.confirm_password?.message}
            />
            <Box sx={{ my: 2 }}>
              <Button
                variant="outlined"
                component="label"
                sx={{
                  color: '#084C11',
                  borderColor: '#084C11',
                  fontWeight: "bold",
                  textTransform: "none",
                  px: 3
                }}
              >
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>

              {preview && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">Image Preview:</Typography>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
                  />
                </Box>
              )}
            </Box>

            <Box sx={{ my: 2, textAlign: "center" }}>
              <Button
                variant="outlined"
                onClick={getLocation}
                sx={{
                  color: '#084C11',
                  borderColor: '#084C11',
                  fontWeight: "bold",
                  textTransform: "none",
                  px: 3
                }}
              >
                Get My Location
              </Button>
              {location.latitude && location.longitude && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1 }}
                >
                  Location set: Latitude {location.latitude}, Longitude {location.longitude}
                </Typography>
              )}
            </Box>

            <FormFooter
              handleCancel={() => handleCancel(() => { }, reset)}
              labelText='Register'
            />
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RescueCenterRegister;
