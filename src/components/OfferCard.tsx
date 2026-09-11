import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Info } from 'lucide-react';
import type { Offer } from '../types';

interface OfferCardProps {
  offer: Offer;
}

export function OfferCard({ offer }: OfferCardProps) {

  return (
    <Card
      sx={{
        width: { xs: '100%', md: '381px' },
        borderRadius: 1,
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
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="body2">
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
            <Typography variant="body3">
              Inscreva-se para saber tudo sobre os valores e garantir a sua vaga!
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="caption">
              De <span style={{ textDecoration: 'line-through' }}>R$ {offer.originalPrice.toFixed(2)}</span> por até
            </Typography>
            
            {offer.installmentsOptions && offer.installmentsOptions.length > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                <Typography variant="caption" sx={{ fontSize: '14px' }}>
                  {offer.installmentsOptions[offer.installmentsOptions.length - 1].installments}x
                </Typography>
                <Typography variant="h5" component="span" sx={{ fontWeight: 700 }}>
                  R$ {offer.installmentsOptions[offer.installmentsOptions.length - 1].installmentValue.toFixed(2).replace('.', ',')}
                </Typography>
              </Box>
            )}

            <Typography variant="caption" sx={{ fontSize: "14px", lineHeight: "150%" }}>
              à vista R$ {offer.discountPrice?.toFixed(2).replace('.', ',')}
            </Typography>
          </Box>
        )}

        <Button
          variant="contained"
          color="secondary" 
          fullWidth
          sx={{
            height: '48px', 
            px: 3,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '16px',
            fontFamily: 'Inter',
            boxShadow: 'none',
            mt: 'auto' 
          }}
        >
          Avançar
        </Button>
      </Box>

      <Box
        sx={{
          p: 3,
          bgcolor: 'background.paper', 
          color: 'common.black',
          display: 'flex',
          flexDirection: 'column',
          gap: 3 
        }}
      >
        <Typography 
          variant="body2" 
          title={offer.campus.name} 
          sx={{ 
            fontSize: '14px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {offer.campus.name}
        </Typography>
        <Typography 
          variant="body3" 
          color="text.secondary" 
          title={offer.campus.address} 
          sx={{ 
            lineHeight: { xs: "135%", md: "115%" },
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {offer.campus.address}
        </Typography>
      </Box>
    </Card>
  );
}
