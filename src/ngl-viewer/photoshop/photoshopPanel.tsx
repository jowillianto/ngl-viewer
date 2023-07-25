import React, { useContext, useState } from "react";
import PhotoshopContext, { ContextTypeT } from "./context";
import { ComponentUIDataT } from "./componentData";

const PhotoshopPanel: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { components, replaceComponent } = useContext<ContextTypeT>(PhotoshopContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, propName: keyof ComponentUIDataT["props"]) => {
    const newValue = event.target.value;

    if (selectedIndex !== null) {
      let updatedComponent = { ...components[selectedIndex] };
      if (updatedComponent.props) {
        updatedComponent.props[] = newValue;
        replaceComponent(updatedComponent, selectedIndex);
      }
    }
  };

  return (
    <div>
      <h3>Photoshop Panel</h3>
      <select value={selectedIndex ?? ''} onChange={(e) => setSelectedIndex(e.target.value ? Number(e.target.value) : null)}>
        <option value=''>-- Select a component --</option>
        {components.map((_, index) => (
          <option value={index} key={index}>
            {`Component ${index}`}
          </option>
        ))}
      </select>
      {selectedIndex !== null && (
        <div>
            <h4>Selected Component Properties:</h4>
            {components[selectedIndex].props ? Object.entries(components[selectedIndex].props).map(([key, value]) => (
            <div key={key}>
                <label>
                {key}:{" "}
                <input
                    type="text"
                    value={String(value)}
                    onChange={(e) => handleChange(e, key as keyof ComponentUIDataT["props"])}
                />
                </label>
            </div>
            )) : <p>No properties for this component</p>}
        </div>
)}
    </div>
  );
};

export default PhotoshopPanel;
