import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import styles from './index.module.css';
import {
  EditorBoldIcon,
  EditorItalicIcon,
  EditorUnderlineIcon,
  EditorAlignLeftIcon,
  EditorAlignCenterIcon,
  EditorAlignRightIcon,
  EditorAlignJustifyIcon,
  EditorListOrderedIcon,
  EditorListBulletIcon,
  EditorTextColorIcon,
  EditorBackgroundColorIcon,
} from '@/assets/icons';

const TextEditor = ({ content, setContent, currentFont }) => {
  const parsedContent = useMemo(() => {
    if (!content) {
      return '';
    }
    if (typeof content !== 'string') {
      return content;
    }
    try {
      return JSON.parse(content);
    } catch {
      return content;
    }
  }, [content]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        underline: false,
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({
        placeholder: '내용을 입력해 주세요.',
      }),
    ],
    content: parsedContent,
    onUpdate: ({ editor: editorInstance }) => {
      setContent(JSON.stringify(editorInstance.getJSON()));
    },
    editorProps: {
      attributes: {
        class: styles.editorContent,
        style: `font-family: ${currentFont};`,
      },
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }
    const normalizedContent =
      typeof content === 'string' ? content : JSON.stringify(content);
    const editorContent = JSON.stringify(editor.getJSON());
    if (normalizedContent && normalizedContent !== editorContent) {
      try {
        editor.commands.setContent(JSON.parse(normalizedContent), false);
      } catch {
        editor.commands.setContent(normalizedContent, false);
      }
    }
  }, [content, editor]);

  return (
    <div className={styles.editorWrapper}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarGroup}>
          <button
            type="button"
            className={styles.toolbarButton}
            onClick={() => editor?.chain().focus().toggleBold().run()}
            data-active={editor?.isActive('bold')}
          >
            <EditorBoldIcon className={styles.toolbarIcon} />
          </button>
          <button
            type="button"
            className={styles.toolbarButton}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            data-active={editor?.isActive('italic')}
          >
            <EditorItalicIcon className={styles.toolbarIcon} />
          </button>
          <button
            type="button"
            className={styles.toolbarButton}
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            data-active={editor?.isActive('underline')}
          >
            <EditorUnderlineIcon className={styles.toolbarIcon} />
          </button>
        </div>
        <div className={styles.toolbarGroup}>
          <button
            type="button"
            className={styles.toolbarButton}
            onClick={() => editor?.chain().focus().setTextAlign('left').run()}
            data-active={editor?.isActive({ textAlign: 'left' })}
          >
            <EditorAlignLeftIcon className={styles.toolbarIcon} />
          </button>
          <button
            type="button"
            className={styles.toolbarButton}
            onClick={() => editor?.chain().focus().setTextAlign('center').run()}
            data-active={editor?.isActive({ textAlign: 'center' })}
          >
            <EditorAlignCenterIcon className={styles.toolbarIcon} />
          </button>
          <button
            type="button"
            className={styles.toolbarButton}
            onClick={() => editor?.chain().focus().setTextAlign('right').run()}
            data-active={editor?.isActive({ textAlign: 'right' })}
          >
            <EditorAlignRightIcon className={styles.toolbarIcon} />
          </button>
          <button
            type="button"
            className={styles.toolbarButton}
            onClick={() =>
              editor?.chain().focus().setTextAlign('justify').run()
            }
            data-active={editor?.isActive({ textAlign: 'justify' })}
          >
            <EditorAlignJustifyIcon className={styles.toolbarIcon} />
          </button>
        </div>
        <div className={styles.toolbarGroup}>
          <button
            type="button"
            className={styles.toolbarButton}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            data-active={editor?.isActive('orderedList')}
          >
            <EditorListOrderedIcon className={styles.toolbarIcon} />
          </button>
          <button
            type="button"
            className={styles.toolbarButton}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            data-active={editor?.isActive('bulletList')}
          >
            <EditorListBulletIcon className={styles.toolbarIcon} />
          </button>
        </div>
        <div className={styles.toolbarGroup}>
          <label className={styles.colorPicker}>
            <EditorTextColorIcon className={styles.toolbarIcon} />
            <input
              type="color"
              className={styles.colorInput}
              onChange={(event) =>
                editor?.chain().focus().setColor(event.target.value).run()
              }
            />
          </label>
          <label className={styles.colorPicker}>
            <EditorBackgroundColorIcon
              className={`${styles.toolbarIcon} ${styles.toolbarIconSm}`}
            />
            <input
              type="color"
              className={styles.colorInput}
              onChange={(event) =>
                editor
                  ?.chain()
                  .focus()
                  .setHighlight({ color: event.target.value })
                  .run()
              }
            />
          </label>
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

TextEditor.propTypes = {
  content: PropTypes.string.isRequired,
  setContent: PropTypes.func.isRequired,
  currentFont: PropTypes.string.isRequired,
};

export default TextEditor;
