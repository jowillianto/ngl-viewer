import React, { useContext, useState } from "react";
import { ColorPicker } from "../forms/color-picker";
import Vector3DInput from "../forms/3d-vector";
import { Vector3 } from "ngl";
import { ViewSettings } from "../interfaces/interfaces";
import ViewerContext from "./viewer-context";
import FileUploader from "../forms/file-reader";
import FileViewSettings from "../forms/viewer/file-view-settings";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareMinus, faGear, faSquarePlus} from '@fortawesome/free-solid-svg-icons'
import { faCircleDot, faTrash } from '@fortawesome/free-solid-svg-icons'
import "./panel.css"
import Collapsible from "./collapsible";
const ViewerPanel = () => {
  const context = useContext(ViewerContext);
  const selectedIndex = 0;

  const handleColorChange = (color: [number, number, number]) => {
    const component = context.components[selectedIndex];
    const oldProps = component.props;
    const newProps = Object.assign(oldProps, { color });
    const newComponent = Object.assign(component, { props: newProps });
    context.replaceComponent(newComponent, selectedIndex);
  };

  const handleCoordinateChange = (
    position: [number, number, number] | Vector3 | undefined,
    position1: [number, number, number] | Vector3 | undefined,
    position2: [number, number, number] | Vector3 | undefined
  ) => {
    const component = context.components[selectedIndex];
    const oldProps = component.props;
    let newProps;

    if (
      ["arrow", "cone", "cylinder"].includes(
        context.components[selectedIndex].type
      )
    ) {
      newProps = Object.assign(oldProps, { position1, position2 });
    } else if (position) {
      newProps = Object.assign(oldProps, { position });
    }

    const newComponent = Object.assign(component, { props: newProps });
    context.replaceComponent(newComponent, selectedIndex);
  };

  const handleViewSettings = (viewSettings: ViewSettings) => {
    const component = context.components[selectedIndex];
    const oldProps = component.props;
    const newProps = Object.assign(oldProps, { viewSettings });
    const newComponent = Object.assign(component, { props: newProps });
    context.replaceComponent(newComponent, selectedIndex);
  };

  const handleFileUp = (file: File) => {
    const component = context.components[selectedIndex];
    const oldProps = component.props;
    const newProps = Object.assign(oldProps, { file });
    const newComponent = Object.assign(component, { props: newProps });
    context.replaceComponent(newComponent, selectedIndex);
  };

  const handleViewSettingsChange = (viewSettings: ViewSettings[]) => {
    const component = context.components[selectedIndex];
    if (component.type === 'file') {
      const oldProps = component.props;
      const newProps = Object.assign(oldProps, { viewSettings });
      const newComponent = Object.assign(component, { props: newProps });
      context.replaceComponent(newComponent, selectedIndex);
    }
  };
  

  const component = context.components[selectedIndex];
  return (
    <div>
      <div className="Sticky">
        <span><FontAwesomeIcon icon={faSquarePlus} /></span>
        <span><FontAwesomeIcon icon={faSquareMinus} /></span>
        <span><FontAwesomeIcon icon={faCircleDot} /></span>
        <span><FontAwesomeIcon icon={faTrash} /></span>
        <span><FontAwesomeIcon icon={faGear} /></span>
      </div>
      {context.components.map((component, index) => {
        return(
          <Collapsible component = {component} index={index}> 
          </Collapsible>
        )
      })}
      <div>
        {component && "color" in component.props && (
          <ColorPicker
            value={component.props.color as [number, number, number]}
            onChange={handleColorChange}
            readOnly={false}
          />
        )}

        {component &&
          "position1" in component.props &&
          "position2" in component.props && (
            <>
              <Vector3DInput
                value={component.props.position1 as [number, number, number]}
                onChange={(position1: [number, number, number]) => {
                  if ("position2" in component.props) {
                    handleCoordinateChange(
                      undefined,
                      position1,
                      component.props.position2
                    );
                  }
                }}
                readOnly={false}
              />
              <Vector3DInput
                value={component.props.position2 as [number, number, number]}
                onChange={(position2: [number, number, number]) => {
                  if ("position1" in component.props) {
                    handleCoordinateChange(
                      undefined,
                      component.props.position1,
                      position2
                    );
                  }
                }}
                readOnly={false}
              />
            </>
          )}
        {component && "position" in component.props && (
          <Vector3DInput
            value={component.props.position as [number, number, number]}
            onChange={(position: [number, number, number]) => {
              handleCoordinateChange(position, undefined, undefined);
            }}
            readOnly={false}
          />
        )}

        {component && "file" in component.props && (
          <FileUploader
            onChange={handleFileUp}
            readOnly={false}
            value={component.props.file as File}
          />
        )}
        {/* 
        {component && "viewSettings" in component.props && (
          <ViewSettingsInput
            value={component.props.viewSettings}
            onChange={handleViewSettings}
          />
        )} */}

        {component &&
          "viewSettings" in component.props &&
          "file" in component.props && (
            <FileViewSettings
              options={[
                "cartoon",
                "ribbon",
                "surface",
                "licorice",
                "ball+stick",
              ]}
              value={component.props.viewSettings as unknown as ViewSettings[]}
              onChange={handleViewSettingsChange}
              readOnly={false}
            />
          )}
      </div>
    </div>
  );
};

export default ViewerPanel;
