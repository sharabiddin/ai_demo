export interface LinkedInProfile {
  id: string;
  name: string;
  headline: string;
  location: string;
  profilePicture: string;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
  certifications: Certification[];
  connections: number;
  profileViews: number;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  gpa?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface GeneratedResume {
  id: string;
  type: 'technical' | 'executive' | 'creative' | 'sales';
  content: string;
  sections: ResumeSection[];
  score: number;
  tailoredFor?: string;
}

export interface ResumeSection {
  id: string;
  title: string;
  content: string;
  aiOptimized: boolean;
}

export interface ResumeGeneratorStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed';
  duration?: number;
  details?: string;
}

export const mockLinkedInProfile: LinkedInProfile = {
  id: 'elvin-quliyev-dev',
  name: 'Elvin Quliyev',
  headline: 'Senior Frontend Developer | React Eksperti | İstifadəçi Təcrübəsi Yaradan',
  location: 'Bakı, Azərbaycan',
  profilePicture: '👨‍💻',
  summary: `6+ il təcrübəyə malik həvəsli Senior Frontend Developer. React, TypeScript və müasir JavaScript 
framework-lərində ekspertiza. İnkişaf komandalarına rəhbərlik edib və Fortune 500 şirkətləri üçün 
yüksək təsirli layihələr həyata keçirib. Təmiz kod, test və istifadəçi mərkəzli dizaynın güclü tərəfdarı.`,
  experience: [
    {
      id: 'exp1',
      company: 'TechCorp Azərbaycan',
      position: 'Senior Frontend Developer',
      duration: 'Yanvar 2021 - İndiki vaxt',
      location: 'Bakı, Azərbaycan',
      description: '50K+ istifadəçiyə xidmət edən korporativ SaaS platforması üçün frontend inkişafına rəhbərlik',
      achievements: [
        'Performans optimallaşdırması vasitəsilə səhifə yükləmə vaxtını 40% azaltdım',
        'Köhnə Angular-dan React-a miqrasiyaya rəhbərlik etdim, developer məhsuldarlığını 60% artırdım',
        '3 junior developer-ə mentorluk etdim və kod yoxlaması ən yaxşı təcrübələrini qurdum',
        'Avtomatlaşdırılmış test paketi tətbiq etdim, produksiyada səhvləri 75% azaltdım'
      ]
    },
    {
      id: 'exp2',
      company: 'StartupAZ',
      position: 'Frontend Developer',
      duration: 'İyun 2019 - Dekabr 2020',
      location: 'Bakı, Azərbaycan',
      description: 'Erkən mərhələdə olan fintech startup üçün responsiv veb tətbiqlər qurdum',
      achievements: [
        'React və Redux istifadə edərək müştəri panelini sıfırdan hazırladım',
        'Piksel-mükəmməl UI komponentlərini tətbiq etmək üçün dizayn komandası ilə əməkdaşlıq etdim',
        'RESTful API-lərlə inteqrasiya və real vaxt məlumat yenilənməsini həyata keçirdim',
        'Çevik inkişaf prosesi və sprint planlaşdırmasında iştirak etdim'
      ]
    },
    {
      id: 'exp3',
      company: 'WebÇözümləri MMC',
      position: 'Junior Frontend Developer',
      duration: 'Avqust 2018 - May 2019',
      location: 'Distant iş',
      description: 'Müxtəlif müştərilər üçün veb saytlar və veb tətbiqlər hazırladım',
      achievements: [
        'HTML, CSS və JavaScript istifadə edərək 15+ responsiv veb sayt qurdum',
        'React və müasir inkişaf alətlərini öyrəndim',
        'Tələbləri toplamaq üçün müştərilərlə birbaşa işlədim',
        'Mövcud müştəri veb saytlarını dəstəklədim və yenilədim'
      ]
    }
  ],
  education: [
    {
      id: 'edu1',
      institution: 'Azərbaycan Dövlət İqtisad Universiteti',
      degree: 'İnformasiya Texnologiyaları Bakalavr',
      field: 'Kompüter Elmləri',
      duration: '2014 - 2018',
      gpa: '3.8'
    }
  ],
  skills: [
    'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Node.js', 'GraphQL', 
    'Redux', 'Next.js', 'Git', 'Jest', 'Cypress', 'Webpack', 'AWS', 'Docker'
  ],
  certifications: [
    {
      id: 'cert1',
      name: 'AWS Sertifikatlı Həllər Memarı',
      issuer: 'Amazon Web Services',
      date: 'Mart 2023',
      credentialId: 'AWS-CSA-123456'
    },
    {
      id: 'cert2',
      name: 'React Developer Sertifikatı',
      issuer: 'Meta',
      date: 'Yanvar 2022',
      credentialId: 'META-REACT-789'
    }
  ],
  connections: 847,
  profileViews: 234
};

