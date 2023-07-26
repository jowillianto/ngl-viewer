import React from "react";
import { FormP } from "./common";

export type ColorPickerP = FormP<[number, number, number]>

export const ColorPicker: React.FC<ColorPickerP> = ({ value, onChange }) => {
  const handleColorChange = (colorIndex: number, newValue: string) => {
    const newColor = [...value];
    newColor[colorIndex] = parseInt(newValue);

    if(newColor.length !== 3) {
      throw new Error('Color must be an array of exactly three numbers');
    }

    onChange(newColor as [number, number, number]);
  };
  console.log(value)
  return (
    <div>
      {["Red", "Green", "Blue"].map((colorName, index) => (
        <div key={colorName}>
          <label>
            {colorName}:{" "}
            <input
              type="number"
              min="0"
              max="255"
              value={value[index]}
              onChange={(e) => handleColorChange(index, e.target.value)}
            />
          </label>
        </div>
      ))}
    </div>
  );
};
