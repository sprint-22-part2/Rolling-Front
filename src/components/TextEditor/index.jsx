import React, { useMemo } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import PropTypes from 'prop-types';
import styles from './index.module.css';
import { FONT_MAP } from '@/constants/editor';

const TextEditor = ({ content, setContent, currentFont }) => {
  const modules = useMemo(
    () => ({
      toolbar: [
        ['bold', 'italic', 'underline'],
        [
          { align: '' },
          { align: 'center' },
          { align: 'right' },
          { align: 'justify' },
        ],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }, { background: [] }],
      ],
    }),
    []
  );

  return (
    <div className={styles.editorWrapper}>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        placeholder="내용을 입력해 주세요."
        style={{ fontFamily: FONT_MAP[currentFont] || currentFont }}
        className={styles.quillEditor}
      />
    </div>
  );
};

TextEditor.propTypes = {
  content: PropTypes.string.isRequired,
  setContent: PropTypes.func.isRequired,
  currentFont: PropTypes.string.isRequired,
};

export default TextEditor;
