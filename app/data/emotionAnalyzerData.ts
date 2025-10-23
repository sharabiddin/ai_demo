export interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: string;
  participants: Participant[];
  transcript: string;
  audioAnalysis?: AudioEmotion[];
  overallSentiment?: 'positive' | 'negative' | 'neutral';
  keyTopics?: string[];
  actionItems?: string[];
}

export interface Participant {
  id: string;
  name: string;
  role: string;
  avatar: string;
  emotions: EmotionData[];
  speakingTime: number;
  engagementScore: number;
}

export interface EmotionData {
  timestamp: string;
  emotion: 'happy' | 'stressed' | 'confused' | 'engaged' | 'frustrated' | 'neutral';
  confidence: number;
  intensity: number;
}

export interface AudioEmotion {
  timestamp: string;
  tone: 'positive' | 'negative' | 'neutral';
  energy: number;
  stress: number;
}

export interface EmotionAnalyzerStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed';
  duration?: number;
  details?: string;
}

export const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Q4 Məhsul Planlaması',
    date: '2023-10-20',
    duration: '45 dəq',
    participants: [
      {
        id: 'p1',
        name: 'Leyla Məmmədova',
        role: 'Məhsul Meneceri',
        avatar: '👩‍💼',
        speakingTime: 35,
        engagementScore: 85,
        emotions: [
          { timestamp: '00:05', emotion: 'engaged', confidence: 92, intensity: 8 },
          { timestamp: '00:15', emotion: 'stressed', confidence: 78, intensity: 6 },
          { timestamp: '00:25', emotion: 'happy', confidence: 88, intensity: 7 }
        ]
      },
      {
        id: 'p2',
        name: 'Elnur Həsənov',
        role: 'Mühəndislik Rəhbəri',
        avatar: '👨‍💻',
        speakingTime: 28,
        engagementScore: 72,
        emotions: [
          { timestamp: '00:08', emotion: 'confused', confidence: 84, intensity: 5 },
          { timestamp: '00:18', emotion: 'frustrated', confidence: 91, intensity: 7 },
          { timestamp: '00:30', emotion: 'neutral', confidence: 76, intensity: 4 }
        ]
      },
      {
        id: 'p3',
        name: 'Günel Rəhimova',
        role: 'Dizayner',
        avatar: '🎨',
        speakingTime: 22,
        engagementScore: 90,
        emotions: [
          { timestamp: '00:10', emotion: 'happy', confidence: 95, intensity: 9 },
          { timestamp: '00:20', emotion: 'engaged', confidence: 89, intensity: 8 },
          { timestamp: '00:35', emotion: 'neutral', confidence: 82, intensity: 5 }
        ]
      }
    ],
    transcript: `Leyla: "Gəlin Q4 yol xəritəmizi müzakirə edək. Mobil funksiyalarda geridə qaldığımızı düşünürəm."
Elnur: "Vaxt cədvəli çox agresivdir. Bəzi funksiyaları kəsməli ola bilərik."
Günel: "Yeni dizayn istiqamətini sevirəm, amma daha çox istifadəçi tədqiqatına ehtiyacımız var."
Leyla: "MVP-ni dekabra qədər hazır edə bilərikmi?"
Elnur: "Yalnız əsas funksiyalara fokuslaşsaq, bəli. Amma çətin olacaq."
Günel: "Bu layihədən həyəcanlanıram! İstifadəçi rəyləri əladır."`,
    overallSentiment: 'neutral',
    keyTopics: ['Q4 yol xəritəsi', 'mobil funksiyalar', 'vaxt cədvəli narahatlıqları', 'MVP əhatə dairəsi'],
    actionItems: [
      'Vaxt cədvəlini nəzərdən keçirin və vacib olmayan funksiyaları çıxarın',
      'Əlavə istifadəçi tədqiqatı keçirin',
      'Dekabr buraxılışı üçün MVP əhatə dairəsini müəyyənləşdirin'
    ]
  },
  {
    id: '2',
    title: 'Komanda Retrospektivi',
    date: '2023-10-18',
    duration: '30 min',
    participants: [
      {
        id: 'p4',
        name: 'Alex Kim',
        role: 'Scrum Master',
        avatar: '🏃‍♂️',
        speakingTime: 40,
        engagementScore: 88,
        emotions: [
          { timestamp: '00:02', emotion: 'happy', confidence: 90, intensity: 8 },
          { timestamp: '00:12', emotion: 'engaged', confidence: 87, intensity: 7 },
          { timestamp: '00:22', emotion: 'neutral', confidence: 80, intensity: 5 }
        ]
      },
      {
        id: 'p5',
        name: 'Lisa Wang',
        role: 'QA Engineer',
        avatar: '🔍',
        speakingTime: 25,
        engagementScore: 65,
        emotions: [
          { timestamp: '00:05', emotion: 'stressed', confidence: 88, intensity: 7 },
          { timestamp: '00:15', emotion: 'frustrated', confidence: 92, intensity: 8 },
          { timestamp: '00:25', emotion: 'neutral', confidence: 75, intensity: 4 }
        ]
      }
    ],
    transcript: `Alex: "Əla sprint, millət! Gəlin nələrin yaxşı getdiyini müzakirə edək."
Lisa: "Sıx vəsaitlərlə test etmək çətin idi. Son anda bir neçə xata tapıldı."
Alex: "Test proseslərimizi necə yaxşılaşdıra bilərik?"
Lisa: "Bəlkə QA nəzərdən keçirmə üçün daha çox vaxt? Təzyiq keyfiyyətə təsir edir."`,
    overallSentiment: 'negative',
    keyTopics: ['sprint review', 'testing challenges', 'tight deadlines', 'quality concerns'],
    actionItems: [
      'Allocate more time for QA review',
      'Implement earlier testing in development cycle',
      'Address deadline pressure on team'
    ]
  }
];

