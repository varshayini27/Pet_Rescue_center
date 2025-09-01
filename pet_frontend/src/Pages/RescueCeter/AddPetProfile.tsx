import { useForm } from 'react-hook-form';
import { Box, Button, Typography, Divider, CardContent,Grid } from '@mui/material';
import FormInput from '../../Components/Commen/Textfield';
import FormSelect from '../../Components/Commen/Selectionfield';
import FormTextarea from '../../Components/Commen/TextAreaField';
import DateInput from '../../Components/Commen/DateInput';


const yesNoOptions = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
];

const AddPetProfile: React.FC = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log('Pet Profile:', data);
    // Submit to backend
  };

  return (

    <Box component="form" onSubmit={handleSubmit(onSubmit)} justifyContent="center" >
      <Typography variant="h4" mb={2}>Add Pet Profile</Typography>
      <CardContent>
        <Typography variant="h6" mt={3}>Basic Information</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>

          <FormInput name="name" control={control} label="Pet Name" rules={{ required: 'Required' }} />
          <FormSelect name="species" control={control} label="Species" options={[{ value: 'Dog', label: 'Dog' }, { value: 'Cat', label: 'Cat' }, { value: 'Rabbit', label: 'Rabbit' }]} rules={{ required: 'Required' }} />
          <FormInput name="breed" control={control} label="Breed" rules={{ required: 'Required' }} />

          <FormInput name="age" control={control} label="Age" rules={{ required: 'Required' }} />
          <FormSelect name="gender" control={control} label="Gender" options={[{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }]} rules={{ required: 'Required' }} />
        </Grid>
        
        {/* Section 2: Physical Attributes */}
        <Typography variant="h6" mt={4}>Physical Attributes</Typography>
        <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
        <FormInput name="size" control={control} label="Size" rules={{ required: 'Required' }} />
        <FormInput name="weight" control={control} label="Weight (kg)" rules={{ required: 'Required' }} />
        <FormSelect name="energy_level" control={control} label="Energy Level" options={[{ value: 'Low', label: 'Low' }, { value: 'Medium', label: 'Medium' }, { value: 'High', label: 'High' }]} rules={{ required: 'Required' }} />
</Grid>
        {/* Section 3: Health & Compatibility */}
        <Typography variant="h6" mt={4}>Health & Compatibility</Typography>
        <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
        <FormSelect name="vaccination_status" control={control} label="Vaccinated?" options={yesNoOptions} rules={{ required: 'Required' }} />
        <FormSelect name="spayed_neutered" control={control} label="Spayed/Neutered?" options={yesNoOptions} rules={{ required: 'Required' }} />
        <FormSelect name="good_with_children" control={control} label="Good with Children?" options={yesNoOptions} rules={{ required: 'Required' }} />
        <FormSelect name="good_with_other_pets" control={control} label="Good with Other Pets?" options={yesNoOptions} rules={{ required: 'Required' }} />
</Grid>
        {/* Section 4: Description & Media */}
        <Typography variant="h6" mt={4}>Description & Image</Typography>
        <Divider sx={{ mb: 2 }} />
        <FormTextarea name="description" control={control} label="Pet Story" rules={{ required: 'Required' }} />
        {/* <FormFileUpload name="image" control={control} label="Upload Pet Image" rules={{ required: 'Required' }} /> */}

        <Typography variant="h6" mt={4}>Rescue Details</Typography>
        <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
        <DateInput
          control={control}
          name="rescue_date"
          label="Rescue Date"
          placeholder="Select date"
          maxDate={new Date()}
        />
        <FormInput name="rescue_location" control={control} label="Rescue Location" rules={{ required: 'Required' }} />
        <FormTextarea name="rescue_condition" control={control} label="Condition When Rescued" rules={{ required: 'Required' }} />
        <FormInput name="rescued_by" control={control} label="Rescued By" rules={{ required: 'Required' }} />
</Grid>
        <Box mt={4} textAlign="center">
          <Button variant="contained" type="submit">Submit</Button>
        </Box>
      </CardContent>
    </Box>


  );
};

export default AddPetProfile;
