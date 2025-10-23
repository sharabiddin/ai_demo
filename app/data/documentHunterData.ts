export interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  date: string;
  hasAttachment: boolean;
  attachments?: Attachment[];
  body: string;
  isRelevant?: boolean;
}

export interface Attachment {
  id: string;
  filename: string;
  type: string;
  size: string;
  isDocument?: boolean;
  extractedText?: string;
  relevanceScore?: number;
}

export interface DocumentHunterStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed';
  duration?: number;
  details?: string;
}

export const mockEmails: Email[] = [
  {
    id: '1',
    from: 'hr@company.com',
    to: 'elvin.quliyev@company.com',
    subject: 'TechCorp-a xoş gəlmisiniz - Əmək müqaviləsi',
    date: '2023-03-15',
    hasAttachment: true,
    attachments: [
      {
        id: 'att1',
        filename: 'Emek_Muqavilesi_Elvin_Quliyev.pdf',
        type: 'application/pdf',
        size: '245 KB',
        isDocument: true,
        extractedText: 'ƏMƏK MÜQAVİLƏSİ\n\nİşçi: Elvin Quliyev\nVəzifə: Senior Developer\nBaşlama tarixi: 20 Mart 2023\nMaaş: $95,000 illik\nSosial paket: Sağlamlıq sığortası, Stomatoloji, Pensiya fonduna töhfə',
        relevanceScore: 98
      }
    ],
    body: 'Hörmətli Elvin, zəhmət olmasa əlavədə olan əmək müqaviləsini nəzərdən keçirin və imzalayın...',
    isRelevant: true
  },
  {
    id: '2',
    from: 'legal@company.com',
    to: 'hr@company.com',
    subject: 'Updated Contract Templates',
    date: '2023-03-10',
    hasAttachment: true,
    attachments: [
      {
        id: 'att2',
        filename: 'Contract_Template_2023.docx',
        type: 'application/msword',
        size: '180 KB'
      }
    ],
    body: 'Here are the updated contract templates for 2023...'
  },
  {
    id: '3',
    from: 'john.smith@company.com',
    to: 'hr@company.com',
    subject: 'RE: Employment Contract - Signed',
    date: '2023-03-16',
    hasAttachment: true,
    attachments: [
      {
        id: 'att3',
        filename: 'Signed_Contract_John_Smith.pdf',
        type: 'application/pdf',
        size: '248 KB',
        isDocument: true,
        extractedText: 'EMPLOYMENT AGREEMENT - SIGNED\n\nEmployee: John Smith\nPosition: Senior Developer\nEmployee Signature: [SIGNED]\nDate: March 16, 2023',
        relevanceScore: 95
      }
    ],
    body: 'Hi, I have reviewed and signed the contract. Please find attached...',
    isRelevant: true
  },
  {
    id: '4',
    from: 'accounting@company.com',
    to: 'hr@company.com',
    subject: 'Payroll Setup Complete',
    date: '2023-03-18',
    hasAttachment: false,
    body: 'John Smith has been added to payroll system...'
  },
  {
    id: '5',
    from: 'manager@company.com',
    to: 'john.smith@company.com',
    subject: 'Team Meeting Schedule',
    date: '2023-03-20',
    hasAttachment: false,
    body: 'Welcome to the team! Our weekly meetings are...'
  }
];

export const documentHunterSteps: DocumentHunterStep[] = [
  {
    id: '1',
    title: 'Email Sistemi Qoşulması',
    description: 'Gmail və Outlook API-lərinə qoşulma...',
    status: 'pending',
    duration: 2000,
    details: 'Təhlükəsiz OAuth qoşulmasının qurulması'
  },
  {
    id: '2',
    title: 'Axtarış Sorğusu Optimallaşdırması',
    description: 'Axtarış terminlərinin analizi və ağıllı filtrlərin yaradılması...',
    status: 'pending',
    duration: 1500,
    details: 'İşlənmə: "John Smith" + "müqavilə" + "əmək"'
  },
  {
    id: '3',
    title: 'Email Taranması',
    description: 'Poçt qutusunda 1,247 email-in taranması...',
    status: 'pending',
    duration: 3000,
    details: 'Müvafiq mesajları müəyyən etmək üçün TAPx istifadəsi'
  },
  {
    id: '4',
    title: 'Əlavə Analizi',
    description: 'PDF və sənəd əlavələrinin analizi...',
    status: 'pending',
    duration: 2500,
    details: 'OCR işlənməsi və məzmun çıxarılması'
  },
  {
    id: '5',
    title: 'Sənəd Təsnifatı',
    description: 'Tapılan sənədlərin təsnifatı və reytinqi...',
    status: 'pending',
    duration: 1800,
    details: 'Müvafiqlik və məzmuna əsasən TAPx qiymətləndirilməsi'
  },
  {
    id: '6',
    title: 'Nəticələrin Toplanması',
    description: 'Əhatəli sənəd hesabatının yaradılması...',
    status: 'pending',
    duration: 1200,
    details: 'Əsas çıxarılmış məlumatlarla xülasənin yaradılması'
  }
];

export const emailProviders = [
  { name: 'Gmail', icon: '📧', status: 'connected' },
  { name: 'Outlook', icon: '📮', status: 'connected' },
  { name: 'Exchange', icon: '💼', status: 'connecting' }
];