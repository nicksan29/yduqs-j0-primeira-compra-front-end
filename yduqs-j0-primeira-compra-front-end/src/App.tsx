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
import type { Course, Offer } from './types';
import Typography from '@mui/material/Typography';
import { InstallmentsModal } from './components/InstallmentsModal';
import { EnrollmentForm } from './components/EnrollmentForm';

export function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'form'>('home');

  const handleOpenModal = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    mockApi.getCourses().then((data) => {
      setCourses(data);
      setLoading(false);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />


      <Header />

      {currentPage === 'form' ? (
        <EnrollmentForm onSuccess={() => setCurrentPage('home')} offerId={selectedOffer?.id} />
      ) : (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Box component="main" sx={{ flexGrow: 1 }}>
            <PageBanner />

            <Box sx={{ maxWidth: '1190px', margin: '0 auto', px: { xs: 3, lg: 0 }, pb: { xs: 3, md: 7 }, pt: { xs: 3, md: 4 } }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Box>
                  <Typography variant="body3" sx={{ display: { xs: 'none', md: 'block' }, mb: 2 }}>
                    {courses[0]?.offers.length} opções encontradas
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    {courses[0]?.offers.map((offer) => (
                      <OfferCard key={offer.id} offer={offer} onSelectOffer={handleOpenModal} />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          <Box sx={{ maxWidth: '100%' }}>
            <Footer />
          </Box>
        </Box>
      )}

      {selectedOffer && (
        <InstallmentsModal
          open={isModalOpen}
          onClose={handleCloseModal}
          offer={selectedOffer}
          onConfirm={() => {
            setIsModalOpen(false);
            setCurrentPage('form');
          }}
        />
      )}
    </ThemeProvider>
  );
}

export default App;
