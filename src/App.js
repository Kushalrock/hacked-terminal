import React, { useEffect, useState } from 'react';
import './App.css';

const characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function getRandomCharacter() {
  return characterSet[Math.floor(Math.random() * characterSet.length)];
}

function App() {
  const [matrixRows, setMatrixRows] = useState([]);
  const [showText, setShowText] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const textToType = " You got hacked. IP collecting..."; // Updated text

  useEffect(() => {
    const numRows = Math.floor(window.innerHeight / 20);
    const numCols = Math.floor(window.innerWidth / 15);

    const matrix = Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => getRandomCharacter())
    );

    setMatrixRows(matrix);

    const textTimeout = setTimeout(() => {
      setShowText(true);
      startTypingEffect();
    }, 5000);

    const matrixInterval = setInterval(() => {
      const rowIndex = Math.floor(Math.random() * numRows);
      const colIndex = Math.floor(Math.random() * numCols);
      matrix[rowIndex][colIndex] = getRandomCharacter();
      setMatrixRows([...matrix]);
    }, 100);

    return () => {
      clearInterval(matrixInterval);
      clearTimeout(textTimeout);
    };
  }, []);

  const startTypingEffect = () => {
    const textArray = textToType.split('');
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < textArray.length) {
        setDisplayText((prevText) => prevText + textArray[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
  };

  return (
    <div className="matrix-container">
      {matrixRows.map((row, rowIndex) => (
        <div key={rowIndex} className="matrix-row">
          {row.map((char, colIndex) => (
            <span key={colIndex} className="matrix-character">
              {char}
            </span>
          ))}
        </div>
      ))}
      {showText && (
        <div className="text-typing">
          {displayText}
          <span></span>
        </div>
      )}
    </div>
  );
}

export default App;
