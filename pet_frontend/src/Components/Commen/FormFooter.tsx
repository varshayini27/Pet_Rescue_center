import React from "react";
import { Box, Button } from "@mui/material";

interface FormFooterProps {
  isEditMode?: boolean;
  handleCancel?: () => void;
  labelText?: string;
}

const FormFooter: React.FC<FormFooterProps> = ({
  isEditMode,
  handleCancel,
  labelText
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        gap: 2,
        mt: 3,
      }}
    >
      <Button
        variant="contained"
        type="submit"
        style={{ backgroundColor: '#084C11', color: '#fff', marginRight: '8px' }}
      >
        {isEditMode ? "Save Changes" : labelText ? labelText : "Create"}
      </Button>
      <Button
        variant="outlined"
        type="button"
        onClick={handleCancel}
        sx={{
          color: '#084C11',
          borderColor: '#084C11',
          '&:hover': {
            borderColor: '#06360D',
            backgroundColor: '#F0FFF4'
          }
        }}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default FormFooter;
