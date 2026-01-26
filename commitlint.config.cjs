const EMOJI_BY_TYPE = {
  chore: '📦',
  feat: '✨',
  style: '🎨',
  fix: '🐛',
  del: '🔥',
  docs: '📝',
  rename: '⏪️',
  refactor: '♻️',
};

const TYPES = Object.keys(EMOJI_BY_TYPE);

const AVAILABLE_TYPES = Object.entries(EMOJI_BY_TYPE)
  .map(([type, emoji]) => `${emoji}[${type}]`)
  .join(', ');

module.exports = {
  extends: ['@commitlint/config-conventional'],

  parserPreset: {
    parserOpts: {
      headerPattern: /^(.+)\[(.+)\]: (.+)$/,
      headerCorrespondence: ['emoji', 'type', 'subject'],
    },
  },

  plugins: [
    {
      rules: {
        'emoji-type-match': (parsed) => {
          const { header, emoji, type } = parsed;

          if (/^Merge (branch|pull request)/.test(header)) {
            return [true];
          }

          if (!TYPES.includes(type)) {
            return [
              false,
              `type은 다음 중 하나여야 합니다: ${AVAILABLE_TYPES}`,
            ];
          }

          const expectedEmoji = EMOJI_BY_TYPE[type];

          if (emoji !== expectedEmoji) {
            return [
              false,
              `"${type}" 타입은 "${expectedEmoji}" 이모지를 사용해야 합니다.`,
            ];
          }

          return [true];
        },
      },
    },
  ],

  rules: {
    'header-max-length': [2, 'always', 50],
    'subject-full-stop': [2, 'never', '.'],
    'subject-empty': [2, 'never'],

    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', TYPES],

    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 72],

    'emoji-type-match': [2, 'always'],
  },
};
