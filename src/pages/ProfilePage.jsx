import ProfileImage from '../components/common/ProfileImage';
import ProfileGroup from '../components/common/ProfileGroup';

function ProfilePage() {
  // API mock 데이터
  const apiResponse = {
    id: 2,
    name: '강영훈',
    backgroundColor: 'green',
    backgroundImageURL: null,
    createdAt: '2023-10-26T13:19:31.401765Z',
    messageCount: 3,
    recentMessages: [
      {
        id: 32,
        recipientId: 2,
        sender: '김하은',
        profileImageURL:
          'https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8',
        relationship: '가족',
        content: '열심히 일하는 모습 멋있습니다.',
        font: 'Pretendard',
        createdAt: '2023-11-01T08:05:25.399056Z',
      },
      {
        id: 31,
        recipientId: 2,
        sender: '이영준',
        profileImageURL:
          'https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8',
        relationship: '지인',
        content: '항상 응원합니다',
        font: 'Noto Sans',
        createdAt: '2023-11-01T08:04:12.852691Z',
      },
      {
        id: 30,
        recipientId: 2,
        sender: '박민수',
        profileImageURL:
          'https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8',
        relationship: '친구',
        content: '화이팅!',
        font: 'Pretendard',
        createdAt: '2023-11-01T08:03:45.123456Z',
      },
      {
        id: 29,
        recipientId: 2,
        sender: '최지영',
        profileImageURL:
          'https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8',
        relationship: '동료',
        content: '잘하고 있어요!',
        font: 'Noto Sans',
        createdAt: '2023-11-01T08:02:30.789012Z',
      },
      {
        id: 28,
        recipientId: 2,
        sender: '정수진',
        profileImageURL:
          'https://fastly.picsum.photos/id/237/200/200.jpg?hmac=TmmXsZx3tNoVqMhyxqyV6VhF0OxHLlA6LbMtk1k6YcU',
        relationship: '선배',
        content: '멋진 하루 되세요!',
        font: 'Pretendard',
        createdAt: '2023-11-01T08:01:15.345678Z',
      },
    ],
    reactionCount: 48,
    topReactions: [
      {
        id: 27,
        emoji: '😀',
        count: 14,
      },
      {
        id: 31,
        emoji: '🥹',
        count: 11,
      },
    ],
  };

  // recentMessages를 ProfileGroup으로 사용하기 위해 배열 형태로 변환
  const profiles = apiResponse.recentMessages.map((message) => ({
    id: message.id,
    src: message.profileImageURL,
    alt: message.sender,
  }));

  // 0명일 때 그룹 프로필 테스트용
  const emptyProfiles = [];

  return (
    <div>
      <section style={{ marginTop: '48px' }}>
        <h3>개인 프로필</h3>
        <ProfileImage
          src={profiles[0]?.src}
          alt={profiles[0]?.alt || 'Profile'}
          borderWidth={1}
        />
      </section>

      <section style={{ marginTop: '48px' }}>
        <h3>그룹 프로필</h3>
        <ProfileGroup profiles={profiles} />
      </section>

      <section style={{ marginTop: '48px' }}>
        <h3>그룹 프로필 (0명일 때)</h3>
        <ProfileGroup profiles={emptyProfiles} />
      </section>
    </div>
  );
}

export default ProfilePage;