export const emotionAnalyzerSteps: EmotionAnalyzerStep[] = [
  {
    id: '1',
    title: 'Görüş Kəşfi',
    description: 'Təqvim və video platformalarından son görüşlərin taranması...',
    status: 'pending',
    duration: 2000,
    details: 'Zoom, Teams və Google Meet-ə qoşulma'
  },
  {
    id: '2',
    title: 'Video İşlənməsi',
    description: 'Üz ifadələri və bədən dili analizi...',
    status: 'pending',
    duration: 3500,
    details: 'TAPx üz tanınması və emosiya atmlıması'
  },
  {
    id: '3',
    title: 'Audio Analizi',
    description: 'Səs tonları və danışıq nümunələrinin işlənməsi...',
    status: 'pending',
    duration: 2800,
    details: 'Səs stress analizi və həssiyyat atmlıması'
  },
  {
    id: '4',
    title: 'Stenogram Analizi',
    description: 'Görüş qeydləri və söhbət məzmununun analizi...',
    status: 'pending',
    duration: 2200,
    details: 'Həssiyyat və mövzu çıxarılması üçün NLP işlənməsi'
  },
  {
    id: '5',
    title: 'Emosiya Xəritələşdirilməsi',
    description: 'Emosiya zaman xətti və iştirakçı analizinin yaradılması...',
    status: 'pending',
    duration: 1800,
    details: 'Vizual, audio və mətn emosiyalarının əlaqələndirilməsi'
  },
  {
    id: '6',
    title: 'Ǝnzırış Yaratma',
    description: 'Tətbiq oluna bilən anlış və tövsiyələrin yaradılması...',
    status: 'pending',
    duration: 1500,
    details: 'TAPx güclü komanda dinamikası analizi'
  }
];

export const emotionColors = {
  happy: '#10B981',      // green
  engaged: '#3B82F6',    // blue
  neutral: '#6B7280',    // gray
  confused: '#F59E0B',   // amber
  stressed: '#EF4444',   // red
  frustrated: '#DC2626'  // dark red
};

export const meetingPlatforms = [
  { name: 'Zoom', icon: '📹', status: 'connected', meetingsFound: 12 },
  { name: 'Teams', icon: '💼', status: 'connected', meetingsFound: 8 },
  { name: 'Google Meet', icon: '🎥', status: 'connecting', meetingsFound: 0 }
];