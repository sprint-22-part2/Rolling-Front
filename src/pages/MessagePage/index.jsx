import { useMemo, useState } from 'react';
import styles from './index.module.css';
import TextInput from '@/components/common/TextInput';
import FontControl from '@/components/message/FontControl';
import TextEditor from '@/components/message/TextEditor';
import Button from '@/components/common/Button';
import ProfileSelector from '@/components/message/ProfileSelector';
import Dropdown from '@/components/common/Dropdown';
import { FONT_MAP, FONT_OPTIONS } from '@/constants/editor';
import useProfileImages from '@/hooks/useProfileImages';

const RELATIONSHIP_OPTIONS = ['친구', '지인', '동료', '가족'];

const getPlainText = (value) => {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim();
};

function MessagePage() {
  const [senderName, setSenderName] = useState('');
  const [profileImageId, setProfileImageId] = useState('');
  const [relationship, setRelationship] = useState('');
  const [content, setContent] = useState('');
  const [font, setFont] = useState(FONT_OPTIONS[0] ?? 'Noto Sans');
  const { imageOptions } = useProfileImages();

  const selectedProfileImageId = useMemo(
    () => profileImageId || (imageOptions[0]?.id ?? ''),
    [profileImageId, imageOptions]
  );
  const hasContent = getPlainText(content).length > 0;
  const isSubmitDisabled =
    !senderName.trim() ||
    !relationship ||
    !hasContent ||
    !selectedProfileImageId;

  const handleNameChange = (field, nextValue) => {
    if (field === 'senderName') {
      setSenderName(nextValue);
    }
  };

  return (
    <div className={styles.messagePage}>
      <section className={styles.section}>
        <TextInput
          label="보내는 사람 이름"
          name="senderName"
          placeholder="보내는 사람 이름을 입력해 주세요"
          value={senderName}
          onChange={handleNameChange}
        />
      </section>
      <section className={styles.section}>
        <ProfileSelector
          options={imageOptions}
          selectedOption={selectedProfileImageId}
          onSelect={setProfileImageId}
        />
      </section>
      <section className={styles.section}>
        <div className={styles.sectionTitleWrap}>
          <h3 className={styles.sectionTitle}>상대와의 관계</h3>
        </div>
        <Dropdown
          placeholder="관계를 선택해 주세요"
          options={RELATIONSHIP_OPTIONS}
          value={relationship}
          onChange={setRelationship}
        />
      </section>
      <section className={styles.section}>
        <div className={styles.sectionTitleWrap}>
          <h3 className={styles.sectionTitle}>내용을 입력해 주세요</h3>
        </div>
        <TextEditor
          content={content}
          setContent={setContent}
          currentFont={FONT_MAP[font] ?? font}
        />
      </section>
      <section className={styles.section}>
        <div className={styles.sectionTitleWrap}>
          <h3 className={styles.sectionTitle}>폰트 선택</h3>
        </div>
        <FontControl options={FONT_OPTIONS} value={font} onChange={setFont} />
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

export default MessagePage;
