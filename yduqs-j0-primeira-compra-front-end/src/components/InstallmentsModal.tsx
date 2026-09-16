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
  onConfirm: () => void;
}

export function InstallmentsModal({ open, onClose, offer, onConfirm }: InstallmentsModalProps) {
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
          width: { xs: '100%', md: '600px' },
          borderRadius: 0,
        }
      }}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: { xs: '16px 8px 16px 16px', md: '24px 16px 24px 32px' },
        borderBottom: '1px solid #E0E0E0'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{
            fontFamily: 'Montserrat',
            fontWeight: 500,
            fontSize: { xs: '24px', md: '32px' },
            lineHeight: '120%'
          }} component={'h2'}>
            Mais detalhes
          </Typography>
        </Box>
        <Box sx={{ px: { xs: 0, md: '12px' }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton onClick={onClose} sx={{ color: 'black' }}>
            <X size={24} />
          </IconButton>
        </Box>
      </Box>

      <DialogContent sx={{ p: { xs: '0 16px', md: '0 32px' }, display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 2 } }}>


        {offer.modality !== 'Digital (EaD)' ? (
          <>

            <Box sx={{ pt: { xs: 2, md: 3 }, pb: 0 }}>
              <Typography variant='body3' component="p">
                Qual dessas opções de parcelas você prefere?
              </Typography>
            </Box>


            <Box sx={{
              width: '100%',
              maxWidth: '536px',
              flexShrink: 0,
              borderRadius: '8px',
              border: '1px solid #144BC8',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>

              <Box sx={{
                bgcolor: 'primary.main',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                px: 2,
                py: 1,
                textTransform: 'none',
                flexShrink: 0
              }}>
                <Typography component='p' variant='body1' sx={{ lineHeight: '171%' }}>Parcelas</Typography>
                <Typography component='p' variant='body1' sx={{ lineHeight: '171%', marginRight: 5.5 }}>Total</Typography>
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
                      px: 2,
                      py: 2,
                      borderBottom: index !== formattedInstallments.length - 1 ? '1px solid #144BC8' : 'none',
                      cursor: 'pointer',

                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Radio
                        checked={selectedInstallment === opt.installments}
                        onChange={() => setSelectedInstallment(opt.installments)}
                        icon={<Box sx={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid #121212' }} />}
                        checkedIcon={<Box sx={{ width: 20, height: 20, borderRadius: '50%', border: '6px solid #121212', bgcolor: 'white' }} />}
                        sx={{
                          p: 0,
                          mr: 1
                        }}
                      />
                      <Typography component='p' sx={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, lineHeight: '117%' }}>
                        {opt.installments}x {opt.formattedInstallment}
                      </Typography>
                    </Box>
                    <Typography component='p' sx={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, color: '#686868ff', lineHeight: '171%' }}>
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
            px: { xs: 2, md: 3 },
            pb: { xs: 2, md: 3 },
            pt: { xs: 2, md: 3 },
            mx: { xs: '-16px', md: '-32px' },
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}>
            <Info size={24} color="white" />
            <Typography variant='body1' component="h3">
              Inscreva-se para saber tudo sobre os valores e garantir a sua vaga!
            </Typography>
          </Box>
        )}


        <Box sx={{ display: 'flex', flexDirection: 'column', pb: { xs: 6, md: 9 }, pt: { xs: 2, md: 4 }, maxWidth: '536px' }}>

          <Accordion
            expanded={expandedAccordion === 'bolsa'}
            onChange={handleAccordionChange('bolsa')}
            sx={{ border: '1px solid #E0E0E0', borderRadius: '8px !important', boxShadow: 'none', '&:before': { display: 'none' }, mb: 2 }}
          >
            <AccordionSummary expandIcon={expandedAccordion === 'bolsa' ? <Minus size={24} /> : <Plus size={24} />} sx={{ p: { xs: 2, md: 3 }, minHeight: '72px', gap: 2 }}>
              <Typography variant="caption" component="h2">Sobre a Bolsa Incentivo</Typography>
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
            <AccordionSummary expandIcon={expandedAccordion === 'resumo' ? <Minus size={24} /> : <Plus size={24} />} sx={{ p: { xs: 2, md: 3 }, minHeight: '72px', gap: 2 }}>
              <Typography variant="caption" component="h2">Resumo das suas escolhas</Typography>
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
          onClick={onConfirm}
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
