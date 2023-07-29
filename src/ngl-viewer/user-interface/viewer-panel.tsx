import React, { useContext, useState } from "react";
import { ComponentUIDataT } from "./component-data";
import { mockComponentsDataMap } from "./component-data";
import { ColorPicker } from "..//forms/color-picker";
import Vector3DInput from "..//forms/3d-vector";
import { Vector3 } from "ngl";
import { ViewSettings } from "..//interfaces/interfaces";
import ViewSettingsInput from "..//forms/view-settings";
import ViewerContext from "./viewer-context";

const ViewerPanel = () => {
  const context = useContext(ViewerContext);
  const selectedIndex = 0;

  const handleColorChange = (color: [number, number, number]) => {
    const component = context.components[selectedIndex];
    const oldProps = component.props;
    const newProps = Object.assign(oldProps, { color });
    const newComponent = Object.assign(component, { props: newProps });
    console.log(color);
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


  
  const component = context.components[selectedIndex];
  

  return (
    <div>
      <h3>Photoshop Panel</h3>
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

      {component && "viewSettings" in component.props && (
        <ViewSettingsInput
          value={component.props.viewSettings}
          onChange={handleViewSettings}
        />
      )}
      </div>
    </div>
  );
};

export default ViewerPanel