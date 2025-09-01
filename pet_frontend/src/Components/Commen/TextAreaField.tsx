import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const FormTextarea = ({ name, control, label, rules }: any) => (
    <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
            <TextField
                {...field}
                fullWidth
                label={label}
                multiline
                rows={4}
                error={!!error}
                helperText={error?.message}
                margin="normal"
                 sx={{
                    width: '300px',    
                        
                }}
            />
        )}
    />
);

export default FormTextarea;
