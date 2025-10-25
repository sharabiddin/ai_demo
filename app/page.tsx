'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Terminal } from 'lucide-react';
import CandidateAnalysis from './components/CandidateAnalysis';
import DocumentHunter from './components/DocumentHunter';
import EmotionAnalyzer from './components/EmotionAnalyzer';
import ResumeGenerator from './components/ResumeGenerator';
import SalaryNegotiationOracle from './components/SalaryNegotiationOracle';

export default function HomePage() {
  const [command, setCommand] = useState('');
  const [currentDemo, setCurrentDemo] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Determine which demo to show based on command
    const cmd = command.toLowerCase();
    if (cmd.includes('candidate') || (cmd.includes('analyze') && !cmd.includes('emotion')) || cmd.includes('namizəd')) {
      setCurrentDemo('candidate-analysis');
    } else if (cmd.includes('document') || cmd.includes('contract') || cmd.includes('find') || cmd.includes('sənəd') || cmd.includes('müqavilə')) {
      setCurrentDemo('document-hunter');
    } else if (cmd.includes('emotion') || cmd.includes('meeting') || cmd.includes('team') || cmd.includes('emosiya') || cmd.includes('görüş') || cmd.includes('komanda')) {
      setCurrentDemo('emotion-analyzer');
    } else if (cmd.includes('resume') || cmd.includes('generate') || cmd.includes('linkedin') || cmd.includes('cv') || cmd.includes('hazırla')) {
      setCurrentDemo('resume-generator');
    } else if (cmd.includes('salary') || cmd.includes('negotiation') || cmd.includes('predict') || cmd.includes('maaş') || cmd.includes('danışı') || cmd.includes('proqnoz')) {
      setCurrentDemo('salary-negotiation');
    }
    
    setIsProcessing(false);
  };

  const handleReset = () => {
    setCurrentDemo(null);
    setCommand('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.05),transparent_50%)]" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-success-500" />
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-6 flex-shrink-0"
      >
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gradient-animated mb-2">TAPx HR Köməkçisi</h1>
              <p className="text-gray-600 text-lg">TAPx tərəfindən idarə olunan gələcək HR menecmenti</p>
              <div className="mt-3 inline-flex items-center px-4 py-2 bg-success-50 border border-success-200 rounded-full">
                <span className="w-2 h-2 bg-success-500 rounded-full mr-2 animate-pulse"></span>
                <span className="text-sm font-medium text-success-700">Lokal işləyir • Şirkət məlumatları təhlükəsizdir</span>
              </div>
            </div>
            {currentDemo && (
              <button
                onClick={handleReset}
                className="btn-secondary"
              >
                Demo Sıfırla
              </button>
            )}
          </div>
        </div>
      </motion.header>

      {/* Demo Content Area */}
      <div className="relative z-10 flex-1 min-h-0 overflow-hidden">
        {!currentDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-full p-6"
          >
            <div className="text-center max-w-4xl mx-auto">
              <div className="glass-card p-12">
                <div className="relative inline-block mb-8">
                  <div className="absolute inset-0 bg-primary-500/20 blur-3xl rounded-full"></div>
                  <Terminal className="w-24 h-24 text-primary-600 mx-auto relative animate-float" />
                </div>
                <h2 className="text-5xl font-bold mb-6 text-gradient-animated">TAPx, sizə necə kömək edə bilərəm...</h2>
                <p className="text-gray-600 mb-10 text-xl leading-relaxed">
                  TAPx köməkçimizi fəaliyyətdə görmək üçün aşağıya komanda daxil edin. 
                  O, sizin sorğunuzu real vaxt vizuallaşdırmaları ilə şəffaf şəkildə emal etdiyi kimi izləyin.
                </p>
                <div className="mb-10 p-6 bg-gradient-to-r from-success-50 to-primary-50 border-2 border-success-200 rounded-2xl shadow-soft">
                  <div className="flex items-center justify-center text-success-700 text-base">
                    <span className="w-4 h-4 bg-success-500 rounded-full mr-3 animate-pulse"></span>
                    <strong className="text-lg">100% Lokal İşləmə:</strong>
                    <span className="ml-2 text-success-600">Bütün məlumatlar sizin serverinizdə qalır və heç vaxt xarici serverlərə göndərilmir</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                  <div className="glass-card p-8 glass-card-hover border-2 border-primary-200">
                    <h3 className="font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-4 text-xl">Bu komandaları cəhd edin:</h3>
                    <ul className="text-left space-y-3 text-gray-700">
                      <li className="flex items-center p-2 rounded-lg hover:bg-primary-50 transition-colors"><span className="text-primary-600 mr-3 text-lg">▶</span><span className="font-medium">"Leyla üçün maaş danışığı proqnozlaşdır"</span></li>
                      <li className="flex items-center p-2 rounded-lg hover:bg-primary-50 transition-colors"><span className="text-primary-600 mr-3 text-lg">▶</span><span className="font-medium">"Elvin Quliyev üçün CV hazırla"</span></li>
                      <li className="flex items-center p-2 rounded-lg hover:bg-primary-50 transition-colors"><span className="text-primary-600 mr-3 text-lg">▶</span><span className="font-medium">"komanda emosiyalarını görüşlərdən analiz et"</span></li>
                    </ul>
                  </div>
                  <div className="glass-card p-8 glass-card-hover border-2 border-accent-200">
                    <h3 className="font-bold bg-gradient-to-r from-accent-600 to-accent-700 bg-clip-text text-transparent mb-4 text-xl">TAPx Xüsusiyyətlər:</h3>
                    <ul className="text-left space-y-3 text-gray-700">
                      <li className="flex items-center p-2 rounded-lg hover:bg-accent-50 transition-colors"><span className="text-accent-600 mr-3 text-lg">✦</span><span className="font-medium">Bazar kəşfiyyatı analizi</span></li>
                      <li className="flex items-center p-2 rounded-lg hover:bg-accent-50 transition-colors"><span className="text-accent-600 mr-3 text-lg">✦</span><span className="font-medium">Rəqib təkliflərinin izlənməsi</span></li>
                      <li className="flex items-center p-2 rounded-lg hover:bg-accent-50 transition-colors"><span className="text-accent-600 mr-3 text-lg">✦</span><span className="font-medium">Danışıq uğuru proqnozlaşdırması</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Demo Components */}
        <div className="h-full">
          <CandidateAnalysis 
            isActive={currentDemo === 'candidate-analysis'} 
            command={command}
          />
          
          <DocumentHunter 
            isActive={currentDemo === 'document-hunter'} 
            command={command}
          />
          
          <EmotionAnalyzer 
            isActive={currentDemo === 'emotion-analyzer'} 
            command={command}
          />
          
          <ResumeGenerator 
            isActive={currentDemo === 'resume-generator'} 
            command={command}
          />
          
          <SalaryNegotiationOracle 
            isActive={currentDemo === 'salary-negotiation'} 
            command={command}
          />
        </div>
      </div>

      {/* Command Input (Fixed at bottom) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-6 flex-shrink-0"
      >
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="glass-card p-6 shadow-strong">
            <div className="flex items-center space-x-4">
              <Terminal className="w-6 h-6 text-primary-600 flex-shrink-0" />
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="TAPx HR komandanızı daxil edin..."
                className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400 text-lg font-medium"
                disabled={isProcessing}
              />
              <motion.button
                type="submit"
                disabled={isProcessing || !command.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isProcessing || !command.trim()
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:shadow-glow-blue hover:scale-105'
                }`}
              >
                {isProcessing ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-6 h-6" />
                )}
              </motion.button>
            </div>
            
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="flex items-center text-primary-600">
                  <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mr-3" />
                  TAPx köməkçisi işə salınır...
                </div>
              </motion.div>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}