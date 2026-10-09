export const colors = {
  cream: '#FAF9F6', // 배경
  lavender: '#C7B8EA', // 선택·CTA
  lavenderLight: '#F5F1FD', // 선택 배경 연한 틴트
  lavenderHover: '#B8A6DF', // CTA hover
  charcoal: '#29272E', // 본문
  charcoalMuted: '#6E6B77', // 서브 본문
  charcoalLight: '#9E9AA7', // 보조 텍스트
  dustyPink: '#E8C5D0', // 작은 포인트
  paleBlue: '#DCE9F2', // 작은 포인트
  mutedPurple: '#9883C7', // 작은 포인트
  cardBorder: '#ECEAE4', // 미선택 테두리
  cardBorderHover: '#DFDCD4', // 미선택 hover 테두리
  white: '#FFFFFF',
} as const;

export const shadows = {
  soft: '0 2px 12px -2px rgba(41, 39, 46, 0.04), 0 1px 3px rgba(41, 39, 46, 0.02)',
  card: '0 4px 20px -2px rgba(41, 39, 46, 0.05)',
  floating: '0 10px 30px -5px rgba(199, 184, 234, 0.25)',
} as const;
