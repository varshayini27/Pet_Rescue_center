import { MenuItem, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const FormSelect = ({ name, control, label, rules, options }: any) => (
    <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
            <TextField
                {...field}
                select
                fullWidth
                label={label}
                error={!!error}
                helperText={error?.message}
                margin="normal"
                sx={{
                    width: '300px',    
                    height: '56px'     
                }}
            >
                {options.map((option: any) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        )}
    />
);

export default FormSelect;
