import { useState, useRef } from 'react';
import styles from './index.module.css';
import PropTypes from 'prop-types';
import ProfileGroup from '@/components/common/ProfileGroup';
import {
  ShareIcon,
  EditIcon,
  DeletedIcon,
  ArrowDownIcon,
} from '@/assets/icons';

import Button from '@/components/common/Button';
import ReactionBadge from '@/components/reaction/ReactionBadge';
import AddReactionButton from '@/components/reaction/AddReactionButton';
import EmojiPickerPopup from '@/components/reaction/EmojiPickerPopup';
import ReactionPanel from '@/components/reaction/ReactionPanel';

function RollingHeader({
  theme = 'blue',
  recipientName = 'recipientName',
  isEditMode,
  setIsEditMode,
  hasMessages,
  recentMessages = [],
  messageCount = 0,
  topReactions = [],
}) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const addBtnRef = useRef(null);
  const moreBtnRef = useRef(null);

  const handleEdit = () => setIsEditMode(true);
  const handleSave = () => setIsEditMode(false);

  const handleEmojiClick = (emoji) => {
    // TODO: API 연결 시 이모지 추가, 성공 후 처리 필요
    console.log(`이모지 클릭/추가: ${emoji}`);
    setIsPickerOpen(false);
  };

  const profiles = recentMessages.map((msg) => ({
    id: msg.id,
    src: msg.profileImageURL,
    alt: msg.sender,
  }));

  const reactionsObject = topReactions.reduce((acc, curr) => {
    acc[curr.emoji] = curr.count;
    return acc;
  }, {});

  const MAX_VISIBLE_BADGES = 5;

  return (
    <div className={styles.rollingHeader} type={theme}>
      <div className={styles.rollingHeaderTop}>
        <div className={styles.recipient}>
          <span className={styles.to}>To</span>
          <p className={styles.name}>{recipientName}</p>
        </div>

        {hasMessages && (
          <div className={styles.rollingButtons}>
            {!isEditMode ? (
              <>
                <Button
                  variant="variantSmallText"
                  leftIcon={<ShareIcon />}
                  onClick={() => console.log('공유하기 클릭')}
                >
                  공유하기
                </Button>
                <Button
                  variant="variantSmallText"
                  leftIcon={<EditIcon />}
                  onClick={handleEdit}
                >
                  편집하기
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="variantSmallText"
                  leftIcon={<DeletedIcon />}
                  onClick={() => console.log('삭제하기 클릭')}
                >
                  롤링페이퍼 삭제하기
                </Button>
                <Button
                  variant="variantSmallText"
                  leftIcon={<EditIcon />}
                  onClick={handleSave}
                >
                  편집 완료
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      <div className={styles.rollingHeaderBottom}>
        <div className={styles.emojis}>
          {topReactions.slice(0, MAX_VISIBLE_BADGES).map((reaction) => (
            <ReactionBadge
              key={reaction.id}
              emoji={reaction.emoji}
              count={reaction.count}
              onClick={() => handleEmojiClick(reaction.emoji)}
            />
          ))}

          {topReactions.length > MAX_VISIBLE_BADGES && (
            <div className={styles.moreEmojiWrapper} ref={moreBtnRef}>
              <button
                className={styles.moreEmoji}
                onClick={() => setIsPanelOpen(!isPanelOpen)}
              >
                <ArrowDownIcon />
              </button>

              {isPanelOpen && (
                <ReactionPanel
                  reactions={reactionsObject}
                  onItemClick={handleEmojiClick}
                />
              )}
            </div>
          )}

          <AddReactionButton
            ref={addBtnRef}
            onClick={() => setIsPickerOpen((prev) => !prev)}
          />

          <EmojiPickerPopup
            open={isPickerOpen}
            anchorRef={addBtnRef}
            onClose={() => setIsPickerOpen(false)}
            onPick={handleEmojiClick}
          />
        </div>

        <ProfileGroup profiles={profiles} messageCount={messageCount} />
      </div>
    </div>
  );
}

RollingHeader.propTypes = {
  theme: PropTypes.string,
  recipientName: PropTypes.string,
  isEditMode: PropTypes.bool.isRequired,
  setIsEditMode: PropTypes.func.isRequired,
  hasMessages: PropTypes.bool.isRequired,
  recentMessages: PropTypes.array,
  messageCount: PropTypes.number,
  topReactions: PropTypes.array,
};

export default RollingHeader;
