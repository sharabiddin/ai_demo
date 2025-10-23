import { Candidate } from '../types';

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Leyla Məmmədova',
    position: 'Senior Frontend Developer',
    experience: '5 il',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    education: 'Kompüter Elmləri Bakalavr - Bakı Dövlət Universiteti',
    cv: `LEYLA MƏMMƏDOVA
Senior Frontend Developer | 5 il təcrübə

TƏCRÜBƏ:
• Lead Frontend Developer at TechCorp (2020-2023)
  - 1M+ istifadəçiyə xidmət edən miqyaslı React tətbiqlər qurdum
  - Mikro-frontend arxitekturasını həyata keçirdim
  - 4 developer-dən ibarət komandaya rəhbərlik etdim

• Frontend Developer at StartupXYZ (2019-2020)
  - React istifadə edərək responsive veb tətbiqlər hazırladım
  - Performansı optimallaşdırdım və 40% daha sürətli yükləmə əldə etdim
  - UX/UI dizaynerlərlə əməkdaşlıq etdim

BACAriQLAR:
• Frontend: React, TypeScript, JavaScript, HTML5, CSS3
• Backend: Node.js, Express, GraphQL
• Cloud: AWS, Docker, Kubernetes
• Alətlər: Git, Jest, Webpack, Figma

TƏHSİL:
• Kompüter Elmləri Bakalavr - Bakı Dövlət Universiteti (2015-2019)
• GPA: 3.8/4.0

NAliyyətlər:
• 5K+ GitHub ulduzlu açıq mənbə React kitabxanası nəşr etdim
• React Conference 2022-də natiq
• AWS Certified Solutions Architect`
  },
  {
    id: '2',
    name: 'Elvin Quliyev',
    position: 'Full Stack Developer',
    experience: '3 il',
    skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker'],
    education: 'Proqram Mühəndisliyi Magistr - ADA Universiteti',
    cv: `ELVİN QULİYEV
Full Stack Developer | 3 il təcrübə

TƏCRÜBƏ:
• Full Stack Developer at DataTech (2021-2023)
  - Python/Django istifadə edərək tam dövriyyəli veb tətbiqlər hazırladım
  - Mobil və veb müştərilərə xidmət edən RESTful API-lər qurdum
  - Avtomatlaşdırılmış test və CI/CD pipeline-ları həyata keçirdim

• Junior Developer at WebSolutions (2020-2021)
  - React və Python istifadə edərək responsive veb saytlar yaratdım
  - Verilənlər bazası optimallaşdırması və sorğu performansı üzərində işlədim
  - Çevik inkişaf proseslərində iştirak etdim

BACAriQLAR:
• Backend: Python, Django, FastAPI, PostgreSQL, Redis
• Frontend: React, JavaScript, TypeScript, HTML5, CSS3
• DevOps: Docker, Kubernetes, Jenkins, AWS
• Alətlər: Git, Pytest, Postman, VS Code

TƏHSİL:
• Proqram Mühəndisliyi Magistr - ADA Universiteti (2018-2020)
• Riyaziyyat Bakalavr - AMEA İnformasiya Texnologiyaları İnstitutu (2014-2018)

LAYİHƏLƏR:
• Gündəlik 10K+ əməliyyat həyata keçirən e-ticarət platforması
• WebSocket inteqrasiyası ilə real vaxt çat tətbiqi
• Proqnozlaşdırıcı analitika üçün maşın öyrənməsi modeli`
  },
  {
    id: '3',
    name: 'Günel Rəhimova',
    position: 'UX/UI Designer',
    experience: '4 il',
    skills: ['Figma', 'Adobe Creative Suite', 'Prototipləmə', 'İstifadəçi Tədqiqatı', 'HTML/CSS'],
    education: 'Dizayn Bakalavr - Azərbaycan Dövlət Rəssamlıq Akademiyası',
    cv: `GÜNEL RƏHİMOVA
UX/UI Designer | 4 il təcrübə

TƏCRÜBƏ:
• Senior UX Designer at DesignLab (2021-2023)
  - 500K+ endirmə olan mobil tətbiq üçün dizayna rəhbərlik etdim
  - İstifadəçi tədqiqatı və istifadə qabiliyyəti testləri keçirdim
  - Dizayn sistemləri və komponent kitabxanaları yaratdım

• UX Designer at CreativeAgency (2020-2021)
  - Fortune 500 müştəriləri üçün veb saytlar dizayn etdim
  - İnkişaf komandaları ilə tətbiq üzərində əməkdaşlıq etdim
  - Yenidən dizayn vasitəsilə istifadəçi məşğulluğunu 35% artırdım

BACAriQLAR:
• Dizayn: Figma, Sketch, Adobe Creative Suite, InVision
• Tədqiqat: İstifadəçi müsahibələri, A/B testlər, Analitika
• Prototipləmə: Framer, Principle, After Effects
• Frontend: HTML5, CSS3, JavaScript əsasları

TƏHSİL:
• Qrafik Dizayn Bakalavr - Azərbaycan Dövlət Rəssamlıq Akademiyası (2016-2020)
• UX Dizayn Sertifikatı - General Assembly (2019)

NAliyyətlər:
• UX Design Awards 2022 qalibi
• Design Magazine "30 yaşa qədər ən yaxşı 30" siyahısında
• Müxtəlif layihələrdə konversiya dərəcələrini 45% artırdım`
  }
];

export const analysisSteps = [
  {
    id: '1',
    title: 'Namizədlərin Əldə Edilməsi',
    description: 'Verilənlər bazısından namizəd fondunun əldə edilməsi...',
    status: 'pending' as const,
    duration: 1500
  },
  {
    id: '2',
    title: 'Namizəd Seçimi',
    description: 'TAPx analiz üçün ən yaxşı namizədi seçir...',
    status: 'pending' as const,
    duration: 2000
  },
  {
    id: '3',
    title: 'CV Analizi',
    description: 'CV məzmununun analizi və əsas məlumatların çıxarılması...',
    status: 'pending' as const,
    duration: 3000
  },
  {
    id: '4',
    title: 'Bacarıq Uyğunlaşdırması',
    description: 'Namizəd bacarıqlarının iş tələbləri ilə uyğunlaşdırılması...',
    status: 'pending' as const,
    duration: 2500
  },
  {
    id: '5',
    title: 'Hesabat Yaradılması',
    description: 'Əhatəli analiz hesabatının yaradılması...',
    status: 'pending' as const,
    duration: 2000
  }
];