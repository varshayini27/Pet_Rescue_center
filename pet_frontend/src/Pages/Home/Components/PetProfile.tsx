import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, CardMedia, Button, Typography,
  Box, CircularProgress, CardActions
} from '@mui/material';
import PetDetailDialog from './PetDetailCard';
import type { IPet } from '../../../Components/types/Pets';
import type { ReduxState } from '../../../Components/types/redux';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPets } from '../../../Services/fetch';
import AdoptionRequestDialog from './AdoptionForm';




const PetProfiles: React.FC = () => {
  const { pets } = useSelector((state: ReduxState) => state.pet);
  const dispatch = useDispatch()
  const [selectedPet, setSelectedPet] = useState<IPet | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [adoptionOpen, setAdoptionOpen] = useState(false);


  useEffect(() => {
    fetchAllPets(dispatch)
  }, [dispatch])

  const handleOpenDialog = (pet: IPet) => {
    setSelectedPet(pet);
    setDialogOpen(true);
  };
  const handleOpenFormDialog = (pet: IPet) => {
    setSelectedPet(pet);
    setAdoptionOpen(true);
  };
console.log({pets})
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedPet(null);
  };

  // if (loading) return <Box textAlign="center" mt={10}><CircularProgress /></Box>;

  return (
    <Box p={4} display="flex" flexWrap="wrap" gap={4} justifyContent="center">
      {pets.map((pet) => (
        <Card key={pet.pet_id} sx={{ width: 300, boxShadow: 3 }}>
          {pet.image_url && (
            <CardMedia component="img" height="200" image={pet.image_url} alt={pet.name} />
          )}
          <CardContent>
            <Typography variant="h6">{pet.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {pet.description.substring(0, 60)}...
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              sx={{
                color: '#084C11',
                borderColor: '#084C11',
                '&:hover': {
                  borderColor: '#06360D',
                  backgroundColor: '#F0FFF4'
                }
              }}
              onClick={() => handleOpenDialog(pet)}
            >
              View
            </Button>
            <Button variant="contained" sx={{ backgroundColor: '#084C11', color: '#fff' }}
             onClick={() => handleOpenFormDialog(pet)}
             >
              ADOPT
            </Button>

          </CardActions>
        </Card>
      ))}

      <PetDetailDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        pet={selectedPet}
      />

{adoptionOpen && (
          <AdoptionRequestDialog
            open={adoptionOpen}
            onClose={() => setAdoptionOpen(false)}
            pet={selectedPet}
          />
        )}
    </Box>
  );
};

export default PetProfiles;
