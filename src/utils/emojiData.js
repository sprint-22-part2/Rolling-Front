/**
 * en / ko 이모지 검색 데이터를 병합해
 * 영문 + 한글 키워드가 동시에 검색 가능한
 * 단일 searchData를 생성
 *
 * - en 데이터를 기준(base)으로 사용
 * - 같은 이모지는 unicode(u) 값을 기준으로 매칭
 * - ko의 name(n) 배열을 en의 name(n)에 병합
 */

import en from 'emoji-picker-react/dist/data/emojis-en';
import ko from 'emoji-picker-react/dist/data/emojis-ko';

const EMOJI_SEARCH_DATA = {
  ko,
  en,
};

const mergedEmojiData = (() => {
  const baseIndex = new Map();
  const merged = {
    categories: EMOJI_SEARCH_DATA.en.categories,
    emojis: {},
  };

  Object.entries(EMOJI_SEARCH_DATA.en.emojis).forEach(([category, list]) => {
    merged.emojis[category] = list.map((emoji) => {
      const names = Array.isArray(emoji.n) ? [...emoji.n] : [];
      const next = { ...emoji, n: names };
      if (next.u) {
        baseIndex.set(next.u, next);
      }
      return next;
    });
  });

  Object.entries(EMOJI_SEARCH_DATA.ko.emojis).forEach(([category, list]) => {
    const targetList = merged.emojis[category];
    if (!targetList) {
      return;
    }

    list.forEach((emoji) => {
      const names = emoji?.n;
      if (!emoji?.u || !Array.isArray(names)) {
        return;
      }

      const target = baseIndex.get(emoji.u);
      if (!target) {
        return;
      }

      names.forEach((name) => {
        if (!target.n.includes(name)) {
          target.n.push(name);
        }
      });
    });
  });

  return merged;
})();

export default mergedEmojiData;
