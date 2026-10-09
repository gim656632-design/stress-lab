import { createContext } from 'react';
import type { SurveyContextType } from './types';

export const SurveyContext = createContext<SurveyContextType | undefined>(undefined);
