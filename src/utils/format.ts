/**
 * Format Korean phone number with hyphens automatically
 * 01012345678 -> 010-1234-5678
 */
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

/**
 * Validate Korean mobile phone number format
 * E.g. 010-XXXX-XXXX or 011/016/017/018/019
 */
export function isValidPhoneNumber(val: string): boolean {
  const digits = val.replace(/\D/g, '');
  const pattern = /^01[016789]\d{7,8}$/;
  return pattern.test(digits);
}
