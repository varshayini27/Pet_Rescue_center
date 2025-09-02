import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';

interface PasswordFieldProps {
  label: string;
  name: string;
  register: any;
  required?: boolean;
  placeholder?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  name,
  register,
  required = false,
  placeholder = ''
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ marginBottom: '1rem', width: '300px' }}>
      <label
        style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: 'bold',
        }}
      >
        {label}
      </label>
      <div
        style={{
          position: 'relative',
          width: '100%',
        }}
      >
        <input
          {...register(name, { required })}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          style={{
            width: '100%',
            height: '56px',
            padding: '0.5rem 2.5rem 0.5rem 0.75rem', // leave space for icon
            borderRadius: '4px',
            border: '1px solid #ccc',
            boxSizing: 'border-box',
            fontSize: '16px',
          }}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            padding: 0,
            margin: 0,
            cursor: 'pointer',
            color: '#666',
          }}
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
