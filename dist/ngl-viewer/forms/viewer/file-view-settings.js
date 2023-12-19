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
import { useState } from "react";
import FileViewerSelector from "./viewer-selector";
var FileViewSettings = function (_a) {
    var options = _a.options, value = _a.value, onChange = _a.onChange;
    var _b = useState(value || []), viewSettings = _b[0], setViewSettings = _b[1];
    var _c = useState(options[0]), selectedType = _c[0], setSelectedType = _c[1];
    var handleTypeChange = function (type) {
        setSelectedType(type);
    };
    var applyViewSettings = function () {
        var newSettings = viewSettings.map(function (setting) { return (__assign(__assign({}, setting), { type: selectedType })); });
        setViewSettings(newSettings);
        onChange(newSettings);
    };
    return (_jsxs("div", { children: [_jsx(FileViewerSelector, { value: selectedType, onChange: handleTypeChange, options: options }), _jsx("button", { onClick: applyViewSettings, children: "Apply" })] }));
};
export default FileViewSettings;
