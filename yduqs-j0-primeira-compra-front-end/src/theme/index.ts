import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#144BC8',
      light: '#FFFFFF1A',
      dark: '#001F66',
    },
    secondary: {
      main: '#EE325D',
    },
    background: {
      default: '#F5F7FA',
      paper: '#ffffff',
    },
    text: {
      primary: '#121212',
      secondary: '#3D3D3D',

    }
  },
  typography: {
    fontFamily: '"Montserrat", "Inter"',
    h4: {
      fontFamily: "Montserrat",
      fontWeight: 500,
      fontSize: '32px',
      lineHeight: '120%',
    },
    h5: {
      fontFamily: "Inter",
      fontWeight: 600,
      fontSize: '36px',
      '@media (min-width:900px)': {
        fontSize: '40px',
      },
      lineHeight: '114%',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
    body1: {
      fontFamily: "Inter",
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '150%',
    },
    body2: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '135%',
    },
    body3: {
      fontFamily: "Inter",
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '133%',
    },
    caption: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '115%',
    },
    subtitle1: {
      fontFamily: "Inter",
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '150%',
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
    }
  },
  shape: {
    borderRadius: 8,
  },
});
