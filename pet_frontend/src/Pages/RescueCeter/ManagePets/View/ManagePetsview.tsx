import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import type { IPet } from "../../../../Components/types/Pets";


export const dummyPets: IPet[] = [
  {
    id: '1a2b3c4d',
    name: 'Buddy',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
    gender: 'Male',
    status: 'Available',
    size: 'Large',
    weight: 30,
    energy_level: 'High',
    vaccination_status: 'Up-to-date',
    spayed_neutered: 'Yes',
    good_with_children: 'Yes',
    good_with_other_pets: 'Yes',
    description: 'Friendly and energetic dog, loves outdoor activities.',
    imageUrl: 'https://cdn.pixabay.com/photo/2017/09/25/13/12/puppy-2785074_1280.jpg',
    rescue_date: '2025-08-25',
    rescue_location: 'Colombo',
    rescue_condition: 'Healthy',
    rescue_center_id: '1',
    type: 'Dog'

  },
  {
    id: '5e6f7g8h',
    name: 'Mittens',
    species: 'Cat',
    breed: 'Siamese',
    age: 2,
    gender: 'Female',
    status: 'Adopted',
    size: 'Small',
    weight: 4,
    energy_level: 'Medium',
    vaccination_status: 'Up-to-date',
    spayed_neutered: 'Yes',
    good_with_children: 'Yes',
    good_with_other_pets: 'No',
    description: 'Calm and affectionate cat, enjoys quiet environments.',
    imageUrl: 'https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg',
    rescue_date: '2025-07-10',
    rescue_location: 'Kandy',
    rescue_condition: 'Minor injury healed',
    rescue_center_id: '2',
    type: 'Cat'

  },
  {
    id: '9i0j1k2l',
    name: 'Charlie',
    species: 'Dog',
    breed: 'Beagle',
    age: 4,
    gender: 'Male',
    status: 'Available',
    size: 'Medium',
    weight: 15,
    energy_level: 'High',
    vaccination_status: 'Up-to-date',
    spayed_neutered: 'No',
    good_with_children: 'Yes',
    good_with_other_pets: 'Yes',
    description: 'Playful and curious dog, loves to explore.',
    imageUrl: 'https://media.istockphoto.com/id/450709633/photo/one-eyed-cavalier-king-charles-puppy-sitting.jpg?s=612x612&w=0&k=20&c=NMglhrwpVdcrmOgesXEuDoeIdfuAcQC2XfE0CApW1Zs=',
    rescue_date: '2025-06-18',
    rescue_location: 'Galle',
    rescue_condition: 'Healthy',
    rescue_center_id: '3',
    type: 'Dog'
  },
  {
    id: '3m4n5o6p',
    name: 'Luna',
    species: 'Cat',
    breed: 'Persian',
    age: 1,
    gender: 'Female',
    status: 'Available',
    size: 'Small',
    weight: 3.5,
    energy_level: 'Low',
    vaccination_status: 'Up-to-date',
    spayed_neutered: 'No',
    good_with_children: 'Yes',
    good_with_other_pets: 'Yes',
    description: 'Gentle and calm, enjoys being pampered.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaUDjjHCBCTurT77G4gsCVHaxXGSP_jW9K_MwGo71fLalrKwP92uMFEfeEEQD3eYliYL0&usqp=CAU',
    rescue_date: '2025-08-01',
    rescue_location: 'Jaffna',
    rescue_condition: 'Healthy',
    rescue_center_id: '1',
    type: 'Cat'
  },
  {
    id: '7q8r9s0t',
    name: 'Max',
    species: 'Dog',
    breed: 'German Shepherd',
    age: 5,
    gender: 'Male',
    status: 'Adopted',
    size: 'Large',
    weight: 35,
    energy_level: 'High',
    vaccination_status: 'Up-to-date',
    spayed_neutered: 'Yes',
    good_with_children: 'Yes',
    good_with_other_pets: 'No',
    description: 'Loyal and protective, great for families.',
    imageUrl: 'https://stories.swns.com/wp-content/uploads/bionic-dog-a-do-71732.jpg',
    rescue_date: '2025-05-12',
    rescue_location: 'Negombo',
    rescue_condition: 'Recovered from minor injury',
    rescue_center_id: '3',
    type: 'Dog'
  },
  {
    id: 'r1b2i3t4',
    name: 'Thumper',
    species: 'Rabbit',
    breed: 'Holland Lop',
    age: 2,
    gender: 'Male',
    status: 'Available',
    size: 'Small',
    weight: 1.2,
    energy_level: 'Medium',
    vaccination_status: 'Up-to-date',
    spayed_neutered: 'No',
    good_with_children: 'Yes',
    good_with_other_pets: 'Yes',
    description: 'Friendly and curious, loves carrots.',
    imageUrl: 'https://media.istockphoto.com/id/2173557876/photo/cute-eight-week-old-brown-baby-european-rabbit-sitting-and-looking-to-the-side.jpg?s=2048x2048&w=is&k=20&c=wgpa7iAcWveq2kqYsyHVjh8AkfdKluOrFY_oQIWMyBM=',
    rescue_date: '2025-06-15',
    rescue_location: 'Colombo',
    rescue_condition: 'Healthy',
    rescue_center_id: '4',
    type: 'Rabbit'
  },
  {
    id: 's1u2r3i4l',
    name: 'Koko',
    species: 'Monkey',
    breed: 'Suril',
    age: 3,
    gender: 'Female',
    status: 'Available',
    size: 'Medium',
    weight: 5.5,
    energy_level: 'High',
    vaccination_status: 'Up-to-date',
    spayed_neutered: 'No',
    good_with_children: 'No',
    good_with_other_pets: 'No',
    description: 'Playful and intelligent, needs careful handling.',
    imageUrl: 'https://www.bioexplorer.net/images/Javan-surili-f.jpg',
    rescue_date: '2025-07-20',
    rescue_location: 'Kandy',
    rescue_condition: 'Recovered from minor injuries',
    rescue_center_id: '4',
    type: 'Suril'
  }
];


