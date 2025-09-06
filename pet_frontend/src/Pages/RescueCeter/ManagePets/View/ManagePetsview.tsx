import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import type { IPet } from "../../../../Components/types/Pets";
import AddPetProfile from "../Components/AddPetProfile";
import { useDispatch, useSelector } from "react-redux";
import type { ReduxState } from "../../../../Components/types/redux";
import { fetchAllPetsByRescueCenter } from "../../../../Services/fetch";


const ManagePetsView: React.FC = () => {
  const dispatch=useDispatch()
  const [editMode, setEditMode] = useState(false);
  const [selectedPet, setSelectedPet] = useState<IPet | null>();
  const [form, setForm] = useState<Partial<IPet>>({});
  const [addOpen, setAddOpen] = useState(false);
  const rescueCenterId = useSelector((state: ReduxState) => state?.auth?.rescueCenterId);
  const {pets} = useSelector((state: ReduxState) => state?.pet);

  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);
console.log({rescueCenterId})

  useEffect(() => {
    fetchAllPetsByRescueCenter(dispatch,rescueCenterId ?? "")
  }, []);

  const handleEditClick = (pet: IPet) => {
    setSelectedPet(pet);
    setForm({ ...pet });
    setEditMode(true);
  };

  const handleDelete = (pet_id: string) => {
    // Replace with API call to delete pet
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
    // if (!selectedPet) return;
    // // Replace with API call to update pet
    // setPets((prev) =>
    //   prev.map((pet) =>
    //     pet.pet_id === selectedPet.pet_id ? { ...pet, ...form } as IPet : pet
    //   )
    // );
    setEditMode(false);
    setSelectedPet(null);
    setForm({});
  };

  const handleEditClose = () => {
    setEditMode(false);
    setSelectedPet(null);
    setForm({});
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "#226918",
            color: "#fff",
            fontWeight: 600,
            borderRadius: 8,
            textTransform: "none",
            boxShadow: "0 2px 8px rgba(34, 105, 24, 0.08)",
            padding: "8px 24px",
            fontSize: 16,
            letterSpacing: 0.5,
          }}
          onClick={handleAddOpen}
          startIcon={
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 24,
              height: 24,
              background: "#fff",
              borderRadius: "50%",
              color: "#226918",
              fontWeight: 700,
              fontSize: 20,
              marginRight: 4,
            }}>+</span>
          }
        >
          Add Pet
        </Button>
      </div>
      <h2 style={{ color: "#226918", marginBottom: 24 }}>Manage Pets</h2>
      <TableContainer component={Paper} style={{ borderRadius: 12 }}>
        <Table>
          <TableHead>
            <TableRow style={{ background: "#f4f8f6" }}>
              <TableCell style={{ color: "#226918", fontWeight: 600 }}>
                Name
              </TableCell>
              <TableCell style={{ color: "#226918", fontWeight: 600 }}>
                Rescued By
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
              <TableRow key={pet.pet_id}>
                <TableCell>{pet.name}</TableCell>
                <TableCell>{pet.rescued_by}</TableCell>
                <TableCell>{pet.breed}</TableCell>
                <TableCell>{pet.age} {pet.age === 1 ? "year" : "years"}</TableCell>
                <TableCell>
                  <span
                    style={{
                      color:
                        pet.adoption_status === "AVAILABLE"
                          ? "#1e7735"
                          : pet.adoption_status === "RESAVED"
                            ? "#e67e22"
                            : "red",
                      fontWeight: 600,
                    }}
                  >
                    {pet.adoption_status}
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
                    onClick={() => handleDelete(pet.pet_id)}
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


      {(addOpen || editMode)&& (

        <AddPetProfile
          setAddOpen={setAddOpen}
          addOpen={addOpen}
          setEditMode={setEditMode}
          editMode={editMode}
          selectedPet={selectedPet}
          rescueCenterId={rescueCenterId}
        // You may need to add a callback to refresh the pets list after adding
        />
      )}
    </div>

  );
};

export default ManagePetsView;
