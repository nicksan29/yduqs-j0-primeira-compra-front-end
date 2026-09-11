import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


import logo from '../assets/Logo_Estacio.png';

export function Header() {
  return (
    <Box
      component="header"
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        py: { xs: 2, md: 3.5 },
      }}
    >
      <Container
        disableGutters
        sx={{
          maxWidth: '1190px !important',
          px: { xs: 3, lg: 0 },
          display: 'flex',
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo Estácio"
          sx={{
            height: { xs: '32px', md: '40px' },
            width: 'auto',
            objectFit: 'contain'
          }}
        />
      </Container>
    </Box>
  );
}
