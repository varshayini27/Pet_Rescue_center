import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const ContactUsForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Submitted data:', data);
    // Replace with backend/email logic
    reset();
  };

  return (
    <Box sx={{ py: 5, backgroundColor: '#f9f9f9' }}>
      <Grid container justifyContent="center">
        <Grid>
          <Paper elevation={4} sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              Fill out the form below and we’ll get back to you shortly.
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Name */}
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    margin="normal"
                    label="Name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    margin="normal"
                    label="Email Address"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />

              {/* Phone */}
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                rules={{
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: 'Invalid phone number',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    margin="normal"
                    label="Phone Number"
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />

              {/* Message */}
              <Controller
                name="message"
                control={control}
                defaultValue=""
                rules={{ required: 'Message is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    margin="normal"
                    label="Message"
                    multiline
                    rows={4}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Send Message
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactUsForm;
