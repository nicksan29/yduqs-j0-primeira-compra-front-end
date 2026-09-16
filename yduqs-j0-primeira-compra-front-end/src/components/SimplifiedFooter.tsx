import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function SimplifiedFooter() {
  return (
    <Box sx={{ width: '100%', bgcolor: 'primary.dark' }}>
      
      <Box sx={{ 
        display: { xs: 'block', md: 'none' }, 
        bgcolor: 'primary.light', 
        width: '100%',
        py: 3,
        px: 2
      }}>
        <Box sx={{ maxWidth: '1366px', margin: '0 auto' }}>
          <img src="/src/assets/Logo_Footer.png" alt="Estácio" style={{ height: '32px' }} />
        </Box>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Box sx={{
          maxWidth: '1366px',
          margin: '0 auto',
          minHeight: '96px',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          p: { xs: '24px 16px', lg: '24px 88px' },
          gap: { xs: 4, md: 0 }
        }}>


        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, gap: { xs: '16px', md: '32px' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/src/assets/Wpp.png" alt="WhatsApp" style={{ height: '40px' }} />
            <Typography sx={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}>
              Precisa de ajuda?
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/src/assets/Phone.png" alt="Telefone" style={{ height: '40px' }} />
            <Typography sx={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}>
              0800 771 5055
            </Typography>
          </Box>
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: { xs: '16px', md: '16px' },
          width: { xs: '100%', md: 'auto' }
        }}>
          <Typography sx={{ fontFamily: 'Inter', fontSize: '14px', color: '#FFFFFF', opacity: 0.8, cursor: 'pointer' }}>
            Política de privacidade
          </Typography>
          <Typography sx={{ display: { xs: 'block', md: 'none' }, fontFamily: 'Inter', fontSize: '14px', color: '#FFFFFF', opacity: 0.8, cursor: 'pointer' }}>
            Preferências de cookies
          </Typography>

          <Typography sx={{ display: { xs: 'none', md: 'block' }, fontFamily: 'Inter', fontSize: '14px', color: '#FFFFFF', opacity: 0.4 }}>|</Typography>

          <Box sx={{ display: { xs: 'block', md: 'none' }, width: '100%', height: '1px', bgcolor: '#FFFFFF', my: 1 }} />

          <Typography sx={{ fontFamily: 'Inter', fontSize: '14px', color: '#FFFFFF', opacity: 0.8 }}>
            Estácio Brasil - Todos os direitos reservados
          </Typography>
        </Box>
      </Box>
      </Box>
    </Box>
  );
}
