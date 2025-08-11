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
  const [range, setRange] = useState<RangeType | null>(null);
  const [lastChange, setLastChange] = useState<TextChangeData | null>(null);
  const [readOnly, setReadOnly] = useState<boolean>(false);

  // Use a ref to access the quill instance directly
  const quillRef = useRef<Quill | null>(null);

  return (
    <div>
      <Editor
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={new Delta()
          .insert('Hello')
          .insert('\n', { header: 1 })
          .insert('Some ')
          .insert('initial', { bold: true })
          .insert(' ')
          .insert('content', { underline: true })
          .insert('\n')}
        onSelectionChange={setRange}
        onTextChange={setLastChange}
      />
      <div className="controls">
        <label>
          Read Only:{' '}
          <input
            type="checkbox"
            checked={readOnly}
            onChange={(e) => setReadOnly(e.target.checked)}
          />
        </label>
        <button
          className="controls-right"
          type="button"
          onClick={() => {
            alert(quillRef.current?.getLength());
          }}
        >
          Get Content Length
        </button>
      </div>
      <div className="state">
        <div className="state-title">Current Range:</div>
        {range ? JSON.stringify(range) : 'Empty'}
      </div>
      <div className="state">
        <div className="state-title">Last Change:</div>
        {lastChange ? JSON.stringify(lastChange.delta.ops) : 'Empty'}
      </div>
    </div>
  );
};

export default App;