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
import { createMessage } from '@/apis/message';
import { useNavigate, useParams } from 'react-router-dom';
import useToast from '@/hooks/useToast';

const RELATIONSHIP_OPTIONS = ['지인', '친구', '동료', '가족'];

const getPlainText = (value) => {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim();
};

function MessagePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [senderName, setSenderName] = useState('');
  const [profileImageId, setProfileImageId] = useState('');
  const [relationship, setRelationship] = useState('지인');
  const [content, setContent] = useState('');
  const [font, setFont] = useState(FONT_OPTIONS[0] ?? 'Noto Sans');
  const { imageOptions } = useProfileImages();
  const { showToast } = useToast();

  const selectedProfileImageId = useMemo(
    () => profileImageId || (imageOptions[0]?.id ?? ''),
    [profileImageId, imageOptions]
  );

  const selectedProfileImageURL = useMemo(() => {
    const found = imageOptions.find((img) => img.id === selectedProfileImageId);
    return found?.url ?? found?.imageUrl ?? found?.imageURL ?? found?.src ?? '';
  }, [imageOptions, selectedProfileImageId]);

  const hasContent = getPlainText(content).length > 0;
  const isSubmitDisabled =
    !senderName.trim() ||
    !relationship ||
    !hasContent ||
    !selectedProfileImageURL;

  const handleSubmit = async () => {
    const payload = {
      recipientId: Number(id),
      sender: senderName.trim(),
      profileImageURL: selectedProfileImageURL,
      relationship,
      content,
      font,
    };

    try {
      await createMessage(id, payload);

      // 작성 완료 후 이동
      navigate(`/post/${id}`);
    } catch {
      showToast('메시지 생성에 실패했습니다.', 'error');
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
          onChange={(_, nextValue) => setSenderName(nextValue)}
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
          onClick={handleSubmit}
        >
          생성하기
        </Button>
      </div>
    </div>
  );
}

export default MessagePage;
