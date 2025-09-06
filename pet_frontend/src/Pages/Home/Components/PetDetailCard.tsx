import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
  CardMedia,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import type { IPet } from '../../../Components/types/Pets';
import { showToastSuccess1 } from '../../../Components/Commen/TostifyNotification';


interface Props {
  open: boolean;
  onClose: () => void;
  pet: IPet | null;
}

const PetDetailDialog: React.FC<Props> = ({ open, onClose, pet }) => {
  if (!pet) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(34, 105, 24, 0.15)',
          background: 'linear-gradient(135deg, #f9fafb 60%, #eaf5ea 100%)',
        },
      }}
    >
      <DialogTitle
        sx={{
          background: 'linear-gradient(90deg, #226918 0%, #4caf50 100%)',
          color: '#fff',
          fontWeight: 700,
          fontSize: 28,
          letterSpacing: 1,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          mb: 0,
          textAlign: 'center',
          textTransform: 'capitalize',
        }}
      >
        {pet.name}
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          background: 'rgba(255,255,255,0.95)',
          padding: { xs: 2, sm: 4 },
        }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          gap={4}
          alignItems="flex-start"
        >
          {/* Pet Image */}
          <Box flexShrink={0} width={{ xs: '100%', md: 340 }}>
            {pet.image_url && (
              <CardMedia
                component="img"
                height="320"
                image={pet.image_url}
                alt={pet.name}
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 4px 24px rgba(34, 105, 24, 0.10)',
                  objectFit: 'cover',
                  width: '100%',
                  mb: 2,
                }}
              />
            )}
            <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
              <Chip
                label={`Vaccinated: ${pet.vaccination_status}`}
                color={pet.vaccination_status === 'Yes' ? 'success' : 'default'}
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
              <Chip
                label={`Spayed/Neutered: ${pet.spayed_neutered}`}
                color={pet.spayed_neutered === 'Yes' ? 'info' : 'default'}
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
            </Stack>
            <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
              <Chip
                label={`Good with Kids: ${pet.good_with_children}`}
                color={pet.good_with_children === 'Yes' ? 'primary' : 'default'}
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
              <Chip
                label={`Good with Pets: ${pet.good_with_other_pets}`}
                color={pet.good_with_other_pets === 'Yes' ? 'secondary' : 'default'}
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
            </Stack>
          </Box>
          {/* Pet Details */}
          <Box flex={1}>
            <Stack spacing={2}>
              <Typography
                variant="h6"
                sx={{
                  color: '#226918',
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  mb: 1,
                  textTransform: 'uppercase',
                }}
              >
                Pet Details
              </Typography>
              <Divider />
              <Stack direction="row" spacing={3} flexWrap="wrap">
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    Species:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pet.species}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    Breed:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pet.breed}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    Age:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pet.age} years
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    Gender:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pet.gender}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    Size:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pet.size}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    Weight:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pet.weight} kg
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    Energy Level:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pet.energy_level}
                  </Typography>
                </Box>
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Typography
                variant="h6"
                sx={{
                  color: '#226918',
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  mb: 1,
                  textTransform: 'uppercase',
                }}
              >
                Pet Story
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#333',
                  fontStyle: 'italic',
                  background: '#f4f8f6',
                  borderRadius: 2,
                  p: 2,
                  boxShadow: '0 1px 4px rgba(34, 105, 24, 0.05)',
                }}
              >
                {pet.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography
                variant="h6"
                sx={{
                  color: '#226918',
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  mb: 1,
                  textTransform: 'uppercase',
                }}
              >
                Rescue Information
              </Typography>
              <Stack direction="row" spacing={3} flexWrap="wrap">
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    Rescue Date:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(pet.rescue_date).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    Location:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pet.rescue_location}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    Condition:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pet.rescue_condition}
                  </Typography>
                </Box>
                {pet?.rescuecenter?.name && (
                  <Box>
                    <Typography variant="body1" fontWeight={500}>
                      Rescued By:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {pet.rescuecenter.name}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Stack>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          background: '#f4f8f6',
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          p: 2,
          justifyContent: 'flex-end',
        }}
      >
        <Button
          onClick={onClose}
          color="error"
          variant="outlined"
          sx={{
            minWidth: 110,
            fontWeight: 600,
            textTransform: 'none',
            mr: 1,
          }}
        >
          Close
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#084C11',
            color: '#fff',
            minWidth: 110,
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#06360D',
            },
          }}
          onClick={() => {
            
            showToastSuccess1(`You have requested to adopt ${pet.name}`);
            onClose();
          }}
        >
          Adopt
        </Button>
      </DialogActions>
    </Dialog>
   
  );
};

export default PetDetailDialog;
