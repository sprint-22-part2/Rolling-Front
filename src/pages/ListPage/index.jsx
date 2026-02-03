import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import PropTypes from 'prop-types';
import RollingHeader from '@/components/list/RollingHeader';
import MessageWrap from '@/components/list/MessageWrap';

import {
  getRecipient,
  getMessages,
  deleteMessage,
  deleteRecipient,
} from '@/apis/list';

function ListPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipient, setRecipient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleDeleteRecipient = async () => {
    const isConfirmed = window.confirm('롤링페이퍼를 삭제하시겠습니까?');
    if (!isConfirmed) {
      return;
    }

    try {
      await deleteRecipient(id);

      navigate('/main');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    const isConfirmed = window.confirm('메시지를 삭제하시겠습니까?');
    if (!isConfirmed) {
      return;
    }

    try {
      await deleteMessage(messageId);

      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== messageId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        return;
      }

      setIsLoading(true);

      try {
        const [recipientData, messagesData] = await Promise.all([
          getRecipient(id),
          getMessages(id),
        ]);
        setRecipient(recipientData);
        setMessages(messagesData.results);
      } catch (error) {
        console.error('데이터를 불러오는 중 에러 발생:', error);
      } finally {
        setIsLoading(false);
      }
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
    ? {
        backgroundImage: `linear-gradient(var(--background-overlay), var(--background-overlay)), url(${backgroundImageURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }
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
          onDelete={handleDeleteRecipient}
        />

        <MessageWrap
          isEditMode={isEditMode}
          messages={messages}
          recipientName={recipient.name}
          theme={theme}
          onDelete={handleDeleteMessage}
        />
      </section>
    </div>
  );
}

ListPage.propTypes = {
  theme: PropTypes.string,
};

export default ListPage;
