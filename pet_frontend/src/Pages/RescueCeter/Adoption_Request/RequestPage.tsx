import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Typography } from '@mui/material';
import CommonDataTable from '../../../Components/Commen/Table'; // Adjust the path if needed
import type { TableColumn } from 'react-data-table-component';
import AdoptionRequestDetail from './Components/requestDetail';
import { fetchAllAdoptionRequest } from '../../../Services/fetch';
import { useDispatch, useSelector } from 'react-redux';
import type { ReduxState } from '../../../Components/types/redux';
import type { IAdoption } from '../../../Components/types/adoption';
import Http from '../../../tools/Http';



const AdoptionRequestPage: React.FC = () => {
  // const [requests, setRequests] = useState<AdoptionRequest[]>();
  const [selectedRequest, setSelectedRequest] = useState<IAdoption | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filteredAdoptions, setFilteredAdoptions] = useState<IAdoption[]>([]);
  const rescueCenterId = useSelector((state: ReduxState) => state?.auth?.rescueCenterId);

const dispatch=useDispatch()

useEffect(() => {
  const getAdoptions = async () => {
    const allAdoptions = await fetchAllAdoptionRequest(dispatch);
    if (allAdoptions) {
      const filtered = allAdoptions.filter(
        (adoption: IAdoption) => adoption.pet.rescue_center_id === rescueCenterId
      );
      setFilteredAdoptions(filtered);
      console.log("Filtered Adoptions:", filtered);
    }
  };

  getAdoptions();
}, [dispatch]);

  const handleView = (request: IAdoption) => {
    setSelectedRequest(request);
    setDialogOpen(true);
  };
const handleDelete = async (request: IAdoption) => {
  try {
    await Http.delete(`/adoptions/${request.adoption_id}`);
    // Remove the deleted request from the filteredAdoptions state
    setFilteredAdoptions(prev =>
      prev.filter(adoption => adoption.adoption_id !== request.adoption_id)
    );
  } catch (error) {
    console.error('Failed to delete adoption request:', error);
  }
};


  

  const columns: TableColumn<IAdoption>[] = [
    { name: 'User Name', selector: row => row.full_name, sortable: true },
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
          dataRows={filteredAdoptions}
          dataColumns={columns}
          pagination={true}
          onDelete={handleDelete}
          paginationTotalRows={filteredAdoptions.length}
        />
      </Card>

      <AdoptionRequestDetail
        open={dialogOpen}
        request={selectedRequest}
        onClose={() => setDialogOpen(false)}
      />
    </Box>
  ); 
};

export default AdoptionRequestPage;
