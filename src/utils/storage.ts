import type { ContactSubmission, SurveyState } from '../types/survey';

const STORAGE_KEY = 'STRESS_LAB_RESPONSES';
const CONTACT_KEY = 'STRESS_LAB_CONTACT';
const EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export function getInitialSurveyState(): SurveyState {
  return {
    mbti: undefined,
    causes: [],
    reliefs: [],
    lastUpdated: Date.now(),
  };
}

export function loadSavedSurvey(): SurveyState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data: SurveyState = JSON.parse(raw);

    // Check 24 hours expiration
    if (Date.now() - data.lastUpdated > EXPIRY_MS) {
      clearSurveyStorage();
      return null;
    }

    return data;
  } catch (e) {
    console.error('Failed to parse survey storage', e);
    return null;
  }
}

export function saveSurveyState(partial: Partial<SurveyState>): SurveyState {
  try {
    const current = loadSavedSurvey() || getInitialSurveyState();
    const updated: SurveyState = {
      ...current,
      ...partial,
      lastUpdated: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save survey state', e);
    return getInitialSurveyState();
  }
}

export function clearSurveyStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear survey storage', e);
  }
}

export function saveContactSubmission(contact: ContactSubmission): void {
  try {
    localStorage.setItem(CONTACT_KEY, JSON.stringify(contact));
  } catch (e) {
    console.error('Failed to save contact', e);
  }
}

export function getContactSubmission(): ContactSubmission | null {
  try {
    const raw = localStorage.getItem(CONTACT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function revokeContactSubmission(phoneNumber: string): boolean {
  try {
    const raw = localStorage.getItem(CONTACT_KEY);
    if (!raw) return true;
    const current: ContactSubmission = JSON.parse(raw);
    const cleanInput = phoneNumber.replace(/\D/g, '');
    const cleanStored = current.phone.replace(/\D/g, '');
    if (cleanInput === cleanStored || !cleanInput) {
      localStorage.removeItem(CONTACT_KEY);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
