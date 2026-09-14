/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { EnrollmentForm } from '../components/EnrollmentForm';

describe('EnrollmentForm Validation Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve exibir mensagens de erro do Zod ao submeter campos em branco', async () => {
    const mockOnSuccess = vi.fn();
    const user = userEvent.setup();

    render(<EnrollmentForm onSuccess={mockOnSuccess} />);

    const termsCheckbox = screen.getByRole('checkbox', { name: /Li e concordo com os/i });
    await user.click(termsCheckbox);

    const submitButton = screen.getByRole('button', { name: /Avançar/i });
    expect(submitButton).not.toBeDisabled();

    await user.click(submitButton);

    expect(await screen.findByText('Digite seu nome completo.')).toBeInTheDocument();
    expect(screen.getByText('CPF inválido.')).toBeInTheDocument();
    expect(screen.getByText('Data inválida.')).toBeInTheDocument();
    expect(screen.getByText('E-mail inválido.')).toBeInTheDocument();
    expect(screen.getByText('Telefone inválido.')).toBeInTheDocument();

    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('deve aplicar as máscaras automaticamente e permitir o envio correto', async () => {
    const mockOnSuccess = vi.fn();
    const user = userEvent.setup();

    vi.spyOn(window, 'alert').mockImplementation(() => { });

    render(<EnrollmentForm onSuccess={mockOnSuccess} />);

    // 1. Nome
    await user.type(screen.getByPlaceholderText('Nome completo'), 'Marina Borges');

    const cpfInput = screen.getByPlaceholderText('CPF');
    await user.type(cpfInput, '09168565945');
    expect(cpfInput).toHaveValue('091.685.659-45');

    await user.type(screen.getByPlaceholderText('Data de nascimento'), '03111998');
    expect(screen.getByPlaceholderText('Data de nascimento')).toHaveValue('03/11/1998');

    await user.type(screen.getByPlaceholderText('E-mail'), 'marina@gmail.com');

    await user.type(screen.getByPlaceholderText('Celular para contato'), '19900009445');
    expect(screen.getByPlaceholderText('Celular para contato')).toHaveValue('(19) 90000-9445');

    await user.type(screen.getByPlaceholderText('Ano de conclusão do ensino médio'), '2015');

    await user.click(screen.getByRole('checkbox', { name: /Li e concordo com os/i }));

    await user.click(screen.getByRole('button', { name: /Avançar/i }));

    expect(mockOnSuccess).toHaveBeenCalledTimes(1);

    expect(mockOnSuccess).toHaveBeenCalledWith({
      name: 'Marina Borges',
      cpf: '091.685.659-45',
      birthDate: '03/11/1998',
      email: 'marina@gmail.com',
      phone: '(19) 90000-9445',
      graduationYear: '2015',
      terms: true,
      whatsapp: false,
    });
  });
});
