'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Brain, FileText, CheckCircle, Clock, Zap } from 'lucide-react';
import { Candidate, AnalysisStep, WorkflowState } from '../types';
import { mockCandidates, analysisSteps } from '../data/mockData';

interface CandidateAnalysisProps {
  isActive: boolean;
  command: string;
}

export default function CandidateAnalysis({ isActive, command }: CandidateAnalysisProps) {
  const [workflowState, setWorkflowState] = useState<WorkflowState>({
    isRunning: false,
    currentStep: -1,
    candidates: mockCandidates,
    selectedCandidate: undefined,
    analysisResult: undefined
  });

  const [steps, setSteps] = useState<AnalysisStep[]>(analysisSteps);
  const [highlightedText, setHighlightedText] = useState<string[]>([]);
  
  // Refs for auto-scrolling
  const candidateListRef = useRef<HTMLDivElement>(null);
  const cvAnalysisRef = useRef<HTMLDivElement>(null);
  const analysisResultRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && (command.toLowerCase().includes('candidate') || command.toLowerCase().includes('namizəd'))) {
      startAnalysis();
    }
  }, [isActive, command]);

  const startAnalysis = async () => {
    setWorkflowState(prev => ({ ...prev, isRunning: true, currentStep: 0 }));
    setSteps(analysisSteps.map(step => ({ ...step, status: 'pending' })));

    for (let i = 0; i < steps.length; i++) {
      await processStep(i);
    }
  };

  const scrollToElement = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current && mainContentRef.current) {
      const element = ref.current;
      const container = mainContentRef.current;
      const elementTop = element.offsetTop;
      const offset = 20;
      
      container.scrollTo({
        top: elementTop - offset,
        behavior: 'smooth'
      });
    }
  };

  const processStep = async (stepIndex: number) => {
    setSteps(prev => prev.map((step, idx) => 
      idx === stepIndex ? { ...step, status: 'processing' } : step
    ));

    setWorkflowState(prev => ({ ...prev, currentStep: stepIndex }));

    switch (stepIndex) {
      case 0: // Fetching Candidates
        await new Promise(resolve => setTimeout(resolve, 1500));
        // Scroll to candidate list when it appears
        setTimeout(() => scrollToElement(candidateListRef), 100);
        break;
      
      case 1: // Candidate Selection
        await new Promise(resolve => setTimeout(resolve, 1000));
        const selectedCandidate = mockCandidates[0];
        setWorkflowState(prev => ({ ...prev, selectedCandidate }));
        break;
      
      case 2: // CV Analysis
        // Scroll to CV analysis section
        setTimeout(() => scrollToElement(cvAnalysisRef), 100);
        await simulateTextAnalysis();
        break;
      
      case 3: // Skill Matching
        await new Promise(resolve => setTimeout(resolve, 2000));
        break;
      
      case 4: // Generate Report
        await new Promise(resolve => setTimeout(resolve, 1500));
        setWorkflowState(prev => ({ 
          ...prev, 
          analysisResult: {
            score: 92,
            strengths: ['Güclü React ekspertizası', 'Rəhbərlik təcrübəsi', 'AWS sertifikatlı'],
            weaknesses: ['Məhdud backend təcrübəsi', 'Mobil proqramlaşdırma yoxdur'],
            recommendation: 'Senior Frontend Developer vəzifəsi üçün mükəmməl uyğunluq'
          }
        }));
        // Scroll to results when they appear
        setTimeout(() => scrollToElement(analysisResultRef), 500);
        break;
    }

    await new Promise(resolve => setTimeout(resolve, steps[stepIndex].duration || 1000));

    setSteps(prev => prev.map((step, idx) => 
      idx === stepIndex ? { ...step, status: 'completed' } : step
    ));
  };

  const simulateTextAnalysis = async () => {
    const cv = workflowState.selectedCandidate?.cv || '';
    const words = cv.split(' ');
    const importantWords = ['React', 'TypeScript', 'AWS', 'Lead', 'Frontend', 'Stanford', 'Developer'];
    
    for (const word of importantWords) {
      setHighlightedText(prev => [...prev, word]);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  };

  const renderCandidateList = () => (
    <motion.div
      ref={candidateListRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-6 mb-6 transition-all duration-500 shadow-soft hover:shadow-medium ${
        workflowState.currentStep === 0 || workflowState.currentStep === 1 
          ? 'border-2 border-primary-300 shadow-glow-blue bg-primary-50' 
          : ''
      }`}
    >
      <div className="flex items-center mb-4">
        <User className="w-6 h-6 text-primary-600 mr-2" />
        <h3 className="text-xl font-bold text-gray-900">Namizəd Fondu</h3>
      </div>
      <div className="space-y-3">
        {workflowState.candidates.map((candidate, index) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`p-4 rounded-lg border transition-all duration-300 shadow-soft hover:shadow-medium ${
              workflowState.selectedCandidate?.id === candidate.id
                ? 'border-primary-300 bg-primary-50 shadow-glow-blue'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                <p className="text-gray-500 text-sm">{candidate.position}</p>
                <p className="text-gray-400 text-xs">{candidate.experience}</p>
              </div>
              {workflowState.selectedCandidate?.id === candidate.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-primary-600"
                >
                  <CheckCircle className="w-6 h-6" />
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderCVAnalysis = () => {
    if (!workflowState.selectedCandidate) return null;

    return (
      <motion.div
        ref={cvAnalysisRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`glass-card p-6 mb-6 transition-all duration-500 shadow-soft hover:shadow-medium ${
          workflowState.currentStep === 2 || workflowState.currentStep === 3
            ? 'border-2 border-accent-300 shadow-glow-purple bg-accent-50'
            : ''
        }`}
      >
        <div className="flex items-center mb-4">
          <FileText className="w-6 h-6 text-accent-600 mr-2" />
          <h3 className="text-xl font-bold text-gray-900">CV Analizi</h3>
          {workflowState.currentStep === 2 && (
            <div className="ml-auto">
              <div className="scanning-line"></div>
              <Brain className="w-6 h-6 text-primary-600 animate-pulse" />
            </div>
          )}
        </div>
        
        <div className="bg-white/90 border border-gray-100 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
          {workflowState.selectedCandidate.cv.split(' ').map((word, index) => (
            <span
              key={index}
              className={`${
                highlightedText.includes(word.replace(/[^\w]/g, ''))
                  ? 'bg-primary-50 text-primary-600 animate-text-highlight'
                  : 'text-gray-900'
              }`}
            >
              {word}{' '}
            </span>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderAnalysisResult = () => {
    if (!workflowState.analysisResult) return null;

    return (
      <motion.div
        ref={analysisResultRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`glass-card p-6 transition-all duration-500 shadow-soft hover:shadow-medium ${
          workflowState.currentStep === 4
            ? 'border-2 border-accent-400 shadow-glow-purple bg-accent-50'
            : ''
        }`}
      >
        <div className="flex items-center mb-4">
          <Zap className="w-6 h-6 text-accent-500 mr-2" />
          <h3 className="text-xl font-bold text-gray-900">Analiz Nəticələri</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {workflowState.analysisResult.score}%
            </div>
            <div className="text-gray-500">Uyğunluq Balı</div>
          </div>
          
          <div>
            <h4 className="font-semibold text-success-600 mb-2">Güclü Tərəflər</h4>
            <ul className="text-sm space-y-1">
              {workflowState.analysisResult.strengths.map((strength, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <CheckCircle className="w-4 h-4 text-success-600 mr-2" />
                  <span className="text-gray-700">{strength}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-yellow-400 mb-2">İnkişaf Sahələri</h4>
            <ul className="text-sm space-y-1">
              {workflowState.analysisResult.weaknesses.map((weakness, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <Clock className="w-4 h-4 text-yellow-400 mr-2" />
                  {weakness}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-300">
          <h4 className="font-semibold text-primary-600 mb-2">AI Tövsiyəsi</h4>
          <p className="text-sm text-gray-700">{workflowState.analysisResult.recommendation}</p>
        </div>
      </motion.div>
    );
  };

  const renderStepIndicator = () => (
    <div className="glass-card p-4 h-full shadow-soft">
      <h4 className="font-semibold mb-3 text-gray-900">AI Prosesi</h4>
      <div className="space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-start text-sm p-3 rounded-lg border transition-all duration-300 shadow-soft ${
              step.status === 'completed' ? 'text-success-600 bg-success-50 border-success-400' :
              step.status === 'processing' ? 'text-primary-600 bg-primary-50 border-primary-300 shadow-glow-blue animate-pulse-glow' :
              'text-gray-400 border-gray-200'
            }`}
          >
            <div className="flex-shrink-0 mr-3 mt-0.5">
              {step.status === 'completed' && <CheckCircle className="w-5 h-5" />}
              {step.status === 'processing' && <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />}
              {step.status === 'pending' && <div className="w-5 h-5 border border-gray-400 rounded-full" />}
            </div>
            <div className="flex-1">
              <div className="font-medium mb-1 text-gray-900">{step.title}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{step.description}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  if (!isActive) return null;

  return (
    <div className="flex h-full min-h-0 gap-6 p-6">
      {/* Main Content Area */}
      <div ref={mainContentRef} className="flex-1 overflow-y-auto scroll-smooth">
        <AnimatePresence>
          {workflowState.isRunning && (
            <>
              {workflowState.currentStep >= 0 && renderCandidateList()}
              
              {workflowState.currentStep >= 2 && workflowState.selectedCandidate && renderCVAnalysis()}
              
              {workflowState.currentStep >= 4 && workflowState.analysisResult && renderAnalysisResult()}
            </>
          )}
        </AnimatePresence>
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