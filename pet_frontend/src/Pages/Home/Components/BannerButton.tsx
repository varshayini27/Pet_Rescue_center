import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BannerButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'darkred',
  color: 'white',
  fontWeight: 'bold',
  padding: '10px 20px',
  animation: 'pulse 1.5s infinite ease-in-out',
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.1)' },
    '100%': { transform: 'scale(1)' },
  },
  '&:hover': {
    backgroundColor: 'darkred',
    animation: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '8px 16px',
  },
}));
