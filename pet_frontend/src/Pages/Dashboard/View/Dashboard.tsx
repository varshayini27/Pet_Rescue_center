import React, { useEffect, useState } from "react";
import { Box, Card, Typography, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPetsByRescueCenter, fetchAllAdoptionRequest, fetchAllDonation } from "../../../Services/fetch";
import type { ReduxState } from "../../../Components/types/redux";
import type { IAdoption } from "../../../Components/types/adoption";
import type { IDonation } from "../../../Components/types/donation";
import type { IPet } from "../../../Components/types/Pets";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#4caf50", "#2196f3", "#ff9800", "#f44336", "#9c27b0", "#00bcd4"];

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const rescueCenterId = useSelector((state: ReduxState) => state?.auth?.rescueCenterId) as string;

  const [pets, setPets] = useState<IPet[]>([]);
  const [adoptions, setAdoptions] = useState<IAdoption[]>([]);
  const [donations, setDonations] = useState<IDonation[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!rescueCenterId) {
          setPets([]);
          setAdoptions([]);
          setDonations([]);
          setLoading(false);
          return;
        }
        // Fetch pets for this rescue center
        const petsData = await fetchAllPetsByRescueCenter(dispatch, rescueCenterId);
        setPets(petsData || []);

        // Fetch all adoptions, then filter by pets belonging to this rescue center
        const adoptionsData = await fetchAllAdoptionRequest(dispatch);
        const petIds = (petsData || []).map((pet: any) => pet.pet_id);
        const filteredAdoptions =
          adoptionsData?.filter((adoption: IAdoption) =>
            petIds.includes(adoption.pet_id)
          ) || [];
        setAdoptions(filteredAdoptions);

        // Fetch all donations, then filter by rescue center
        const donationsData = await fetchAllDonation(dispatch);
        const filteredDonations =
          donationsData?.filter((donation: IDonation) =>
            donation.rescue_center_id === rescueCenterId
          ) || [];
        setDonations(filteredDonations);
      } catch (e) {
        setPets([]);
        setAdoptions([]);
        setDonations([]);
      }
      setLoading(false);
    };
    fetchData();
  }, [dispatch, rescueCenterId]);

  // --- Data Aggregation ---

  // Pets
  const totalPets = pets.length;
  // If your pet object has no status/type, these will be 0
  const adoptedPets = pets.filter((pet: any) => pet.status?.toLowerCase() === "adopted").length;
  const availablePets = pets.filter((pet: any) => pet.status?.toLowerCase() === "available").length;

  // Adoptions
  const totalAdoptions = adoptions.length;
  const pendingAdoptions = adoptions.filter((a: any) => a.status?.toLowerCase() === "pending").length;
  const approvedAdoptions = adoptions.filter((a: any) => a.status?.toLowerCase() === "approved").length;
  const rejectedAdoptions = adoptions.filter((a: any) => a.status?.toLowerCase() === "rejected").length;

  // Donations
  const totalDonationAmount = donations.reduce((sum, d) => sum + d.amount, 0);
  const uniqueDonors = new Set(donations.map((d) => d.user_id)).size;
  const largestDonation = donations.reduce((max, d) => (d.amount > max ? d.amount : max), 0);
  const topDonor =
    donations.length > 0
      ? donations.reduce((a, b) => (a.amount > b.amount ? a : b)).name
      : "-";

  // Donations by date (for chart)
  const donationsByDate = (() => {
    const map: { [date: string]: number } = {};
    donations.forEach((d) => {
      map[d.date] = (map[d.date] || 0) + d.amount;
    });
    return Object.entries(map)
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  })();

  // Pets by type (for pie chart)
  const petsByType = (() => {
    const map: { [species: string]: number } = {};
    pets.forEach((pet: any) => {
      if (pet.species) {
        map[pet.species] = (map[pet.species] || 0) + 1;
      }
    });
    return Object.entries(map).map(([species, value]) => ({ name: species, value }));
  })();

  // Adoptions by status (for bar chart)
  const adoptionsByStatus = [
    { status: "Pending", count: pendingAdoptions },
    { status: "Approved", count: approvedAdoptions },
    { status: "Rejected", count: rejectedAdoptions },
  ];

  // --- UI ---

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Rescue Center Dashboard
      </Typography>

      {/* Summary Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mb: 3,
        }}
      >
        <Card sx={{ flex: "1 1 200px", p: 3, textAlign: "center", bgcolor: "#e3f2fd", minWidth: 180 }}>
          <Typography variant="h5" color="primary" fontWeight={700}>
            {totalPets}
          </Typography>
          <Typography variant="subtitle1">Total Pets</Typography>
        </Card>
        <Card sx={{ flex: "1 1 200px", p: 3, textAlign: "center", bgcolor: "#e8f5e9", minWidth: 180 }}>
          <Typography variant="h5" color="success.main" fontWeight={700}>
            {adoptedPets}
          </Typography>
          <Typography variant="subtitle1">Adopted Pets</Typography>
        </Card>
        <Card sx={{ flex: "1 1 200px", p: 3, textAlign: "center", bgcolor: "#fff3e0", minWidth: 180 }}>
          <Typography variant="h5" color="warning.main" fontWeight={700}>
            {availablePets}
          </Typography>
          <Typography variant="subtitle1">Available Pets</Typography>
        </Card>
        <Card sx={{ flex: "1 1 200px", p: 3, textAlign: "center", bgcolor: "#f3e5f5", minWidth: 180 }}>
          <Typography variant="h5" color="secondary" fontWeight={700}>
            {totalAdoptions}
          </Typography>
          <Typography variant="subtitle1">Adoption Requests</Typography>
        </Card>
      </Box>

      {/* Quick Stats */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mb: 3,
        }}
      >
        <Card sx={{ flex: "1 1 200px", p: 2, textAlign: "center", bgcolor: "#f5f5f5", minWidth: 180 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Total Donations
          </Typography>
          <Typography variant="h6" color="primary" fontWeight={700}>
            ${totalDonationAmount}
          </Typography>
        </Card>
        <Card sx={{ flex: "1 1 200px", p: 2, textAlign: "center", bgcolor: "#f5f5f5", minWidth: 180 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Unique Donors
          </Typography>
          <Typography variant="h6" color="success.main" fontWeight={700}>
            {uniqueDonors}
          </Typography>
        </Card>
        <Card sx={{ flex: "1 1 200px", p: 2, textAlign: "center", bgcolor: "#f5f5f5", minWidth: 180 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Largest Donation
          </Typography>
          <Typography variant="h6" color="warning.main" fontWeight={700}>
            ${largestDonation}
          </Typography>
        </Card>
        <Card sx={{ flex: "1 1 200px", p: 2, textAlign: "center", bgcolor: "#f5f5f5", minWidth: 180 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Top Donor
          </Typography>
          <Typography variant="h6" color="secondary" fontWeight={700}>
            {topDonor}
          </Typography>
        </Card>
      </Box>

      {/* Charts */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        <Card sx={{ flex: "1 1 350px", p: 2, minWidth: 320, height: 370 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Donations Over Time
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={donationsByDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#4caf50" name="Total Amount" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card sx={{ flex: "1 1 350px", p: 2, minWidth: 320, height: 370 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Pets by Type
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={petsByType}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {petsByType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card sx={{ flex: "1 1 350px", p: 2, minWidth: 320, height: 370 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Adoption Requests by Status
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={adoptionsByStatus}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#2196f3" name="Requests" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;

