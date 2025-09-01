import React from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface NumberFieldProps {
    name: string;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
    required?: boolean;
    placeholder?: string;
    min?: number;
    max?: number;
    step?: number;
}

const NumberField: React.FC<NumberFieldProps> = ({
    name,
    register,
    errors,
    required = true,
    placeholder = "",
    min,
    max,
    step
}) => {
    const hasError = !!errors[name];

    return (
        <div style={{ marginBottom: '1rem', width: '100%' }}>
           
            <input
                {...register(name, {
                    required,
                    valueAsNumber: true,
                    min: min ? { value: min, message: `Minimum value is ${min}` } : undefined,
                    max: max ? { value: max, message: `Maximum value is ${max}` } : undefined
                })}
                type="number"
                placeholder={placeholder}
                min={min}
                max={max}
                step={step}
                required={required}
                style={{
                    width: '300px',    
                    height: '56px',     
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: `1px solid ${hasError ? 'red' : '#ccc'}`,
                    boxSizing: 'border-box'
                }}
            />
            {hasError && (
                <span style={{ color: 'red', fontSize: '0.875rem' }}>
                    {errors[name]?.message?.toString()}
                </span>
            )}
        </div>
    );
};

export default NumberField;
