export interface Employee {
  id: string;
  name: string;
  currentRole: string;
  currentSalary: number;
  department: string;
  experience: number;
  performance: number;
  skills: string[];
  location: string;
  lastRaise: string;
  marketValue?: number;
}

export interface MarketData {
  id: string;
  source: string;
  role: string;
  salaryRange: {
    min: number;
    max: number;
    median: number;
  };
  location: string;
  company: string;
  experience: string;
  timestamp: string;
}

export interface CompetitorOffer {
  id: string;
  company: string;
  role: string;
  salary: number;
  benefits: string[];
  equity: string;
  location: string;
  likelihood: number;
}

export interface NegotiationPrediction {
  successProbability: number;
  recommendedAsk: number;
  minAcceptable: number;
  maxRealistic: number;
  strategy: string;
  timeline: string;
  riskFactors: string[];
  leveragePoints: string[];
}

export interface SalaryNegotiationStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed';
  duration?: number;
  details?: string;
}

export const mockEmployee: Employee = {
  id: 'leyla-memmedova',
  name: 'Leyla Məmmədova',
  currentRole: 'Senior Frontend Developer',
  currentSalary: 95000,
  department: 'Mühəndislik',
  experience: 5,
  performance: 92,
  skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'Rəhbərlik'],
  location: 'Bakı, Azərbaycan',
  lastRaise: '18 ay əvvəl',
  marketValue: 125000
};

export const marketDataSources = [
  { name: 'Glassdoor', icon: '🏢', status: 'connected', dataPoints: 1247 },
  { name: 'Levels.fyi', icon: '📊', status: 'connected', dataPoints: 892 },
  { name: 'PayScale', icon: '💰', status: 'connected', dataPoints: 2156 },
  { name: 'Blind', icon: '👁️', status: 'connecting', dataPoints: 0 },
  { name: 'AngelList', icon: '🚀', status: 'connected', dataPoints: 334 },
  { name: 'LinkedIn Salary', icon: '💼', status: 'connected', dataPoints: 1789 }
];

export const mockMarketData: MarketData[] = [
  {
    id: '1',
    source: 'Glassdoor',
    role: 'Senior Frontend Developer',
    salaryRange: { min: 110000, max: 140000, median: 125000 },
    location: 'San Francisco, CA',
    company: 'TechCorp',
    experience: '4-6 il',
    timestamp: '2023-10-20T10:30:00Z'
  },
  {
    id: '2',
    source: 'Levels.fyi',
    role: 'Senior Frontend Developer',
    salaryRange: { min: 115000, max: 145000, median: 130000 },
    location: 'San Francisco, CA',
    company: 'Meta',
    experience: '5+ il',
    timestamp: '2023-10-20T10:31:00Z'
  },
  {
    id: '3',
    source: 'PayScale',
    role: 'Senior Frontend Developer',
    salaryRange: { min: 105000, max: 135000, median: 120000 },
    location: 'San Francisco, CA',
    company: 'Google',
    experience: '4-7 il',
    timestamp: '2023-10-20T10:32:00Z'
  }
];

export const competitorOffers: CompetitorOffer[] = [
  {
    id: '1',
    company: 'Meta',
    role: 'Senior Frontend Engineer',
    salary: 135000,
    benefits: ['Sağlamlıq sığortası', 'Stomatoloji', 'Pensiya fond töhfəsi', 'Səhm opsiyaları'],
    equity: '0.15% 4 il çərkəyində',
    location: 'San Francisco, CA',
    likelihood: 78
  },
  {
    id: '2',
    company: 'Google',
    role: 'Software Engineer III',
    salary: 142000,
    benefits: ['Sağlamlıq sığortası', 'Stomatoloji', 'Pensiya fondu', 'Pulsuz yeməklər', 'Səhmlər'],
    equity: '0.12% RSU 4 il ü zərində',
    location: 'Mountain View, CA',
    likelihood: 85
  },
  {
    id: '3',
    company: 'Stripe',
    role: 'Senior Frontend Developer',
    salary: 128000,
    benefits: ['Sağlamlıq sığortası', 'Stomatoloji', 'Pensiya fondu', 'Limitsiz məzuniyyət'],
    equity: '0.18% opsiyalar 4 il ü zərində',
    location: 'San Francisco, CA',
    likelihood: 92
  }
];

