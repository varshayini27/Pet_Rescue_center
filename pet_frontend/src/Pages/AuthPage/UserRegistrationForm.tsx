import React from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import {
  Box,
  Typography,
  Paper,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import { showToastError, showToastSuccess1 } from '../../Components/Commen/TostifyNotification';
import Http from '../../tools/Http';
import FormInput from '../../Components/Commen/Textfield';
import FormSelect from '../../Components/Commen/Selectionfield';
import PasswordField from '../../Components/Commen/PasswordField';
import NumberField from '../../Components/Commen/NumberField';
import FormFooter from '../../Components/Commen/FormFooter';
import { handleCancel } from '../../Services/service';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';

interface UserFormInputs {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone_no: string;
  gender: string;
  city: string;
}

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' }
];

const UserRegister: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, control, reset } = useForm<UserFormInputs>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
      phone_no: '',
      gender: '',
      city: ''
    }
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const onSubmit: SubmitHandler<UserFormInputs> = async (data) => {
    if (data.password !== data.confirm_password) {
      showToastError("Passwords do not match.");
      return;
    }

    const { confirm_password, ...dataToSend } = data;

    try {
      const response = await Http.post(`/auth/register/adopter`, dataToSend);
      const responseData = response?.data?.data;

      const token = responseData?.token;
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('isLoggedIn', 'true');
        dispatch(setAuth({
          // user: responseData?.staff,
          token: token,
          permissionId: responseData?.staff?.permissions?.permission_id,
        }));
        // dispatch(setUser({ user: responseData?.staff }))
        navigate('/');

      }
      showToastSuccess1(response.data.message || "Registration successful!");

    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Registration failed. Please try again.";
      showToastError(errorMessage);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3f7e4 100%)',
        padding: 3
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          elevation={4}
          sx={{
            maxWidth: 500,
            width: '100%',
            borderRadius: 4,
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: 'linear-gradient(90deg, #084C11, #1ea446)',
              color: 'white',
              textAlign: 'center',
              py: 3
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              Create Your Account
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Join PetConnect and find your new best friend
            </Typography>
          </Box>

          {/* Form */}
          <Box
            sx={{
              p: 4


            }}>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormInput
                  name="first_name"
                  control={control}
                  label="First Name"
                  rules={{ required: 'Required' }}
                />
                {/* <FormInput
                name="last_name"
                control={control}
                label="Last Name"
                rules={{ required: 'Required' }}
              /> */}
              </Box>

              <FormInput
                name="email"
                control={control}
                label="Email Address"
                rules={{ required: 'Required' }}
              />
              <PasswordField
                label="Password"
                name="password"
                register={register}
                required={false}
                placeholder="Enter password"
              />
              <PasswordField
                label="Confirm Password"
                name="confirm_password"
                register={register}
                required={false}
                placeholder="Confirm Password"
              />
              {/* <NumberField
                name="phone_no"
                register={register}
                errors={errors}
                required
                placeholder="Enter Phone Number"
              />
              <FormSelect
                name="gender"
                control={control}
                label="Gender"
                options={genderOptions}
                rules={{ required: 'Required' }}
              />
              <FormInput
                name="city"
                control={control}
                label="City"
                rules={{ required: 'Required' }}
              /> */}

              <Divider sx={{ my: 3 }} />

              <FormFooter
                handleCancel={() => handleCancel(() => { }, reset)}
                labelText='Register'
              />
            </form>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default UserRegister;
