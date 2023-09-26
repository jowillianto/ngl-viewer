import React, { useEffect, useState } from 'react';
import './collapsible.css'; // Import your CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { faAlignJustify, faCircleDot, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ViewSetting, ViewSettings } from '../interfaces/interfaces';
import { FileViewSettingsP } from '../forms/viewer/file-view-settings';
import { ComponentDataT, ComponentUIDataT } from './component-data';

interface CollapsibleProps {
  children: React.ReactNode[];
  component: ComponentUIDataT;
}
let clickCount = 0;
const Collapsible: React.FC<CollapsibleProps> = ({ children, component }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [representation, setRepresentation] = useState(["cartoon","ribbon","surface","licorice","ball+stick"]);
  const [lastClickedItem, setLastClickedItem] = useState("");
  
  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };
  const deleteRepresentation = (item: string) => {
    if (item === lastClickedItem) {
      setRepresentation(representation.filter((rep) => rep !== item));
      setLastClickedItem("");
    } else {
      setLastClickedItem(item);
    }
  }
  // const applyViewSettings = () => {
  //   const newSettings = viewSettings.map((setting) => ({
  //     ...setting,
  //     type: selectedType,
  //   }));
  //   setViewSettings(newSettings);
  //   // onChange(newSettings);
  // };
  useEffect(() => {
    console.log("representation", component.props)
  }, [component]);
  return (
    <div className="collapsible">
      <div className="collapsible-header">
        <div className='title'>
          <span className="toggle-icon" onClick={toggleCollapsible}>{isOpen ? <FontAwesomeIcon icon={faSquareMinus} /> : <FontAwesomeIcon icon={faSquarePlus} />}</span>
        </div>
        <div className="actions">
          {true && <span><FontAwesomeIcon icon={faEyeSlash} /></span>}
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
          {representation.map((item) => 
            {
              return (
                <div className="collapsible-header">
                  <div className='title'>
                    {/* <span className="toggle-icon" >{isOpen ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}</span> */}
                    {item}
                  </div>
                  <div className="actions">
                    <span onClick={()=>console.log("eye")}><FontAwesomeIcon icon={faEye}/></span>
                    <span onClick={()=>deleteRepresentation(item)}>{item === lastClickedItem ? <FontAwesomeIcon icon={faTrash} fade/> : <FontAwesomeIcon icon={faTrash}/>}</span>
                  </div>
                  <div className="see-more">
                    <span><FontAwesomeIcon icon={faAlignJustify} /></span>
                  </div>
                </div>
              )
            }
          )}
        </div>
      }
    </div>
  );
}

export default Collapsible;
