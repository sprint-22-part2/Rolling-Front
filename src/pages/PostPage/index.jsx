import { useState } from 'react';
import TextInput from '@/components/common/TextInput';
import SegmentToggle from '@/components/common/SegmentToggle';
import ColorSelector from '@/components/post/ColorSelector';
import styles from './index.module.css';

function PostPage() {
  const [recipientName, setRecipientName] = useState('');
  const [backgroundType, setBackgroundType] = useState('color');
  const [backgroundColor, setBackgroundColor] = useState('yellow');

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
          <h2 className={styles.sectionTitle}>배경화면을 선택해 주세요.</h2>
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
      </section>
    </div>
  );
}

export default PostPage;
