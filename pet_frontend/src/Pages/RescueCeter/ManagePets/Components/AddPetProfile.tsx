import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { showToastError, showToastSuccess1 } from "../../../../Components/Commen/TostifyNotification";
import Http from "../../../../tools/Http";
import { uploadImage } from "../../../../Services/ImageUpload";
import type { IPet } from "../../../../Components/types/Pets";

// Define the IPet interface (should match your app's definition)
interface PetFormInputs {
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  size: string;
  weight: number;
  energy_level: string;
  vaccination_status: string;
  spayed_neutered: string;
  good_with_children: string;
  good_with_other_pets: string;
  description: string;
  rescue_date: string;
  rescue_location: string;
  rescue_condition: string;
  image_url: string;
  rescued_by: string

}


interface AddPetProfileProps {
  setAddOpen: Function;
  addOpen: boolean;
  setEditMode: Function;
  editMode: boolean;
  selectedPet?: IPet | null
  rescueCenterId?: string | null
}

const AddPetProfile: React.FC<AddPetProfileProps> = ({ addOpen, setAddOpen, setEditMode, editMode, selectedPet, rescueCenterId }) => {
  const { handleSubmit, register, reset, formState: { errors }, control } = useForm<PetFormInputs>();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [centerId, setCenterId] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPet) {
      console.log({ selectedPet })
      // Map selectedPet fields to form fields
      reset({
        name: selectedPet.name || "",
        species: selectedPet.species || "",
        breed: selectedPet.breed || "",
        age: selectedPet.age || 0,
        gender: selectedPet.gender ? "male" : "female",
        size: selectedPet.size || "",
        weight: selectedPet.weight || 0,
        energy_level: selectedPet.energy_level || "",
        vaccination_status: selectedPet.vaccination_status || "",
        spayed_neutered: selectedPet.spayed_neutered || "",
        good_with_children: selectedPet.good_with_children || "",
        good_with_other_pets: selectedPet.good_with_other_pets || "",
        description: selectedPet.description || "",
        rescue_date: selectedPet.rescue_date? selectedPet.rescue_date.split("T")[0] : "",
        rescue_location: selectedPet.rescue_location || "",
        rescue_condition: selectedPet.rescue_condition || "",
        image_url: selectedPet.image_url || "",
        rescued_by: selectedPet.rescued_by || "",
      });
      setPreview(selectedPet.image_url || null);
    } else {
      reset();
      setPreview(null);
    }
  }, [selectedPet, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  // Update onSubmit to handle both add and edit modes
  const onSubmit: SubmitHandler<PetFormInputs> = async (data) => {
    setLoading(true);
    let image_url: string | null = null;

    try {
      if (image) {
        image_url = await uploadImage(image);
      } else if (selectedPet && selectedPet.image_url) {
        image_url = selectedPet.image_url;
      }

      const payload = {
        ...data,
        image_url: image_url,
      };
      console.log({ payload });

      let response, responseData;
      if (editMode && selectedPet && selectedPet.pet_id) {
        // Edit mode: update pet
        response = await Http.put(`/pets/${selectedPet.pet_id}`, payload);
        responseData = response?.data?.data;
        if (responseData) {
          showToastSuccess1("Pet updated successfully");
        }
      } else {
        // Add mode: create new pet
        response = await Http.post(`/pets/${rescueCenterId}`, payload);
        responseData = response?.data?.data;
        if (responseData) {
          showToastSuccess1("Pet added successfully");
        }
      }

      setAddOpen(false);
      setEditMode(false);
    } catch (error) {
      console.error(error);
      showToastError("Operation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    setApiError(null);
    setApiSuccess(null);
    setEditMode(false)
    setAddOpen(false)
  };

  return (
    <Dialog open={addOpen || editMode} onClose={handleDialogClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          background: "#226918",
          color: "#fff",
          fontWeight: 700,
          fontSize: 24,
          letterSpacing: 1,
          textAlign: "center",
          pb: 2,
        }}
      >
        {editMode ? "Edit Pet Profile" : "Add Pet Profile"}
      </DialogTitle>
      <DialogContent
        sx={{
          background: "#f4f8f6",
          px: 4,
          py: 3,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
              maxWidth: 500,
              mx: "auto",
              mt: 3
            }}
          >
            <TextField
              label="Name"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
              variant="outlined"
              InputProps={{
                sx: { borderRadius: 2, background: "#fff" },
              }}
            />
            <TextField
              label="Species"
              {...register("species", { required: "Species is required" })}
              error={!!errors.species}
              helperText={errors.species?.message}
              fullWidth
              variant="outlined"
              InputProps={{
                sx: { borderRadius: 2, background: "#fff" },
              }}
            />
            <TextField
              label="Breed"
              {...register("breed", { required: "Breed is required" })}
              error={!!errors.breed}
              helperText={errors.breed?.message}
              fullWidth
              variant="outlined"
              InputProps={{
                sx: { borderRadius: 2, background: "#fff" },
              }}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Age"
                type="number"
                {...register("age", { required: "Age is required", min: 0 })}
                error={!!errors.age}
                helperText={errors.age?.message}
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 2, background: "#fff" },
                  inputProps: { min: 0 },
                }}
                sx={{ flex: 1 }}
              />
              <TextField
                label="Weight (kg)"
                type="number"
                {...register("weight", { required: "Weight is required", min: 0 })}
                error={!!errors.weight}
                helperText={errors.weight?.message}
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 2, background: "#fff" },
                  inputProps: { min: 0, step: 0.1 },
                }}
                sx={{ flex: 1 }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Size"
                {...register("size", { required: "Size is required" })}
                error={!!errors.size}
                helperText={errors.size?.message}
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 2, background: "#fff" },
                }}
                sx={{ flex: 1 }}
              />
              <TextField
                label="Energy Level"
                {...register("energy_level", { required: "Energy level is required" })}
                error={!!errors.energy_level}
                helperText={errors.energy_level?.message}
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 2, background: "#fff" },
                }}
                sx={{ flex: 1 }}
              />
            </Box>
            <TextField
              label="Vaccination Status"
              {...register("vaccination_status", { required: "Vaccination status is required" })}
              error={!!errors.vaccination_status}
              helperText={errors.vaccination_status?.message}
              fullWidth
              variant="outlined"
              InputProps={{
                sx: { borderRadius: 2, background: "#fff" },
              }}
            />


            <Box sx={{ display: "flex", gap: 2 }}>
              {/* Spayed/Neutered */}
              <FormControl fullWidth error={!!errors.spayed_neutered}>
                <InputLabel id="spayed-neutered-label">Spayed/Neutered</InputLabel>
                <Controller
                  name="spayed_neutered"
                  control={control}
                  rules={{ required: "Required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="spayed-neutered-label"
                      label="Spayed/Neutered"
                      sx={{ borderRadius: 2, background: "#fff" }}
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  )}
                />
                {errors.spayed_neutered && (
                  <FormHelperText>{errors.spayed_neutered.message}</FormHelperText>
                )}
              </FormControl>

              {/* Good with Children */}
              <FormControl fullWidth error={!!errors.good_with_children}>
                <InputLabel id="good-with-children-label">Good with Children</InputLabel>
                <Controller
                  name="good_with_children"
                  control={control}
                  rules={{ required: "Required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="good-with-children-label"
                      label="Good with Children"
                      sx={{ borderRadius: 2, background: "#fff" }}
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  )}
                />
                {errors.good_with_children && (
                  <FormHelperText>{errors.good_with_children.message}</FormHelperText>
                )}
              </FormControl>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              {/* Good with Other Pets */}
              <FormControl fullWidth error={!!errors.good_with_other_pets}>
                <InputLabel id="good-with-other-pets-label">Good with Other Pets</InputLabel>
                <Controller
                  name="good_with_other_pets"
                  control={control}
                  rules={{ required: "Required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="good-with-other-pets-label"
                      label="Good with Other Pets"
                      sx={{ borderRadius: 2, background: "#fff" }}
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  )}
                />
                {errors.good_with_other_pets && (
                  <FormHelperText>{errors.good_with_other_pets.message}</FormHelperText>
                )}
              </FormControl>

              {/* Gender */}
              <FormControl fullWidth error={!!errors.gender}>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="gender-label"
                      label="Gender"
                      sx={{ borderRadius: 2, background: "#fff" }}
                    >
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                    </Select>
                  )}
                />
                {errors.gender && <FormHelperText>{errors.gender.message}</FormHelperText>}
              </FormControl>
            </Box>

            <TextField
              label="Description"
              {...register("description")}
              multiline
              minRows={3}
              fullWidth
              variant="outlined"
              InputProps={{
                sx: { borderRadius: 2, background: "#fff" },
              }}
            />
            {/* Image Upload */}

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
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
                  />
                </Box>
              )}
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Rescue Date"
                type="date"
                {...register("rescue_date", { required: "Rescue date is required" })}
                error={!!errors.rescue_date}
                helperText={errors.rescue_date?.message}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                sx={{ flex: 1 }}
                InputProps={{
                  sx: { borderRadius: 2, background: "#fff" },
                }}
              />
              <TextField
                label="Rescue Location"
                {...register("rescue_location", { required: "Rescue location is required" })}
                error={!!errors.rescue_location}
                helperText={errors.rescue_location?.message}
                variant="outlined"
                sx={{ flex: 1 }}
                InputProps={{
                  sx: { borderRadius: 2, background: "#fff" },
                }}
              />
            </Box>
            <TextField
              label="Rescue Condition"
              {...register("rescue_condition")}
              fullWidth
              variant="outlined"
              InputProps={{
                sx: { borderRadius: 2, background: "#fff" },
              }}
            />
            <TextField
              label="Rescue Center ID"
              {...register("rescued_by", { required: "Rescue Center ID is required" })}
              error={!!errors.rescued_by}
              helperText={errors.rescued_by?.message}
              fullWidth
              variant="outlined"
              InputProps={{
                sx: { borderRadius: 2, background: "#fff" },
              }}
            />
            {apiError && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {apiError}
              </Alert>
            )}
            {apiSuccess && (
              <Alert severity="success" sx={{ mt: 1 }}>
                {apiSuccess}
              </Alert>
            )}
          </Box>

        </form>
      </DialogContent>
      <DialogActions
        sx={{
          background: "#f4f8f6",
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          px: 4,
          pb: 2,
          pt: 1,
          justifyContent: "center",
        }}
      >
        <Button
          onClick={handleDialogClose}
          color="secondary"
          variant="outlined"
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            px: 4,
            mr: 2,
            borderColor: "#226918",
            color: "#226918",
            "&:hover": {
              background: "#eaf5ea",
              borderColor: "#226918",
            },
          }}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          color="primary"
          variant="contained"
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            px: 4,
            background: "#226918",
            color: "#fff",
            boxShadow: "0 2px 8px rgba(34, 105, 24, 0.08)",
            "&:hover": {
              background: "#1a5314",
            },
          }}
          disabled={loading}
          type="submit"
        >
          {loading ? (editMode ? "Saving..." : "Adding...") : (editMode ? "Save Changes" : "Add Pet")}
        </Button>
      </DialogActions>
    </Dialog>

  );
};

export default AddPetProfile;





