import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import type { ReduxState } from "../../../Components/types/redux";
import Http from "../../../tools/Http";
import { showToastError, showToastSuccess1 } from "../../../Components/Commen/TostifyNotification";
import type { IRescueCenter } from "../../../Components/types/RescueCenter";



const EditCenterProfile: React.FC = () => {
  const dispatch = useDispatch();
  const rescueCenterId = useSelector(
    (state: ReduxState) => state?.auth?.rescueCenterId
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [profile, setProfile] = useState<IRescueCenter | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<IRescueCenter>();

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await Http.get(`/rescuecenter/${rescueCenterId}`);
        const data = res?.data?.data;
        setProfile(data);
        reset(data);
      } catch (error) {
        showToastError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    if (rescueCenterId) fetchProfile();
  }, [rescueCenterId, reset]);

  // Handle form submit
  const onSubmit = async (data:any) => {
    setSaving(true);
    try {
      // Email should not be changed, so remove it from payload
      const { Pets, ...payload } = data;
      const res = await Http.put(`/rescuecenter/${rescueCenterId}`, payload);
      if (res?.data?.data) {
        setProfile(res.data.data);
        showToastSuccess1("Profile updated successfully!");
        reset(res.data.data);
      }
    } catch (error) {
      showToastError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        py: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" fontWeight={700} mb={3} color="#226918">
        Edit Rescue Center Profile
      </Typography>
      <Card sx={{ width: "100%", maxWidth: 600, boxShadow: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          {profile?.image_url && (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: 130,
                      height: 130,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "4px solid #226918",
                      boxShadow: 2,
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 1,
                    }}
                  >
                    <img
                      src={profile.image_url}
                      alt="Rescue Center"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </Box>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{
                      fontWeight: 500,
                      letterSpacing: 0.5,
                    }}
                  >
                    Profile Image
                  </Typography>
                </Box>
              )}
            <Box display="flex" flexDirection="column" gap={2}>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Center name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Rescue Center Name"
                    variant="outlined"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    InputProps={{ readOnly: true }}
                    sx={{
                      backgroundColor: "#f0f0f0",
                      "& .MuiInputBase-input.Mui-disabled": {
                        color: "#888",
                      },
                    }}
                    helperText="Email address cannot be changed"
                  />
                )}
              />
              <Controller
                name="phone_no"
                control={control}
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9+\-() ]{7,20}$/,
                    message: "Enter a valid phone number",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    error={!!errors.phone_no}
                    helperText={errors.phone_no?.message}
                  />
                )}
              />
              <Controller
                name="address"
                control={control}
                rules={{ required: "Address is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Address"
                    variant="outlined"
                    fullWidth
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
              <Box display="flex" gap={2}>
                <Controller
                  name="city"
                  control={control}
                  rules={{ required: "City is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="City"
                      variant="outlined"
                      fullWidth
                      error={!!errors.city}
                      helperText={errors.city?.message}
                    />
                  )}
                />
                <Controller
                  name="district"
                  control={control}
                  rules={{ required: "district is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="district"
                      variant="outlined"
                      fullWidth
                      error={!!errors.district}
                      helperText={errors.district?.message}
                    />
                  )}
                />
              </Box>
              <Controller
                name="province"
                control={control}
                rules={{
                  required: "province is required",
                  
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="province"
                    variant="outlined"
                    fullWidth
                    error={!!errors.province}
                    helperText={errors.province?.message}
                  />
                )}
              />
              <Controller
                name="history"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="History (optional)"
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={4}
                  />
                )}
              />

              
            
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  disabled={saving || !isDirty}
                  sx={{
                    minWidth: 120,
                    fontWeight: 600,
                    letterSpacing: 1,
                  }}
                >
                  {saving ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
                </Button>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditCenterProfile;
