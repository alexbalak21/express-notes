import * as React from 'react';
import { useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import Editor from './Editor';

const Delta = Quill.import('delta');

interface RangeType {
  index: number;
  length: number;
}

interface DeltaOperation {
  insert?: string | object;
  delete?: number;
  retain?: number;
  attributes?: Record<string, any>;
}

interface DeltaStatic {
  ops?: DeltaOperation[];
  insert(content: string, attributes?: Record<string, any>): DeltaStatic;
  delete(length: number): DeltaStatic;
  retain(length: number, attributes?: Record<string, any>): DeltaStatic;
  concat(other: DeltaStatic): DeltaStatic;
  filter(predicate: (op: DeltaOperation) => boolean): DeltaOperation[];
  forEach(predicate: (op: DeltaOperation) => void): void;
  length(): number;
  map<T>(predicate: (op: DeltaOperation) => T): T[];
  partition(
    predicate: (op: DeltaOperation) => boolean
  ): [DeltaOperation[], DeltaOperation[]];
  reduce<T>(
    predicate: (acc: T, curr: DeltaOperation, idx: number, arr: DeltaOperation[]) => T,
    initial: T
  ): T;
  slice(start?: number, end?: number): DeltaStatic;
  chop(): DeltaStatic;
}

interface TextChangeData {
  delta: DeltaStatic;
  oldDelta: DeltaStatic;
  source: string;
  ops?: DeltaOperation[];
}

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
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
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