export const resumeTemplates = [
  {
    id: 'technical',
    name: 'Technical Focus',
    description: 'Texniki bacarıqlar və layihə nail olunmuş uğurlarına diqqeti yoğunlaşdırır',
    icon: '⚡',
    color: '#3B82F6'
  },
  {
    id: 'executive',
    name: 'Executive Summary',
    description: 'Rəhbərlik və biznes təsirini ön plana çıxarır',
    icon: '👔',
    color: '#8B5CF6'
  },
  {
    id: 'creative',
    name: 'Creative Design',
    description: 'Vizual elementlərlə müasir dizayn',
    icon: '🎨',
    color: '#EC4899'
  },
  {
    id: 'sales',
    name: 'Achievement Focused',
    description: 'Nəticələr və göstəricilərə diqqeti yoğunlaşdırır',
    icon: '📈',
    color: '#10B981'
  }
];

export const generatedResumes: GeneratedResume[] = [
  {
    id: 'tech-resume',
    type: 'technical',
    score: 94,
    tailoredFor: 'Senior Frontend Developer Vəzifəsi',
    content: `ELVİN QULİYEV
Senior Frontend Developer | React Eksperti

📧 elvin.quliyev@email.com | 📱 (050) 123-4567 | 🌐 linkedin.com/in/elvinquliyev | 📍 Bakı, Azərbaycan

PEŞƏKİ XÜLASƏ
6+ il təcrübəyə malik həvəsli Senior Frontend Developer. React, TypeScript və müasir JavaScript framework-lərində ekspertiza. İnkişaf komandalarına rəhbərlik edib və Fortune 500 şirkətləri üçün yüksək təsirli layihələr həyata keçirib. Təmiz kod, test və istifadəçi mərkəzli dizaynın güclü tərəfdarı.

TEXNİKİ BACARİQLAR
• Frontend: React, TypeScript, JavaScript, HTML5, CSS3, Redux, Next.js
• Backend: Node.js, GraphQL, RESTful APIs
• Alətlər və DevOps: Git, Jest, Cypress, Webpack, Docker, AWS
• Metodologiyalar: Agile, TDD, Kod Yoxlamaları, Mentorluk

PEŞƏKİ TƏCRÜBƏ

SENIOR FRONTEND DEVELOPER | TechCorp Azərbaycan | Yanvar 2021 - İndiki vaxt
• Performans optimallaşdırması və kod bölünməsi vasitəsilə səhifə yükləmə vaxtını 40% azaltdım
• Köhnə Angular-dan React-a miqrasiyaya rəhbərlik etdim, developer məhsuldarlığını 60% artırdım
• 3 junior developer-ə mentorluk etdim və kod yoxlaması ən yaxşı təcrübələrini qurdum
• Avtomatlaşdırılmış test paketi tətbiq etdim, produksiyada səhvləri 75% azaltdım

FRONTEND DEVELOPER | StartupAZ | İyun 2019 - Dekabr 2020
• React və Redux istifadə edərək müştəri panelini sıfırdan hazırladım
• Piksel-mükəmməl UI komponentlərini tətbiq etmək üçün dizayn komandası ilə əməkdaşlıq etdim
• RESTful API-lərlə inteqrasiya və real vaxt məlumat yeniləməsini həyata keçirdim

JUNIOR FRONTEND DEVELOPER | WebÇözümləri MMC | Avqust 2018 - May 2019
• HTML, CSS və JavaScript istifadə edərək 15+ responsiv veb sayt qurdum
• React və müasir inkişaf alətlərini öyrəndim
• Tələbləri toplamaq üçün müştərilərlə birbaşa işlədim

TƏHSİL
İnformasiya Texnologiyaları Bakalavr | Azərbaycan Dövlət İqtisad Universiteti | 2014-2018 | GPA: 3.8

SERTİFİKATLAR
• AWS Sertifikatlı Həllər Memarı (Mart 2023)
• React Developer Sertifikatı - Meta (Yanvar 2022)`,
    sections: [
      {
        id: 'header',
        title: 'Başlıq və Əlaqə',
        content: 'Əlaqə məlumatları ilə pekar başlıq',
        aiOptimized: true
      },
      {
        id: 'summary',
        title: 'Pekar Xülasə',
        content: '6+ il təcrübə, texniki rəhbərlik fokus',
        aiOptimized: true
      },
      {
        id: 'skills',
        title: 'Texniki Bacarıqlar',
        content: 'Frontend, backend, alətlər üzrə təsnifatlanmış',
        aiOptimized: true
      },
      {
        id: 'experience',
        title: 'Pekar Təcrübə',
        content: 'Göstəricilərlə nail olunmuş uğurlar fokuslu',
        aiOptimized: true
      },
      {
        id: 'education',
        title: 'Təhsil',
        content: 'Dərəcə və GPA vörgülatılmış',
        aiOptimized: false
      },
      {
        id: 'certifications',
        title: 'Sertifikatlar',
        content: 'Sahəyə uygun sertifikatlar',
        aiOptimized: true
      }
    ]
  }
];

