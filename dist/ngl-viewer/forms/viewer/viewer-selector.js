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
import { jsx as _jsx } from "react/jsx-runtime";
var FileViewerSelector = function (_a) {
    var value = _a.value, onChange = _a.onChange, options = _a.options;
    var handleChange = function (event) {
        onChange(event.target.value);
    };
    return (_jsx("select", __assign({ value: value, onChange: handleChange }, { children: options.map(function (option) { return (_jsx("option", __assign({ value: option }, { children: option }), option)); }) })));
};
export default FileViewerSelector;
