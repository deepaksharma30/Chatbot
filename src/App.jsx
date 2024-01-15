import React, { useState, useEffect } from 'react';
import "./App.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { saveAs } from 'file-saver';
import * as docx from 'docx';

import logo from './images/abc.png';

const OutputComponent = ({ allOutputs, handleDownload }) => {
  return (
    <div className="output-area">
      {allOutputs.map((output, index) => (
        <div key={index}>{output}</div>
      ))}
    </div>  
  );
};

const App = () => {
  const [inputText, setInputText] = useState('');
  const [allOutputs, setAllOutputs] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(storedHistory);
  }, []);

  const handleSearch = () => {
    const newOutput = `Output for: ${inputText}`;
    setAllOutputs((prevOutputs) => [...prevOutputs, newOutput]);

    setSearchHistory((prevHistory) => {
      const newHistory = [inputText, ...prevHistory.slice(0, 9)];
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  // const handleDownload = () => {
  //   const content = allOutputs.join('\n');
  //   const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  //   saveAs(blob, 'output.docx');
  // };

  const handleDownload = () => {
    const doc = new docx.Document();
  
    // Add paragraphs with each output value
    allOutputs.forEach((output) => {
      doc.addSection({
        children: [
            new docx.Paragraph({
                children: [new docx.TextRun({text:output})],
                }),
        ],
    });
      // doc.addParagraph(new docx.Paragraph(output));
    });
  
    // Serialize the document to a buffer
    docx.Packer.toBuffer(doc).then((buffer) => {
      // Create a Blob with the Word document content
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  
      // Use the file-saver package to save the Blob as a Word file
      saveAs(blob, 'output.docx');
    }).catch((error) => {
      console.error('Error creating the document:', error);
    });
  };
  
  
  const handleSearchHistory = () => {
    setFlag(true);
  };

  const historyInput = (historyItem)=>{

    setInputText(historyItem);
  }
  return (
    <div>
      <div>
        <nav className="horizontal-navbar">
          <img className="img" src={logo} alt="" />
          <h1>ABSLI BRD AUTOMATION</h1>
          <h2>Please enter the required text here</h2>
        </nav>
      </div>
      <div className="vertical-navbar">
        <button className="icon" onClick={handleSearchHistory}>
          <FontAwesomeIcon style={{ color: "white", marginRight: "3px", height: "10" }} icon={faBars} /> Search History
        </button>
        {flag && (
          <div>
            <ul>
              {searchHistory.map((historyItem, index) => (
                
                <button onClick={() =>historyInput(historyItem) } className="history" style={{ overflowX: "auto", height: 30, width: 150, marginLeft: -38 }} key={index}>
                  {historyItem}
                </button>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="center-container">
        <div className="input-area">
          <textarea className='input1'
            type="text"
            value={inputText}
            maxLength={500}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Generate brd"
          />
        </div>
        <button className="button2" onClick={handleSearch}>Generate Brd</button>
        <OutputComponent allOutputs={allOutputs} handleDownload={handleDownload} />
        <button className="button2" onClick={handleDownload}>Download Output</button>
      </div>
    </div>
  );
};

export default App;
