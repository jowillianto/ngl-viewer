import React, { useState, useContext, useEffect } from 'react';
import './collapsible.css'; // Import your CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { faAlignJustify, faCircleDot, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ViewSettings } from '../interfaces/interfaces';
import { ComponentUIDataT } from './component-data';
import ViewerContext from './viewer-context';
import StageContext from '../stage-context';

interface CollapsibleProps {
  children: React.ReactNode[];
  component: ComponentUIDataT;
  index: number;
}

const Collapsible: React.FC<CollapsibleProps> = ({ component, index }) => {
  const context = useContext(ViewerContext);
  const stageContext = useContext(StageContext);
  const typeListVal: string[] = component.props.viewSettings.map(item => item.type);

  const [isOpen, setIsOpen] = useState(false);
  const [representation, setRepresentation] = useState(["cartoon","ribbon","surface","licorice","ball+stick"]);
  const [typeList, setTypeList] = useState<string[]>(typeListVal);
  const [lastClickedItem, setLastClickedItem] = useState("");
  const [originalViewSettings, setOriginalViewSettings] = useState<ViewSettings>(component.props.viewSettings);
  const [showAllRepresentations, setShowAllRepresentations] = useState(true);

  const [fileName, setFileName] = useState('');
  const toggleCollapsible = () => {
    setIsOpen(!isOpen);
  };

  const deleteRepresentation = (item: string) => {
    if (item === lastClickedItem) {
      setRepresentation(representation.filter((rep) => rep !== item));
      setTypeList(typeList.filter((rep) => rep !== item));
      const newSettings = component.props.viewSettings.filter((setting) => setting.type !== item);
      setOriginalViewSettings(newSettings);
      const oldProps = component.props;
      const newProps = Object.assign(oldProps, { viewSettings: newSettings });
      const newComponent = Object.assign(component, { props: newProps });
      context.replaceComponent(newComponent, index);
      setLastClickedItem("");
    } else {
      setLastClickedItem(item);
    }
  }
  const centerStructure = () => {
    stageContext.stage?.autoView();
  }
  const changeViewSetting = (item: string) => {
    let newSettings = [...component.props.viewSettings];
    const isItemInRepresentation = typeList.includes(item);
    if (!isItemInRepresentation) {
      setTypeList([...typeList, item]);
      const newItem = { ...newSettings[0], type: item };
      newSettings.push(newItem);
    } else {
      setTypeList(typeList.filter((rep) => rep !== item));
      newSettings = newSettings.filter((setting) => setting.type !== item);
    }
    setOriginalViewSettings(newSettings);
    const oldProps = component.props;
    const newProps = Object.assign(oldProps, { viewSettings: newSettings });
    const newComponent = Object.assign(component, { props: newProps });
    context.replaceComponent(newComponent, index);
  }
  const changeViewOfComponent = () => {
    if (showAllRepresentations) {
      const newSettings: ViewSettings = [];
      const oldProps = component.props;
      const newProps = Object.assign(oldProps, { viewSettings: newSettings });
      const newComponent = Object.assign(component, { props: newProps });
      context.replaceComponent(newComponent, index);
    } else {
      const oldProps = component.props;
      const newProps = Object.assign(oldProps, { viewSettings: originalViewSettings });
      const newComponent = Object.assign(component, { props: newProps });
      context.replaceComponent(newComponent, index);
    }
    setShowAllRepresentations(!showAllRepresentations);
  }
  const deleteComponent = () => {
    context.removeComponent(index)
  }
  useEffect(() => {
    if(component.type === 'file' && component.props.file !== null){
      if(component.props.file instanceof File){
        setFileName(component.props.file.name);
      }
    }
    else{
      setFileName(component.type);
    }
  }, [component])
  return (
    <div className="collapsible">
      <div className="collapsible-header">
        <div className='title'>
          <span className="toggle-icon" onClick={toggleCollapsible}>{isOpen ? <FontAwesomeIcon icon={faSquareMinus} /> : <FontAwesomeIcon icon={faSquarePlus} />}</span>
          <span>{fileName}</span>
        </div>
        <div className="actions">
          <span onClick={changeViewOfComponent}>{showAllRepresentations ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</span>
          <span onClick={centerStructure}><FontAwesomeIcon icon={faCircleDot} /></span>
          <span onClick={deleteComponent}><FontAwesomeIcon icon={faTrash} /></span>
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
                    {item}
                  </div>
                  <div className="actions">
                    <span onClick={()=>changeViewSetting(item)}>
                      {typeList.includes(item) ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                    </span>
                    <span onClick={()=>deleteRepresentation(item)}>{item === lastClickedItem ? <FontAwesomeIcon icon={faTrash} fade/> : <FontAwesomeIcon icon={faTrash}/>}</span>
                  </div>
                  {/* <div className="see-more">
                    <span><FontAwesomeIcon icon={faAlignJustify} /></span>
                  </div> */}
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
