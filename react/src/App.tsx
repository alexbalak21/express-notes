import * as React from 'react';
import { useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import Editor from './Editor';
import List_group from './components/List_group';
import SearchBar from './components/SearchBar';





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
    <main className="row w-100">
      <aside className='col-3 p-0'>
        <List_group/>
      </aside>
      <div className="col-9 p-0">
        <SearchBar/>

        <Editor ref={quillRef} />
      
        <button 
          onClick={handleGetContents}
          className="btn btn-primary mt-2">
          Get Contents
        </button>
      </div>
    </main>
  );
};

export default App;