// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
 palette: {
  primary: { main: '#1976d2' },
  error: { main: '#d32f2f' },
  success: { main: '#3c8c3f' },
  warning: { main: '#ed6c02' },
  info: { main: '#0288d1' },
  background: { default: '#f5f5f5' },
  // // custom semantic colors
  // brandBlue: '#0d47a1',
  // cardBackground: '#fafafa',
}

});

export default theme;
