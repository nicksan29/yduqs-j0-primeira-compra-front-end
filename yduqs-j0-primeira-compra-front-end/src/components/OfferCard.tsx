import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Info } from 'lucide-react';
import type { Offer } from '../types';

interface OfferCardProps {
  offer: Offer;
  onSelectOffer: (offer: Offer) => void;
}

export function OfferCard({ offer, onSelectOffer }: OfferCardProps) {

  return (
    <Card
      sx={{
        width: { xs: '100%', md: '381px' },
        boxShadow: "none",
        border: '1px solid #144BC8',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >

      <Box
        sx={{
          bgcolor: 'primary.dark',
          color: 'white',
          py: 1,
          px: { xs: 2, md: 3 },
          gap: 1,
          display: 'flex',
        }}
      >
        <Typography variant="body2" component='p'>
          {offer.modality} | {offer.shift}
        </Typography>
      </Box>

      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          px: { xs: 2, md: 3 },
          pt: { xs: 3, md: 3 },
          pb: { xs: 2, md: 3 },
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          flexGrow: 1
        }}
      >
        {offer.isEaDWithoutPrice ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Info size={24} color="white" />
            <Typography variant="body3" component='p'>
              Inscreva-se para saber tudo sobre os valores e garantir a sua vaga!
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="caption" component='p'>
              De <span style={{ textDecoration: 'line-through' }}>R$ {offer.originalPrice?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span> por até
            </Typography>


            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
              <Typography variant="caption" component='p' sx={{ lineHeight: '135%' }}>
                {offer.installmentsOptions[offer.installmentsOptions.length - 1].installments}x
              </Typography>
              <Typography variant="h5" component="span" sx={{ fontSize: { xs: '36px', md: '40px' }, lineHeight: { xs: '20px', md: '28px' }, fontWeight: 700 }}>
                R$ {offer.installmentsOptions[offer.installmentsOptions.length - 1].installmentValue.toFixed(2).replace('.', ',')}
              </Typography>
            </Box>


            <Typography variant="caption" component='p' sx={{ fontSize: "14px", lineHeight: "150%" }}>
              à vista R$ {offer.discountPrice?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </Typography>
          </Box>
        )}

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => onSelectOffer(offer)}
          sx={{
            height: '48px',
            px: 3,
            borderRadius: '8px',

            fontWeight: 500,
            fontSize: '16px',
            fontFamily: 'Inter',
            boxShadow: 'none',
            mt: 'auto',
            gap: 2,
          }}
        >
          Avançar
        </Button>
      </Box>

      <Box
        sx={{
          p: 3,
          bgcolor: 'background.paper',
          color: 'text.primary',
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}
      >
        <Typography
          variant="body2"
          component="p"
          title={offer.campus.name}
          sx={{
            fontSize: '14px',
            whiteSpace: 'nowrap',
          }}
        >
          {offer.campus.name}
        </Typography>
        <Typography
          variant="body3"
          component="p"
          color="text.secondary"
          title={offer.campus.address}
          sx={{
            lineHeight: { xs: "135%", md: "115%" },
            color: 'text.secondary',
          }}
        >
          {offer.campus.address}
        </Typography>
      </Box>
    </Card>
  );
}
