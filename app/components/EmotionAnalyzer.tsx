'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Video, 
  Mic, 
  Brain, 
  Users, 
  TrendingUp,
  AlertTriangle,
  CheckCircle, 
  Clock,
  Zap,
  Heart,
  BarChart3,
  MessageSquare,
  Target,
  Monitor,
  Building2
} from 'lucide-react';
import { Meeting, Participant, EmotionAnalyzerStep, EmotionData } from '../data/emotionAnalyzerData';
import { mockMeetings, emotionAnalyzerSteps, meetingPlatforms, emotionColors } from '../data/emotionAnalyzerData';

interface EmotionAnalyzerProps {
  isActive: boolean;
  command: string;
}

interface WorkflowState {
  isRunning: boolean;
  currentStep: number;
  analyzedMeetings: Meeting[];
  currentMeeting?: Meeting;
  emotionTimeline: EmotionData[];
  insights: {
    overallMood: string;
    stressLevel: number;
    engagementScore: number;
    riskAlerts: string[];
    recommendations: string[];
  };
}

export default function EmotionAnalyzer({ isActive, command }: EmotionAnalyzerProps) {
  const [workflowState, setWorkflowState] = useState<WorkflowState>({
    isRunning: false,
    currentStep: -1,
    analyzedMeetings: [],
    emotionTimeline: [],
    insights: {
      overallMood: '',
      stressLevel: 0,
      engagementScore: 0,
      riskAlerts: [],
      recommendations: []
    }
  });

  const [steps, setSteps] = useState<EmotionAnalyzerStep[]>(emotionAnalyzerSteps);
  const [scanningParticipants, setScanningParticipants] = useState<Participant[]>([]);
  
  // Refs for auto-scrolling
  const platformsRef = useRef<HTMLDivElement>(null);
  const videoAnalysisRef = useRef<HTMLDivElement>(null);
  const emotionTimelineRef = useRef<HTMLDivElement>(null);
  const insightsRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && (command.toLowerCase().includes('emotion') || command.toLowerCase().includes('meeting') || command.toLowerCase().includes('emosiya') || command.toLowerCase().includes('görüş') || command.toLowerCase().includes('komanda'))) {
      startEmotionAnalysis();
    }
  }, [isActive, command]);

  // Auto-scroll to active card when currentStep changes
  useEffect(() => {
    if (!workflowState.isRunning) return;
    
    const timer = setTimeout(() => {
      switch (workflowState.currentStep) {
        case 0:
          scrollToElement(platformsRef);
          break;
        case 1:
        case 2:
        case 3:
          scrollToElement(videoAnalysisRef);
          break;
        case 4:
          scrollToElement(emotionTimelineRef);
          break;
        case 5:
          scrollToElement(insightsRef);
          break;
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [workflowState.currentStep, workflowState.isRunning]);

  const scrollToElement = (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current || !mainContentRef.current) return;
    
    const element = ref.current;
    const container = mainContentRef.current;
    
    // Calculate element position relative to container
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    
    const relativeTop = elementRect.top - containerRect.top;
    const scrollOffset = container.scrollTop + relativeTop - 80;
    
    container.scrollTo({
      top: Math.max(0, scrollOffset),
      behavior: 'smooth'
    });
  };

  const startEmotionAnalysis = async () => {
    setWorkflowState(prev => ({ ...prev, isRunning: true, currentStep: 0 }));
    setSteps(emotionAnalyzerSteps.map(step => ({ ...step, status: 'pending' })));

    for (let i = 0; i < steps.length; i++) {
      await processStep(i);
    }
  };

  const processStep = async (stepIndex: number) => {
    setSteps(prev => prev.map((step, idx) => 
      idx === stepIndex ? { ...step, status: 'processing' } : step
    ));

    setWorkflowState(prev => ({ ...prev, currentStep: stepIndex }));

    switch (stepIndex) {
      case 0: // Meeting Discovery
        await simulateMeetingDiscovery();
        break;
      
      case 1: // Video Processing
        await simulateVideoProcessing();
        break;
      
      case 2: // Audio Analysis
        await simulateAudioAnalysis();
        break;
      
      case 3: // Transcript Analysis
        await simulateTranscriptAnalysis();
        break;
      
      case 4: // Emotion Mapping
        await simulateEmotionMapping();
        break;
      
      case 5: // Insights Generation
        await generateInsights();
        break;
    }

    await new Promise(resolve => setTimeout(resolve, steps[stepIndex].duration || 1000));

    setSteps(prev => prev.map((step, idx) => 
      idx === stepIndex ? { ...step, status: 'completed' } : step
    ));
  };

  const simulateMeetingDiscovery = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    setWorkflowState(prev => ({ 
      ...prev, 
      analyzedMeetings: mockMeetings,
      currentMeeting: mockMeetings[0]
    }));
  };

  const simulateVideoProcessing = async () => {
    const meeting = mockMeetings[0];
    for (let i = 0; i < meeting.participants.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setScanningParticipants(prev => [...prev, meeting.participants[i]]);
    }
  };

  const simulateAudioAnalysis = async () => {
    await new Promise(resolve => setTimeout(resolve, 2800));
  };

  const simulateTranscriptAnalysis = async () => {
    await new Promise(resolve => setTimeout(resolve, 2200));
  };

  const simulateEmotionMapping = async () => {
    const emotions = mockMeetings[0].participants.flatMap(p => p.emotions);
    for (const emotion of emotions) {
      setWorkflowState(prev => ({ 
        ...prev, 
        emotionTimeline: [...prev.emotionTimeline, emotion]
      }));
      await new Promise(resolve => setTimeout(resolve, 400));
    }
  };

  const generateInsights = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    setWorkflowState(prev => ({
      ...prev,
      insights: {
        overallMood: 'Qənaətbəxş',
        stressLevel: 65,
        engagementScore: 82,
        riskAlerts: [
          'Elnur Həsənov yüksək frustrasiya səviyyəsi göstərir',
          'Leyla Məmmədova stress göstəriciləri yaşayır',
          'Vaxt cədvəli təzyiqi komanda moralina təsir edir'
        ],
        recommendations: [
          'Narahatlıqları həll etmək üçün Mike ilə 1:1 görüş planlaşdırın',
          'Layihə vaxt cədvəlini nəzərdən keçirin və iş yükünü yenidən bölün',
          'Komanda üçün stress azaltma texnikalarını tətbiq edin',
          'Yüksək performanslı üzvlər üçün tanınmanı artırın'
        ]
      }
    }));
  };

  const getCardState = (stepIndex: number) => {
    if (workflowState.currentStep === stepIndex) return 'active';
    if (workflowState.currentStep > stepIndex) return 'completed';
    return 'inactive';
  };

  const getCardClasses = (stepIndex: number) => {
    const state = getCardState(stepIndex);
    const baseClasses = 'glass-card p-8 rounded-3xl border-2 transition-all duration-1000 ease-out';
    
    if (state === 'active') {
      return `${baseClasses} border-primary-500 shadow-glow-blue bg-gradient-to-br from-primary-50 to-white scale-100 opacity-100 z-20`;
    } else if (state === 'completed') {
      return `${baseClasses} border-gray-200 shadow-soft scale-90 opacity-40 -translate-y-4`;
    } else {
      return `${baseClasses} border-gray-200 shadow-soft scale-95 opacity-50 translate-y-4`;
    }
  };

  const renderPlatformConnection = () => (
    <motion.div
      ref={platformsRef}
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ 
        opacity: workflowState.currentStep >= 0 ? 1 : 0,
        scale: workflowState.currentStep === 0 ? 1 : workflowState.currentStep > 0 ? 0.9 : 0.95,
        y: workflowState.currentStep > 0 ? -20 : 0
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={getCardClasses(0)}
    >
      <div className="flex items-center mb-6">
        <Video className="w-8 h-8 text-primary-600 mr-3" />
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight text-shadow-sm">Görüş Platforması Qoşulması</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {meetingPlatforms.map((platform, index) => (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.3 }}
            className={`p-4 rounded-lg border text-center transition-all duration-300 ${
              platform.status === 'connected' 
                ? 'border-success-400 bg-success-50' 
                : 'border-primary-300 bg-primary-50'
            }`}
          >
            <div className="flex items-center justify-center mb-3">
              {platform.name === 'Zoom' && <Image src="/logos/zoom.png" alt="Zoom" width={48} height={48} />}
              {platform.name === 'Teams' && <Image src="/logos/teams.png" alt="Teams" width={48} height={48} />}
              {platform.name === 'Google Meet' && <Image src="/logos/google-meet.png" alt="Google Meet" width={48} height={48} />}
            </div>
            <div className="font-medium text-gray-900">{platform.name}</div>
            <div className={`text-xs mt-1 ${
              platform.status === 'connected' ? 'text-success-600' : 'text-primary-600'
            }`}>
              {platform.status === 'connected' 
                ? `✓ ${platform.meetingsFound} meetings found` 
                : '⚡ Connecting...'}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderVideoAnalysis = () => (
    <motion.div
      ref={videoAnalysisRef}
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ 
        opacity: workflowState.currentStep >= 1 ? 1 : 0,
        scale: (workflowState.currentStep >= 1 && workflowState.currentStep <= 3) ? 1 : workflowState.currentStep > 3 ? 0.9 : 0.95,
        y: workflowState.currentStep > 3 ? -20 : 0
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={getCardClasses(workflowState.currentStep <= 3 ? 1 : 0)}
    >
      <div className="flex items-center mb-6">
        <Brain className="w-8 h-8 text-accent-600 mr-3" />
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight text-shadow-sm">TAPx Emosiya Atmlıması</h3>
        {(workflowState.currentStep === 1 || workflowState.currentStep === 2) && (
          <div className="ml-auto flex items-center">
            <div className="scanning-line"></div>
            <Zap className="w-8 h-8 text-accent-600 animate-pulse ml-2" />
          </div>
        )}
      </div>
      
      {workflowState.currentMeeting && (
        <div className="space-y-4">
          <div className="p-4 bg-white/90 border border-gray-100 rounded-lg shadow-soft">
            <h4 className="font-semibold text-gray-900 mb-2">📅 {workflowState.currentMeeting.title}</h4>
            <div className="text-sm text-gray-600">
              {workflowState.currentMeeting.date} • {workflowState.currentMeeting.duration} • {workflowState.currentMeeting.participants.length} participants
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scanningParticipants.map((participant, index) => (
              <motion.div
                key={participant.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.5 }}
                className="p-4 bg-white/90 border border-gray-200 rounded-lg shadow-soft hover:shadow-medium transition-all"
              >
                <div className="flex items-center mb-3">
                  <div className="text-2xl mr-3">{participant.avatar}</div>
                  <div>
                    <div className="font-medium text-gray-900">{participant.name}</div>
                    <div className="text-xs text-gray-600">{participant.role}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Danişıq Vaxtı:</span>
                    <span className="text-primary-600 font-semibold">{participant.speakingTime}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Engagement:</span>
                    <span className="text-success-600 font-semibold">{participant.engagementScore}%</span>
                  </div>
                  
                  {participant.emotions.length > 0 && (
                    <div className="mt-3">
                      <div className="text-xs text-gray-600 font-medium mb-2">Atmlınan Emosiyalar:</div>
                      <div className="flex flex-wrap gap-1">
                        {participant.emotions.slice(0, 2).map((emotion, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs rounded-full"
                            style={{ 
                              backgroundColor: emotionColors[emotion.emotion] + '20',
                              color: emotionColors[emotion.emotion]
                            }}
                          >
                            {emotion.emotion} ({emotion.confidence}%)
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );

  const renderEmotionTimeline = () => (
    <motion.div
      ref={emotionTimelineRef}
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ 
        opacity: workflowState.currentStep >= 4 ? 1 : 0,
        scale: workflowState.currentStep === 4 ? 1 : workflowState.currentStep > 4 ? 0.9 : 0.95,
        y: workflowState.currentStep > 4 ? -20 : 0
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={getCardClasses(4)}
    >
      <div className="flex items-center mb-6">
        <BarChart3 className="w-8 h-8 text-accent-600 mr-3" />
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight text-shadow-sm">Emosiya Zaman Xətti Analizi</h3>
      </div>
      
      {workflowState.emotionTimeline.length > 0 && (
        <div className="space-y-4">
          <div className="bg-white/90 border border-gray-100 p-4 rounded-lg shadow-soft">
            <h4 className="font-semibold text-gray-900 mb-3">Görüş Stenogram Analizi</h4>
            <div className="text-sm text-gray-700 leading-relaxed">
              {workflowState.currentMeeting?.transcript}
            </div>
          </div>

          <div className="bg-white/90 border border-gray-100 p-4 rounded-lg shadow-soft">
            <h4 className="font-semibold text-gray-900 mb-3">Real Vaxt Emosiya Axını</h4>
            <div className="space-y-2">
              {workflowState.emotionTimeline.map((emotion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-soft transition-all"
                >
                  <div className="flex items-center">
                    <div className="text-xs text-gray-600 font-medium w-12">{emotion.timestamp}</div>
                    <div 
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: emotionColors[emotion.emotion] }}
                    />
                    <div className="text-sm text-gray-900 capitalize font-medium">{emotion.emotion}</div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-xs text-gray-600 mr-2">Confidence:</div>
                    <div className="text-xs font-medium" style={{ color: emotionColors[emotion.emotion] }}>
                      {emotion.confidence}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );

  const renderInsights = () => (
    <motion.div
      ref={insightsRef}
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ 
        opacity: workflowState.currentStep >= 5 ? 1 : 0,
        scale: workflowState.currentStep === 5 ? 1 : 0.95,
        y: 0
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className={getCardClasses(5)}
    >
      <div className="flex items-center mb-6">
        <Target className="w-8 h-8 text-success-600 mr-3" />
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight text-shadow-sm">AI Nəticələr və Tövsiyələr</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-8 bg-success-50 rounded-2xl border-2 border-success-200 shadow-medium hover:shadow-strong transition-all duration-500">
          <div className="text-4xl md:text-5xl font-semibold text-success-700 mb-2 tracking-tight text-shadow">{workflowState.insights.overallMood}</div>
          <div className="text-base md:text-lg text-gray-600 font-medium mt-2">Komanda Əhval-Ruhiyyəsi</div>
        </div>
        <div className="text-center p-8 bg-red-50 rounded-2xl border-2 border-red-200 shadow-medium hover:shadow-strong transition-all duration-500">
          <div className="text-4xl md:text-5xl font-semibold text-red-600 mb-2 tracking-tight text-shadow">{workflowState.insights.stressLevel}%</div>
          <div className="text-base md:text-lg text-gray-600 font-medium mt-2">Stress Səviyyəsi</div>
        </div>
        <div className="text-center p-8 bg-primary-50 rounded-2xl border-2 border-primary-200 shadow-medium hover:shadow-strong transition-all duration-500">
          <div className="text-4xl md:text-5xl font-semibold text-primary-700 mb-2 tracking-tight text-shadow">{workflowState.insights.engagementScore}%</div>
          <div className="text-base md:text-lg text-gray-600 font-medium mt-2">Engagement</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 shadow-soft">
          <h4 className="font-semibold text-red-700 mb-3 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Risk Xəbərdarlıqları
          </h4>
          <ul className="text-sm space-y-2">
            {workflowState.insights.riskAlerts.map((alert, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start text-gray-800"
              >
                <span className="text-red-600 mr-2 mt-1">⚠</span>
                {alert}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="bg-success-50 border-2 border-success-200 rounded-xl p-6 shadow-soft">
          <h4 className="font-semibold text-success-700 mb-3 flex items-center">
            <Heart className="w-5 h-5 mr-2" />
            Tövsiyələr
          </h4>
          <ul className="text-sm space-y-2">
            {workflowState.insights.recommendations.map((rec, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start text-gray-800"
              >
                <span className="text-success-600 mr-2 mt-1">✓</span>
                {rec}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );

  const renderStepIndicator = () => (
    <div className="glass-card p-8 h-full shadow-medium">
      <h4 className="font-semibold mb-6 text-gradient text-xl md:text-2xl tracking-tight text-shadow-sm">Emosiya AI Prosesi</h4>
      <div className="space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-start text-sm p-3 rounded-lg border transition-all duration-300 ${
              step.status === 'completed' ? 'text-success-700 bg-success-50 border-success-300 shadow-soft' :
              step.status === 'processing' ? 'text-primary-700 bg-primary-50 border-primary-300 shadow-glow-blue animate-pulse' :
              'text-gray-500 bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex-shrink-0 mr-3 mt-0.5">
              {step.status === 'completed' && <CheckCircle className="w-5 h-5" />}
              {step.status === 'processing' && <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />}
              {step.status === 'pending' && <div className="w-5 h-5 border border-gray-500 rounded-full" />}
            </div>
            <div className="flex-1">
              <div className="font-medium mb-1">{step.title}</div>
              <div className="text-xs text-gray-600 leading-relaxed">{step.description}</div>
              {step.details && step.status === 'processing' && (
                <div className="text-xs text-primary-700 mt-1 italic font-medium">{step.details}</div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  if (!isActive) return null;

  return (
    <div className="flex h-full min-h-0 gap-6 p-6 overflow-hidden">
      {/* Main Content Area */}
      <div ref={mainContentRef} className="flex-1 overflow-y-auto scroll-smooth relative pb-32">
        <div className="space-y-6">
          <AnimatePresence mode="sync">
            {workflowState.isRunning && (
              <>
                {workflowState.currentStep >= 0 && renderPlatformConnection()}
                
                {workflowState.currentStep >= 1 && renderVideoAnalysis()}
                
                {workflowState.currentStep >= 4 && workflowState.emotionTimeline.length > 0 && renderEmotionTimeline()}
                
                {workflowState.currentStep >= 5 && renderInsights()}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* AI Process Sidebar */}
      <div className="w-80 flex-shrink-0">
        <AnimatePresence>
          {workflowState.isRunning && renderStepIndicator()}
        </AnimatePresence>
      </div>
    </div>
  );
}