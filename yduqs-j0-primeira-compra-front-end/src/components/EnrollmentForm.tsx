import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import { SimplifiedFooter } from './SimplifiedFooter';
import { mockApi } from '../services/mockApi';


const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
};

const maskDate = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\/\d{4})\d+?$/, '$1');
};

const maskYear = (value: string) => value.replace(/\D/g, '').slice(0, 4);

const validateCPF = (cpf: string) => {
  const cleanCPF = cpf.replace(/\D/g, '');
  if (cleanCPF.length !== 11) return false;
  if (/^(\d)\1+$/.test(cleanCPF)) return false;

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false;

  return true;
};

const formSchema = z.object({
  name: z.string().min(3, "Digite seu nome completo."),
  cpf: z.string().length(14, "CPF inválido.").refine((val) => validateCPF(val), {
    message: "CPF inexistente ou inválido."
  }),
  birthDate: z.string().length(10, "Data inválida."),
  email: z.string().email("E-mail inválido."),
  phone: z.string().min(14, "Telefone inválido."),
  graduationYear: z.string().length(4, "Ano inválido."),
  terms: z.boolean().refine(val => val === true, "Você precisa aceitar os termos do edital."),
  whatsapp: z.boolean()
});

type FormData = z.infer<typeof formSchema>;

interface EnrollmentFormProps {
  onSuccess: (data: FormData) => void;
  offerId?: string;
}

export function EnrollmentForm({ onSuccess, offerId }: EnrollmentFormProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      terms: false,
      whatsapp: false
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      const payload = offerId ? { ...data, offerId } : data;
      await mockApi.submitEnrollment(payload);
      alert("Inscrição enviada e salva no banco de dados com sucesso!");
      onSuccess(data);
    } catch (error) {
      alert("Erro: Já existe uma matrícula para este CPF (ou ocorreu falha de rede)!");
    }
  };

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px',
      height: '56px',
      fontFamily: 'Inter',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '133%',
      '& fieldset': {
        borderColor: '#E0E0E0',
      },
    },
    '& .MuiInputBase-input::placeholder': {
      color: '#121212',
      opacity: 0.62,
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', width: '100%', margin: '0 auto' }}>


      <Box sx={{
        width: '100%',
        bgcolor: 'primary.main',
      }}>
        <Box sx={{
          maxWidth: '1366px',
          height: '118px',
          margin: '0 auto',
          px: { xs: 3, lg: 11 },
          display: 'flex',
          color: 'background.paper',
          alignItems: 'center'
        }}>
          <Typography sx={{ fontSize: { xs: '24px', md: '32px' } }} variant="h4" component={'h2'}>
            Queremos saber um pouco mais sobre você
          </Typography>
        </Box>
      </Box>


      <Box sx={{ flex: 1, width: '100%' }}>
        <Box sx={{
          maxWidth: '1366px',
          margin: '0 auto',
          px: { xs: 3, lg: 11 },
          pt: 6,
          pb: 5
        }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{
            width: '100%',
            maxWidth: '660px',
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}>


            <Box>
              <TextField
                fullWidth
                placeholder="Nome completo"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={textFieldStyles}
              />
              <Typography sx={{ fontFamily: 'Inter', fontWeight: 400, lineHeight: '16px', fontSize: '12px', color: '#121212', opacity: 0.72, mt: 1, ml: 1 }}>
                Preencha seu nome completo, sem abreviações, igual ao seu documento de identificação. <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Confira o exemplo.</span>
              </Typography>
            </Box>

            <TextField
              fullWidth
              placeholder="CPF"
              {...register("cpf")}
              onChange={(e) => setValue('cpf', maskCPF(e.target.value), { shouldValidate: true })}
              error={!!errors.cpf}
              helperText={errors.cpf?.message}
              sx={textFieldStyles}
            />

            <TextField
              fullWidth
              placeholder="Data de nascimento"
              {...register("birthDate")}
              onChange={(e) => setValue('birthDate', maskDate(e.target.value), { shouldValidate: true })}
              error={!!errors.birthDate}
              helperText={errors.birthDate?.message}
              sx={textFieldStyles}
            />

            <TextField
              fullWidth
              placeholder="E-mail"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={textFieldStyles}
            />

            <TextField
              fullWidth
              placeholder="Celular para contato"
              {...register("phone")}
              onChange={(e) => setValue('phone', maskPhone(e.target.value), { shouldValidate: true })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              sx={textFieldStyles}
            />

            <TextField
              fullWidth
              placeholder="Ano de conclusão ..."
              {...register("graduationYear")}
              onChange={(e) => setValue('graduationYear', maskYear(e.target.value), { shouldValidate: true })}
              error={!!errors.graduationYear}
              helperText={errors.graduationYear?.message}
              sx={textFieldStyles}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', mt: '8px' }}>
              <FormControlLabel
                control={<Checkbox {...register("terms")} sx={{ width: 24, height: 24, mr: 1, alignSelf: 'flex-start' }} />}
                label={
                  <Typography sx={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '16px', lineHeight: '133%' }}>
                    Li e concordo com os <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>termos do edital</span>, bem como com o tratamento dos meus dados para fins de prospecção dos serviços educacionais prestados pela Estácio e demais instituições de ensino do mesmo <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Grupo Econômico</span>, de acordo com a nossa <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>política de privacidade.</span>
                  </Typography>
                }
                sx={{ alignItems: 'flex-start', m: 0 }}
              />
              {errors.terms && <Typography color="error" variant="caption" sx={{ ml: 4 }}>{errors.terms.message}</Typography>}

              <FormControlLabel
                control={<Checkbox {...register("whatsapp")} sx={{ width: 24, height: 24, mr: 1 }} />}
                label={
                  <Typography sx={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '16px', lineHeight: '133%' }}>
                    Aceito receber atualizações sobre minha inscrição pelo WhatsApp.
                  </Typography>
                }
                sx={{ m: 0, mt: 1 }}
              />
            </Box>

            <Button
              type="submit"
              disabled={!isValid}
              sx={{
                width: '110px',
                height: '48px',
                mt: '16px',
                borderRadius: '8px',
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: '16px',
                textTransform: 'none',
                px: 3,
                '&.Mui-disabled': {
                  bgcolor: '#E0E0E0',
                  color: '#121212',
                  opacity: 1,
                },
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark'
                }
              }}
            >
              Avançar
            </Button>

          </Box>
        </Box>
      </Box>

      <SimplifiedFooter />
    </Box>
  );
}
