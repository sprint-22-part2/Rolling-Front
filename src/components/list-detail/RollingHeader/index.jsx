import { useState, useRef, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReactions, postReaction } from '@/apis/list';
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
import ShareDropdown from '@/components/common/ShareDropdown';
import useShareActions from '@/hooks/useShareActions';
import useToast from '@/hooks/useToast';
import { REACTION_THEMES } from '@/components/reaction/reactionThemes';

function RollingHeader({
  theme = 'blue',
  recipientName = 'recipientName',
  isEditMode,
  setIsEditMode,
  recentMessages = [],
  messageCount = 0,
  onDelete,
}) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const [reactions, setReactions] = useState([]);

  const { id } = useParams();
  const { shareKakaoLink, copyUrl } = useShareActions();
  const { showToast } = useToast();

  const addBtnRef = useRef(null);
  const moreBtnRef = useRef(null);

  const handleEdit = () => setIsEditMode(true);
  const handleSave = () => setIsEditMode(false);

  const fetchReactions = useCallback(async () => {
    if (!id) {
      return;
    }
    try {
      const data = await getReactions(id);
      setReactions(data.results || []);
    } catch (error) {
      console.error('리액션 로딩 실패:', error);
    }
  }, [id]);

  useEffect(() => {
    const load = async () => {
      await fetchReactions();
    };
    load();
  }, [fetchReactions]);

  const handleEmojiClick = async (emojiData) => {
    try {
      await postReaction(id, emojiData);
      await fetchReactions();
      setIsPickerOpen(false);
    } catch (error) {
      console.error('이모지 추가 실패:', error);
    }
  };

  const handleShareToggle = () => {
    setIsShareOpen((prev) => !prev);
  };

  const handleShareClose = useCallback(() => {
    setIsShareOpen(false);
  }, []);

  const handleShareSelect = async (type) => {
    const webUrl = window.location.href;
    const imageUrl = `${window.location.origin}/assets/img-og.png`;

    if (type === 'kakao') {
      shareKakaoLink({
        title: `${recipientName}님의 롤링 페이퍼`,
        description: '마음을 모으는 가장 쉬운 방법, 롤링',
        imageUrl,
        webUrl,
      });
    }

    if (type === 'url') {
      try {
        await copyUrl(webUrl);
        showToast('URL이 복사되었습니다.', 'success');
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('URL 복사 실패:', error);
        }
        showToast('URL 복사에 실패했습니다.', 'error');
      }
    }

    setIsShareOpen(false);
  };

  const profiles = recentMessages.map((msg) => ({
    id: msg.id,
    src: msg.profileImageURL,
    alt: msg.sender,
  }));

  const profileTextColor =
    theme === 'image' ? 'var(--white)' : 'var(--gray-800)';

  const sortedReactions = [...reactions].sort((a, b) => b.count - a.count);

  const reactionsObject = sortedReactions.reduce((acc, curr) => {
    acc[curr.emoji] = curr.count;
    return acc;
  }, {});

  const MAX_VISIBLE_BADGES = 3;

  const btnVariant =
    theme === 'image' ? 'variantSmallWhiteText' : 'variantSmallText';

  const themeKey = theme === 'image' ? 'trans' : theme;
  const currentThemeObj = REACTION_THEMES[themeKey] || REACTION_THEMES.blue;

  return (
    <div className={styles.rollingHeader} type={theme}>
      <div className={styles.rollingHeaderTop}>
        <div className={styles.recipient}>
          <span className={styles.to}>To</span>
          <p className={styles.name}>{recipientName}</p>
        </div>

        <div className={styles.rollingButtons}>
          {!isEditMode ? (
            <>
              <Button
                variant={btnVariant}
                leftIcon={<ShareIcon />}
                onClick={handleShareToggle}
              >
                공유하기
              </Button>
              <ShareDropdown
                open={isShareOpen}
                onClose={handleShareClose}
                onSelect={handleShareSelect}
              />
              <Button
                variant={btnVariant}
                leftIcon={<EditIcon />}
                onClick={handleEdit}
              >
                편집하기
              </Button>
            </>
          ) : (
            <>
              <Button
                variant={btnVariant}
                leftIcon={<DeletedIcon />}
                onClick={onDelete}
              >
                롤링페이퍼 삭제하기
              </Button>
              <Button
                variant={btnVariant}
                leftIcon={<EditIcon />}
                onClick={handleSave}
              >
                편집 완료
              </Button>
            </>
          )}
        </div>
      </div>

      <div className={styles.rollingHeaderBottom}>
        <div className={styles.emojis}>
          {sortedReactions.slice(0, MAX_VISIBLE_BADGES).map((reaction) => (
            <ReactionBadge
              key={reaction.id}
              emoji={reaction.emoji}
              count={reaction.count}
              theme={currentThemeObj}
              onClick={() => handleEmojiClick(reaction.emoji)}
            />
          ))}

          {/* 더보기 버튼 */}
          {sortedReactions.length > MAX_VISIBLE_BADGES && (
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

        <ProfileGroup
          profiles={profiles}
          messageCount={messageCount}
          textColor={profileTextColor}
        />
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
  onDelete: PropTypes.func,
};

export default RollingHeader;
