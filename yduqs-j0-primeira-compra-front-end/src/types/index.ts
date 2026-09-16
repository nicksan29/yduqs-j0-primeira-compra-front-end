export type Modality = 'Presencial' | 'Digital (EaD)';
export type Shift = 'Manhã' | 'Tarde' | 'Noite' | 'Flexível'; 

export interface Campus {
  name: string;
  address: string;
}

export interface InstallmentOption {
  installments: number;
  installmentValue: number;
  totalValue: number;
}

export interface Offer {
  id: string;
  modality: Modality;
  shift: Shift;
  originalPrice: number;
  discountPrice?: number;
  installmentsOptions?: InstallmentOption[];
  campus: Campus;
  bolsaIncentivoTexto?: string;
  isEaDWithoutPrice?: boolean;
}

export interface Course {
  id: string;
  title: string;
  offers: Offer[];
}


export interface UserFormData {
  fullName: string;
  cpf: string;
  birthDate: string;
  email: string;
  phone: string;
  graduationYear: string;
  agreeTerms: boolean;
  agreeWhatsApp: boolean;
}
