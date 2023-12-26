import React, { useState } from 'react';
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { saveAs } from 'file-saver';
import * as docx from 'docx';
import Login from './Login';

import logo from './images/abc.png';

const OutputComponent = ({ allOutputs }) => {
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

  const handleSearch = () => {
    const newOutput = `Output for: ${inputText}`;
    setAllOutputs((prevOutputs) => [...prevOutputs, newOutput]);

    setSearchHistory((prevHistory) => {
      const newHistory = [inputText, ...prevHistory.slice(0, 9)];
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const handleDownload = () => {
    // Create a new Document
    const doc = new docx.Document({
      sections: [
        {
          properties: {},
          children: [],
        },
      ],
    });

    // Add paragraphs with each output value
    allOutputs.forEach((output) => {
      const paragraph = doc.createParagraph();
      paragraph.addRun().text(output);
    });

    // Create a Blob with the Word document content
    const blob = docx.Packer.toBuffer(doc);
    const blobUrl = URL.createObjectURL(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }));

    // Create a link element
    const downloadLink = document.createElement('a');

    // Set the download attribute and create a URL for the Blob
    downloadLink.href = blobUrl;
    downloadLink.download = 'output.docx';

    // Append the link to the document, trigger a click, and remove the link
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleSearchHistory = () => {
    setFlag(true);
  };

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
                <button className="history" style={{ overflowX: "auto", height: 30, width: 150, marginLeft: -38 }} key={index}>
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
        <button className='button2' onClick={handleSearch}>Generate Brd</button>
        <OutputComponent allOutputs={allOutputs} />
        <button className='button2' onClick={handleDownload}>Download Output</button>
      </div>
    </div>
  );
};

export default App;
