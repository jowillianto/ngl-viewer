import React, { useContext, useState } from "react";
import { ComponentUIDataT } from "./componentData";
import { mockComponentsDataMap } from "./componentData";
import { ColorPicker } from "ngl-viewer/forms/color-picker";
import PhotoShopContext from "./context";

export const PhotoshopPanel = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [components, setComponents] = useState<ComponentUIDataT[]>(Object.values(mockComponentsDataMap));

  const context = useContext(PhotoShopContext)


  const handleColorChange = (color: [number, number, number]) => {
    if (selectedIndex !== null) {
      const newComponents = context.components.slice()
      const selectedComponentProps = newComponents[selectedIndex].props;
      console.log(selectedComponentProps)
      // Ensure all necessary properties exist
      if ('color' in selectedComponentProps  &&  
          'position' in selectedComponentProps &&
          'depthAxis' in selectedComponentProps &&
          'heightAxis' in selectedComponentProps &&
          'size' in selectedComponentProps &&
          'viewSettings' in selectedComponentProps) {
        newComponents[selectedIndex] = {
          ...newComponents[selectedIndex],
          props: {
            ...selectedComponentProps,
            color  // Only the color is being updated here
          },
        };
        context.replaceComponent(component, 0)
        setComponents(newComponents);
      }
    }
  };

  return (
    <div>
      <h3>Photoshop Panel</h3>
      <div>
        <ColorPicker
          value={(components[selectedIndex]?.props as any).color}
          onChange={handleColorChange}
          readOnly={false}
        />
      </div>
    </div>
  );
};
