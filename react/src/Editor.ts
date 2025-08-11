import * as React from 'react';
import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

type DeltaStatic = any; // Using 'any' as a fallback for DeltaStatic
interface TextChangeHandler {
  (delta: any, oldContents: any, source: string): void;
}

interface SelectionChangeHandler {
  (range: any, oldRange: any, source: string): void;
}

interface EditorProps {
  readOnly?: boolean;
  defaultValue?: DeltaStatic;
  onTextChange?: TextChangeHandler;
  onSelectionChange?: SelectionChangeHandler;
}

// Editor is an uncontrolled React component
const Editor = forwardRef<Quill | null, EditorProps>(
  ({ readOnly = false, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      quillRef.current?.enable(!readOnly);
    }, [readOnly]);

    useEffect(() => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const editorContainer = document.createElement('div');
      container.appendChild(editorContainer);
      
      const quill = new Quill(editorContainer, {
        theme: 'snow',
        readOnly,
      });

      quillRef.current = quill;
      
      if (typeof ref === 'function') {
        ref(quill);
      } else if (ref) {
        (ref as React.MutableRefObject<Quill | null>).current = quill;
      }

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      const handleTextChange: TextChangeHandler = (...args) => {
        onTextChangeRef.current?.(...args);
      };

      const handleSelectionChange: SelectionChangeHandler = (...args) => {
        onSelectionChangeRef.current?.(...args);
      };

      quill.on(Quill.events.TEXT_CHANGE, handleTextChange);
      quill.on(Quill.events.SELECTION_CHANGE, handleSelectionChange);

      return () => {
        quill.off(Quill.events.TEXT_CHANGE, handleTextChange);
        quill.off(Quill.events.SELECTION_CHANGE, handleSelectionChange);
        if (typeof ref === 'function') {
          ref(null);
        } else if (ref) {
          (ref as React.MutableRefObject<Quill | null>).current = null;
        }
        container.innerHTML = '';
      };
    }, [ref]);

    return React.createElement('div', { ref: containerRef, className: 'quill-container' });
  },
);

Editor.displayName = 'Editor';

export default Editor;