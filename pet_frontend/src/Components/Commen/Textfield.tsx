import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const FormInput = ({ name, control, label, rules, ...props }: any) => (
    <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
            <TextField
                {...field}
                fullWidth
                label={label}
                error={!!error}
                helperText={error?.message}
                margin="normal"
                {...props}
                 sx={{
                    width: '300px',    
                    height: '56px'     
                }}
            />
        )}
    />
);

export default FormInput;
