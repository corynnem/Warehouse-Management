import React, { useState, useEffect, useRef } from 'react';

const BarcodeScanner = ({ handleInputChange }) => {
  const [barcode, setBarcode] = useState('');
  const accumulatedBarcode = useRef('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        const newBarcode = accumulatedBarcode.current.trim();

        if (newBarcode.length > 0 && newBarcode !== undefined ) {
          setBarcode(newBarcode);
          handleInputChange(Number(newBarcode));
        }

        accumulatedBarcode.current = '';
      } else if (event.key.length === 1) {
        // Only append printable characters
        accumulatedBarcode.current += event.key;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleInputChange]);

  return (
    <div>
      <h2>Last Scanned Barcode:</h2>
      <strong>{barcode}</strong>
    </div>
  );
};

export default BarcodeScanner;
