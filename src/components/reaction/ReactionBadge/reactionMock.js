export const REACTION_THEMES = {
  blue: { chipBg: 'var(--blue-200)', text: 'var(--blue-400)' },
  green: { chipBg: 'var(--green-100)', text: 'var(--green-400)' },
  purple: { chipBg: 'var(--purple-200)', text: 'var(--purple-400)' },
  beige: { chipBg: 'var(--yellow-200)', text: 'var(--yellow-400)' },
  trans: { chipBg: 'var(--white-opacity-30)', text: 'var(--white)' },
};

export const MOCK_REACTION_RESPONSE = {
  count: 4,
  next: null,
  previous: null,
  results: [
    { id: 1, emoji: '👍', count: 20 },
    { id: 2, emoji: '🙏', count: 12 },
    { id: 3, emoji: '😍', count: 12 },
  ],
};
