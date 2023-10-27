var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
export var ColorPicker = function (_a) {
    var value = _a.value, onChange = _a.onChange;
    var rgbToHex = function (rgb) {
        return "#" +
            rgb
                .map(function (x) {
                var hex = x.toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            })
                .join("");
    };
    var hexToRgb = function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? [
                parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16),
            ]
            : [0, 0, 0];
    };
    var _b = useState(rgbToHex(value)), color = _b[0], setColor = _b[1];
    useEffect(function () {
        setColor(rgbToHex(value));
    }, [value]);
    var handleColorChange = function (event) {
        var rgbColor = hexToRgb(event.target.value);
        onChange(rgbColor);
        setColor(event.target.value);
    };
    return (_jsxs("div", { children: [_jsx("label", __assign({ htmlFor: "colorPicker" }, { children: "Color Picker" })), _jsx("input", { type: "color", id: "colorPicker", value: color, onChange: handleColorChange })] }));
};