export const mockNegotiationPrediction: NegotiationPrediction = {
  successProbability: 87,
  recommendedAsk: 128000,
  minAcceptable: 115000,
  maxRealistic: 135000,
  strategy: 'Performans üstünlükləri ilə bazar əsaslı yanaşma',
  timeline: '2-3 həftə optimal vaxt',
  riskFactors: [
    'Q4-də şirkətin büdcə məhdudiyyətləri',
    'Son komanda genişləndirilməsi xərcləri',
    'Maaş artımlarına təsir edən bazar qeyri-müəyyənliyi'
  ],
  leveragePoints: [
    'Ən yüksək performans (92% reytinq)',
    'Kritik React ekspertizası',
    'Rəhbərlik məsuliyyətləri',
    'Meta və Google-dan rəqabətli təkliflər',
    'Bazar maaşından aşağı (24% fərq)'
  ]
};

export const salaryNegotiationSteps: SalaryNegotiationStep[] = [
  {
    id: '1',
    title: 'Bazar Məlumatlarının Toplanması',
    description: '50+ mənbədən maaş məlumatları taranması...',
    status: 'pending',
    duration: 3000,
    details: 'Glassdoor, Levels.fyi, PayScale və digərlərinə qoşulma'
  },
  {
    id: '2',
    title: 'Rəqib Analizi',
    description: 'Rəqabət təklifləri və bazar tendensiyalarının analizi...',
    status: 'pending',
    duration: 2500,
    details: 'FAANG və startup təkliflərindən məlumatların emalı'
  },
  {
    id: '3',
    title: 'Performans Qiymətləndirilməsi',
    description: 'İşçinin dəyəri və töhfələrinin qiymətləndirilməsi...',
    status: 'pending',
    duration: 2000,
    details: 'Performans göstəriciləri və təsirinin analizi'
  },
  {
    id: '4',
    title: 'Risk Qiymətləndirilməsi',
    description: 'Danışıq riskləri və uğur amililərinin hesablanması...',
    status: 'pending',
    duration: 2200,
    details: 'TAPx müxtəlif danışıq ssenarinilərinin modelloprodur'
  },
  {
    id: '5',
    title: 'Strategiya Yaradılması',
    description: 'Optimal danışıq strategiyasının yaradılması...',
    status: 'pending',
    duration: 1800,
    details: 'Danişıq nöqtələri və vaxt tövsiyələrinin yaradılması'
  },
  {
    id: '6',
    title: 'Proqnoz Modelloproduru',
    description: 'Uğur ehtimalı və nəticələrinin hesablanması...',
    status: 'pending',
    duration: 1500,
    details: 'TAPx Monte Carlo danışıq nəticələri simulyasiyası'
  }
];

export const salaryTrends = [
  { month: 'Yan 2023', avg: 78000, trend: 'up' },
  { month: 'Fev 2023', avg: 79500, trend: 'up' },
  { month: 'Mar 2023', avg: 81000, trend: 'up' },
  { month: 'Apr 2023', avg: 80500, trend: 'down' },
  { month: 'May 2023', avg: 82000, trend: 'up' },
  { month: 'İyn 2023', avg: 84000, trend: 'up' },
  { month: 'İyl 2023', avg: 85500, trend: 'up' },
  { month: 'Avq 2023', avg: 84800, trend: 'down' },
  { month: 'Sen 2023', avg: 86000, trend: 'up' },
  { month: 'Okt 2023', avg: 87500, trend: 'up' }
];

export const negotiationScripts = [
  {
    scenario: 'Açılış İstəyi',
    script: "Apardığım araşdırma və performansa əsasən, maaşımı bazar qiymətləri və komandaya töhfələrimə uyğun olaraq yenidən nəzərdən keçirməyi müzakirə etmək istərdim."
  },
  {
    scenario: 'Bazar Məlumatlarının Təqdimatı',
    script: "Cəmi bazar məlumatlarına görə, mənim vəzifəm və təcrübə səviyyəm üçün Bakıda orta maaş 80,000-100,000 AZN arasındadır."
  },
  {
    scenario: 'Performans Və Nəail Olunmuş Uğurlar',
    script: "Keçən il ərzində React miqrasiya layihəsinə rəhbərlik etdim, gənc developerlara mentorluk etdim və 92% performans reytinqi saxladım."
  },
  {
    scenario: 'Rəqabət Üstünlüyü',
    script: "Digər şirkətlərdən 85,000-95,000 AZN arasında maaş təklifləri aldım, lakin karyerama burada davam etməyi üstün tuturəm."
  }
];