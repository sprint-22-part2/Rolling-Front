import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import PropTypes from 'prop-types';
import RollingHeader from '@/components/list-detail/RollingHeader';
import MessageWrap from '@/components/list-detail/MessageWrap';

import {
  getRecipient,
  getMessages,
  deleteMessage,
  deleteRecipient,
} from '@/apis/list';
import ConfirmModal from '@/components/modal/ConfirmationModal';
import isRetryableError from '@/utils/isRetryableError';

function ListDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipient, setRecipient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isRecipientModalOpen, setIsRecipientModalOpen] = useState(false);
  const [deleteTargetMessageId, setDeleteTargetMessageId] = useState(null);
  const [isDeletingRecipient, setIsDeletingRecipient] = useState(false);
  const [isDeletingMessage, setIsDeletingMessage] = useState(false);
  const [error, setError] = useState(null);

  const handleClickDeleteRecipient = () => {
    setIsRecipientModalOpen(true);
  };

  const handleConfirmDeleteRecipient = async () => {
    try {
      if (isDeletingRecipient) {
        return;
      }
      setIsDeletingRecipient(true);
      await deleteRecipient(id);
      navigate('/list');
    } catch (error) {
      console.error(error);
      if (isRetryableError(error)) {
        setError(error);
      }
    } finally {
      setIsDeletingRecipient(false);
    }
  };

  const handleClickDeleteMessage = (messageId) => {
    setDeleteTargetMessageId(messageId);
  };

  const handleConfirmDeleteMessage = async () => {
    if (!deleteTargetMessageId) {
      return;
    }

    try {
      if (isDeletingMessage) {
        return;
      }
      setIsDeletingMessage(true);
      await deleteMessage(deleteTargetMessageId);

      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== deleteTargetMessageId)
      );
    } catch (error) {
      console.error(error);
      if (isRetryableError(error)) {
        setError(error);
      }
    } finally {
      setDeleteTargetMessageId(null);
      setIsDeletingMessage(false);
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
        if (isRetryableError(error)) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    throw error;
  }

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
          onDelete={handleClickDeleteRecipient}
        />

        <MessageWrap
          isEditMode={isEditMode}
          messages={messages}
          recipientName={recipient.name}
          theme={theme}
          onDelete={handleClickDeleteMessage}
          recipientId={id}
        />
      </section>

      <ConfirmModal
        title="롤링페이퍼를 삭제하시겠습니까?"
        isOpen={isRecipientModalOpen}
        onClose={() => setIsRecipientModalOpen(false)}
        onConfirm={handleConfirmDeleteRecipient}
        confirmText={isDeletingRecipient ? '삭제 중' : '삭제'}
        cancelText="취소"
        confirmButtonProps={{ disabled: isDeletingRecipient }}
        cancelButtonProps={{ disabled: isDeletingRecipient }}
      />

      <ConfirmModal
        title="메시지를 삭제하시겠습니까?"
        isOpen={!!deleteTargetMessageId}
        onClose={() => setDeleteTargetMessageId(null)}
        onConfirm={handleConfirmDeleteMessage}
        confirmText={isDeletingMessage ? '삭제 중' : '삭제'}
        cancelText="취소"
        confirmButtonProps={{ disabled: isDeletingMessage }}
        cancelButtonProps={{ disabled: isDeletingMessage }}
      />
    </div>
  );
}

ListDetailPage.propTypes = {
  theme: PropTypes.string,
};

export default ListDetailPage;
