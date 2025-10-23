'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Linkedin, 
  Download, 
  FileText, 
  CheckCircle, 
  Clock,
  Zap,
  Star,
  Target,
  User,
  Briefcase,
  GraduationCap,
  Award,
  TrendingUp,
  Copy,
  Eye
} from 'lucide-react';
import { LinkedInProfile, GeneratedResume, ResumeGeneratorStep } from '../data/resumeGeneratorData';
import { mockLinkedInProfile, resumeTemplates, generatedResumes, resumeGeneratorSteps, linkedInScrapeSteps } from '../data/resumeGeneratorData';

interface ResumeGeneratorProps {
  isActive: boolean;
  command: string;
}

interface WorkflowState {
  isRunning: boolean;
  currentStep: number;
  linkedInProfile?: LinkedInProfile;
  extractedData: string[];
  generatedResumes: GeneratedResume[];
  selectedTemplate: string;
  currentScrapeStep: number;
}

export default function ResumeGenerator({ isActive, command }: ResumeGeneratorProps) {
  const [workflowState, setWorkflowState] = useState<WorkflowState>({
    isRunning: false,
    currentStep: -1,
    extractedData: [],
    generatedResumes: [],
    selectedTemplate: 'technical',
    currentScrapeStep: -1
  });

  const [steps, setSteps] = useState<ResumeGeneratorStep[]>(resumeGeneratorSteps);
  
  // Refs for auto-scrolling
  const linkedinConnectionRef = useRef<HTMLDivElement>(null);
  const profileExtractionRef = useRef<HTMLDivElement>(null);
  const resumeGenerationRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && (command.toLowerCase().includes('resume') || command.toLowerCase().includes('generate') || command.toLowerCase().includes('cv') || command.toLowerCase().includes('hazırla'))) {
      startResumeGeneration();
    }
  }, [isActive, command]);

  const scrollToElement = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current && mainContentRef.current) {
      ref.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const startResumeGeneration = async () => {
    setWorkflowState(prev => ({ ...prev, isRunning: true, currentStep: 0 }));
    setSteps(resumeGeneratorSteps.map(step => ({ ...step, status: 'pending' })));

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
      case 0: // LinkedIn Connection
        setTimeout(() => scrollToElement(linkedinConnectionRef), 100);
        await simulateLinkedInConnection();
        break;
      
      case 1: // Profile Extraction
        setTimeout(() => scrollToElement(profileExtractionRef), 100);
        await simulateProfileExtraction();
        break;
      
      case 2: // Content Analysis
        await simulateContentAnalysis();
        break;
      
      case 3: // Resume Optimization
        setTimeout(() => scrollToElement(resumeGenerationRef), 100);
        await simulateResumeOptimization();
        break;
      
      case 4: // Multi-Format Generation
        await simulateMultiFormatGeneration();
        break;
      
      case 5: // Quality Assessment
        setTimeout(() => scrollToElement(resultsRef), 100);
        await simulateQualityAssessment();
        break;
    }

    await new Promise(resolve => setTimeout(resolve, steps[stepIndex].duration || 1000));

    setSteps(prev => prev.map((step, idx) => 
      idx === stepIndex ? { ...step, status: 'completed' } : step
    ));
  };

  const simulateLinkedInConnection = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    setWorkflowState(prev => ({ 
      ...prev, 
      linkedInProfile: mockLinkedInProfile 
    }));
  };

  const simulateProfileExtraction = async () => {
    for (let i = 0; i < linkedInScrapeSteps.length; i++) {
      setWorkflowState(prev => ({ ...prev, currentScrapeStep: i }));
      
      setWorkflowState(prev => ({ 
        ...prev, 
        extractedData: [...prev.extractedData, linkedInScrapeSteps[i]]
      }));
      
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  };

  const simulateContentAnalysis = async () => {
    await new Promise(resolve => setTimeout(resolve, 2500));
  };

  const simulateResumeOptimization = async () => {
    await new Promise(resolve => setTimeout(resolve, 2200));
  };

  const simulateMultiFormatGeneration = async () => {
    await new Promise(resolve => setTimeout(resolve, 1800));
    setWorkflowState(prev => ({ 
      ...prev, 
      generatedResumes: generatedResumes
    }));
  };

  const simulateQualityAssessment = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  const renderLinkedInConnection = () => (
    <motion.div
      ref={linkedinConnectionRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`backdrop-blur-md bg-gray-800/60 p-6 mb-6 rounded-xl border transition-all duration-500 ${
        workflowState.currentStep === 0 
          ? 'border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-transparent' 
          : 'border-gray-600/30'
      }`}
    >
      <div className="flex items-center mb-4">
        <Linkedin className="w-6 h-6 text-blue-500 mr-2" />
        <h3 className="text-xl font-bold text-cyber">LinkedIn İnteqrasiyası</h3>
        {workflowState.currentStep === 0 && (
          <div className="ml-auto">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
          </div>
        )}
      </div>
      
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
              <Linkedin className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <div className="font-semibold text-gray-100">LinkedIn API Connection</div>
              <div className="text-sm text-gray-400">Secure OAuth 2.0 Authentication</div>
            </div>
          </div>
          {workflowState.linkedInProfile && (
            <CheckCircle className="w-6 h-6 text-green-400" />
          )}
        </div>
        
        {workflowState.linkedInProfile && (
          <div className="mt-4 p-3 bg-green-400/10 border border-green-400/30 rounded">
            <div className="text-sm text-green-400 font-medium">✓ Elvin Quliyev-in profilinə uğurla qoşuldu</div>
            <div className="text-xs text-gray-400 mt-1">Profile access granted • Data extraction authorized</div>
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderProfileExtraction = () => (
    <motion.div
      ref={profileExtractionRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`backdrop-blur-md bg-gray-800/60 p-6 mb-6 rounded-xl border transition-all duration-500 ${
        workflowState.currentStep === 1 
          ? 'border-cyber-purple/50 bg-gradient-to-br from-cyber-purple/10 to-transparent' 
          : 'border-gray-600/30'
      }`}
    >
      <div className="flex items-center mb-4">
        <User className="w-6 h-6 text-cyber-purple mr-2" />
        <h3 className="text-xl font-bold text-cyber">Profil Məlumatlarının Çıxarılması</h3>
        {workflowState.currentStep === 1 && (
          <div className="ml-auto">
            <Zap className="w-6 h-6 text-cyber-purple animate-pulse" />
          </div>
        )}
      </div>
      
      {workflowState.linkedInProfile && (
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-black/30 rounded-lg">
            <div className="text-4xl mr-4">{workflowState.linkedInProfile.profilePicture}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-100">{workflowState.linkedInProfile.name}</h4>
              <p className="text-sm text-gray-300">{workflowState.linkedInProfile.headline}</p>
              <p className="text-xs text-gray-400">{workflowState.linkedInProfile.location}</p>
              <div className="flex gap-4 mt-2 text-xs text-gray-500">
                <span>{workflowState.linkedInProfile.connections} connections</span>
                <span>{workflowState.linkedInProfile.profileViews} profile views</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-black/30 rounded-lg">
              <div className="flex items-center mb-2">
                <Briefcase className="w-5 h-5 text-cyber-blue mr-2" />
                <span className="font-medium text-gray-100">Experience</span>
              </div>
              <div className="text-2xl font-bold text-cyber-blue">{workflowState.linkedInProfile.experience.length}</div>
              <div className="text-xs text-gray-400">positions</div>
            </div>
            
            <div className="p-4 bg-black/30 rounded-lg">
              <div className="flex items-center mb-2">
                <GraduationCap className="w-5 h-5 text-green-400 mr-2" />
                <span className="font-medium text-gray-100">Education</span>
              </div>
              <div className="text-2xl font-bold text-green-400">{workflowState.linkedInProfile.education.length}</div>
              <div className="text-xs text-gray-400">degrees</div>
            </div>
            
            <div className="p-4 bg-black/30 rounded-lg">
              <div className="flex items-center mb-2">
                <Award className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="font-medium text-gray-100">Skills</span>
              </div>
              <div className="text-2xl font-bold text-yellow-400">{workflowState.linkedInProfile.skills.length}</div>
              <div className="text-xs text-gray-400">technical skills</div>
            </div>
          </div>

          {workflowState.extractedData.length > 0 && (
            <div className="bg-black/30 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-100 mb-3">Real Vaxt Məlumat Çıxarılması</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {workflowState.extractedData.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm text-gray-300 flex items-center"
                  >
                    <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
                    {step}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );

  const renderResumeGeneration = () => (
    <motion.div
      ref={resumeGenerationRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`backdrop-blur-md bg-gray-800/60 p-6 mb-6 rounded-xl border transition-all duration-500 ${
        workflowState.currentStep === 3 || workflowState.currentStep === 4
          ? 'border-cyber-pink/50 bg-gradient-to-br from-cyber-pink/10 to-transparent' 
          : 'border-gray-600/30'
      }`}
    >
      <div className="flex items-center mb-4">
        <FileText className="w-6 h-6 text-cyber-pink mr-2" />
        <h3 className="text-xl font-bold text-cyber">TAPx CV Yaradılması</h3>
        {(workflowState.currentStep === 3 || workflowState.currentStep === 4) && (
          <div className="ml-auto">
            <div className="scanning-line"></div>
            <Zap className="w-6 h-6 text-cyber-pink animate-pulse ml-2" />
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {resumeTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className={`p-4 rounded-lg border text-center cursor-pointer transition-all duration-300 ${
              workflowState.selectedTemplate === template.id
                ? 'border-cyber-pink bg-cyber-pink/20'
                : 'border-gray-600/50 bg-black/30 hover:border-gray-500'
            }`}
            onClick={() => setWorkflowState(prev => ({ ...prev, selectedTemplate: template.id }))}
          >
            <div className="text-2xl mb-2">{template.icon}</div>
            <div className="font-medium text-gray-100 text-sm">{template.name}</div>
            <div className="text-xs text-gray-400 mt-1">{template.description}</div>
          </motion.div>
        ))}
      </div>

      {workflowState.currentStep >= 3 && (
        <div className="bg-black/30 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-100 mb-3">TAPx Optimallaşdırma Prosesi</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-sm text-gray-300">Analyzing achievements for quantifiable metrics</span>
            </div>
            <div className="flex items-center">
              <Target className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-sm text-gray-300">Optimizing keywords for ATS compatibility</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-sm text-gray-300">Highlighting technical leadership experience</span>
            </div>
            <div className="flex items-center">
              <Zap className="w-4 h-4 text-cyber-purple mr-2" />
              <span className="text-sm text-gray-300">Crafting compelling professional summary</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );

  const renderResults = () => (
    <motion.div
      ref={resultsRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`backdrop-blur-md bg-gray-800/60 p-6 rounded-xl border transition-all duration-500 ${
        workflowState.currentStep === 5
          ? 'border-green-400/50 bg-gradient-to-br from-green-400/10 to-transparent'
          : 'border-gray-600/30'
      }`}
    >
      <div className="flex items-center mb-4">
        <Download className="w-6 h-6 text-green-400 mr-2" />
        <h3 className="text-xl font-bold text-cyber">Yaradılmış CV-lər</h3>
      </div>
      
      {workflowState.generatedResumes.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-400/10 rounded-lg border border-green-400/30">
              <div className="text-2xl font-bold text-green-400">94%</div>
              <div className="text-sm text-gray-400">ATS Score</div>
            </div>
            <div className="text-center p-4 bg-blue-400/10 rounded-lg border border-blue-400/30">
              <div className="text-2xl font-bold text-blue-400">4</div>
              <div className="text-sm text-gray-400">CV Formatları</div>
            </div>
            <div className="text-center p-4 bg-purple-400/10 rounded-lg border border-purple-400/30">
              <div className="text-2xl font-bold text-purple-400">98%</div>
              <div className="text-sm text-gray-400">Acar Söz Uyğunluğu</div>
            </div>
          </div>

          {workflowState.generatedResumes.map((resume, index) => (
            <motion.div
              key={resume.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-black/40 border border-gray-600/50 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-400/20 rounded-lg flex items-center justify-center mr-3">
                    <FileText className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-100">Texniki Fokuslu CV</h4>
                    <div className="text-sm text-gray-400">Tailored for {resume.tailoredFor}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium text-yellow-400">{resume.score}%</span>
                  </div>
                  <button className="p-2 bg-green-400/20 text-green-400 rounded-lg hover:bg-green-400/30 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-blue-400/20 text-blue-400 rounded-lg hover:bg-blue-400/30 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-gray-600/20 text-gray-400 rounded-lg hover:bg-gray-600/30 transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-black/60 p-4 rounded-lg font-mono text-sm">
                <div className="text-gray-300 leading-relaxed whitespace-pre-line max-h-40 overflow-y-auto">
                  {resume.content.slice(0, 800)}...
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {resume.sections.map((section, sIndex) => (
                  <span
                    key={section.id}
                    className={`px-2 py-1 text-xs rounded-full ${
                      section.aiOptimized 
                        ? 'bg-green-400/20 text-green-400 border border-green-400/30' 
                        : 'bg-gray-600/20 text-gray-400 border border-gray-600/30'
                    }`}
                  >
                    {section.aiOptimized && '✨ '}{section.title}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          <div className="bg-green-400/10 border border-green-400/30 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-3">🎯 AI Recommendations</h4>
            <div className="text-sm space-y-2">
              <p>✅ <strong>Resume optimized</strong> for technical leadership roles</p>
              <p>✅ <strong>94% ATS compatibility</strong> with major recruiting platforms</p>
              <p>✅ <strong>Quantified achievements</strong> highlighting 40% performance improvements</p>
              <p>✅ <strong>Keywords optimized</strong> for React, TypeScript, and leadership terms</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );

  const renderStepIndicator = () => (
    <div className="backdrop-blur-md bg-gray-800/60 p-4 h-full rounded-xl border border-gray-600/30">
      <h4 className="font-semibold mb-3 text-cyber">Resume AI Process</h4>
      <div className="space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-start text-sm p-3 rounded-lg border transition-all duration-300 ${
              step.status === 'completed' ? 'text-green-400 bg-green-400/10 border-green-400/30' :
              step.status === 'processing' ? 'text-cyber-blue bg-cyber-blue/10 border-cyber-blue/30 cyber-glow animate-pulse-glow' :
              'text-gray-500 border-gray-700'
            }`}
          >
            <div className="flex-shrink-0 mr-3 mt-0.5">
              {step.status === 'completed' && <CheckCircle className="w-5 h-5" />}
              {step.status === 'processing' && <div className="w-5 h-5 border-2 border-cyber-blue border-t-transparent rounded-full animate-spin" />}
              {step.status === 'pending' && <div className="w-5 h-5 border border-gray-500 rounded-full" />}
            </div>
            <div className="flex-1">
              <div className="font-medium mb-1">{step.title}</div>
              <div className="text-xs text-gray-400 leading-relaxed">{step.description}</div>
              {step.details && step.status === 'processing' && (
                <div className="text-xs text-cyber-blue mt-1 italic">{step.details}</div>
              )}
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
              {workflowState.currentStep >= 0 && renderLinkedInConnection()}
              
              {workflowState.currentStep >= 1 && workflowState.linkedInProfile && renderProfileExtraction()}
              
              {workflowState.currentStep >= 3 && renderResumeGeneration()}
              
              {workflowState.currentStep >= 5 && workflowState.generatedResumes.length > 0 && renderResults()}
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