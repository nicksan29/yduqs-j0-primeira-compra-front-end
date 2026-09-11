import { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Header } from './components/Header';
import { PageBanner } from './components/PageBanner';
import { OfferCard } from './components/OfferCard';
import { Footer } from './components/Footer';
import { mockApi } from './services/mockApi';
import type { Course } from './types';
import Typography from '@mui/material/Typography';

export function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getCourses().then((data) => {
      setCourses(data);
      setLoading(false);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        <Header />

        <Box component="main" sx={{ flexGrow: 1 }}>

          <PageBanner />

          <Box sx={{ maxWidth: '1190px', margin: '0 auto', px: { xs: 3, lg: 0 }, py: 5 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <CircularProgress /> 
              </Box>
            ) : (
              <Box>
                <Typography variant="body3" sx={{ display: 'block', mb: 2 }}>
                  {courses[0]?.offers.length} opções encontradas
                </Typography>

                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  {courses[0]?.offers.map((offer) => (
                    <OfferCard key={offer.id} offer={offer} />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
