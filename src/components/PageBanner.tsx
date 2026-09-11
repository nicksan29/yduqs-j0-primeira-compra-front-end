import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export function PageBanner() {
    return (
        <Box sx={{
            width: "100%",
            bgcolor: 'primary.main',
            color: 'background.paper',
            py: { xs: 3, md: 5 },

            gap: { xs: 1, md: 2 },
        }}
        >
            <Container
                disableGutters
                sx={{
                    maxWidth: "1190px !important",
                    px: { xs: 3, lg: 0 },
                    display: "flex",
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: { xs: 1, md: 1 },
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        fontSize: { xs: '24px', md: '32px' }
                    }}
                >
                    Vamos começar, escolha as opções do seu curso
                </Typography>
                <Typography
                    variant="body1"
                >
                    Use os filtros para saber o preço do seu curso e fazer sua inscrição.

                </Typography>
            </Container>
        </Box>
    );
}


