import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

const FormDate = ({ name, control, label, rules }: any) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState: { error } }) => (
      <TextField
        {...field}
        fullWidth
        type="date"
        label={label}
        InputLabelProps={{ shrink: true }}
        margin="normal"
        error={!!error}
        helperText={error?.message}
         sx={{
                    width: '300px',    
                    height: '56px'     
                }}
      />
    )}
  />
);

export default FormDate;
