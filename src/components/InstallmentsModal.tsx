import { useState, useMemo } from 'react';
import Drawer from '@mui/material/Drawer';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { X, Plus, Minus, Info } from 'lucide-react';
import type { Offer } from '../types';

interface InstallmentsModalProps {
  open: boolean;
  onClose: () => void;
  offer: Offer;
}

export function InstallmentsModal({ open, onClose, offer }: InstallmentsModalProps) {
  const [selectedInstallment, setSelectedInstallment] = useState<number>(offer.installmentsOptions?.[0]?.installments || 1);
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(false);

  const formattedInstallments = useMemo(() => {
    return (offer.installmentsOptions || []).map(option => ({
      ...option,
      formattedInstallment: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(option.installmentValue),
      formattedTotal: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(option.totalValue)
    }));
  }, [offer.installmentsOptions]);

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '320px', md: '600px' }, 
          borderRadius: { xs: 0, md: '8px 0 0 8px' }, 
        }
      }}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: { xs: '72px', md: '96px' },
        p: { xs: '16px 8px 16px 16px', md: '24px 16px 24px 32px' },
        borderBottom: '1px solid #E0E0E0'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{
            fontFamily: 'Montserrat',
            fontWeight: 500,
            fontSize: { xs: '24px', md: '32px' },
            lineHeight: '120%'
          }}>
            Mais detalhes
          </Typography>
        </Box>
        <Box sx={{ px: { xs: 0, md: '12px' }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton onClick={onClose} sx={{ color: 'black' }}>
            <X size={24} />
          </IconButton>
        </Box>
      </Box>

      <DialogContent sx={{ p: { xs: '0 16px', md: '0 32px' }, display: 'flex', flexDirection: 'column', gap: { xs: '16px', md: '24px' } }}>
        
        
        {offer.modality !== 'Digital (EaD)' ? (
          <>
            
            <Box sx={{ pt: { xs: '16px', md: '24px' }, pb: '16px' }}>
              <Typography sx={{
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '135%'
              }}>
                Qual dessas opções de parcelas você prefere?
              </Typography>
            </Box>

            
            <Box sx={{
              width: '100%',
              maxWidth: '536px',
              flexShrink: 0, 
              borderRadius: '8px',
              border: '1px solid #E0E0E0',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              
              <Box sx={{
                bgcolor: 'primary.main',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                px: '24px',
                py: '12px',
                textTransform: 'none',
                flexShrink: 0 
              }}>
                <Typography sx={{ fontWeight: 400, fontSize: '14px' }}>Parcelas</Typography>
                <Typography sx={{ fontWeight: 400, fontSize: '14px' }}>Total</Typography>
              </Box>

              
              <Box sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', flex: 1 }}>
                {formattedInstallments.map((opt, index) => (
                  <Box
                    key={opt.installments}
                    onClick={() => setSelectedInstallment(opt.installments)}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      px: '16px',
                      py: '12px',
                      borderBottom: index !== formattedInstallments.length - 1 ? '1px solid #E0E0E0' : 'none',
                      cursor: 'pointer',
                      bgcolor: selectedInstallment === opt.installments ? 'rgba(20, 75, 200, 0.05)' : 'transparent',
                      '&:hover': { bgcolor: 'rgba(20, 75, 200, 0.05)' }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Radio
                        checked={selectedInstallment === opt.installments}
                        onChange={() => setSelectedInstallment(opt.installments)}
                        sx={{ p: 0, color: 'primary.main' }}
                      />
                      <Typography sx={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500 }}>
                        {opt.installments}x {opt.formattedInstallment}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, color: '#666' }}>
                      {opt.formattedTotal}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </>
        ) : (
          
          <Box sx={{
            bgcolor: 'primary.main',
            color: 'white',
            p: { xs: '24px 16px', md: 3 },
            mx: { xs: '-16px', md: '-32px' }, 
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}>
            <Info size={24} color="white" />
            <Typography sx={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 400, lineHeight: '150%' }}>
              Inscreva-se para saber tudo sobre os valores e garantir a sua vaga!
            </Typography>
          </Box>
        )}

        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', pb: { xs: '24px', md: '32px' }, pt: { xs: '24px', md: 0 }, maxWidth: '536px' }}>

          <Accordion
            expanded={expandedAccordion === 'bolsa'}
            onChange={handleAccordionChange('bolsa')}
            sx={{ border: '1px solid #E0E0E0', borderRadius: '8px !important', boxShadow: 'none', '&:before': { display: 'none' } }}
          >
            <AccordionSummary expandIcon={expandedAccordion === 'bolsa' ? <Minus size={24} /> : <Plus size={24} />} sx={{ px: '24px', minHeight: '72px' }}>
              <Typography sx={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '16px' }}>Sobre a Bolsa Incentivo</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: '24px', pb: '24px' }}>
              <Typography variant="body1">Detalhes da bolsa incentivo aplicáveis a esta oferta.</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expandedAccordion === 'resumo'}
            onChange={handleAccordionChange('resumo')}
            sx={{ border: '1px solid #E0E0E0', borderRadius: '8px !important', boxShadow: 'none', '&:before': { display: 'none' } }}
          >
            <AccordionSummary expandIcon={expandedAccordion === 'resumo' ? <Minus size={24} /> : <Plus size={24} />} sx={{ px: '24px', minHeight: '72px' }}>
              <Typography sx={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '16px' }}>Resumo das suas escolhas</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: '24px', pb: '24px' }}>
              <Typography variant="body1">
                Você selecionou o curso  na modalidade <strong>{offer.modality}</strong>.
              </Typography>
            </AccordionDetails>
          </Accordion>

        </Box>
      </DialogContent>

      
      <Box sx={{
        width: '100%',
        height: '96px',
        borderTop: '1px solid #E0E0E0',
        p: { xs: '24px 16px', md: '24px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            width: '100%',
            maxWidth: '552px',
            height: '48px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 600,
            textTransform: 'none'
          }}
        >
          Avançar
        </Button>
      </Box>
    </Drawer>
  );
}
