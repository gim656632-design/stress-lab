export interface MbtiState {
  ei: 'E' | 'I' | null;
  ns: 'N' | 'S' | null;
  ft: 'F' | 'T' | null;
  pj: 'P' | 'J' | null;
}

export interface SurveyState {
  mbti: MbtiState;
  causes: string[];
  causesOther: string;
  reliefs: string[];
  reliefsOther: string;
  phone: string;
  consent: boolean;
  consentAt: string | null;
}

export interface SurveyContextType {
  state: SurveyState;
  setMbtiDimension: (dim: keyof MbtiState, val: 'E' | 'I' | 'N' | 'S' | 'F' | 'T' | 'P' | 'J') => void;
  getMbtiString: () => string;
  isMbtiComplete: () => boolean;
  toggleCause: (id: string) => void;
  setCausesOther: (val: string) => void;
  toggleRelief: (id: string) => void;
  setReliefsOther: (val: string) => void;
  setPhone: (val: string) => void;
  setConsent: (val: boolean) => void;
  resetSurvey: () => void;
}
