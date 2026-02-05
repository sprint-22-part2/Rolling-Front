import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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

const LIMIT = 8;

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

  const [hasNext, setHasNext] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTarget = useRef(null);
  const messageCount = messages.length;
  const recentMessages = useMemo(() => {
    return [...messages]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  }, [messages]);

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
      setIsRecipientModalOpen(false);
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
          getMessages(id, LIMIT, 0),
        ]);
        setRecipient(recipientData);
        setMessages(messagesData.results);

        if (!messagesData.next) {
          setHasNext(false);
        }
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

  const handleLoadMore = useCallback(async () => {
    if (!hasNext || isLoadingMore || !id) {
      return;
    }

    setIsLoadingMore(true);
    try {
      const currentOffset = messages.length;
      const data = await getMessages(id, LIMIT, currentOffset);

      setMessages((prev) => [...prev, ...data.results]);

      if (!data.next) {
        setHasNext(false);
      }
    } catch (error) {
      console.error('추가 데이터 로딩 실패:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [id, hasNext, isLoadingMore, messages.length]);

  useEffect(() => {
    if (isLoading || !hasNext) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      { threshold: 1 }
    );

    const target = observerTarget.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [isLoading, hasNext, handleLoadMore]);

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
          messageCount={messageCount}
          recentMessages={recentMessages}
          topReactions={recipient.topReactions}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          hasMessages={messageCount > 0}
          onDelete={handleClickDeleteRecipient}
        />

        <MessageWrap
          isEditMode={isEditMode}
          messages={messages}
          recipientName={recipient.name}
          theme={theme}
          onDelete={handleClickDeleteMessage}
          recipientId={recipient.id}
        />

        {hasNext && (
          <div ref={observerTarget} style={{ height: '20px', width: '100%' }}>
            {isLoadingMore && '...'}
          </div>
        )}
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
