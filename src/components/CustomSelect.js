import React, { useState, useRef, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CustomSelect = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-select" ref={selectRef}>
      <div className="custom-select-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span>{value}</span>
        <KeyboardArrowDownIcon className={`custom-select-arrow ${isOpen ? 'open' : ''}`} />
      </div>
      {isOpen && (
        <div className="custom-select-options">
          {options.map((option) => (
            <div
              key={option}
              className={`custom-select-option ${option === value ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
