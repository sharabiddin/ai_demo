'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Search, 
  FileText, 
  CheckCircle, 
  Clock, 
  Download,
  Scan,
  Database,
  Wifi,
  Eye,
  Star
} from 'lucide-react';
import { Email, Attachment, DocumentHunterStep } from '../data/documentHunterData';
import { mockEmails, documentHunterSteps, emailProviders } from '../data/documentHunterData';

interface DocumentHunterProps {
  isActive: boolean;
  command: string;
}

interface WorkflowState {
  isRunning: boolean;
  currentStep: number;
  searchQuery: string;
  emailsScanned: number;
  totalEmails: number;
  foundEmails: Email[];
  relevantAttachments: Attachment[];
  progress: number;
}

export default function DocumentHunter({ isActive, command }: DocumentHunterProps) {
  const [workflowState, setWorkflowState] = useState<WorkflowState>({
    isRunning: false,
    currentStep: -1,
    searchQuery: '',
    emailsScanned: 0,
    totalEmails: 1247,
    foundEmails: [],
    relevantAttachments: [],
    progress: 0
  });

  const [steps, setSteps] = useState<DocumentHunterStep[]>(documentHunterSteps);
  const [scanningEmails, setScanningEmails] = useState<Email[]>([]);
  
  // Refs for auto-scrolling
  const emailConnectionRef = useRef<HTMLDivElement>(null);
  const emailScanRef = useRef<HTMLDivElement>(null);
  const documentsRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && (command.toLowerCase().includes('document') || command.toLowerCase().includes('contract') || command.toLowerCase().includes('sənəd') || command.toLowerCase().includes('müqavilə'))) {
      const query = extractSearchQuery(command);
      setWorkflowState(prev => ({ ...prev, searchQuery: query }));
      startDocumentHunt();
    }
  }, [isActive, command]);

  const extractSearchQuery = (cmd: string) => {
    if (cmd.toLowerCase().includes('john smith')) return 'John Smith employment contract';
    if (cmd.toLowerCase().includes('contract')) return 'employment contract';
    return 'HR documents';
  };

  const scrollToElement = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current && mainContentRef.current) {
      ref.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const startDocumentHunt = async () => {
    setWorkflowState(prev => ({ ...prev, isRunning: true, currentStep: 0 }));
    setSteps(documentHunterSteps.map(step => ({ ...step, status: 'pending' })));

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
      case 0: // Email System Connection
        setTimeout(() => scrollToElement(emailConnectionRef), 100);
        await simulateEmailConnection();
        break;
      
      case 1: // Search Query Optimization
        await new Promise(resolve => setTimeout(resolve, 1500));
        break;
      
      case 2: // Email Scanning
        setTimeout(() => scrollToElement(emailScanRef), 100);
        await simulateEmailScanning();
        break;
      
      case 3: // Attachment Analysis
        setTimeout(() => scrollToElement(documentsRef), 100);
        await simulateAttachmentAnalysis();
        break;
      
      case 4: // Document Classification
        await new Promise(resolve => setTimeout(resolve, 1800));
        setWorkflowState(prev => ({ 
          ...prev, 
          relevantAttachments: mockEmails
            .filter(email => email.isRelevant)
            .flatMap(email => email.attachments || [])
            .filter(att => att.isDocument)
        }));
        break;
      
      case 5: // Results Compilation
        setTimeout(() => scrollToElement(resultsRef), 100);
        await new Promise(resolve => setTimeout(resolve, 1200));
        break;
    }

    await new Promise(resolve => setTimeout(resolve, steps[stepIndex].duration || 1000));

    setSteps(prev => prev.map((step, idx) => 
      idx === stepIndex ? { ...step, status: 'completed' } : step
    ));
  };

  const simulateEmailConnection = async () => {
    for (let i = 0; i < emailProviders.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
    }
  };

  const simulateEmailScanning = async () => {
    const totalEmails = workflowState.totalEmails;
    const scanDuration = 3000;
    const updateInterval = 50;
    const updates = scanDuration / updateInterval;
    
    for (let i = 0; i <= updates; i++) {
      const progress = (i / updates) * 100;
      const scanned = Math.floor((i / updates) * totalEmails);
      
      setWorkflowState(prev => ({ 
        ...prev, 
        emailsScanned: scanned,
        progress: progress
      }));

      // Show some emails being scanned
      if (i % 10 === 0 && i < mockEmails.length * 10) {
        const emailIndex = Math.floor(i / 10) % mockEmails.length;
        setScanningEmails(prev => {
          const newEmails = [...prev, mockEmails[emailIndex]];
          return newEmails.slice(-3); // Keep only last 3
        });
      }

      await new Promise(resolve => setTimeout(resolve, updateInterval));
    }

    setWorkflowState(prev => ({ 
      ...prev, 
      foundEmails: mockEmails.filter(email => email.isRelevant)
    }));
  };

  const simulateAttachmentAnalysis = async () => {
    const relevantEmails = mockEmails.filter(email => email.isRelevant);
    
    for (const email of relevantEmails) {
      if (email.attachments) {
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    }
  };

  const renderEmailConnection = () => (
    <motion.div
      ref={emailConnectionRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-effect p-6 mb-6 transition-all duration-500 ${
        workflowState.currentStep === 0 
          ? 'ring-2 ring-cyber-blue/50 bg-cyber-blue/5' 
          : ''
      }`}
    >
      <div className="flex items-center mb-4">
        <Wifi className="w-6 h-6 text-cyber-blue mr-2" />
        <h3 className="text-xl font-bold text-cyber">Email Sistemi Qoşulması</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {emailProviders.map((provider, index) => (
          <motion.div
            key={provider.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className={`p-4 rounded-lg border text-center transition-all duration-300 ${
              provider.status === 'connected' 
                ? 'border-green-400 bg-green-400/10' 
                : 'border-cyber-blue bg-cyber-blue/10'
            }`}
          >
            <div className="text-2xl mb-2">{provider.icon}</div>
            <div className="font-medium">{provider.name}</div>
            <div className={`text-xs mt-1 ${
              provider.status === 'connected' ? 'text-green-400' : 'text-cyber-blue'
            }`}>
              {provider.status === 'connected' ? '✓ Connected' : '⚡ Connecting...'}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-black/30 rounded-lg">
        <div className="text-sm text-gray-300">
          <div className="font-medium text-cyber-blue mb-1">Axtarış Sorğusu:</div>
          <div className="font-mono">{workflowState.searchQuery}</div>
        </div>
      </div>
    </motion.div>
  );

  const renderEmailScanning = () => (
    <motion.div
      ref={emailScanRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-effect p-6 mb-6 transition-all duration-500 ${
        workflowState.currentStep === 2 
          ? 'ring-2 ring-cyber-purple/50 bg-cyber-purple/5' 
          : ''
      }`}
    >
      <div className="flex items-center mb-4">
        <Search className="w-6 h-6 text-cyber-purple mr-2" />
        <h3 className="text-xl font-bold text-cyber">Email Tarama İrəliləyişi</h3>
        {workflowState.currentStep === 2 && (
          <div className="ml-auto">
            <Scan className="w-6 h-6 text-cyber-purple animate-pulse" />
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span>Email-lər taranır...</span>
          <span>{workflowState.emailsScanned.toLocaleString()} / {workflowState.totalEmails.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-cyber-purple to-cyber-blue h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${workflowState.progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      {scanningEmails.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-300 mb-2">Hazırda taranır:</div>
          {scanningEmails.map((email, index) => (
            <motion.div
              key={`${email.id}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-3 bg-black/30 rounded-lg border border-gray-600"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium truncate">{email.subject}</div>
                  <div className="text-xs text-gray-400">Göndərən: {email.from}</div>
                </div>
                {email.isRelevant && (
                  <div className="ml-2 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );

  const renderDocumentAnalysis = () => (
    <motion.div
      ref={documentsRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-effect p-6 mb-6 transition-all duration-500 ${
        workflowState.currentStep === 3 || workflowState.currentStep === 4
          ? 'ring-2 ring-cyber-pink/50 bg-cyber-pink/5' 
          : ''
      }`}
    >
      <div className="flex items-center mb-4">
        <FileText className="w-6 h-6 text-cyber-pink mr-2" />
        <h3 className="text-xl font-bold text-cyber">Sənəd Analizi</h3>
      </div>
      
      <div className="space-y-3">
        {workflowState.foundEmails.map((email, index) => (
          <motion.div
            key={email.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3 }}
            className="p-4 bg-black/30 rounded-lg border border-gray-600"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="font-medium">{email.subject}</div>
                <div className="text-sm text-gray-400">Göndərən: {email.from} • {email.date}</div>
              </div>
              <div className="text-green-400">
                <Eye className="w-5 h-5" />
              </div>
            </div>
            
            {email.attachments && email.attachments.length > 0 && (
              <div className="space-y-2">
                {email.attachments.map((attachment, attIndex) => (
                  <motion.div
                    key={attachment.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (index * 0.3) + (attIndex * 0.2) }}
                    className={`p-3 rounded-lg border ${
                      attachment.isDocument 
                        ? 'border-cyber-pink bg-cyber-pink/10' 
                        : 'border-gray-600 bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        <div>
                          <div className="text-sm font-medium">{attachment.filename}</div>
                          <div className="text-xs text-gray-400">{attachment.type} • {attachment.size}</div>
                        </div>
                      </div>
                      {attachment.relevanceScore && (
                        <div className="flex items-center text-cyber-pink">
                          <Star className="w-4 h-4 mr-1" />
                          <span className="text-sm font-bold">{attachment.relevanceScore}%</span>
                        </div>
                      )}
                    </div>
                    
                    {attachment.extractedText && (
                      <div className="mt-3 p-2 bg-black/50 rounded text-xs font-mono">
                        {attachment.extractedText.slice(0, 200)}...
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderResults = () => (
    <motion.div
      ref={resultsRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-effect p-6 transition-all duration-500 ${
        workflowState.currentStep === 5
          ? 'ring-2 ring-green-400/50 bg-green-400/5'
          : ''
      }`}
    >
      <div className="flex items-center mb-4">
        <Download className="w-6 h-6 text-green-400 mr-2" />
        <h3 className="text-xl font-bold text-cyber">Axtarış Nəticələri</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-green-400/10 rounded-lg border border-green-400/30">
          <div className="text-2xl font-bold text-green-400">{workflowState.foundEmails.length}</div>
          <div className="text-sm text-gray-400">Müvafiq Emaillər</div>
        </div>
        <div className="text-center p-4 bg-cyber-blue/10 rounded-lg border border-cyber-blue/30">
          <div className="text-2xl font-bold text-cyber-blue">{workflowState.relevantAttachments.length}</div>
          <div className="text-sm text-gray-400">Tapılan Sənədlər</div>
        </div>
        <div className="text-center p-4 bg-cyber-pink/10 rounded-lg border border-cyber-pink/30">
          <div className="text-2xl font-bold text-cyber-pink">98%</div>
          <div className="text-sm text-gray-400">Uyğunluq Dəqiqliyi</div>
        </div>
      </div>

      <div className="bg-green-400/10 border border-green-400/30 rounded-lg p-4">
        <h4 className="font-semibold text-green-400 mb-3">🎯 AI Summary</h4>
        <div className="text-sm space-y-2">
          <p>✅ <strong>Əmək Müqaviləsi Tapıldı:</strong> John Smith-in imzalanmış müqaviləsi tapıldı</p>
          <p>✅ <strong>Əsas Təfərrüatlar Çıxarıldı:</strong> Vəzifə: Senior Developer, Maaş: $95,000</p>
          <p>✅ <strong>Status:</strong> Contract signed and returned on March 16, 2023</p>
          <p>✅ <strong>Related Documents:</strong> 2 additional contract-related files identified</p>
        </div>
      </div>
    </motion.div>
  );

  const renderStepIndicator = () => (
    <div className="glass-effect p-4 h-full">
      <h4 className="font-semibold mb-3 text-cyber">Sənəd Ovlacısı TAPx</h4>
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
              {workflowState.currentStep >= 0 && renderEmailConnection()}
              
              {workflowState.currentStep >= 2 && renderEmailScanning()}
              
              {workflowState.currentStep >= 3 && workflowState.foundEmails.length > 0 && renderDocumentAnalysis()}
              
              {workflowState.currentStep >= 5 && renderResults()}
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