import React, { useState } from 'react';
import { Box, Button, Card, Typography } from '@mui/material';
import CommonDataTable from '../../../Components/Commen/Table'; // Adjust the path if needed
import type { TableColumn } from 'react-data-table-component';
import type { AdoptionRequest } from './Components/requestDetail';
import AdoptionRequestDetail from './Components/requestDetail';

const initialRequests: AdoptionRequest[] = [
  {
    id: 1,
    user: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '123-456-7890',
    },
    pet: {
      name: 'Bella',
      species: 'Dog',
      age: 3,
    },
    status: 'Pending' as 'Pending'
  },
  {
    id: 2,
    user: {
      name: 'Bob Smith',
      email: 'bob@example.com',
      phone: '987-654-3210',
    },
    pet: {
      name: 'Max',
      species: 'Cat',
      age: 2,
    },
  status: 'Pending' as 'Pending'
  },
];

const AdoptionRequestPage: React.FC = () => {
  const [requests, setRequests] = useState<AdoptionRequest[]>(initialRequests);
  const [selectedRequest, setSelectedRequest] = useState<AdoptionRequest | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleView = (request: AdoptionRequest) => {
    setSelectedRequest(request);
    setDialogOpen(true);
  };

  const handleAccept = (request: AdoptionRequest) => {
    // const updated = requests.map(r =>
    //   r.id === request.id ? { ...r, status: 'Accepted' } : r
    // );
    // setRequests(updated);
    // setDialogOpen(false);
  };

  const handleDelete = (request: AdoptionRequest) => {
    const updated = requests.filter(r => r.id !== request.id);
    setRequests(updated);
    setDialogOpen(false);
  };

  const columns: TableColumn<AdoptionRequest>[] = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'User Name', selector: row => row.user.name, sortable: true },
    { name: 'Pet Name', selector: row => row.pet.name, sortable: true },
    { name: 'Status', selector: row => row.status, sortable: true },
    {
      name: 'Action',
      cell: row => (
        <Button variant="outlined" onClick={() => handleView(row)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: 4 }}>
        <Typography variant="h4" mb={3}>Adoption Requests</Typography>

      <Card sx={{ padding: 3, maxWidth: '100%', margin: '0 auto' }}>
        <CommonDataTable
          dataRows={requests}
          dataColumns={columns}
          pagination={true}
          onDelete={handleDelete}
          paginationTotalRows={requests.length}
        />
      </Card>

      <AdoptionRequestDetail
        open={dialogOpen}
        request={selectedRequest}
        onClose={() => setDialogOpen(false)}
        onAccept={handleAccept}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default AdoptionRequestPage;
