'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  CheckCircle, 
  Clock,
  Zap,
  AlertTriangle,
  Trophy,
  Building,
  Users,
  BarChart3,
  Calculator,
  Lightbulb,
  Shield,
  MessageSquare,
  Percent
} from 'lucide-react';
import { Employee, MarketData, CompetitorOffer, NegotiationPrediction, SalaryNegotiationStep } from '../data/salaryNegotiationData';
import { 
  mockEmployee, 
  marketDataSources, 
  mockMarketData, 
  competitorOffers, 
  mockNegotiationPrediction, 
  salaryNegotiationSteps,
  salaryTrends,
  negotiationScripts
} from '../data/salaryNegotiationData';

interface SalaryNegotiationOracleProps {
  isActive: boolean;
  command: string;
}

interface WorkflowState {
  isRunning: boolean;
  currentStep: number;
  employee?: Employee;
  marketData: MarketData[];
  competitorOffers: CompetitorOffer[];
  prediction?: NegotiationPrediction;
  currentDataSource: number;
  totalDataPoints: number;
}

export default function SalaryNegotiationOracle({ isActive, command }: SalaryNegotiationOracleProps) {
  const [workflowState, setWorkflowState] = useState<WorkflowState>({
    isRunning: false,
    currentStep: -1,
    marketData: [],
    competitorOffers: [],
    currentDataSource: -1,
    totalDataPoints: 0
  });

  const [steps, setSteps] = useState<SalaryNegotiationStep[]>(salaryNegotiationSteps);
  
  // Refs for auto-scrolling
  const employeeProfileRef = useRef<HTMLDivElement>(null);
  const marketAnalysisRef = useRef<HTMLDivElement>(null);
  const competitorOffersRef = useRef<HTMLDivElement>(null);
  const predictionRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && (command.toLowerCase().includes('salary') || command.toLowerCase().includes('negotiation') || command.toLowerCase().includes('maaş') || command.toLowerCase().includes('danışı') || command.toLowerCase().includes('proqnoz'))) {
      startSalaryAnalysis();
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

  const startSalaryAnalysis = async () => {
    setWorkflowState(prev => ({ ...prev, isRunning: true, currentStep: 0, employee: mockEmployee }));
    setSteps(salaryNegotiationSteps.map(step => ({ ...step, status: 'pending' })));

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
      case 0: // Market Data Collection
        setTimeout(() => scrollToElement(employeeProfileRef), 100);
        await simulateMarketDataCollection();
        break;
      
      case 1: // Competitor Analysis
        setTimeout(() => scrollToElement(marketAnalysisRef), 100);
        await simulateCompetitorAnalysis();
        break;
      
      case 2: // Performance Evaluation
        setTimeout(() => scrollToElement(competitorOffersRef), 100);
        await simulatePerformanceEvaluation();
        break;
      
      case 3: // Risk Assessment
        await simulateRiskAssessment();
        break;
      
      case 4: // Strategy Generation
        await simulateStrategyGeneration();
        break;
      
      case 5: // Prediction Modeling
        setTimeout(() => scrollToElement(predictionRef), 100);
        await simulatePredictionModeling();
        break;
    }

    await new Promise(resolve => setTimeout(resolve, steps[stepIndex].duration || 1000));

    setSteps(prev => prev.map((step, idx) => 
      idx === stepIndex ? { ...step, status: 'completed' } : step
    ));
  };

  const simulateMarketDataCollection = async () => {
    for (let i = 0; i < marketDataSources.length; i++) {
      setWorkflowState(prev => ({ ...prev, currentDataSource: i }));
      
      if (marketDataSources[i].status === 'connected') {
        setWorkflowState(prev => ({ 
          ...prev, 
          totalDataPoints: prev.totalDataPoints + marketDataSources[i].dataPoints 
        }));
        
        if (i < mockMarketData.length) {
          setWorkflowState(prev => ({ 
            ...prev, 
            marketData: [...prev.marketData, mockMarketData[i]]
          }));
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 400));
    }
  };

  const simulateCompetitorAnalysis = async () => {
    for (const offer of competitorOffers) {
      setWorkflowState(prev => ({ 
        ...prev, 
        competitorOffers: [...prev.competitorOffers, offer]
      }));
      await new Promise(resolve => setTimeout(resolve, 600));
    }
  };

  const simulatePerformanceEvaluation = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const simulateRiskAssessment = async () => {
    await new Promise(resolve => setTimeout(resolve, 2200));
  };

  const simulateStrategyGeneration = async () => {
    await new Promise(resolve => setTimeout(resolve, 1800));
  };

  const simulatePredictionModeling = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    setWorkflowState(prev => ({ 
      ...prev, 
      prediction: mockNegotiationPrediction 
    }));
  };

  const renderEmployeeProfile = () => (
    <motion.div
      ref={employeeProfileRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`backdrop-blur-md bg-gray-800/60 p-6 mb-6 rounded-xl border transition-all duration-500 ${
        workflowState.currentStep === 0 
          ? 'border-green-500/50 bg-gradient-to-br from-green-500/10 to-transparent' 
          : 'border-gray-600/30'
      }`}
    >
      <div className="flex items-center mb-4">
        <Users className="w-6 h-6 text-green-500 mr-2" />
        <h3 className="text-xl font-bold text-cyber">İşçi Analizi</h3>
        {workflowState.currentStep === 0 && (
          <div className="ml-auto">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
        )}
      </div>
      
      {workflowState.employee && (
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-black/30 rounded-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center mr-4">
              <Users className="w-8 h-8 text-green-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-100 text-lg">{workflowState.employee.name}</h4>
              <p className="text-gray-300">{workflowState.employee.currentRole}</p>
              <p className="text-sm text-gray-400">{workflowState.employee.department} • {workflowState.employee.location}</p>
              <div className="flex gap-4 mt-2 text-sm">
                <span className="text-green-400">Performance: {workflowState.employee.performance}%</span>
                <span className="text-blue-400">{workflowState.employee.experience} years exp</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-100">
                ${workflowState.employee.currentSalary.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Hazırkı Maaş</div>
              <div className="text-xs text-red-400 mt-1">Son artım: {workflowState.employee.lastRaise}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-black/30 rounded-lg text-center">
              <Trophy className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-yellow-400">{workflowState.employee.performance}%</div>
              <div className="text-xs text-gray-400">Performans</div>
            </div>
            <div className="p-3 bg-black/30 rounded-lg text-center">
              <Building className="w-5 h-5 text-blue-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-blue-400">{workflowState.employee.experience}</div>
              <div className="text-xs text-gray-400">İl</div>
            </div>
            <div className="p-3 bg-black/30 rounded-lg text-center">
              <Zap className="w-5 h-5 text-purple-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-purple-400">{workflowState.employee.skills.length}</div>
              <div className="text-xs text-gray-400">Bacarıqlar</div>
            </div>
            <div className="p-3 bg-black/30 rounded-lg text-center">
              <TrendingUp className="w-5 h-5 text-green-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-green-400">${workflowState.employee.marketValue?.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Bazar Dəyəri</div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );

  const renderMarketAnalysis = () => (
    <motion.div
      ref={marketAnalysisRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`backdrop-blur-md bg-gray-800/60 p-6 mb-6 rounded-xl border transition-all duration-500 ${
        workflowState.currentStep === 1 
          ? 'border-cyber-blue/50 bg-gradient-to-br from-cyber-blue/10 to-transparent' 
          : 'border-gray-600/30'
      }`}
    >
      <div className="flex items-center mb-4">
        <BarChart3 className="w-6 h-6 text-cyber-blue mr-2" />
        <h3 className="text-xl font-bold text-cyber">Real Vaxt Bazar Analizi</h3>
        {workflowState.currentStep === 1 && (
          <div className="ml-auto">
            <Zap className="w-6 h-6 text-cyber-blue animate-pulse" />
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {marketDataSources.map((source, index) => (
            <motion.div
              key={source.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className={`p-3 rounded-lg border text-center transition-all duration-300 ${
                workflowState.currentDataSource >= index
                  ? source.status === 'connected' 
                    ? 'border-green-400/50 bg-green-400/10' 
                    : 'border-gray-500/50 bg-gray-500/10'
                  : 'border-gray-700 bg-black/20'
              }`}
            >
              <div className="text-xl mb-1">{source.icon}</div>
              <div className="font-medium text-gray-100 text-sm">{source.name}</div>
              <div className={`text-xs mt-1 ${
                source.status === 'connected' ? 'text-green-400' : 'text-gray-400'
              }`}>
                {source.status === 'connected' 
                  ? `${source.dataPoints.toLocaleString()} data points` 
                  : 'Connecting...'}
              </div>
            </motion.div>
          ))}
        </div>

        {workflowState.totalDataPoints > 0 && (
          <div className="bg-black/30 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-100">Bazar Məlumatları Xülasəsi</h4>
              <div className="text-cyber-blue font-bold">{workflowState.totalDataPoints.toLocaleString()} data points</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-green-400/10 rounded border border-green-400/30">
                <div className="text-xl font-bold text-green-400">$125,000</div>
                <div className="text-sm text-gray-400">Bazar Medianı</div>
              </div>
              <div className="text-center p-3 bg-blue-400/10 rounded border border-blue-400/30">
                <div className="text-xl font-bold text-blue-400">$110k - $145k</div>
                <div className="text-sm text-gray-400">Maaş Aralığı</div>
              </div>
              <div className="text-center p-3 bg-red-400/10 rounded border border-red-400/30">
                <div className="text-xl font-bold text-red-400">24%</div>
                <div className="text-sm text-gray-400">Bazardan Aşağı</div>
              </div>
            </div>
          </div>
        )}

        {workflowState.marketData.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-100">Canlı Bazar Məlumatları Axını</h4>
            {workflowState.marketData.map((data, index) => (
              <motion.div
                key={data.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3 }}
                className="flex items-center justify-between p-3 bg-black/30 rounded border border-gray-600/50"
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse" />
                  <div>
                    <div className="font-medium text-gray-100">{data.source}</div>
                    <div className="text-sm text-gray-400">{data.company} • {data.experience} təcrübə</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-400">${data.salaryRange.median.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">${data.salaryRange.min.toLocaleString()} - ${data.salaryRange.max.toLocaleString()}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderCompetitorOffers = () => (
    <motion.div
      ref={competitorOffersRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`backdrop-blur-md bg-gray-800/60 p-6 mb-6 rounded-xl border transition-all duration-500 ${
        workflowState.currentStep === 2 
          ? 'border-cyber-purple/50 bg-gradient-to-br from-cyber-purple/10 to-transparent' 
          : 'border-gray-600/30'
      }`}
    >
      <div className="flex items-center mb-4">
        <Target className="w-6 h-6 text-cyber-purple mr-2" />
        <h3 className="text-xl font-bold text-cyber">Rəqib Təklifləri Kəşfiyyatı</h3>
      </div>
      
      {workflowState.competitorOffers.length > 0 && (
        <div className="space-y-4">
          {workflowState.competitorOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.4 }}
              className="p-4 bg-black/40 rounded-lg border border-gray-600/50"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-cyber-purple/20 rounded-lg flex items-center justify-center mr-3">
                    <Building className="w-5 h-5 text-cyber-purple" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-100">{offer.company}</h4>
                    <div className="text-sm text-gray-400">{offer.role}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-cyber-purple">${offer.salary.toLocaleString()}</div>
                  <div className="flex items-center text-sm">
                    <Percent className="w-3 h-3 mr-1" />
                    <span className="text-green-400">{offer.likelihood}% likely</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Sosial Paket</div>
                  <div className="flex flex-wrap gap-1">
                    {offer.benefits.map((benefit, bIndex) => (
                      <span key={bIndex} className="px-2 py-1 bg-gray-700/50 text-xs rounded">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Səhm</div>
                  <div className="text-sm text-gray-200">{offer.equity}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );

  const renderPrediction = () => (
    <motion.div
      ref={predictionRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`backdrop-blur-md bg-gray-800/60 p-6 rounded-xl border transition-all duration-500 ${
        workflowState.currentStep === 5
          ? 'border-green-400/50 bg-gradient-to-br from-green-400/10 to-transparent'
          : 'border-gray-600/30'
      }`}
    >
      <div className="flex items-center mb-4">
        <Calculator className="w-6 h-6 text-green-400 mr-2" />
        <h3 className="text-xl font-bold text-cyber">TAPx Danışıq Proqnozu</h3>
      </div>
      
      {workflowState.prediction && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-400/10 rounded-lg border border-green-400/30">
              <div className="text-3xl font-bold text-green-400">{workflowState.prediction.successProbability}%</div>
              <div className="text-sm text-gray-400">Uğur Dərəcəsi</div>
            </div>
            <div className="text-center p-4 bg-blue-400/10 rounded-lg border border-blue-400/30">
              <div className="text-xl font-bold text-blue-400">${workflowState.prediction.recommendedAsk.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Tövsiyə Olunan Tələb</div>
            </div>
            <div className="text-center p-4 bg-yellow-400/10 rounded-lg border border-yellow-400/30">
              <div className="text-xl font-bold text-yellow-400">${workflowState.prediction.minAcceptable.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Minimum Qəbul</div>
            </div>
            <div className="text-center p-4 bg-purple-400/10 rounded-lg border border-purple-400/30">
              <div className="text-xl font-bold text-purple-400">${workflowState.prediction.maxRealistic.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Maksimum Real</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-3 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Risk Amililəri
              </h4>
              <ul className="text-sm space-y-2">
                {workflowState.prediction.riskFactors.map((risk, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start text-gray-200"
                  >
                    <span className="text-red-400 mr-2 mt-1">⚠</span>
                    {risk}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="bg-green-400/10 border border-green-400/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Üstünlük Nöqtələri
              </h4>
              <ul className="text-sm space-y-2">
                {workflowState.prediction.leveragePoints.map((leverage, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start text-gray-200"
                  >
                    <span className="text-green-400 mr-2 mt-1">✓</span>
                    {leverage}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-400/10 border border-blue-400/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-3 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2" />
              TAPx Strategiya Tövsiyəsi
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Strategiya:</span>
                <span className="text-blue-400 font-medium">{workflowState.prediction.strategy}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Optimal Vaxt:</span>
                <span className="text-green-400 font-medium">{workflowState.prediction.timeline}</span>
              </div>
            </div>
          </div>

          <div className="bg-cyber-purple/10 border border-cyber-purple/30 rounded-lg p-4">
            <h4 className="font-semibold text-cyber-purple mb-3 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Danışıq Skriptləri
            </h4>
            <div className="space-y-3">
              {negotiationScripts.slice(0, 2).map((script, index) => (
                <div key={index} className="p-3 bg-black/30 rounded">
                  <div className="text-sm font-medium text-cyber-purple mb-1">{script.scenario}:</div>
                  <div className="text-sm text-gray-300 italic">"{script.script}"</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );

  const renderStepIndicator = () => (
    <div className="backdrop-blur-md bg-gray-800/60 p-4 h-full rounded-xl border border-gray-600/30">
      <h4 className="font-semibold mb-3 text-cyber">Maaş Oracle TAPx</h4>
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
              {workflowState.currentStep >= 0 && renderEmployeeProfile()}
              
              {workflowState.currentStep >= 1 && renderMarketAnalysis()}
              
              {workflowState.currentStep >= 2 && workflowState.competitorOffers.length > 0 && renderCompetitorOffers()}
              
              {workflowState.currentStep >= 5 && workflowState.prediction && renderPrediction()}
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