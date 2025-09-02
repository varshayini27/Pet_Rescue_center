import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, CardMedia, Button, Typography,
  Box, CircularProgress, CardActions
} from '@mui/material';
import PetDetailDialog from './PetDetailCard';
import type { IPet } from '../../../Components/types/Pets';
import { dummyPets } from '../../RescueCeter/ManagePets/View/ManagePetsview';




const PetProfiles: React.FC = () => {
  const [pets, setPets] = useState<IPet[]>([]);
  // const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState<IPet | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // useEffect(() => {
  //   axios.get('http://localhost:5000/api/Pet') // update with your API
  //     .then(response => {
  //       setPets(response.data);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching pets:', error);
  //       setLoading(false);
  //     });
  // }, []);

  const handleOpenDialog = (pet: IPet) => {
    setSelectedPet(pet);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedPet(null);
  };

  // if (loading) return <Box textAlign="center" mt={10}><CircularProgress /></Box>;

  return (
    <Box p={4} display="flex" flexWrap="wrap" gap={4} justifyContent="center">
      {dummyPets.map((pet) => (
        <Card key={pet.id} sx={{ width: 300, boxShadow: 3 }}>
          {pet.imageUrl && (
            <CardMedia component="img" height="200" image={pet.imageUrl} alt={pet.name} />
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
            <Button variant="contained" sx={{ backgroundColor: '#084C11', color: '#fff' }}>
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
    </Box>
  );
};

export default PetProfiles;
