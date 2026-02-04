import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '@/components/common/TextInput';
import SegmentToggle from '@/components/common/SegmentToggle';
import ColorSelector from '@/components/post/ColorSelector';
import ImageSelector from '@/components/post/ImageSelector';
import ImageSelectorSkeleton from '@/components/post/ImageSelectorSkeleton';
import { COLOR_OPTIONS } from '@/constants/post';
import { createRecipient } from '@/apis/post';
import useBackgroundImages from '@/hooks/useBackgroundImages';
import Button from '@/components/common/Button';
import styles from './index.module.css';

const DEFAULT_COLOR_ID = COLOR_OPTIONS[0]?.id ?? 'beige';

function PostPage() {
  const navigate = useNavigate();
  const [recipientName, setRecipientName] = useState('');
  const [backgroundType, setBackgroundType] = useState('color');
  const [backgroundColor, setBackgroundColor] = useState(DEFAULT_COLOR_ID);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { imageOptions, isLoading: isBackgroundLoading } =
    useBackgroundImages();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  const selectedBackgroundImage = useMemo(
    () => backgroundImage || (imageOptions[0]?.id ?? ''),
    [backgroundImage, imageOptions]
  );

  const isSubmitDisabled = useMemo(
    () =>
      !recipientName.trim() ||
      (backgroundType === 'image' && !selectedBackgroundImage),
    [recipientName, backgroundType, selectedBackgroundImage]
  );

  const handleNameChange = (field, nextValue) => {
    if (field === 'recipientName') {
      setRecipientName(nextValue);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }
    const resolvedBackgroundColor =
      backgroundType === 'color' ? backgroundColor : DEFAULT_COLOR_ID;
    const resolvedBackgroundImageURL =
      backgroundType === 'image' ? selectedBackgroundImage : null;

    const payload = {
      name: recipientName.trim(),
      backgroundColor: resolvedBackgroundColor,
      backgroundImageURL: resolvedBackgroundImageURL,
    };

    try {
      setIsSubmitting(true);
      const createdRecipient = await createRecipient(payload);
      if (createdRecipient?.id) {
        navigate(`/post/${createdRecipient.id}`);
      }
    } catch {
      // TODO: 필요 시 사용자에게 에러 메시지 노출(토스트)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.postPage}>
      <section className={styles.section}>
        <TextInput
          label="받는 사람 이름"
          name="recipientName"
          placeholder="받는 사람 이름을 입력해 주세요"
          value={recipientName}
          onChange={handleNameChange}
        />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>배경화면</h2>
          <p className={styles.sectionDescription}>
            컬러를 선택하거나, 이미지를 선택할 수 있습니다.
          </p>
        </div>

        <div className={styles.toggleWrapper}>
          <SegmentToggle value={backgroundType} onChange={setBackgroundType} />
        </div>

        {backgroundType === 'color' && (
          <ColorSelector
            value={backgroundColor}
            onChange={setBackgroundColor}
          />
        )}

        {backgroundType === 'image' &&
          (isBackgroundLoading ? (
            <ImageSelectorSkeleton />
          ) : (
            <ImageSelector
              images={imageOptions}
              value={selectedBackgroundImage}
              onChange={setBackgroundImage}
            />
          ))}
      </section>
      <div className={styles.buttonWrapper}>
        <Button
          type="button"
          size="sizeBig"
          variant="variantPrimary"
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
        >
          {isSubmitting ? '생성 중...' : '생성하기'}
        </Button>
      </div>
    </div>
  );
}

export default PostPage;
