import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { ChevronDown } from 'lucide-react';
import logoFooter from '../assets/Logo_footer.png';
import phoneIcon from '../assets/Phone.png';
import wppIcon from '../assets/Wpp.png';
import seloMec from '../assets/Selo_e-MEC.png';

const topMenu = [
  {
    title: 'A Estácio',
    links: ['Sobre a Estácio', 'Unidades', 'Sustentabilidade', 'Regulamentos', 'Instituições de Ensino', 'Trabalhe na Estácio', 'Convênios com Empresas', 'Seja Parceiro', 'Seja Fornecedor', 'Imprensa']
  },
  {
    title: 'Estude na Estácio',
    links: ['Por que nossa graduação?', 'Por que nossa pós?', 'Bolsas e financiamentos', 'Carreiras', 'Modelos de Ensino', 'Formas de ingresso', 'DIS', 'Internacionalização', 'Clube do aluno', 'Informações e-MEC']
  },
  {
    title: 'Cursos',
    links: ['Graduação', 'Pós graduação', 'Cursos Livres']
  },
  {
    title: 'Inscreva-se',
    links: ['Vestibular', 'Enem', 'Transferência', '2ª Graduação', 'Pós-Graduação', 'Mestrado e Doutorado', 'Cursos livres']
  }
];

const bottomMenu = [
  {
    title: 'Área do Aluno',
    links: ['Acessar área do aluno', 'Aplicativo na App Store', 'Aplicativo na Google Play']
  },
  {
    title: 'Para Começar',
    links: ['Dicas de Estudo', 'Ensino Digital', 'Mercado de Trabalho', 'Sou calouro', 'Por que Estácio?']
  },
  {
    title: 'Redes Sociais',
    links: ['Instagram', 'Facebook', 'Linkedin', 'Youtube']
  },
  {
    title: 'Fale com a gente',
    links: ['Atendimento', 'Ouvidoria']
  }
];

const legalLinks = ['Política de privacidade', 'Código de Ética', 'Preferências de cookies', 'Mapa do site'];

export function Footer() {
  const allMenus = [...topMenu, ...bottomMenu];

  return (
    <Box component="footer" sx={{ bgcolor: 'primary.dark', color: 'white' }}>

      <Box sx={{ bgcolor: 'primary.light', py: { xs: 3, md: 3 } }}>
        <Container maxWidth={false} sx={{ maxWidth: '1190px !important', px: { xs: 3, md: 0 } }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 3 }}>
            <Box component="img" src={logoFooter} alt="Logo Estácio" sx={{ height: '40px' }} />

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 4 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box component="img" src={phoneIcon} alt="Telefone" sx={{ width: `auto`, height: `100%` }} />
                <Typography variant="body1">0800 771 5055</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box component="img" src={wppIcon} alt="WhatsApp" sx={{ width: `auto`, height: `100%` }} />
                <Typography variant="body1">Precisa de ajuda?</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth={false} sx={{ maxWidth: '1190px !important', px: { xs: 3, md: 0 }, pt: 4 }}>

        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box sx={{ display: 'flex', gap: '24px', pb: 4 }}>
            {topMenu.map((column) => (
              <Box key={column.title} sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="subtitle1">{column.title}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {column.links.map(link => (
                    <Typography key={link} variant="body1" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>{link}</Typography>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: '24px', py: 4 }}>
            {bottomMenu.map((column) => (
              <Box key={column.title} sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="subtitle1">{column.title}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {column.links.map(link => (
                    <Typography key={link} variant="body1" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>{link}</Typography>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 4 }}>
          {allMenus.map((menu) => (
            <Accordion
              key={menu.title}
              disableGutters
              sx={{
                bgcolor: 'transparent',
                color: 'white',
                boxShadow: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                '&:before': { display: 'none' }
              }}
            >
              <AccordionSummary expandIcon={<ChevronDown color="white" />} sx={{ px: 0 }}>
                <Typography variant="subtitle1">{menu.title}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0, pb: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {menu.links.map(link => (
                    <Typography key={link} variant="body1">{link}</Typography>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, py: 4, gap: 4 }}>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {legalLinks.map(link => (
              <Typography key={link} variant="body1" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>{link}</Typography>
            ))}
          </Box>

          <Box sx={{ bgcolor: '#273c75', p: 2, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2, maxWidth: { xs: '100%', md: '336px' } }}>
            <Typography variant="body3" sx={{ letterSpacing: "2%", fontSize: "16px", color: 'white', fontWeight: 600, gap: '4px' }}>
              Consulte aqui o cadastro da Instituição no Sistema e-MEC
            </Typography>
            <Box component="img" src={seloMec} alt="Selo e-MEC" sx={{ width: '100%', height: '100%', borderRadius: 1 }} />
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

        <Box sx={{ py: 4 }}>
          <Typography variant="body3" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Estácio Brasil - Todos os direitos reservados
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}
