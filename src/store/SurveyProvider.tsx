import React, { useState } from 'react';
import { SurveyContext } from './SurveyContext';
import type { SurveyState, MbtiState } from './types';

const initialState: SurveyState = {
  mbti: {
    ei: null,
    ns: null,
    ft: null,
    pj: null,
  },
  causes: [],
  causesOther: '',
  reliefs: [],
  reliefsOther: '',
  phone: '',
  consent: false,
  consentAt: null,
};

export const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<SurveyState>(initialState);

  const setMbtiDimension = (
    dim: keyof MbtiState,
    val: 'E' | 'I' | 'N' | 'S' | 'F' | 'T' | 'P' | 'J'
  ) => {
    setState((prev) => ({
      ...prev,
      mbti: {
        ...prev.mbti,
        [dim]: val,
      },
    }));
  };

  const getMbtiString = (): string => {
    const { ei, ns, ft, pj } = state.mbti;
    return `${ei || ''}${ns || ''}${ft || ''}${pj || ''}`;
  };

  const isMbtiComplete = (): boolean => {
    const { ei, ns, ft, pj } = state.mbti;
    return Boolean(ei && ns && ft && pj);
  };

  const toggleCause = (id: string) => {
    setState((prev) => {
      const exists = prev.causes.includes(id);
      return {
        ...prev,
        causes: exists ? prev.causes.filter((c) => c !== id) : [...prev.causes, id],
      };
    });
  };

  const setCausesOther = (val: string) => {
    setState((prev) => ({ ...prev, causesOther: val }));
  };

  const toggleRelief = (id: string) => {
    setState((prev) => {
      const exists = prev.reliefs.includes(id);
      return {
        ...prev,
        reliefs: exists ? prev.reliefs.filter((r) => r !== id) : [...prev.reliefs, id],
      };
    });
  };

  const setReliefsOther = (val: string) => {
    setState((prev) => ({ ...prev, reliefsOther: val }));
  };

  const setPhone = (val: string) => {
    setState((prev) => ({ ...prev, phone: val }));
  };

  const setConsent = (val: boolean) => {
    setState((prev) => ({
      ...prev,
      consent: val,
      consentAt: val ? new Date().toISOString() : null,
    }));
  };

  const resetSurvey = () => {
    setState(initialState);
  };

  return (
    <SurveyContext.Provider
      value={{
        state,
        setMbtiDimension,
        getMbtiString,
        isMbtiComplete,
        toggleCause,
        setCausesOther,
        toggleRelief,
        setReliefsOther,
        setPhone,
        setConsent,
        resetSurvey,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};
