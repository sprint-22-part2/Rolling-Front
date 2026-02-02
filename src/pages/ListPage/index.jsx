import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.css';
import PropTypes from 'prop-types';
import RollingHeader from '@/components/list/RollingHeader';
import MessageWrap from '@/components/list/MessageWrap';

// API 연결 시 MOCK 데이터 삭제 필요
const MOCK_RECIPIENT = {
  id: 2,
  name: '강영훈',
  backgroundColor: 'green',
  backgroundImageURL: null,
  createdAt: '2025-10-26T13:19:31.401765Z',
  messageCount: 3,
  recentMessages: [
    {
      id: 32,
      sender: '김하은',
      profileImageURL:
        'https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8',
      relationship: '가족',
      content: 'MZ 김장인 두쫀쿠 만들기를 하고싶어요',
      font: 'Pretendard',
      createdAt: '2025-11-01T08:05:25.399056Z',
    },
    {
      id: 31,
      sender: '이영준',
      profileImageURL:
        'https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8',
      relationship: '지인',
      content: '양념치킨은 페리카나',
      font: 'Noto Sans',
      createdAt: '2025-11-01T08:04:12.852691Z',
    },
    {
      id: 30,
      sender: '손동욱',
      profileImageURL:
        'https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8',
      relationship: '친구',
      content: '프로젝트 화이팅!',
      font: '나눔명조',
      createdAt: '2025-11-01T08:01:52.605133Z',
    },
    {
      id: 29,
      sender: '김민지',
      profileImageURL:
        'https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8',
      relationship: '동료',
      content: '붕어빵은 슈크림이 최고야.',
      font: '나눔손글씨 손편지체',
      createdAt: '2025-11-01T08:01:52.605133Z',
    },
  ],
  reactionCount: 48,

  topReactions: [
    { id: 27, emoji: '😀', count: 14 },
    { id: 31, emoji: '🥹', count: 11 },
    { id: 26, emoji: '😎', count: 9 },
  ],
};

const MOCK_MESSAGES = {
  count: 3,
  next: null,
  previous: null,
  results: MOCK_RECIPIENT.recentMessages,
};

function ListPage() {
  const { id } = useParams();

  const [recipient, setRecipient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // TODO: API 연결 시 axios.get으로 변경
      setRecipient(MOCK_RECIPIENT);
      setMessages(MOCK_MESSAGES.results);

      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (!recipient) {
    return <div>대상을 찾을 수 없습니다.</div>;
  }

  const { backgroundColor, backgroundImageURL } = recipient;
  const theme = backgroundImageURL ? 'image' : backgroundColor;
  const backgroundStyle = backgroundImageURL
    ? { backgroundImage: `url(${backgroundImageURL})` }
    : {};

  return (
    <div
      className={`${styles.postList} ${styles[theme]}`}
      type={theme}
      style={backgroundStyle}
    >
      <section className={styles.sectionPostList}>
        <RollingHeader
          theme={theme}
          recipientName={recipient.name}
          messageCount={recipient.messageCount}
          recentMessages={recipient.recentMessages}
          topReactions={recipient.topReactions}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          hasMessages={recipient.messageCount > 0}
        />

        <MessageWrap
          isEditMode={isEditMode}
          messages={messages}
          recipientName={recipient.name}
        />
      </section>
    </div>
  );
}

ListPage.propTypes = {
  theme: PropTypes.string,
};

export default ListPage;
