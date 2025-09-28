import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import type { IPet } from '../../../Components/types/Pets';
import { showToastError, showToastSuccess1 } from '../../../Components/Commen/TostifyNotification';
import Http from '../../../tools/Http';

interface AdoptionDialogProps {
  open: boolean;
  onClose: () => void;
  pet: IPet | null;
}

interface AdoptionFormInputs {
  full_name: string;
  email: string;
  phone: string;
  reason: string;
}



const AdoptionRequestDialog: React.FC<AdoptionDialogProps> = ({ open, onClose, pet }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdoptionFormInputs>({
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
      reason: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: AdoptionFormInputs) => {
    if (!pet) return;
    try {
    const response = await Http.post(`/adoptions/${pet.pet_id}`, data);
    if(response){
      showToastSuccess1(`Adoption request for ${pet.name} submitted successfully!`);
      reset();
      onClose();
    }

     
    } catch (error: any) {
      showToastError('Failed to submit adoption request. Please try again.');
    }
  };

  // Reset form when dialog closes
  React.useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Adopt {pet?.name || 'Pet'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent dividers>
          <Stack spacing={2} mt={1}>
            <Controller
              name="full_name"
              control={control}
              rules={{ required: 'Full name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Full Name"
                  fullWidth
                  error={!!errors.full_name}
                  helperText={errors.full_name?.message}
                  autoComplete="name"
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'Invalid email address',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  autoComplete="email"
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              rules={{
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9+\- ]+$/,
                  message: 'Invalid phone number',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone Number"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  autoComplete="tel"
                />
              )}
            />
            <Controller
              name="reason"
              control={control}
              rules={{
                required: 'Reason is required',
                minLength: {
                  value: 10,
                  message: 'Reason must be at least 10 characters',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Why do you want to adopt?"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!errors.reason}
                  helperText={errors.reason?.message}
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="error" variant="outlined" disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#084C11',
              '&:hover': { backgroundColor: '#06360D' },
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={22} sx={{ color: 'white' }} /> : 'Submit'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AdoptionRequestDialog;

