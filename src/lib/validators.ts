export function formatPhoneNumber(val: string): string {
  const digits = val.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) {
    return digits;
  }
  if (digits.length <= 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

export function isValidPhoneNumber(val: string): boolean {
  return /^010-\d{4}-\d{4}$/.test(val);
}

export function isValidMbti(val: string): boolean {
  return /^[EI][NS][FT][PJ]$/.test(val);
}

export function sanitizeText(val: string, maxLength = 100): string {
  return val.trim().slice(0, maxLength);
}
