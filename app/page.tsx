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
    <div className="h-screen bg-dark-bg relative overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 via-transparent to-cyber-purple/5" />
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink" />
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-6 flex-shrink-0"
      >
        <div className="glass-effect p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-cyber mb-2">TAPx HR Köməkçisi</h1>
              <p className="text-gray-400">TAPx tərəfindən idarə olunan gələcək HR menecmenti</p>
              <div className="mt-2 text-xs text-green-400 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Lokal işləyir • Şirkət məlumatları təhlükəsizdir
              </div>
            </div>
            {currentDemo && (
              <button
                onClick={handleReset}
                className="px-4 py-2 glass-effect hover:bg-gray-700/50 transition-colors rounded-lg border border-gray-500/30"
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
              <div className="backdrop-blur-md bg-gray-900/70 p-8 rounded-2xl border border-gray-500/40">
                <Terminal className="w-20 h-20 text-cyber-blue mx-auto mb-8" />
                <h2 className="text-4xl font-bold mb-6 text-cyber">TAPx, sizə necə kömək edə bilərəm...</h2>
                <p className="text-gray-300 mb-10 text-lg">
                  TAPx köməkçimizi fəaliyyətdə görmək üçün aşağıya komanda daxil edin. 
                  O, sizin sorğunuzu real vaxt vizuallaşdırmaları ilə şəffaf şəkildə emal etdiyi kimi izləyin.
                </p>
                <div className="mb-8 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <div className="flex items-center text-green-400 text-sm">
                    <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                    <strong>100% Lokal İşləmə:</strong>
                    <span className="ml-2 text-green-300">Bütün məlumatlar sizin serverinizdə qalır və heç vaxt xarici serverlərə göndərilmir</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                  <div className="backdrop-blur-md bg-gray-800/60 p-6 rounded-xl border border-cyber-blue/40 bg-gradient-to-br from-cyber-blue/10 to-transparent">
                    <h3 className="font-bold text-cyber-blue mb-4 text-xl">Bu komandaları cəhd edin:</h3>
                    <ul className="text-left space-y-2 text-gray-100">
                      <li className="flex items-center"><span className="text-cyber-blue mr-2">▶</span>"Leyla üçün maaş danışığı proqnozlaşdır"</li>
                      <li className="flex items-center"><span className="text-cyber-blue mr-2">▶</span>"Elvin Quliyev üçün CV hazırla"</li>
                      <li className="flex items-center"><span className="text-cyber-blue mr-2">▶</span>"komanda emosiyalarını görüşlərdən analiz et"</li>
                    </ul>
                  </div>
                  <div className="backdrop-blur-md bg-gray-800/60 p-6 rounded-xl border border-cyber-purple/40 bg-gradient-to-br from-cyber-purple/10 to-transparent">
                    <h3 className="font-bold text-cyber-purple mb-4 text-xl">TAPx Xüsusiyyətlər:</h3>
                    <ul className="text-left space-y-2 text-gray-100">
                      <li className="flex items-center"><span className="text-cyber-purple mr-2">✦</span>Bazar kəşfiyyatı analizi</li>
                      <li className="flex items-center"><span className="text-cyber-purple mr-2">✦</span>Rəqib təkliflərinin izlənməsi</li>
                      <li className="flex items-center"><span className="text-cyber-purple mr-2">✦</span>Danışıq uğuru proqnozlaşdırması</li>
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
          <div className="glass-effect p-4 rounded-lg border border-gray-500/30">
            <div className="flex items-center space-x-4">
              <Terminal className="w-6 h-6 text-cyber-blue flex-shrink-0" />
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="TAPx HR komandanızı daxil edin..."
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-lg"
                disabled={isProcessing}
              />
              <motion.button
                type="submit"
                disabled={isProcessing || !command.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  isProcessing || !command.trim()
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-purple hover:to-cyber-pink cyber-glow'
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
                className="mt-4 pt-4 border-t border-gray-500/30"
              >
                <div className="flex items-center text-cyber-blue">
                  <div className="w-4 h-4 border-2 border-cyber-blue border-t-transparent rounded-full animate-spin mr-3" />
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