import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" color="primary">
          YDUQS - Primeira Compra
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }} color="text.secondary">
          Hello world
        </Typography>
      </Container>
    </ThemeProvider>
  );
}

export default App;
