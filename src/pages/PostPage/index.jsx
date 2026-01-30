import { useEffect, useMemo, useState } from 'react';
import TextInput from '@/components/common/TextInput';
import SegmentToggle from '@/components/common/SegmentToggle';
import ColorSelector from '@/components/post/ColorSelector';
import ImageSelector from '@/components/post/ImageSelector';
import { COLOR_OPTIONS } from '@/constants/post';
import axiosInstance from '@/apis/axiosInstance';
import Button from '@/components/common/Button';
import styles from './index.module.css';

const DEFAULT_COLOR_ID = COLOR_OPTIONS[0]?.id ?? 'beige';

const normalizeImageOptions = (payload) => {
  const list = payload.imageUrls;

  return list.map((url) => ({
    id: url,
    label: url,
    url,
  }));
};

function PostPage() {
  const [recipientName, setRecipientName] = useState('');
  const [backgroundType, setBackgroundType] = useState('color');
  const [backgroundColor, setBackgroundColor] = useState(DEFAULT_COLOR_ID);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [imageOptions, setImageOptions] = useState([]);

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

  useEffect(() => {
    let isMounted = true;

    axiosInstance
      .get('/background-images/')
      .then((response) => {
        const normalized = normalizeImageOptions(response?.data);
        if (isMounted) {
          setImageOptions(normalized);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const handleNameChange = (field, nextValue) => {
    if (field === 'recipientName') {
      setRecipientName(nextValue);
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

        {backgroundType === 'image' && (
          <ImageSelector
            images={imageOptions}
            value={selectedBackgroundImage}
            onChange={setBackgroundImage}
          />
        )}
      </section>
      <div className={styles.buttonWrapper}>
        <Button
          type="button"
          size="sizeBig"
          variant="variantPrimary"
          disabled={isSubmitDisabled}
        >
          생성하기
        </Button>
      </div>
    </div>
  );
}

export default PostPage;
