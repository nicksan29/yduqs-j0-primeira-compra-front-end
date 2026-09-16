/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { EnrollmentForm } from '../components/EnrollmentForm';
import { mockApi } from '../services/mockApi';

describe('EnrollmentForm Validation Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve desabilitar o botão de enviar quando os campos estiverem em branco ou inválidos', async () => {
    const mockOnSuccess = vi.fn();
    const user = userEvent.setup();

    render(<EnrollmentForm onSuccess={mockOnSuccess} />);

    const submitButton = screen.getByRole('button', { name: /Avançar/i });
    
    expect(submitButton).toBeDisabled();

    await user.type(screen.getByPlaceholderText('E-mail'), 'emailinvalido');
    

    expect(await screen.findByText('E-mail inválido.')).toBeInTheDocument();
  });

  it('deve aplicar as máscaras automaticamente e permitir o envio correto', async () => {
    const mockOnSuccess = vi.fn();
    const user = userEvent.setup();

    vi.spyOn(window, 'alert').mockImplementation(() => { });

    const mockApiSpy = vi.spyOn(mockApi, 'submitEnrollment').mockResolvedValue({ sucess: true } as any);

    render(<EnrollmentForm onSuccess={mockOnSuccess} />);

    await user.type(screen.getByPlaceholderText('Nome completo'), 'Marina Borges');

    const cpfInput = screen.getByPlaceholderText('CPF');
    await user.type(cpfInput, '12345678909');
    expect(cpfInput).toHaveValue('123.456.789-09');

    await user.type(screen.getByPlaceholderText('Data de nascimento'), '03111998');
    expect(screen.getByPlaceholderText('Data de nascimento')).toHaveValue('03/11/1998');

    await user.type(screen.getByPlaceholderText('E-mail'), 'marina@gmail.com');

    await user.type(screen.getByPlaceholderText('Celular para contato'), '19900009445');
    expect(screen.getByPlaceholderText('Celular para contato')).toHaveValue('(19) 90000-9445');

    await user.type(screen.getByPlaceholderText('Ano de conclusão ...'), '2015');

    await user.click(screen.getByRole('checkbox', { name: /Li e concordo com os/i }));

    await user.click(screen.getByRole('button', { name: /Avançar/i }));

    expect(mockOnSuccess).toHaveBeenCalledTimes(1);

    expect(mockOnSuccess).toHaveBeenCalledWith({
      name: 'Marina Borges',
      cpf: '123.456.789-09',
      birthDate: '03/11/1998',
      email: 'marina@gmail.com',
      phone: '(19) 90000-9445',
      graduationYear: '2015',
      terms: true,
      whatsapp: false,
    });
  });
});
