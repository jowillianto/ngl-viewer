import React, { useState, useEffect } from "react";
import { FormP } from "./common";

export type ColorPickerP = FormP<[number, number, number]>;

export const ColorPicker: React.FC<ColorPickerP> = ({ value, onChange }) => {
  const rgbToHex = (rgb: [number, number, number]) =>
    "#" +
    rgb
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("");

  const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : [0, 0, 0];
  };

  const [color, setColor] = useState(rgbToHex(value));

  useEffect(() => {
    setColor(rgbToHex(value));
  }, [value]);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rgbColor = hexToRgb(event.target.value);
    onChange(rgbColor);
    setColor(event.target.value);
  };

  return (
    <div>
      <label htmlFor="colorPicker">Color Picker</label>
      <input
        type="color"
        id="colorPicker"
        value={color}
        onChange={handleColorChange}
      />
    </div>
  );
};
