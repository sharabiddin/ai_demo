export interface Candidate {
  id: string;
  name: string;
  position: string;
  experience: string;
  skills: string[];
  education: string;
  cv: string;
  score?: number;
  strengths?: string[];
  weaknesses?: string[];
}

export interface AnalysisStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed';
  duration?: number;
}

export interface WorkflowState {
  isRunning: boolean;
  currentStep: number;
  candidates: Candidate[];
  selectedCandidate?: Candidate;
  analysisResult?: {
    score: number;
    strengths: string[];
    weaknesses: string[];
    recommendation: string;
  };
}