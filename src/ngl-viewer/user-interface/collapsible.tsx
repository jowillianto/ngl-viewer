import React, { useState } from 'react';
import './collapsible.css'; // Import your CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { faAlignJustify, faCircleDot, faTrash } from '@fortawesome/free-solid-svg-icons'
interface CollapsibleProps {
  title: React.ReactNode;
  children: React.ReactNode[];
}

const Collapsible: React.FC<CollapsibleProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible">
      <div className="collapsible-header">
        <div className='title'>
          <span className="toggle-icon" onClick={toggleCollapsible}>{isOpen ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}</span>
          {title}
        </div>
        <div className="actions">
          {true && <span><FontAwesomeIcon icon={faEye} /></span>}
          <span><FontAwesomeIcon icon={faCircleDot} /></span>
          <span><FontAwesomeIcon icon={faTrash} /></span>
        </div>
        <div className="see-more">
          <span><FontAwesomeIcon icon={faAlignJustify} /></span>
        </div>
      </div>
      {
        isOpen && 
        <div className="collapsible-content">
          {children}
        </div>
      }
    </div>
  );
}

export default Collapsible;
