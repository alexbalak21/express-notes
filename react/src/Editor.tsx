import  { useEffect, useRef, forwardRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const Editor = forwardRef<Quill, {}>((_, ref) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && ref && 'current' in ref && !ref.current) {
      const quillInstance = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['link', 'image'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean']
          ]
        }
      });
      ref.current = quillInstance;
    }
  }, [ref]);

  return (
    <div>
      <div
        ref={editorRef}
        className=""
        style={{ height: '200px', overflowY: 'auto' }}
      />
    </div>
  );
});

export default Editor;