const ManagePetsView: React.FC = () => {
  const [pets, setPets] = useState<IPet[]>([]);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<IPet | null>(null);
  const [form, setForm] = useState<Partial<IPet>>({});

  useEffect(() => {
    // Replace with API call to fetch pets
    setPets(dummyPets);
  }, []);

  const handleEditClick = (pet: IPet) => {
    setSelectedPet(pet);
    setForm({ ...pet });
    setEditOpen(true);
  };

  const handleDelete = (id: string) => {
    // Replace with API call to delete pet
    setPets((prev) => prev.filter((pet) => pet.id !== id));
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleEditSave = () => {
    if (!selectedPet) return;
    // Replace with API call to update pet
    setPets((prev) =>
      prev.map((pet) =>
        pet.id === selectedPet.id ? { ...pet, ...form } as IPet : pet
      )
    );
    setEditOpen(false);
    setSelectedPet(null);
    setForm({});
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedPet(null);
    setForm({});
  };

  return (
    <div>
      <h2 style={{ color: "#226918", marginBottom: 24 }}>Manage Pets</h2>
      <TableContainer component={Paper} style={{ borderRadius: 12 }}>
        <Table>
          <TableHead>
            <TableRow style={{ background: "#f4f8f6" }}>
              <TableCell style={{ color: "#226918", fontWeight: 600 }}>
                Name
              </TableCell>
              <TableCell style={{ color: "#226918", fontWeight: 600 }}>
                Type
              </TableCell>
              <TableCell style={{ color: "#226918", fontWeight: 600 }}>
                Breed
              </TableCell>
              <TableCell style={{ color: "#226918", fontWeight: 600 }}>
                Age
              </TableCell>
              <TableCell style={{ color: "#226918", fontWeight: 600 }}>
                Status
              </TableCell>
              <TableCell style={{ color: "#226918", fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pets.map((pet) => (
              <TableRow key={pet.id}>
                <TableCell>{pet.name}</TableCell>
                <TableCell>{pet.type}</TableCell>
                <TableCell>{pet.breed}</TableCell>
                <TableCell>{pet.age} {pet.age === 1 ? "year" : "years"}</TableCell>
                <TableCell>
                  <span
                    style={{
                      color:
                        pet.status === "Available"
                          ? "#1e7735"
                          : pet.status === "Pending"
                          ? "#e67e22"
                          : "#2d98da",
                      fontWeight: 600,
                    }}
                  >
                    {pet.status}
                  </span>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(pet)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(pet.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {pets.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No pets found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Pet Modal */}
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Pet Details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              margin="normal"
              label="Name"
              name="name"
              value={form.name || ""}
              onChange={handleFormChange}
              fullWidth
              required
            />
            <TextField
              margin="normal"
              label="Type"
              name="type"
              value={form.type || ""}
              onChange={handleFormChange}
              fullWidth
              required
            />
            <TextField
              margin="normal"
              label="Breed"
              name="breed"
              value={form.breed || ""}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              margin="normal"
              label="Age"
              name="age"
              type="number"
              value={form.age || ""}
              onChange={handleFormChange}
              fullWidth
              required
              inputProps={{ min: 0 }}
            />
            <TextField
              margin="normal"
              label="Status"
              name="status"
              value={form.status || ""}
              onChange={handleFormChange}
              fullWidth
              required
            />
            <TextField
              margin="normal"
              label="Description"
              name="description"
              value={form.description || ""}
              onChange={handleFormChange}
              fullWidth
              multiline
              rows={3}
            />
            {/* Optionally, add image upload here */}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManagePetsView;