export const resumeGeneratorSteps: ResumeGeneratorStep[] = [
  {
    id: '1',
    title: 'LinkedIn Qoşulması',
    description: 'LinkedIn API-yə qoşulma və autentifikasiya...',
    status: 'pending',
    duration: 2000,
    details: 'Təhlükəsiz OAuth qoşulmasının qurulması'
  },
  {
    id: '2',
    title: 'Profil Çıxarılması',
    description: 'Profil məlumatları və iş tarixi çıxarılması...',
    status: 'pending',
    duration: 3000,
    details: 'Təcrübə, təhsil və bacarıqların analizi'
  },
  {
    id: '3',
    title: 'Məzmun Analizi',
    description: 'TAPx nail olunmuş uğurlar və əsas nəticələri analiz edir...',
    status: 'pending',
    duration: 2500,
    details: 'Ölçülə bilən nəticələr və təsirin müəyyən edilməsi'
  },
  {
    id: '4',
    title: 'CV Optimallaşdırması',
    description: 'ATS və recruiter-lər üçün məzmunun optimallaşdırılması...',
    status: 'pending',
    duration: 2200,
    details: 'Açar söz optimallaşdırması və formatlaşdırma'
  },
  {
    id: '5',
    title: 'Çox Formatlı Yaradılma',
    description: 'Müxtəlif CV versiyalarının yaradılması...',
    status: 'pending',
    duration: 1800,
    details: 'Texniki, icraçı və yaradıcı formatların yaradılması'
  },
  {
    id: '6',
    title: 'Keyfiyyət Qiymətləndirilməsi',
    description: 'TAPx qiymətləndirilməsi və son optimallaşdırma...',
    status: 'pending',
    duration: 1500,
    details: 'ATS uygunluğu və oxunaqlılıq analizi'
  }
];

export const linkedInScrapeSteps = [
  'Authenticating with LinkedIn API...',
  'Accessing user profile data...',
  'Extracting work experience...',
  'Parsing education details...',
  'Collecting skills and endorsements...',
  'Analyzing achievements and metrics...',
  'Gathering recommendations...',
  'Processing certifications...'
];