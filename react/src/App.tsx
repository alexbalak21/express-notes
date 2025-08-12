import * as React from 'react';
import { useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import Editor from './Editor';





const App: React.FC = () => {
  const quillRef = useRef<Quill | null>(null);
  const renderedOutputRef = useRef<HTMLDivElement>(null);
  const rawOutputRef = useRef<HTMLPreElement>(null);

  const handleGetContents = () => {
    if (!quillRef.current || !renderedOutputRef.current || !rawOutputRef.current) return;
    
    // Get the raw HTML from the editor
    const rawHtml = quillRef.current.root.innerHTML;
    
    // Display the rendered HTML
    renderedOutputRef.current.innerHTML = rawHtml;
    
    // Display the raw HTML source (escaped to show the tags)
    rawOutputRef.current.textContent = rawHtml;
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Editor ref={quillRef} />
        <button 
          onClick={handleGetContents}
          className="btn btn-primary mt-2">
          Get Contents
        </button>
      </div>
      
<div style={{ marginBottom: '20px' }}>
        <h2>Rendered HTML</h2>
        <div 
          ref={renderedOutputRef}
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '4px',
            minHeight: '50px',
            backgroundColor: '#f8f9fa',
            marginBottom: '10px'
          }}
        >
          {/* Rendered HTML will appear here */}
        </div>
      </div>
      
      <div>
        <h2>Raw HTML Source</h2>
        <pre 
          ref={rawOutputRef}
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '4px',
            backgroundColor: '#f5f5f5',
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
            minHeight: '50px',
            overflowX: 'auto',
            fontSize: '14px'
          }}
        >
          {/* Raw HTML source will appear here */}
        </pre>
      </div>
    </div>
  );
};

export default App;