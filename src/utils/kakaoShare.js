const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY;

function initKakao() {
  if (!window.Kakao) {
    console.error('[Kakao] SDK not loaded');
    return false;
  }

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(KAKAO_JS_KEY);
  }

  return true;
}

/**
 * 카카오톡 공유
 * @param {Object} params
 * @param {string} params.title
 * @param {string} [params.description]
 * @param {string} params.imageUrl
 * @param {string} params.webUrl
 */
export function shareKakao({ title, description, imageUrl, webUrl }) {
  const ok = initKakao();
  if (!ok) {
    return;
  }

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title,
      description,
      imageUrl,
      link: {
        webUrl,
      },
    },
    buttons: [
      {
        title: '자세히 보기',
        link: {
          webUrl,
        },
      },
    ],
  });
}
