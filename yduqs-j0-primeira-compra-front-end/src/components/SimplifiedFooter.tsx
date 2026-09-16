import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function SimplifiedFooter() {
  return (
    <Box sx={{
      width: '100%',
      bgcolor: '#041E55',
    }}>
      <Box sx={{
        maxWidth: '1366px',
        margin: '0 auto',
        height: '96px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: { xs: '24px 16px', lg: '24px 88px' }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: '16px', md: '32px' } }}>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/src/assets/Phone.png" alt="Telefone" style={{ height: '32px' }} />
            <Typography sx={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}>
              0800 771 5055
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/src/assets/Wpp.png" alt="WhatsApp" style={{ height: '32px' }} />
            <Typography sx={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}>
              Precisa de ajuda?
            </Typography>
          </Box>

        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: '16px' }}>
          <Typography sx={{ fontFamily: 'Inter', fontSize: '14px', color: '#FFFFFF', opacity: 0.8, cursor: 'pointer' }}>
            Política de privacidade
          </Typography>
          <Typography sx={{ fontFamily: 'Inter', fontSize: '14px', color: '#FFFFFF', opacity: 0.4 }}>|</Typography>
          <Typography sx={{ fontFamily: 'Inter', fontSize: '14px', color: '#FFFFFF', opacity: 0.8 }}>
            Estácio Brasil - Todos os direitos reservados
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
