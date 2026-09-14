/// <reference types="@testing-library/jest-dom" />
import { render, screen, waitFor, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { mockApi } from '../services/mockApi';

vi.mock('../services/mockApi', () => ({
  mockApi: {
    getCourses: vi.fn(),
  },
}));

const mockCoursesData = [
  {
    id: 'course-1',
    title: 'Engenharia de Software',
    offers: [
      {
        id: 'offer-1',
        courseId: 'course-1',
        modality: 'Presencial',
        shift: 'Noite',
        originalPrice: 1000,
        discountPrice: 500,
        installmentsOptions: [{ installments: 1, installmentValue: 500 }],
        campus: { name: 'Campus Teste' }
      }
    ]
  }
];

describe('App Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve exibir o esqueleto de carregamento (progressbar) ao abrir', () => {
    vi.mocked(mockApi.getCourses).mockReturnValue(new Promise(() => { }));

    render(<App />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('deve esconder o carregamento e renderizar a lista de cursos', async () => {
    vi.mocked(mockApi.getCourses).mockResolvedValue(mockCoursesData as any);

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    expect(screen.getByText('1 opções encontradas')).toBeInTheDocument();
  });

  it('deve abrir o modal de parcelas ao clicar em um card de oferta', async () => {
    vi.mocked(mockApi.getCourses).mockResolvedValue(mockCoursesData as any);
    const user = userEvent.setup();

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    const selectButton = screen.getByRole('button', { name: /Avançar/i });
    expect(selectButton).toBeInTheDocument();

    await user.click(selectButton);

    const modalTitle = await screen.findByText(/Qual dessas opções de parcelas você prefere/i);
    expect(modalTitle).toBeInTheDocument();
  });
  it('deve funcionar o accordion e mudar de mais para menos', async () => {
    vi.mocked(mockApi.getCourses).mockResolvedValue(mockCoursesData as any);
    const user = userEvent.setup();

    render(<App />);
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    const selectButton = screen.getByRole('button', { name: /Avançar/i });
    expect(selectButton).toBeInTheDocument();

    await user.click(selectButton);

    const modalTitle = await screen.findByText(/Qual dessas opções de parcelas você prefere/i);
    expect(modalTitle).toBeInTheDocument();

    const accordion = screen.getByText(/Sobre a Bolsa Incentivo/i);

    await user.click(accordion);

    expect(screen.getByText('Detalhes da bolsa incentivo aplicáveis a esta oferta.')).toBeVisible();


  });
  it('deve funcionar a abertura do fopmulário na modal', async () => {
    vi.mocked(mockApi.getCourses).mockResolvedValue(mockCoursesData as any);
    const user = userEvent.setup();

    render(<App />);
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    const cardTitle = screen.getByText(/Presencial/i);
    const cardElement = cardTitle.closest('.MuiCard-root') as HTMLElement;
    const selectButton = within(cardElement).getByRole('button', { name: /Avançar/i });
    expect(selectButton).toBeInTheDocument();

    await user.click(selectButton);

    const modalTitle = await screen.findByText(/Qual dessas opções de parcelas você prefere/i);
    expect(modalTitle).toBeInTheDocument();

    const lastButton = screen.getByRole('button', { name: /Avançar/i });
    expect(lastButton).toBeInTheDocument();

    await user.click(lastButton);

  });

});
