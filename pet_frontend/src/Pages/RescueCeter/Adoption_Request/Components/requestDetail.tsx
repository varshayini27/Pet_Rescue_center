import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from '@mui/material';

interface User {
  name: string;
  email: string;
  phone: string;
}

interface Pet {
  name: string;
  species: string;
  age: number;
}

export interface AdoptionRequest {
  id: number;
  user: User;
  pet: Pet;
  status: 'Pending' | 'Accepted' | 'Rejected';
}

interface Props {
  open: boolean;
  request: AdoptionRequest | null;
  onClose: () => void;
  onAccept: (request: AdoptionRequest) => void;
  onDelete: (request: AdoptionRequest) => void;
}

const AdoptionRequestDetail: React.FC<Props> = ({ open, request, onClose, onAccept, onDelete }) => {
  if (!request) return null;

  return (
    <>
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{
      style: {
        borderRadius: 18,
        boxShadow: '0 8px 32px rgba(34, 105, 24, 0.15)',
        background: '#f9fafb'
      }
    }}>
      <DialogTitle
        sx={{
          background: 'linear-gradient(90deg, #226918 0%, #4caf50 100%)',
          color: '#fff',
          fontWeight: 700,
          fontSize: 24,
          letterSpacing: 1,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          mb: 0
        }}
      >
        Adoption Request Details
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          background: '#f9fafb',
          padding: 4
        }}
      >
        <Box
          mb={4}
          sx={{
            background: '#eaf5ea',
            borderRadius: 3,
            p: 3,
            boxShadow: '0 2px 8px rgba(34, 105, 24, 0.05)'
          }}
        >
          <Typography
            variant="h6"
            mb={2}
            sx={{ color: '#226918', fontWeight: 600, letterSpacing: 0.5 }}
          >
            User Information
          </Typography>
          <Box display="flex" gap={4} mb={1}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Name</Typography>
              <Typography fontWeight={500}>{request.user.name}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Email</Typography>
              <Typography fontWeight={500}>{request.user.email}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
              <Typography fontWeight={500}>{request.user.phone}</Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            background: '#f4f8f6',
            borderRadius: 3,
            p: 3,
            boxShadow: '0 2px 8px rgba(34, 105, 24, 0.04)'
          }}
        >
          <Typography
            variant="h6"
            mb={2}
            sx={{ color: '#226918', fontWeight: 600, letterSpacing: 0.5 }}
          >
            Pet Information
          </Typography>
          <Box display="flex" gap={4} mb={1}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Name</Typography>
              <Typography fontWeight={500}>{request.pet.name}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Species</Typography>
              <Typography fontWeight={500}>{request.pet.species}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Age</Typography>
              <Typography fontWeight={500}>{request.pet.age} {request.pet.age === 1 ? 'year' : 'years'}</Typography>
            </Box>
          </Box>
        </Box>

        <Box mt={4} display="flex" alignItems="center" gap={2}>
          <Typography variant="subtitle1" fontWeight={600} color="text.secondary">
            Status:
          </Typography>
          <Box
            sx={{
              px: 2,
              py: 0.5,
              borderRadius: 2,
              fontWeight: 700,
              color:
                request.status === 'Accepted'
                  ? '#226918'
                  : request.status === 'Rejected'
                  ? '#d32f2f'
                  : '#e67e22',
              background:
                request.status === 'Accepted'
                  ? '#eaf5ea'
                  : request.status === 'Rejected'
                  ? '#fdeaea'
                  : '#fff6e5',
              fontSize: 16,
              minWidth: 90,
              textAlign: 'center'
            }}
          >
            {request.status}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          background: '#f4f8f6',
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
          p: 2,
          justifyContent: 'flex-end'
        }}
      >
        <Button
          color="success"
          variant="contained"
          onClick={() => onAccept(request)}
          sx={{
            minWidth: 110,
            fontWeight: 600,
            boxShadow: 'none',
            textTransform: 'none',
            mr: 1
          }}
          disabled={request.status !== 'Pending'}
        >
          Accept
        </Button>
        <Button
          color="error"
          variant="outlined"
          onClick={() => onDelete(request)}
          sx={{
            minWidth: 110,
            fontWeight: 600,
            textTransform: 'none',
            mr: 1
          }}
        >
          Delete
        </Button>
        <Button
          onClick={onClose}
          sx={{
            minWidth: 110,
            fontWeight: 600,
            textTransform: 'none'
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default AdoptionRequestDetail;
