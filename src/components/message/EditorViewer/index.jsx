import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import styles from './index.module.css';

const EditorViewer = ({ content, currentFont }) => {
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
    ],
    content: parsedContent,
    editable: false,
    editorProps: {
      attributes: {
        class: styles.viewerContent,
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

  return <EditorContent editor={editor} />;
};

EditorViewer.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  currentFont: PropTypes.string,
};

EditorViewer.defaultProps = {
  content: '',
  currentFont: 'inherit',
};

export default EditorViewer;
